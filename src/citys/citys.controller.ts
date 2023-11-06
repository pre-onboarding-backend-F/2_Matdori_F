import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { CitysService } from './citys.service';
import { City } from './entity/city.entity';
import { AtGuard } from 'src/global/guard/access.token.guard';
import { JwtExceptionFilter } from 'src/global/filters/jwt-exception.filter';
import { ResponseMessage } from 'src/global/decorators/response-key.decorator';
import { CityResponse } from './enums/city-response.enum';

@Controller('citys')
@UseGuards(AtGuard)
@UseFilters(JwtExceptionFilter)
export class CitysController {
	constructor(private readonly citysService: CitysService) {}

	@Get()
	@ResponseMessage(CityResponse.GET_CITIES)
	getCities(): Promise<City[]> {
		return this.citysService.getCities();
	}
}
