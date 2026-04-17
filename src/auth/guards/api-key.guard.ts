import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<{ headers: Record<string, string> }>();
    const apiKey = request.headers['x-api-key'];

    if (apiKey !== (process.env.API_KEY ?? 'dev-secret')) {
      throw new UnauthorizedException('Invalid or missing API key');
    }

    return true;
  }
}
