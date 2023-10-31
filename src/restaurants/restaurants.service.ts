import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantsService {
	constructor(
		@InjectRepository(Restaurant)
		private readonly restaurantRepository: Repository<Restaurant>,
	) {}
}
