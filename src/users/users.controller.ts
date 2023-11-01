import {
	Controller,
	Post,
	Get,
	ClassSerializerInterceptor,
	UseFilters,
	UseInterceptors,
	Body,
	UseGuards,
	Patch,
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
import { LocationDto } from './dto/location-user.dto';
import { LunchRecommendDto } from './dto/lunch-recommend.dto';

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

	@Patch('geo')
	@UseGuards(AtGuard)
	@ResponseMessage(UserResponseMesaage.LOCATION)
	async locationUpdate(@GetUser() user: User, @Body() locationDto: LocationDto) {
		return await this.usersService.locationUpdate(user, locationDto);
	}

	@Patch('lunch')
	@UseGuards(AtGuard)
	@ResponseMessage(UserResponseMesaage.LUNCH_RECOMM)
	async lunchRecommUpdate(@GetUser() user: User, @Body() lunchRecommendDto: LunchRecommendDto) {
		return await this.usersService.lunchRecommUpdate(user, lunchRecommendDto);
	}

	@Get()
	@UseGuards(AtGuard)
	@ResponseMessage(UserResponseMesaage.GET_USER)
	async getUser(@GetUser() user: User) {
		return user;
	}
}
