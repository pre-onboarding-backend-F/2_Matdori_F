import { OpenApiOptions } from './open-api-options.interface';
import { Category } from 'src/global/enums/category.enum';

export class SchduleCollectionEvent {
	pageIndex: number;
	pagePerRow: number;
	type: Category.CHINESE | Category.JAPANESE | Category.KOREAN;
	signCode?: string;
	signName?: string;

	constructor(options: OpenApiOptions) {
		this.pageIndex = options.pageIndex;
		this.pagePerRow = options.pagePerRow;
		this.signCode = options.sigunCode;
		this.signName = options.sigunName;
		this.type = options.type;
	}
}
