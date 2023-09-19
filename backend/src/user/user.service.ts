import { Injectable } from '@nestjs/common';
import { 
  GetClientsRequest, GetUsers200ResponseOneOfInner, 
  ManagementClient, UserCreate, UserUpdate,
  UserInfoClient,
  UserInfoResponse, 
} from 'auth0'
import userConfig from './user.config'
import { JSONApiResponse } from 'auth0/dist/cjs/lib/models';


@Injectable()
export class UserService {

  management:ManagementClient;
  userInfo:UserInfoClient;

  constructor() {
    const domain = process.env.AUTH0_API_DOMAIN;
    const clientId = process.env.AUTH0_API_CLIENT_ID;
    const clientSecret = process.env.AUTH0_API_SECRET;
  
    this.management = new ManagementClient({
      domain,
      clientId,
      clientSecret
    })

    this.userInfo = new UserInfoClient({
      domain
    })
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

  async getUserList(request:GetClientsRequest = {}) {
    return this.management.users.getAll(request)
  }

  async getUser(id:string) {
    return this.management.users.get({id});
  }

  async getUserRole(id:string) {
    return this.management.users.getRoles({ id });
  }

  async createUser(body:UserCreate) {
    const userRes = await this.management.users.create(body);
    await this.management.roles.assignUsers({
      id: userConfig.roleTypeId.member
    }, {
      users: [userRes.data.user_id]
    });
    return userRes.data;
  }

  async updateUser(id:string, body:UserUpdate) {
    return this.management.users.update({ id }, body);
  }



}
