import { Controller, Post, UseFilters, UseGuards } from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { HttpExceptionFilter } from 'src/global/filters/http-exception.filter';
import { JwtExceptionFilter } from 'src/global/filters/jwt-exception.filter';
import { AtGuard } from 'src/global/guard/access.token.guard';
import { ResponseMessage } from 'src/global/decorators/response-key.decorator';
import { RecommendResponseMessage } from './classes/recommend.response.message';

@Controller('recommend')
@UseFilters(HttpExceptionFilter, JwtExceptionFilter)
@UseGuards(AtGuard)
export class RecommendController {
	constructor(private readonly recommendService: RecommendService) {}

	@Post()
	@ResponseMessage(RecommendResponseMessage.SEND)
	sendLunchRecomm() {
		this.recommendService.sendLunchRecommendations();
	}
}
