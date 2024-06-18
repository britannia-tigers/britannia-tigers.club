import { Get, Injectable } from '@nestjs/common';
import { 
  CollectionProp,
  createClient, EntryProps, PlainClientAPI, 
  QueryOptions
} from 'contentful-management';
import { createClient as createDeliveryClient, ContentfulClientApi, ChainModifiers } from 'contentful'
import config from './contentful.config';
import { ExtendedQueryOptions, FilterParam, LocalisedSessionFull, PageFullResponse, PageListResponse, Session, SessionFullResponse, SessionListResponse, SessionBase, Sponsor, SponsorListResponse, SponsorFullResponse, GalleryListResponse } from './cms.interface';
import contentfulConfig from './contentful.config';
import * as moment from 'moment';


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

  async getGalleries(q: QueryOptions = {}): Promise<GalleryListResponse> {
    return this.getListByContentType(config.contentTypeId.galleries, q);
  }


  /**
   * Create a session
   * @param param0 
   * @returns 
   */
  async createSession({ name, location, date }: SessionBase) {
    
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
   * Add a participant to a session and publish straight away
   * @param entryId 
   * @param userId 
   * @returns 
   */
  async addParticipants(entryId: string, userIds: string[]) {

    const entry = await this.getSessionById(entryId);

    if(!entry.fields.participants || !entry.fields.participants[contentfulConfig.locale.gb]) {
      entry.fields.participants = { [contentfulConfig.locale.gb]: userIds };
    } else {
      entry.fields.participants[contentfulConfig.locale.gb] = [...new Set([...entry.fields.participants[contentfulConfig.locale.gb], ...userIds])]
    }

    const res = await this.client.entry.update({ entryId }, entry);
    return this.client.entry.publish({ entryId }, res);
  }

    /**
   * remove participants from session and publish straight away
   * @param entryId 
   * @param userIds 
   * @returns 
   */
  async removeParticipants(entryId: string, userIds: string[]) {
    const entry = await this.getSessionById(entryId);

    if(!entry.fields.participants || !entry.fields.participants[contentfulConfig.locale.gb]) {
      entry.fields.participants = { };
    } else {
      const nParticipants = entry.fields.participants[contentfulConfig.locale.gb].filter(p => !userIds.includes(p))
      entry.fields.participants[contentfulConfig.locale.gb] = nParticipants;
    }

    console.log('ud[ate: ', entry);

    // const oParticipants:string[] = sess.fields.participants ? sess.fields.participants[contentfulConfig.locale.gb] : [];

    // const nParticipants = oParticipants.filter(p => !userIds.includes(p))

    const res = await this.client.entry.update({ entryId }, entry);
    return this.client.entry.publish({ entryId }, res);

  }
  


  /**
   * add a paid participant to the sessiona and publish stragiht away
   * @param entryId 
   * @param userIds 
   * @returns 
   */
  async addPaidParticipants(entryId: string, userIds: string[]) {

    const entry = await this.getSessionById(entryId);

    if(!entry.fields.paidParticipants || !entry.fields.paidParticipants[contentfulConfig.locale.gb]) {
      entry.fields.paidParticipants = { [contentfulConfig.locale.gb]: userIds };
    } else {
      entry.fields.paidParticipants[contentfulConfig.locale.gb] = [...new Set([...entry.fields.paidParticipants[contentfulConfig.locale.gb], ...userIds])]
    }

    const res = await this.client.entry.update({ entryId }, entry);
    return this.client.entry.publish({ entryId }, res);
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
    const res = await this.client.entry.getPublished<LocalisedSessionFull>({
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

    const { name, date, startDate, endDate, location, radius, ...rest } = q;

    let restQuery = {};
    if(name) {
      restQuery = { ...restQuery, [filterBy('name', 'match')]: name }
    }
    if(location) {
      const r = radius || 1; //default 1km
      restQuery = { ...restQuery, [filterBy('location', 'within')]: `${location},${r}` }
    }
    
    if(date && moment(date).isValid()) {
      // when a date is given

      const dStart = moment(date).startOf('day').toISOString();
      const dEnd = moment(date).endOf('day').toISOString();
      restQuery = {...restQuery, [filterBy('date', 'lte')]: dEnd, [filterBy('date', 'gt')]: dStart }

    } else if(startDate && endDate && moment(startDate).isValid() && moment(endDate).isValid()) {
      // when a date range is given

      const dStart = moment(startDate).startOf('day').toISOString();
      const dEnd = moment(endDate).endOf('day').toISOString();
      restQuery = {...restQuery, [filterBy('date', 'lte')]: dEnd, [filterBy('date', 'gt')]: dStart }

    }

    if(date && moment(date).isValid()) {
      // when a date is given

      const dStart = moment(date).startOf('day').toISOString();
      const dEnd = moment(date).endOf('day').toISOString();
      restQuery = {...restQuery, [filterBy('date', 'lte')]: dEnd, [filterBy('date', 'gt')]: dStart }

    } else if(startDate && endDate && moment(startDate).isValid() && moment(endDate).isValid()) {
      // when a date range is given

      const dStart = moment(startDate).startOf('day').toISOString();
      const dEnd = moment(endDate).endOf('day').toISOString();
      restQuery = {...restQuery, [filterBy('date', 'lte')]: dEnd, [filterBy('date', 'gt')]: dStart }

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

  async getSponsorById(id: string): Promise<SponsorFullResponse> {
    return this.client.entry.get({
      entryId: id,
    });
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
    
    return await this.client.entry.getPublished<T>({
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

