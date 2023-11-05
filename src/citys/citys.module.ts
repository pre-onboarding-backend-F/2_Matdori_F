import { Module } from '@nestjs/common';
import { CitysService } from './citys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entity/city.entity';
import { CitysController } from './citys.controller';
import { CacheModule } from 'src/cache/cache.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CitysCacheInterceptor } from './interceptors/citys-cache.interceptor';

@Module({
	imports: [TypeOrmModule.forFeature([City]), CacheModule],
	controllers: [CitysController],
	providers: [
		CitysService,
		{
			provide: APP_INTERCEPTOR,
			useClass: CitysCacheInterceptor,
		},
	],
})
export class CitysModule {}
