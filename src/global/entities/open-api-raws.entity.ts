import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

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

	@Column({ comment: '영업상태명' })
	state: string;

	@Column({ comment: '폐업 일자', nullable: true })
	closedDate: string;

	//@Column({ comment: '소재지 면적', default: null })
	//area: null;

	//@Column({ comment: '급수시설구분명', default: null })
	//waterworksCode: null;

	@Column({ comment: '남성 종사자 수(명)', default: null })
	maleWorkers: number | null;

	//@Column({ comment: '년도', default: null })
	//year: null;

	//@Column({ comment: '다중 이용 업소 여부', default: null })
	//multiUseBiz: null;

	//@Column({ comment: '등급구분명', default: null })
	//grade: null;

	//@Column({ comment: '총 시설 규모', default: null })
	//totalScale: null;

	@Column({ comment: '여성 종사자 수(명)', default: null })
	femaleWorkers: number | null;

	@Column({ comment: '영업장 주변 구분명', nullable: true })
	zoningName: string | null;

	//@Column({ comment: '위생 업종명', default: null })
	//industryType: null;

	@Column({ comment: '위생 업태명 (한식, 중식, 일식)' })
	category: string;

	@Column({ comment: '총 종업원 수', nullable: true })
	totalEmploymentCount: number | null;

	@Column({ comment: '소재지 도로명 주소', nullable: true })
	roadAddress: string;

	@Column({ comment: '소재지 지번 주소' })
	address: string;

	@Column({ comment: '소재지 우편번호', nullable: true })
	zipCode: string;

	@Column({ type: 'numeric', comment: '소재지 위도', nullable: true })
	lat: string;

	@Column({ type: 'numeric', comment: '소재지 경도', nullable: true })
	lon: string;

	@Column({ unique: true })
	nameAndAddress: string;
}
