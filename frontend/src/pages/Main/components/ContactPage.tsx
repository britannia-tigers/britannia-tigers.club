import { PropsWithChildren } from "react"
import { useNaviStore } from "../../../stores/NaviStore"
import { PageProps } from "../Main.interface"
import { ResizedSection } from "../../../components/ResizedSection"
import { isMobile } from "react-device-detect"
import { Box, Button, Grid } from "grommet"
import GoogleMapReact from 'google-map-react';

import { InnerContainer, InnerTitle } from "../../../components/InnerContainer"
import { MapMarker } from "../../../components/MapMarker"
import { SocialIcon } from "../../../components/SocialIcon"
import contactBg from '../../../../public/joshua-kantarges-N_7Kb4hpaoU-unsplash@0.5x.jpg';
import igIcon from '../../../../public/instagram.svg';
import tiktokIcon from '../../../../public/tiktok.svg';
import threadIcon from '../../../../public/thread.svg';
import twitterIcon from '../../../../public/twitter.svg';


const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API as string;
const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID as string;
const BRITANNIA_LATLNG = [51.53515466169934, -0.08358571534486599];
const DEFAULT_MAP_ZOOM = 15;


export function ContactPage({ offset }:PropsWithChildren<PageProps>) {

  const { setFormVisible } = useNaviStore()

  return (
    <ResizedSection bgColor="grey" color="black">
      <Grid 
        width='100%'
        height='100%'
        rows={isMobile ? ['30%', '40%', '30%'] : ['55%', '45%']}
        columns={isMobile ? ['1', '1', '1']: ['1/3', '1/3', '1/3']}
        areas={isMobile ? [['bot2'], ['bot0'], ['bot1']] : [
          ['top', 'top', 'top'],
          ['bot0', 'bot1', 'bot2']
        ]}
        gap='none'>
          {!isMobile && (
            <Box 
              background={{
                image: `url(${contactBg})`,
                position: 'center',
                repeat: 'no-repeat',
                size: 'cover'
              }} 
              gridArea="top">
                <InnerContainer paddingTop={0}>
                    <InnerTitle style={{color: 'white'}}>Contact</InnerTitle>
                </InnerContainer>
            </Box>
          )}
          <Box background="light-5" gridArea="bot0">
            <GoogleMapReact
              bootstrapURLKeys={{ key: GOOGLE_API_KEY }}
              defaultCenter={{ lat: BRITANNIA_LATLNG[0], lng: BRITANNIA_LATLNG[1] }}
              defaultZoom={DEFAULT_MAP_ZOOM}
              options={{
                fullscreenControl: false,
                zoomControl: false,
                mapId: GOOGLE_MAP_ID,
                scrollwheel: false
              }}
              >
              <MapMarker
                lat={BRITANNIA_LATLNG[0]}
                lng={BRITANNIA_LATLNG[1]} />
            </GoogleMapReact>
          </Box>
          <Box background="light-2" gridArea="bot1" pad={{vertical: 'large', horizontal: 'large'}}>
            <h3>Follow us</h3>
            <p>Follow our social media for the latest news and updates.</p>
            <Box alignSelf={isMobile ? "left" : "center"} gap="small" direction="row" pad={{vertical: 'large', horizontal: 'none'}}>
              <SocialIcon link='https://www.instagram.com/britanniatigersclub/' src={igIcon} />
              <SocialIcon link='https://www.tiktok.com/@britannia.tigers' src={tiktokIcon} />
              <SocialIcon link='https://www.threads.net/@britanniatigersclub' src={threadIcon} />
              <SocialIcon link='https://twitter.com/britanniatigers' src={twitterIcon} />
            </Box>
          </Box>
          <Box background="dark-1" gridArea="bot2" pad={{vertical: 'large', horizontal: 'large'}}>
            <h3>Join us</h3>
            <p>For any enquiries, please use our enquiry form below.</p>
            <Box alignSelf={isMobile ? "left" : "center"} gap="small" direction="row" 
              pad={isMobile ? { top: 'small' } :{vertical: 'large', horizontal: 'none'}}>
              <Button 
                onClick={() => setFormVisible(true)}
                primary size="small" 
                label="Let's talk" />
            </Box>
          </Box>
      </Grid>
    </ResizedSection>
  )
}
