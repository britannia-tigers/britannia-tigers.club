import { Injectable } from '@nestjs/common';
import { 
  GetClientsRequest, GetUsers200ResponseOneOfInner, 
  ManagementClient, UserCreate, UserUpdate,
  UserInfoClient,
  UserInfoResponse, 
} from 'auth0'
import userConfig from './user.config'
import { authManagementClient, authUserClient } from 'src/client/auth0';
import { UserRoleType, UserRoles } from './user.interface';


@Injectable()
export class UserService {

  management:ManagementClient;
  userInfo:UserInfoClient;

  constructor() {
    this.management = authManagementClient()
    this.userInfo = authUserClient()
  }

  async getSelf(accessToken:string):Promise<GetUsers200ResponseOneOfInner> {
    try {
      const userInfo = await this.userInfo.getUserInfo(accessToken);
      const { sub } = userInfo.data;
      const user = await this.management.users.get({ id: sub });
      return user.data;
    } catch(e) {
      throw e;
    }
  }

  async getSelfRole(accessToken:string) {
    try {
      const userInfo = await this.userInfo.getUserInfo(accessToken);
      const { sub } = userInfo.data;
      return this.management.users.getRoles({ id: sub });
    } catch(e) {
      throw e;
    }
  }

  async getSelfPermissions(accessToken: string) {
    try {
      const userInfo = await this.userInfo.getUserInfo(accessToken);
      const { sub } = userInfo.data;
      return this.management.users.getPermissions({ id: sub });
    } catch(e) {
      throw e;
    }
  }

  async getUserList(request:GetClientsRequest = {}) {
    return this.management.users.getAll(request)
  }

  async getUser(id:string) {
    return this.management.users.get({id});
  }

  async getUserRole(id:string) {
    return this.management.users.getRoles({ id });
  }

  async assignUserRole(userId:string,  role:UserRoleType) {
    return this.management.users.assignRoles(
      { id: userId }, 
      { roles: [userConfig.roleTypeId[role]] }
    )
  }

  async createUser(body:UserCreate, role?: UserRoles) {
    const userRes = await this.management.users.create(body);
    await this.management.roles.assignUsers({
      id: role || userConfig.roleTypeId.member
    }, {
      users: [userRes.data.user_id]
    });
    return userRes.data;
  }

  async updateSelf(accessToken: string, body: UserUpdate) {
    const userInfo = await this.userInfo.getUserInfo(accessToken);
    const { sub } = userInfo.data;

    return this.management.users.update({ id: sub }, body)
  }

  async updateUser(id:string, body:UserUpdate) {
    return this.management.users.update({ id }, body);
  }



}
