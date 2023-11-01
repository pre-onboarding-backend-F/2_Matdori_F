import {
	Controller,
	Post,
	Get,
	ClassSerializerInterceptor,
	UseFilters,
	UseInterceptors,
	Body,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from 'src/global/filters/http-exception.filter';
import { CreateUserDto } from './dto/create-user.dto';
import { ResponseMessage } from 'src/global/decorators/response-key.decorator';
import { UserResponseMesaage } from 'src/users/classes/user.response.message';
import { LoginUserDto } from './dto/login-user.dto';
import { AtGuard } from 'src/global/guard/access.token.quard';
import { JwtExceptionFilter } from 'src/global/filters/jwt-exception.filter';
import { GetUser } from 'src/global/decorators/get-user.decorator';
import { User } from './entity/user.entity';
import { RtGuard } from 'src/global/guard/refresh.token.quard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
@UseFilters(HttpExceptionFilter)
@UseFilters(JwtExceptionFilter)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ResponseMessage(UserResponseMesaage.SIGN_UP)
	async signUp(@Body() createUserDto: CreateUserDto) {
		return await this.usersService.createUser(createUserDto);
	}

	@Post('login')
	@ResponseMessage(UserResponseMesaage.SIGN_IN)
	async singIn(@Body() loginUserDto: LoginUserDto) {
		return await this.usersService.loginUser(loginUserDto);
	}

	@Post('logout')
	@UseGuards(AtGuard)
	@ResponseMessage(UserResponseMesaage.LOG_OUT)
	async singOut(@GetUser() user: User) {
		return await this.usersService.logoutUser(user);
	}

	@Post('refresh')
	@UseGuards(RtGuard)
	@ResponseMessage(UserResponseMesaage.REFRESH)
	async refresh(@GetUser() user: User) {
		return await this.usersService.refresh(user);
	}
}
