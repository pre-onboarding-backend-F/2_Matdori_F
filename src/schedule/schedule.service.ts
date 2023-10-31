import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { forkJoin, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@nestjs/axios';
import openApiConfiguration from 'src/global/configs/open-api.configuration';
import { ConfigType } from '@nestjs/config';
import { OpenApiOptions } from './interfaces/open-api-options.interface';
import { Category } from 'src/global/enums/category.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { OpenApiRaws } from 'src/global/entities/open-api-raws.entity';
import { Repository } from 'typeorm';
import { OpenApiResults, Row } from './interfaces/open-api-result.interface';

@Injectable()
export class ScheduleService implements OnModuleInit {
	private reapeatCount = 10;

	constructor(
		private readonly httpService: HttpService,
		@Inject(openApiConfiguration.KEY)
		private apiConfig: ConfigType<typeof openApiConfiguration>,
		@InjectRepository(OpenApiRaws)
		private rawsRepository: Repository<OpenApiRaws>,
	) {}

	async onModuleInit() {
		await this.crawler({ type: Category.JAPANESE, pagePerRow: 1000, pageIndex: 1 });
		await this.crawler({ type: Category.KOREAN, pagePerRow: 1000, pageIndex: 1 });
		await this.crawler({ type: Category.CHINESE, pagePerRow: 1000, pageIndex: 1 });
	}

	async crawler(options: OpenApiOptions) {
		const observables = Array(this.reapeatCount)
			.fill(0)
			.map(() =>
				this.call({ pageIndex: options.pageIndex++, type: options.type, pagePerRow: options.pagePerRow }),
			);

		const results: OpenApiResults = await forkJoin(observables).toPromise();

		await this.insertRaws(results);
	}

	call(options: OpenApiOptions) {
		const { type, pageIndex, pagePerRow, sigunName, sigunCode } = options;
		let baseUrl = '';

		if (type === Category.JAPANESE) baseUrl = this.apiConfig.japanese.requestUrl;
		if (type === Category.CHINESE) baseUrl = this.apiConfig.chinese.requestUrl;
		if (type === Category.KOREAN) baseUrl = this.apiConfig.korean.requestUrl;

		if (pageIndex) baseUrl += `&pIndex=${pageIndex}`;
		if (pagePerRow) baseUrl += `&pSize=${pagePerRow}`;
		if (sigunCode) baseUrl += `&SIGUN_CD=${sigunCode}`;
		if (sigunName) baseUrl += `&SIGUN_NM=${sigunName}`;

		return from(this.httpService.get(baseUrl)).pipe(map((response) => response.data));
	}

	async insertRaws(openApiResults: OpenApiResults) {
		for (const openApiResult of openApiResults) {
			if (openApiResult.Genrestrtjpnfood) {
				const rows = openApiResult.Genrestrtjpnfood[1].row;
				await this.upsert(rows);
			}

			if (openApiResult.Genrestrtlunch) {
				const rows = openApiResult.Genrestrtlunch[1].row;
				await this.upsert(rows);
			}

			if (openApiResult.Genrestrtchifood) {
				const rows = openApiResult.Genrestrtchifood[1].row;
				await this.upsert(rows);
			}
		}
	}

	async upsert(rows: Row[]) {
		for (const row of rows) {
			try {
				if (row.SANITTN_BIZCOND_NM === '김밥(도시락)') row.SANITTN_BIZCOND_NM = '한식';
				if (row.SANITTN_BIZCOND_NM === '중국식') row.SANITTN_BIZCOND_NM = '중식';

				const newRaw = this.rawsRepository.create({
					sigunName: row.SIGUN_NM,
					sigunCode: row.SIGUN_CD,
					name: row.BIZPLC_NM,
					license: row.LICENSG_DE,
					state: row.BSN_STATE_NM,
					closedDate: row.CLSBIZ_DE,
					maleWorkers: row.MALE_ENFLPSN_CNT,
					femaleWorkers: row.FEMALE_ENFLPSN_CNT,
					zoningName: row.BSNSITE_CIRCUMFR_DIV_NM,
					category: row.SANITTN_BIZCOND_NM,
					totalEmploymentCount: row.TOT_EMPLY_CNT,
					roadAddress: row.REFINE_ROADNM_ADDR,
					address: row.REFINE_LOTNO_ADDR,
					zipCode: row.REFINE_ZIP_CD,
					lat: row.REFINE_WGS84_LAT,
					lon: row.REFINE_WGS84_LOGT,
					nameAndAddress:
						row.BIZPLC_NM.replace(/[._-\s]/g, '') + '_' + row.REFINE_LOTNO_ADDR.replace(/[,.\s]/g, ''),
				});

				await this.rawsRepository.upsert(newRaw, ['nameAndAddress']);
			} catch (error) {
				console.log(error);
			}
		}
	}
}
