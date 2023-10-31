import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';

export class CustomParseUUIDPipe extends ParseUUIDPipe {
	async transform(value: string, metadata: ArgumentMetadata): Promise<string> {
		try {
			return await super.transform(value, metadata);
		} catch {
			throw this.exceptionFactory('잘못된 id 형식입니다.');
		}
	}
}
