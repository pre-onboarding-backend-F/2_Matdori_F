import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UsersException } from 'src/users/classes/user.exception.message';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';

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

		newUser.id = undefined;
		newUser.createdAt = undefined;
		newUser.updatedAt = undefined;
		newUser.deletedAt = undefined;

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
}
