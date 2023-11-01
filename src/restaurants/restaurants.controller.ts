import { Controller, Get, Param, Query, UseFilters } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './entity/restaurant.entity';
import { HttpExceptionFilter } from 'src/global/filters/http-exception.filter';
import { CustomParseUUIDPipe } from './pipes/custom-parse-uuid.pipe';
import { GetPostsDto } from './dto/get-posts.dto';
import { ResponseMessage } from 'src/global/decorators/response-key.decorator';
import { RestaurantResponse } from './enums/restaurant-response.enum';

@Controller('restaurants')
@UseFilters(HttpExceptionFilter)
export class RestaurantsController {
	constructor(private readonly restaurantsService: RestaurantsService) {}

	@Get()
	@ResponseMessage(RestaurantResponse.GET_POSTS)
	getPosts(@Query() getPostsDto: GetPostsDto) {
		return this.restaurantsService.getPosts(getPostsDto);
	}

	@Get(':id')
	@ResponseMessage(RestaurantResponse.FIND_ONE)
	findOne(@Param('id', CustomParseUUIDPipe) id: string): Promise<Restaurant> {
		return this.restaurantsService.findOne(id);
	}
}
