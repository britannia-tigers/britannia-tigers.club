import { 
  ManagementClient,
  UserInfoClient,
} from 'auth0'


/**
 * auth0 management api
 * @returns 
 */
export const authManagementClient = () => 
  new ManagementClient({
    domain: process.env.AUTH0_API_DOMAIN,
    clientId: process.env.AUTH0_API_CLIENT_ID,
    clientSecret: process.env.AUTH0_API_SECRET
  })


/**
 * auth0 user info api
 * @returns 
 */
export const authUserClient = () => 
  new UserInfoClient({
    domain: process.env.AUTH0_API_DOMAIN
  })