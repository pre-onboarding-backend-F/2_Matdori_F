import { Post, Controller } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ResponseMessage } from 'src/global/decorators/response-key.decorator';
import { ScheduleResponseMessage } from './classes/schedule.response.message';

@Controller('schedule')
export class ScheduleController {
	constructor(private readonly scheduleService: ScheduleService) {}

	@Post('event/collect')
	@ResponseMessage(ScheduleResponseMessage.COLLECT)
	collect() {
		this.scheduleService.jobEventEmitter();
	}

	@Post('event/preprocess')
	@ResponseMessage(ScheduleResponseMessage.PREPROCESS)
	preprocess() {
		this.scheduleService.preprocessEmitter();
	}
}
