import { Get, Injectable } from '@nestjs/common';
import { 
  createClient, PlainClientAPI, 
  CollectionProp, EntryProps,
  QueryOptions 
} from 'contentful-management';
import config from './contentful.config';

interface Members {
    
}

interface Pages {

}

interface Sessions {

}

export type Response<T> = CollectionProp<EntryProps<T>>;

export type MembersResponse = Response<Members>;
export type PagesResponse = Response<Pages>;
export type SessionsResponse = Response<Sessions>;


@Injectable()
export class CmsService {

  spaceId:string;
  environment:string;
  client:PlainClientAPI;

  constructor() {

    const accessToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
    const spaceId = process.env.CONTENTFUL_SPACE_ID;
    const environmentId = process.env.CONTENTFUL_ENVIRONMENT;

    this.client = createClient({
      accessToken
    }, {
      type: 'plain',
      defaults: {
        spaceId,
        environmentId
      }
    });
  }

  checkToken() {
    this.client.accessToken
  }


  /**
   * GET members
   * @param q 
   * @returns 
   */
  async getMembers(q: QueryOptions = {}): Promise<MembersResponse> {
    return this.getListByContentType(config.contentTypeId.members, q);
  }


  /**
   * GET pages
   * @param q 
   * @returns 
   */
  async getPages(q: QueryOptions): Promise<PagesResponse> {
    return this.getListByContentType(config.contentTypeId.pages, q);
  }


  /**
   * GET sessions
   * @param q 
   * @returns 
   */
  async getSessions(q: QueryOptions): Promise<SessionsResponse> {
    return this.getListByContentType(config.contentTypeId.sessions, q);
  }


  /**
   * Base get list by Content type
   * @param contentType 
   * @param restQuery 
   * @returns 
   */
  async getListByContentType(contentType:string, restQuery: QueryOptions) {
    return await this.client.entry.getMany({
      query: {
        content_type: contentType,
        ...restQuery
      }
    })
  }
}
