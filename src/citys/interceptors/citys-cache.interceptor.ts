import { CACHE_KEY_METADATA, CACHE_TTL_METADATA } from '@nestjs/cache-manager';
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, of, tap } from 'rxjs';
import { CacheService } from 'src/cache/cache.service';
import { CITYS_GET_CITIES } from '../constants/city-cache-key.constants';

@Injectable()
export class CitysCacheInterceptor implements NestInterceptor {
	constructor(
		@Inject('Reflector') private readonly reflector: Reflector,
		private readonly cacheService: CacheService,
	) {}

	async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
		const key = this.reflector.get(CACHE_KEY_METADATA, context.getHandler()); // citys:getCities
		const ttl = this.reflector.get(CACHE_TTL_METADATA, context.getHandler()); // 0

		// 키가 없으면 DB에서 조회해 리턴하면서 캐싱
		if (!key) return next.handle().pipe(tap((res) => this.cacheService.set(CITYS_GET_CITIES, res, ttl)));

		try {
			// 캐시 결과 리턴
			const citys = await this.cacheService.get(key);
			if (citys) return of(citys);

			// 캐시 결과가 없으면 DB에서 조회해 리턴하면서 캐싱
			return next.handle().pipe(
				tap((res) => {
					this.cacheService.set(key, res, ttl);
				}),
			);
		} catch {
			// cacheService에서 에러가 발생하는 경우 DB에서 조회
			return next.handle();
		}
	}
}
