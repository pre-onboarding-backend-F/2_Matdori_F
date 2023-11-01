import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { UsersException } from 'src/global/class/user.exception.message';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User)
		private readonly userRepository: Repository<User>,
	) {}

	async isUserExist(options: FindOptionsWhere<User>): Promise<boolean> {
		return this.userRepository.exist({ where: options });
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
}
