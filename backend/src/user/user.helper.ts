import { GetUsers200ResponseOneOfInner } from "auth0";
import { UserPublicResponse, UserResponse } from "./user.interface";

export function outputUserPublic(res:Omit<GetUsers200ResponseOneOfInner, 'app_metadata'>): UserPublicResponse {

  return {
    username: res.username,
    name: res.name,
    user_id: res.user_id,
    user_metadata: res.user_metadata,
    app_metadata: res.app_metadata,
    picture: res.picture

  }
}