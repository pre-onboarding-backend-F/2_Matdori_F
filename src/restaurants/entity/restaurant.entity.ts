import { BaseEntity } from 'src/global/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { RestaurantCategory, RestaurantStatus } from '../enums/restaurant.enum';

@Entity()
export class Restaurant extends BaseEntity {
	@Column()
	name: string;

	@Column({
		type: 'enum',
		enum: RestaurantStatus,
	})
	status: RestaurantStatus;

	@Column({
		type: 'numeric',
		precision: 12, // 38.0362201660
		scale: 10,
	})
	lat: number;

	@Column({
		type: 'numeric',
		precision: 13, // 127.3675276602
		scale: 10,
	})
	lon: number;

	@Column({
		type: 'double precision',
		default: 0,
	})
	rating: number;

	@Column({
		name: 'road_addr',
		unique: true,
	})
	roadAddr: string;

	@Column({
		type: 'enum',
		enum: RestaurantCategory,
	})
	category: RestaurantCategory;
}
