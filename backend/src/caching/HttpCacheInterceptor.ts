import { CACHE_KEY_METADATA, CacheInterceptor } from "@nestjs/cache-manager";
import { ExecutionContext, Injectable, Logger } from "@nestjs/common";


/**
 * Http Cache Interceptor
 * Note: It is a direct copy of CacheInterceptor, just copied it over 
 * for easy logging and may be future customisation
 */
@Injectable()
export class HttpCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const httpAdapter = this.httpAdapterHost.httpAdapter;
    const isHttpApp = httpAdapter && !!httpAdapter.getRequestMethod;
    const cacheMetadata = this.reflector.get(
      CACHE_KEY_METADATA,
      context.getHandler(),
    );

    if (!isHttpApp || cacheMetadata) {
      return cacheMetadata;
    }

    const request = context.getArgByIndex(0);
    if (!this.isRequestCacheable(context)) {
      return undefined;
    }

    return httpAdapter.getRequestUrl(request);
  }
}
