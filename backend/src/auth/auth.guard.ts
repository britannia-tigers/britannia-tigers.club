import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { GetVerificationKey, expressjwt as jwt } from 'express-jwt'
import { auth } from 'express-oauth2-jwt-bearer'
import { expressJwtSecret } from 'jwks-rsa'
import { promisify } from 'util'
import { ConfigService } from '@nestjs/config'


/**
 * AuthGuard
 */
@Injectable()
export class AuthGuard implements CanActivate {

  private ISSUER:string;
  private AUDIENCE:string;

  constructor(private configService: ConfigService) {
    this.ISSUER = this.configService.get('AUTH0_API_ISSUER');
    this.AUDIENCE = this.configService.get('AUTH0_API_AUDIENCE');
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const req = context.switchToHttp().getRequest();
    const res = context.switchToHttp().getResponse();

    console.log(this.ISSUER, this.AUDIENCE, `${this.ISSUER}.well-known/jwks.json`)


    const checker = promisify(auth({
      audience: this.AUDIENCE,
      issuer: this.ISSUER,
      jwksUri: `${this.ISSUER}.well-known/jwks.json`,
      cacheMaxAge: 300000
    }))

    try {
      await checker(req, res)
      return true;
    } catch(e) {
      return false
    }
    
  }
}