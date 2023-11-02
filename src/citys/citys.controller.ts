import { Controller, Get, UseFilters, UseGuards } from '@nestjs/common';
import { CitysService } from './citys.service';
import { City } from './entity/city.entity';
import { AtGuard } from 'src/global/guard/access.token.quard';
import { JwtExceptionFilter } from 'src/global/filters/jwt-exception.filter';

@Controller('citys')
@UseGuards(AtGuard)
@UseFilters(JwtExceptionFilter)
export class CitysController {
	constructor(private readonly citysService: CitysService) {}

	@Get()
	getCities(): Promise<City[]> {
		return this.citysService.getCities();
	}
}
