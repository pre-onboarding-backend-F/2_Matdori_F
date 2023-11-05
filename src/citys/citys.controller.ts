import { Controller, Get, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CitysService } from './citys.service';
import { City } from './entity/city.entity';
import { AtGuard } from 'src/global/guard/access.token.quard';
import { JwtExceptionFilter } from 'src/global/filters/jwt-exception.filter';
import { ResponseMessage } from 'src/global/decorators/response-key.decorator';
import { CityResponse } from './enums/city-response.enum';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { CitysCacheInterceptor } from './interceptors/citys-cache.interceptor';
import { CITYS_GET_CITIES } from './constants/city-cache-key.constants';

@Controller('citys')
@UseGuards(AtGuard)
@UseInterceptors(CitysCacheInterceptor)
@UseFilters(JwtExceptionFilter)
export class CitysController {
	constructor(private readonly citysService: CitysService) {}

	@Get()
	@ResponseMessage(CityResponse.GET_CITIES)
	@CacheKey(CITYS_GET_CITIES)
	@CacheTTL(0)
	getCities(): Promise<City[]> {
		return this.citysService.getCities();
	}
}
