// import { useAuth0 } from "@auth0/auth0-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Parallax, IParallax, ParallaxLayer } from '@react-spring/parallax'
import { ResizedSection } from "../components/ResizedSection";
import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from "../hooks/windowSize";
import { useNaviStore } from "../stores/NaviStore";
import { CenteredOuterContainer, InnerContainer, InnerContent, InnerSubTitle, InnerTitle } from "../components/InnerContainer";
import mainBg from '../../public/abhishek-chandra-kXJksx1kdJ0-unsplash@0.5x.jpg';
import contactBg from '../../public/joshua-kantarges-N_7Kb4hpaoU-unsplash@0.5x.jpg';
import unknownBg from '../../public/unknown.png';
import unknownBg1 from '../../public/unknown2.png';
import unknownBg2 from '../../public/unknown3.png';

import igIcon from '../../public/instagram.svg';
import tiktokIcon from '../../public/tiktok.svg';
import threadIcon from '../../public/thread.svg';
import twitterIcon from '../../public/twitter.svg';
import { Avatar, Box, Button, Grid } from "grommet";
import GoogleMapReact from 'google-map-react';
import { MapMarker } from "../components/MapMarker";
import { Emblem } from "../components/Emblem";
import { Navi } from "../components/Navi";
import { User } from "../components/User";
import { SocialIcon } from "../components/SocialIcon";
import { useSponsors } from "../api/sponsors";
import { SponsorImg } from "../components/SponsorImg";


const TOTAL_PAGES = 5;
const PAGE_OFFSET = 0.25;
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAP_API as string;
const GOOGLE_MAP_ID = import.meta.env.VITE_GOOGLE_MAP_ID as string;
const BRITANNIA_LATLNG = [51.53515466169934, -0.08358571534486599];
const DEFAULT_MAP_ZOOM = 15;

/**
 * Main
 * @returns 
 */
export function Main() {

  const { pathname } = useLocation();
  const [, setScrolling] = useState(false);
  
  const parallaxRef = useRef<IParallax>(null);
  const [, winHeight] = useWindowSize();
  const { setTextColor, setBgDark } = useNaviStore();
  
  const naviTextColorArr = [
    {
      name: 'story',
      textColor: 'white',
      isBgDark: true
    }, {
      name: 'team',
      textColor: 'white',
      isBgDark: true
    }, {
      textColor: 'black',
      isBgDark: false
    }, {
      name: 'contact',
      textColor: 'white',
      isBgDark: true
    },
    {
      name: 'sponsors',
      textColor: 'black',
      isBgDark: false
    }
  ]

  useEffect(() => {
    console.log(pathname)
    if(parallaxRef.current?.scrollTo) {
      const { scrollTo } = parallaxRef.current;
      switch(pathname.replace('/', '')) {
        case '':
          scrollTo(0);
          break;
        case 'story':
          scrollTo(1);
          break;
        case 'team':
          scrollTo(2);
          break;
        case 'contact':
          scrollTo(3);
          break;
        case 'sponsors':
          scrollTo(4);
      }
    }
  }, [pathname])

  /**
   * scroll handler to calculate which page it is on
   * then set color
   */
  const handleScroll = useCallback(() => {
    if (parallaxRef.current) {
      const cOffset = calCurPage(winHeight, parallaxRef.current.current)
      setTextColor(naviTextColorArr[cOffset].textColor)
      setBgDark(naviTextColorArr[cOffset].isBgDark)
      setScrolling(true)
      
    }
  }, [winHeight, parallaxRef.current])
  
  const handleScrollEnd = useCallback(() => {
    setScrolling(false)
  }, [winHeight, parallaxRef])

  /**
   * hacky way to access the onscroll of parallax container
   */
  useEffect(() => {
    const cur = parallaxRef.current?.container.current;
    cur.addEventListener('scroll', handleScroll)
    cur.addEventListener('scrollend', handleScrollEnd)
    return () => {
      cur.removeEventListener('scroll', handleScroll)
      cur.removeEventListener('scrollend', handleScrollEnd)
    }
  }, [parallaxRef.current?.container.current])


  return (
    <>
      <Navi />
      <User />
      <Parallax pages={TOTAL_PAGES} ref={parallaxRef} className='my-class-name'>
        <MainPage offset={0} />
        <StoryPage offset={1}/>
        <MemberPage offset={2}/>
        <ContactPage offset={3}/>
        <SponsorPage offset={4} />
      </Parallax>
    </>
  )
}

interface PageProps {
  offset: number
}

export function MainPage({ offset }:PropsWithChildren<PageProps>) {

  return (
    <ResizedSection bgVignette={true} bgImg={mainBg}>
      <ParallaxLayer offset={0} speed={0.5}>
        <CenteredOuterContainer>
          <Emblem />
        </CenteredOuterContainer>
      </ParallaxLayer>
    </ResizedSection>
  )
}

export function StoryPage({ offset }:PropsWithChildren<PageProps>) {
  return (
    <ResizedSection>
      <ParallaxLayer offset={1} speed={0.75}>
      <InnerContainer>
          <InnerTitle>Our Story</InnerTitle>
        <InnerSubTitle>
          <p>Bacon ipsum dolor amet short loin pig ground round, beef filet mignon chuck venison frankfurter sausage.</p>
          <p>Strip steak pork belly fatback doner, salami kielbasa spare ribs venison rump leberkas. Tail sausage meatloaf, chuck fatback filet mignon tenderloin pork belly jowl pig salami swine biltong.</p>
          <p>Leberkas burgdoggen rump, bresaola chislic jerky flank meatloaf salami beef landjaeger ribeye.</p>
          {offset}
          <Link to='/profile'>profile</Link> <Link to='/login'>login</Link>
        </InnerSubTitle>
      </InnerContainer>
      </ParallaxLayer>
    </ResizedSection>
  )
}

export function MemberPage({ offset }:PropsWithChildren<PageProps>) {

  const colors = [
    '#63D3BF',
    '#D36363',
    '#D0D363',
    '#D063D3'
  ]

  const unknown = [
    unknownBg,
    unknownBg1,
    unknownBg2
  ]

  const members = useMemo(() => {
    const m = []

    let i = 0
    while(i < 15) {
      const c = Math.floor(Math.random() * colors.length)
      const u = Math.floor(Math.random() * unknown.length)
      m.push({ picture: unknown[u], bgColor: colors[c] })
      i++
    }

    return m
  }, [])


  return (
    <ResizedSection bgColor="white" color="black">
      <ParallaxLayer offset={2} speed={0.75}>
        <InnerContainer>
          <InnerTitle>Tigers Team</InnerTitle>
          <Box justify="center">  
            <Box 
              wrap={true} 
              pad="none"
              justify="center" 
              direction="row">
                { members.map(s => (
                <Avatar 
                  margin="small"
                  size="xlarge"
                  src={s.picture} 
                  background={s.bgColor}
                  onClick={() => {} }/>
                )) }
            </Box>
          </Box>

        </InnerContainer>
      </ParallaxLayer>
    </ResizedSection>
  )
}

export function ContactPage({ offset }:PropsWithChildren<PageProps>) {


  console.log(GOOGLE_API_KEY);

  return (
    <ResizedSection bgColor="grey" color="black">
      <Grid 
        width='100%'
        height='100%'
        rows={['55%', '45%']}
        columns={['1/3', '1/3', '1/3']}
        areas={[
          ['top', 'top', 'top'],
          ['bot0', 'bot1', 'bot2']
        ]}
        gap='none'>
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
            <p>Please follow and subscribe to our social media for latest news and updates.</p>
            <Box alignSelf="center" gap="small" direction="row" pad={{vertical: 'large', horizontal: 'none'}}>
              <SocialIcon link='https://www.instagram.com/britanniatigersclub/' src={igIcon} />
              <SocialIcon link='https://www.tiktok.com/@britannia.tigers' src={tiktokIcon} />
              <SocialIcon link='https://www.threads.net/@britanniatigersclub' src={threadIcon} />
              <SocialIcon link='https://twitter.com/britanniatigers' src={twitterIcon} />
            </Box>
          </Box>
          <Box background="dark-1" gridArea="bot2" pad={{vertical: 'large', horizontal: 'large'}}>
            <h3>Join us</h3>
            <p>For any enquiries: <br />contact@britannia-tigers.club</p>
            <Box alignSelf="center" gap="small" direction="row" pad={{vertical: 'large', horizontal: 'none'}}>
              <Button alignSelf="center" primary size="small" label="Let's talk" />
            </Box>
          </Box>
      </Grid>
    </ResizedSection>
  )
}

function SponsorPage({ offset }:PropsWithChildren<PageProps>) {

  const sponsors = useSponsors();
  console.log(sponsors)

  return (
    <ResizedSection bgColor="white" color="black">
      <ParallaxLayer offset={4} speed={0.5}>
        <InnerContainer>
          <InnerTitle>Sponsors</InnerTitle>
          <Box gap="medium" justify="center" direction="row" pad={{ top: 'none', bottom: 'large', horizontal: 'none'}}>
            { sponsors.map(s => <SponsorImg width={200} height={200} src={s.logo.url} />) }
          </Box>
        </InnerContainer>
      </ParallaxLayer>
    </ResizedSection>

  )
}


function calCurPage(height:number, curPos:number) {
  const pageOffsetHeight = PAGE_OFFSET * height
  const totHeight = height * TOTAL_PAGES
  return Math.floor(TOTAL_PAGES * (pageOffsetHeight + curPos) / totHeight)
}




