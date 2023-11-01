import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RestaurantException } from './enums/restaurant-exception.enum';
import { GetPostsDto } from './dto/get-posts.dto';
import { latLonToKm } from 'src/global/utils/latLonToKm';
import { RestaurantQueryOrder, RestaurantQueryOrderBy, RestaurantQuerySearchBy } from './enums/restaurant-query.enum';
import { PageMetaDto } from './dto/page-meta.dto';
import { PageDto } from './dto/page.dto';

@Injectable()
export class RestaurantsService {
	private restaurant = 'restaurant';

	constructor(
		@InjectRepository(Restaurant)
		private readonly restaurantRepository: Repository<Restaurant>,
	) {}

	async getPosts(getPostsDto: GetPostsDto) {
		const { lat, lon, range, orderBy, order, searchBy, search, page, count } = getPostsDto;
		const qb = this.restaurantRepository.createQueryBuilder(this.restaurant);

		// 검색 기준에 따라 검색
		if (searchBy === RestaurantQuerySearchBy.NAME) {
			qb.where(`to_tsvector(${this.restaurant}.name) @@ to_tsquery('${search}')`);
		}

		// 정렬 기준에 따라 정렬
		if (orderBy === RestaurantQueryOrderBy.RATING) {
			qb.addOrderBy(`${this.restaurant}.${orderBy}`, order === RestaurantQueryOrder.DESC ? 'DESC' : 'ASC');
		}

		// range 안쪽에 있는 맛집 선택
		let queriedRestaurants = await qb.getMany();
		const distanceMap = new Map();
		queriedRestaurants = queriedRestaurants.filter((restaurant) => {
			const distance = latLonToKm({ point1: [lon, lat], point2: [restaurant.lon, restaurant.lat] });
			if (distance < range) {
				distanceMap.set(restaurant.id, distance);
				return true;
			}
			return false;
		});

		// 거리 기준 정렬
		if (orderBy === RestaurantQueryOrderBy.DIST) {
			queriedRestaurants.sort((a, b) => {
				if (order === RestaurantQueryOrder.ASC) return distanceMap.get(a.id) - distanceMap.get(b.id);
				else return distanceMap.get(b.id) - distanceMap.get(a.id);
			});
		}

		const pageMeta = new PageMetaDto({ totalCounts: queriedRestaurants.length, page, count });
		if (pageMeta.lastPage >= pageMeta.page) return new PageDto<Restaurant>(queriedRestaurants, pageMeta);
		else throw new ConflictException(RestaurantException.INVALID_PAGE);
	}

	findOneBy(where: FindOptionsWhere<Restaurant>): Promise<Restaurant> {
		return this.restaurantRepository.findOneBy(where);
	}

	async findOne(id: string): Promise<Restaurant> {
		const restaurant = await this.findOneBy({ id });
		if (!restaurant) throw new NotFoundException(RestaurantException.NOT_FOUND);

		return restaurant;
	}
}
