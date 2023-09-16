import { Injectable } from '@nestjs/common';
import { GetClientsRequest, ManagementClient, UserCreate } from 'auth0'

@Injectable()
export class UserService {

  management:ManagementClient;

  constructor() {
    const domain = process.env.AUTH0_API_DOMAIN;
    const clientId = process.env.AUTH0_API_CLIENT_ID;
    const clientSecret = process.env.AUTH0_API_SECRET;
  
    this.management = new ManagementClient({
      domain,
      clientId,
      clientSecret
    })
  }

  async getUsers(request:GetClientsRequest = {}) {
    return this.management.users.getAll(request)
  }

  async getUser(id:string) {
    return this.management.users.get({id});
  }

  async createUser(body:UserCreate) {
    return this.management.users.create(body);
  }



}
