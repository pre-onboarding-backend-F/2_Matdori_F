import { Module } from '@nestjs/common';
import { CitysService } from './citys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entity/city.entity';

@Module({
	imports: [TypeOrmModule.forFeature([City])],
	providers: [CitysService],
})
export class CitysModule {}
