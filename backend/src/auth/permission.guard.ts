import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Type } from "@nestjs/common";
import { InsufficientScopeError, claimCheck } from "express-oauth2-jwt-bearer";
import { promisify } from "util";


/**
 * create permission guard with permission strings
 * @param requiredRoutePermissions 
 * @returns 
 */
function createPermissionGuard(requiredRoutePermissions: string[]) {

  @Injectable()
  class PermissionGuardImpl implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
      
    
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();

      const tester = promisify(claimCheck(p => {
        console.log('permission guard claimcheck: ', p)
        return true;
      }))

      await tester(req, res)

      const permissionCheck = promisify(
        claimCheck((payload) => {
          const permissionsJwtClaim = (payload.permissions as string[]) || [];

          const hasRequiredRoutePermissions = requiredRoutePermissions.every(
            (requiredRoutePermission) =>
              permissionsJwtClaim.includes(requiredRoutePermission),
          );

          if (!hasRequiredRoutePermissions) {
            throw new InsufficientScopeError();
          }

          return hasRequiredRoutePermissions;
        }),
      );


      try {
        await permissionCheck(req, res);
        return true;
      } catch(e) {
        console.error('permission guard error: ', e);
        throw new ForbiddenException('Permission denied');
      }
    }
  }

  return PermissionGuardImpl;
}


/**
 * Permission guard with options
 * @param routePermissionsStr 
 * @returns 
 */
export const PermissionGuard = (
  routePermissionsStr: string[]
): Type<CanActivate> => createPermissionGuard(routePermissionsStr);