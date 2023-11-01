import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UsersException } from 'src/users/classes/user.exception.message';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { TokenPayload } from 'src/global/interfaces/token.payload';
import { LocationDto } from './dto/location-user.dto';
import { LunchRecommendDto } from './dto/lunch-recommend.dto';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
		private readonly authService: AuthService,
	) {}

	async isUserExist(options: FindOptionsWhere<User>): Promise<boolean> {
		return this.userRepository.exist({ where: options });
	}

	async findUser(options: FindOptionsWhere<User>): Promise<User | null> {
		return await this.userRepository.findOne({ where: options });
	}

	async createUser(createUserDto: CreateUserDto): Promise<User> {
		const { account, password } = createUserDto;

		const isExist = await this.isUserExist({ account });
		if (isExist) throw new BadRequestException(UsersException.USER_ACCOUNT_ALREADY_EXISTS);

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = this.userRepository.create({
			account,
			password: hashedPassword,
		});

		await this.userRepository.save(newUser);

		const propertiesToInitialize = ['id', 'createdAt', 'updatedAt', 'deletedAt', 'lat', 'lon', 'lunchRecomm'];
		propertiesToInitialize.forEach((property) => (newUser[property] = undefined));

		return newUser;
	}

	async loginUser(loginUserDto: LoginUserDto) {
		const { account, password } = loginUserDto;

		const isExist = await this.isUserExist({ account });

		if (isExist) {
			const user = await this.findUser({ account });
			const isMatched = await bcrypt.compare(password, user.password);

			if (isMatched) {
				const accessToken = await this.authService.generateAccessToken({ id: user.id, account: user.account });
				const refreshToken = await this.authService.generateRefreshToken({
					id: user.id,
					account: user.account,
				});

				await this.userRepository.update({ account }, { refreshToken });

				return {
					accessToken,
					refreshToken,
				};
			}

			throw new BadRequestException(UsersException.USER_PASSWORD_NOT_MATCHED);
		}

		throw new BadRequestException(UsersException.USER_NOT_EXISTS);
	}

	async logoutUser(user: User) {
		await this.userRepository.update({ id: user.id }, { refreshToken: null });
	}

	async refresh(user: User) {
		const payload: TokenPayload = { id: user.id, account: user.account };
		return {
			accessToken: this.authService.generateAccessToken(payload),
		};
	}

	async locationUpdate(user: User, locationDto: LocationDto) {
		const { lat, lon } = locationDto;

		if (lat === 0 || lon === 0) throw new BadRequestException(UsersException.LOCATION_IS_EMPTY);

		user.lat = lat;
		user.lon = lon;

		await this.userRepository.save(user);

		return {
			latitude: lat,
			longitude: lon,
		};
	}

	async lunchRecommUpdate(user: User, lunchRecommendDto: LunchRecommendDto) {
		const { lunchRecomm } = lunchRecommendDto;

		user.lunchRecomm = lunchRecomm;

		await this.userRepository.save(user);

		return {
			lunchRecomm: lunchRecomm,
		};
	}
}
