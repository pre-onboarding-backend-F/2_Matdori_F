import { Inject, Injectable, Logger } from '@nestjs/common';
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
import { Row } from './interfaces/open-api-response.interface';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { SchduleCollectionEvent } from './classes/schedule-collection.event';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ScheduleService {
	private reapeatCount = 10;
	private logger = new Logger(ScheduleService.name);

	constructor(
		private readonly httpService: HttpService,
		@Inject(openApiConfiguration.KEY)
		private apiConfig: ConfigType<typeof openApiConfiguration>,
		@InjectRepository(OpenApiRaws)
		private rawsRepository: Repository<OpenApiRaws>,
		private event: EventEmitter2,
	) {}

	jobEventEmitter(options: OpenApiOptions) {
		this.event.emit('schedule.job', new SchduleCollectionEvent(options));
	}

	@OnEvent('schedule.job')
	job(options: OpenApiOptions) {
		const observables = Array(this.reapeatCount)
			.fill(0)
			.map(() =>
				this.call({ pageIndex: options.pageIndex++, type: options.type, pagePerRow: options.pagePerRow }),
			);

		forkJoin(observables).subscribe({
			next: (res: any) => {
				for (const data of res) {
					if (!data.RESULT) {
						if (data.Genrestrtjpnfood) this.upsert(data.Genrestrtjpnfood[1].row);
						if (data.Genrestrtlunch) this.upsert(data.Genrestrtlunch[1].row);
						if (data.Genrestrtchifood) this.upsert(data.Genrestrtchifood[1].row);
					}
				}
			},
		});
	}

	//@Cron('5 15 * * *')
	@Cron(CronExpression.EVERY_MINUTE)
	private cronJob() {
		this.job({ pageIndex: 1, pagePerRow: 1000, type: Category.JAPANESE });
		this.job({ pageIndex: 1, pagePerRow: 1000, type: Category.KOREAN });
		this.job({ pageIndex: 1, pagePerRow: 1000, type: Category.CHINESE });
	}

	private call(options: OpenApiOptions) {
		const url = this.urlGenerator(options);
		return from(this.httpService.get(url)).pipe(map((response) => response.data));
	}

	private urlGenerator(options: OpenApiOptions) {
		const { type, pageIndex, pagePerRow, sigunName, sigunCode } = options;
		let baseUrl = '';

		if (type === Category.JAPANESE) baseUrl = this.apiConfig.japanese.requestUrl;
		if (type === Category.CHINESE) baseUrl = this.apiConfig.chinese.requestUrl;
		if (type === Category.KOREAN) baseUrl = this.apiConfig.korean.requestUrl;

		if (pageIndex) baseUrl += `&pIndex=${pageIndex}`;
		if (pagePerRow) baseUrl += `&pSize=${pagePerRow}`;
		if (sigunCode) baseUrl += `&SIGUN_CD=${sigunCode}`;
		if (sigunName) baseUrl += `&SIGUN_NM=${sigunName}`;

		return baseUrl;
	}

	private async upsert(rows: Row[]) {
		for (const row of rows) {
			try {
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
				});

				await this.rawsRepository.upsert(newRaw, ['nameAddress']);
			} catch (error) {
				this.logger.error(error);
			}
		}
	}
}
