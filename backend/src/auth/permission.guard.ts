import { CanActivate, ExecutionContext, ForbiddenException, Injectable, Logger, Type } from "@nestjs/common";
import { UserService } from "src/user/user.service";


/**
 * create permission guard with permission strings
 * @param requiredRoutePermissions 
 * @returns 
 */
function createPermissionGuard(requiredRoutePermissions: string[]) {

  @Injectable()
  class PermissionGuardImpl implements CanActivate {
  
    constructor(
      private readonly userService: UserService
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {

      const req = context.switchToHttp().getRequest();
      
      try {
        const { authorization }: any = req.headers;
        const success = await this.userService.getSelfPermissions(authorization.split(' ')[1])
        const permissions = success.data.map(s => s.permission_name)
        const found = !!permissions.find(p => requiredRoutePermissions.includes(p));
        return !!found;
      } catch(e) {
        Logger.error(e);
        throw new ForbiddenException(`Permission denied ${e.message}`);
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