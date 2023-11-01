import { Controller, Get } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { Category } from 'src/global/enums/category.enum';

@Controller('schedule')
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}

	@Get('collect')
	collect() {
		this.scheduleService.jobEventEmitter({ pageIndex: 1, pagePerRow: 1000, type: Category.JAPANESE });
		this.scheduleService.jobEventEmitter({ pageIndex: 1, pagePerRow: 1000, type: Category.KOREAN });
		this.scheduleService.jobEventEmitter({ pageIndex: 1, pagePerRow: 1000, type: Category.CHINESE });
	}
}
