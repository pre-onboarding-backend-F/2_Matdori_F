import { Controller, Get, Param, Query, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './entity/restaurant.entity';
import { HttpExceptionFilter } from 'src/global/filters/http-exception.filter';
import { CustomParseUUIDPipe } from './pipes/custom-parse-uuid.pipe';
import { GetPostsDto } from './dto/get-posts.dto';

@Controller('restaurants')
@UseFilters(HttpExceptionFilter)
export class RestaurantsController {
	constructor(private readonly restaurantsService: RestaurantsService) {}

	@Get()
	@UsePipes(
		new ValidationPipe({ whitelist: true, transform: true, transformOptions: { enableImplicitConversion: true } }),
	) // 임시 적용
	getPosts(@Query() getPostsDto: GetPostsDto) {
		console.log(getPostsDto);
	}

	@Get(':id')
	findOne(@Param('id', CustomParseUUIDPipe) id: string): Promise<Restaurant> {
		return this.restaurantsService.findOne(id);
	}
}
