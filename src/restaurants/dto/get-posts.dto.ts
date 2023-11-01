import { IsEnum, IsLatitude, IsLongitude, IsNotEmpty, IsOptional } from 'class-validator';
import { RestaurantQueryOrder, RestaurantQueryOrderBy, RestaurantQueryRange } from '../enums/restaurant-query.enum';

export class GetPostsDto {
	@IsNotEmpty({ message: 'lat 필드는 필수 입력 필드입니다.' })
	@IsLatitude({ message: 'lat 필드에 유효한 위도를 입력해야 합니다.' })
	lat: number;

	@IsNotEmpty({ message: 'lon 필드는 필수 입력 필드입니다.' })
	@IsLongitude({ message: 'lon 필드에 유효한 경도를 입력해야 합니다.' })
	lon: number;

	@IsNotEmpty({ message: 'range 필드는 필수 입력 필드입니다.' })
	@IsEnum(RestaurantQueryRange, {
		message: `range 필드에 전달 가능한 값: [${RestaurantQueryRange.ONE_KM}, ${RestaurantQueryRange.FIVE_KM}, ${RestaurantQueryRange.TEN_KM}]`,
	})
	range: RestaurantQueryRange;

	@IsOptional()
	@IsEnum(RestaurantQueryOrderBy, {
		message: `orderBy 필드에 전달 가능한 값: [${RestaurantQueryOrderBy.DIST}, ${RestaurantQueryOrderBy.RATING}]`,
	})
	orderBy: RestaurantQueryOrderBy = RestaurantQueryOrderBy.DIST; // default: dist

	@IsOptional()
	@IsEnum(RestaurantQueryOrder, {
		message: `order 필드에 전달 가능한 값: [${RestaurantQueryOrder.DESC}, ${RestaurantQueryOrder.ASC}]`,
	})
	order: RestaurantQueryOrder = RestaurantQueryOrder.ASC; // default: asc
}
