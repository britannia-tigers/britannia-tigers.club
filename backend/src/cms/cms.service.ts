import { Get, Injectable } from '@nestjs/common';
import { 
  CollectionProp,
  createClient, EntryProps, PlainClientAPI, 
  QueryOptions 
} from 'contentful-management';
import config from './contentful.config';
import { ExtendedQueryOptions, FilterParam, PageFullResponse, PageListResponse, Session, SessionFull, SessionFullResponse, SessionListResponse } from './cms.interface';
import contentfulConfig from './contentful.config';


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
   * GET pages
   * @param q 
   * @returns 
   */
  async getPages(q: QueryOptions = {}): Promise<PageListResponse> {
    return this.getListByContentType(config.contentTypeId.pages, q);
  }

  async getPageById(id: string): Promise<PageFullResponse> {
    return this.client.entry.get({
      entryId: id,
    });
  }

  async createSession({ name, location, date }: Session) {
    
    try {
      const latlng = location.split(',');
      const entry = await this.client.entry.create({
        contentTypeId: config.contentTypeId.sessions,
      }, { fields: {
        name: {
        [contentfulConfig.locale.gb]: name
        },
        location: {
          [contentfulConfig.locale.gb]: { lat: Number(latlng[0]), lon: Number(latlng[1])}
        },
        date: {
          [contentfulConfig.locale.gb]: date
        }
      }});

      return entry;
    } catch(e) {
      throw e;
    }
  }

  async publishSession(id: string) {
    try {
      const entry = await this.client.entry.get({ entryId: id });
      await this.client.entry.publish({ entryId: id }, entry);
    } catch(e) {
      throw e;
    }
  }


  /**
   * GET sessions
   * @param q 
   * @returns 
   */
  async getRawSessions(q: QueryOptions = {}): Promise<SessionListResponse> {
    return this.getListByContentType(config.contentTypeId.sessions, q);
  }

  /**
   * GET session by id
   * @param id 
   * @returns 
   */
  async getSessionById(id: string): Promise<SessionFullResponse> {
    return this.client.entry.get({
      entryId: id,
    });
  }

  async getNextSession(): Promise<SessionFullResponse> {
    const curDate = new Date();
    const res = await this.client.entry.getPublished<SessionFull>({
      query:{
        content_type: config.contentTypeId.sessions,
        [filterBy('date', 'gte')]: curDate.toISOString()
      }
    });

    return res.items[0];
  }

  /**
   * Find a session by query
   * @param q 
   * @returns 
   */
  async findSessions(q: ExtendedQueryOptions = {}): Promise<SessionListResponse> {

    const { name, location, radius, ...rest } = q;

    let restQuery = {};
    if(name) {
      restQuery = { ...restQuery, [filterBy('name', 'match')]: name }
    }
    if(location) {
      const r = radius || 1; //default 1km
      restQuery = { ...restQuery, [filterBy('location', 'within')]: `${location},${r}` }
    }

    return this.client.entry.getPublished({
      query:{
        content_type: config.contentTypeId.sessions,
        ...restQuery,
        ...rest
      }
    });
  }

  /**
   * Base get list by Content type
   * @param contentType 
   * @param restQuery 
   * @returns 
   */
  async getListByContentType<T>(contentType:string, restQuery: QueryOptions) {
    return await this.client.entry.getMany<T>({
      query: {
        content_type: contentType,
        ...restQuery
      }
    })
  }
}

function filterBy(name:string, param: FilterParam) {
  return `fields.${name}[${param}]`
}

