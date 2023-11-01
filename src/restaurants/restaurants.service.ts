import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { RestaurantsException } from './enums/restaurant-exception.enum';

@Injectable()
export class RestaurantsService {
	constructor(
		@InjectRepository(Restaurant)
		private readonly restaurantRepository: Repository<Restaurant>,
	) {}

	findOneBy(where: FindOptionsWhere<Restaurant>): Promise<Restaurant> {
		return this.restaurantRepository.findOneBy(where);
	}

	async findOne(id: string): Promise<Restaurant> {
		const restaurant = await this.findOneBy({ id });
		if (!restaurant) throw new NotFoundException(RestaurantsException.NOT_FOUND);

		return restaurant;
	}
}
