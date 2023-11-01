import { Controller, Post, ClassSerializerInterceptor, UseFilters, UseInterceptors, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from 'src/global/filters/http-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseMessage } from 'src/global/decorators/response-key.decorator';
import { UserResponseMesaage } from 'src/global/class/user.response.message';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ResponseMessage(UserResponseMesaage.SIGN_UP)
	async signUp(@Body() createUserDto: CreateUserDto) {
		return await this.usersService.createUser(createUserDto);
	}
}
