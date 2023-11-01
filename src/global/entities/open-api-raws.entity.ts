import { BeforeInsert, Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';
import { BusinessState } from '../enums/business-state.enum';
import { RestaurantCategory } from 'src/restaurants/enums/restaurant.enum';

@Entity({ name: 'open_api_raws' })
export class OpenApiRaws extends BaseEntity {
	@Column({ name: 'sigun_name', comment: '시, 군 이름', nullable: true })
	sigunName: string | null;

	@Column({ name: 'sigun_code', comment: '시, 군 이름', nullable: true })
	sigunCode: number | null;

	@Column({ comment: '사업장명' })
	name: string;

	@Column({ comment: '인허가일자' })
	license: string;

	@Column({ type: 'enum', enum: BusinessState, comment: '영업상태명' })
	state: BusinessState;

	@Column({ name: 'closed_date', comment: '폐업 일자', nullable: true })
	closedDate: string;

	//@Column({ comment: '소재지 면적', default: null })
	//area: null;

	//@Column({ comment: '급수시설구분명', default: null })
	//waterworksCode: null;

	@Column({ name: 'male_workers', comment: '남성 종사자 수(명)', default: null })
	maleWorkers: number | null;

	//@Column({ comment: '년도', default: null })
	//year: null;

	//@Column({ comment: '다중 이용 업소 여부', default: null })
	//multiUseBiz: null;

	//@Column({ comment: '등급구분명', default: null })
	//grade: null;

	//@Column({ comment: '총 시설 규모', default: null })
	//totalScale: null;

	@Column({ name: 'female_workers', comment: '여성 종사자 수(명)', default: null })
	femaleWorkers: number | null;

	@Column({ name: 'zoning_name', comment: '영업장 주변 구분명', nullable: true })
	zoningName: string | null;

	//@Column({ comment: '위생 업종명', default: null })
	//industryType: null;

	@Column({ type: 'enum', enum: RestaurantCategory, comment: '위생 업태명 (한식, 중식, 일식)' })
	category: RestaurantCategory;

	@Column({ name: 'total_employment_count', comment: '총 종업원 수', nullable: true })
	totalEmploymentCount: number | null;

	@Column({ name: 'road_address', comment: '소재지 도로명 주소', nullable: true })
	roadAddress: string;

	@Column({ comment: '소재지 지번 주소' })
	address: string;

	@Column({ name: 'zip_code', comment: '소재지 우편번호', nullable: true })
	zipCode: string;

	@Column({
		type: 'numeric',
		precision: 12,
		scale: 10,
		comment: '소재지 위도',
		nullable: true,
	})
	lat: number;

	@Column({ type: 'numeric', precision: 13, scale: 10, comment: '소재지 경도', nullable: true })
	lon: number;

	@Column({ name: 'name_address', unique: true })
	nameAddress: string;

	@BeforeInsert()
	transform() {
		this.nameAddress = this.name.replace(/[._-\s]/g, '') + '_' + this.address.replace(/[,.\s]/g, '');
	}
}
