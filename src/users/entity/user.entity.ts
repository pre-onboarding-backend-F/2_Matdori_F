import { BaseEntity } from 'src/global/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity()
export class User extends BaseEntity {
	@Column()
	account: string;

	@Column()
	@Exclude()
	password: string;

	@Column({
		type: 'numeric',
		precision: 12, // 38.0362201660
		scale: 10,
		nullable: true,
	})
	lat: number;

	@Column({
		type: 'numeric',
		precision: 13, // 127.3675276602
		scale: 10,
		nullable: true,
	})
	lon: number;

	@Column({
		default: 0,
		type: 'smallint',
		width: 1,
	})
	lunchRecomm: number;

	@Column({ nullable: true })
	@Exclude()
	refreshToken: string;
}
