import { Get, Injectable } from '@nestjs/common';
import { 
  CollectionProp,
  createClient, EntryProps, PlainClientAPI, 
  QueryOptions
} from 'contentful-management';
import { createClient as createDeliveryClient, ContentfulClientApi, ChainModifiers } from 'contentful'
import config from './contentful.config';
import { ExtendedQueryOptions, FilterParam, PageFullResponse, PageListResponse, Session, SessionFull, SessionFullResponse, SessionListResponse, Sponsor, SponsorListResponse } from './cms.interface';
import contentfulConfig from './contentful.config';


@Injectable()
export class CmsService {

  spaceId:string;
  environment:string;
  client:PlainClientAPI;
  deliveryClient: ContentfulClientApi<undefined>;

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


  /**
   * Create a session
   * @param param0 
   * @returns 
   */
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


  /**
   * Update a session
   * @param entryId 
   * @param param1 
   * @returns 
   */
  async updateSession(entryId: string, { name, location, date, participants}:Partial<Session>) {
    try {
      const sess = await this.getSessionById(entryId);
      const localGb = contentfulConfig.locale.gb;

      console.log(sess.fields);

      let fields = { 
        name: name ? { [contentfulConfig.locale.gb]: name } : sess.fields.name,
        location: location ? { [contentfulConfig.locale.gb]: location } : sess.fields.location,
        date: date ? { [contentfulConfig.locale.gb]: date } : sess.fields.date,
        participants: participants ? { [contentfulConfig.locale.gb]: participants } : sess.fields.participants
      };

      const res = await this.client.entry.update({ entryId }, {
        sys: sess.sys,
        fields
      });
      console.log('patched: ', res)
      return res;
    } catch(e) {
      console.error(e);
      throw e;
    }
  }


  /**
   * Add a participant to a session
   * @param entryId 
   * @param userId 
   * @returns 
   */
  async addParticipant(entryId: string, userIds: string[]) {

    const sess = await this.getSessionById(entryId);
    const oParticipants = sess.fields.participants[contentfulConfig.locale.gb];
    const nParticipants = [...(new Set([...oParticipants, ...userIds]))]

    let fields = { 
      ...sess.fields,
      participants: { [contentfulConfig.locale.gb]: nParticipants }
    };

    const res = await this.client.entry.update({ entryId }, {
      sys: sess.sys,
      fields
    });
    return res;
  }


  /**
   * Publish a session
   * @param id 
   */
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


  /**
   * get next upcoming session
   * @returns 
   */
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
   * get all sponsors
   * @param q 
   * @returns 
   */
  async getSponsors(q: ExtendedQueryOptions = {}): Promise<SponsorListResponse> {
    return await this.getListByContentType<Sponsor>(config.contentTypeId.sponsors, q);
  }

  /**
   * get all assets
   * @returns 
   */
  async getAllAssets() {
    return (await this.client.asset.getMany({ query: {  } }));
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

