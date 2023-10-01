// import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Parallax, IParallax, ParallaxLayer } from '@react-spring/parallax'
import { ResizedSection } from "../components/ResizedSection";
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from "react";
import { useWindowSize } from "../hooks/windowSize";
import { useNaviStore } from "../stores/NaviStore";
import { CenteredOuterContainer, InnerContainer, InnerContent, InnerSubTitle, InnerTitle } from "../components/InnerContainer";
import mainBg from '../../public/abhishek-chandra-kXJksx1kdJ0-unsplash@0.5x.jpg';
import contactBg from '../../public/joshua-kantarges-N_7Kb4hpaoU-unsplash@0.5x.jpg';
import { Box, Grid } from "grommet";
import GoogleMapReact from 'google-map-react';
import { MapMarker } from "../components/MapMarker";
import { Emblem } from "../components/Emblem";

const TOTAL_PAGES = 4;
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
  const navigate = useNavigate();
  const [scrolling, setScrolling] = useState(false);
  

  const parallaxRef = useRef<IParallax>(null);
  const [, winHeight] = useWindowSize();
  const { setTextColor, setBgDark } = useNaviStore();
  
  const naviTextColorArr = [
    {
      textColor: 'white',
      isBgDark: true
    }, {
      textColor: 'white',
      isBgDark: true
    }, {
      textColor: 'black',
      isBgDark: false
    }, {
      textColor: 'white',
      isBgDark: true
    }
  ]

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
    <Parallax pages={TOTAL_PAGES} ref={parallaxRef} className='my-class-name'>
      <MainPage offset={0} />
      <StoryPage offset={1}/>
      <MemberPage offset={2}/>
      <ContactPage offset={3}/>
    </Parallax>
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
  return (
    <ResizedSection bgColor="white" color="black">
      <InnerContainer>
        <InnerTitle>Tigers Team</InnerTitle>
      </InnerContainer>
      {offset}
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
              mapId: GOOGLE_MAP_ID
            }}
            >
            <MapMarker 
              lat={BRITANNIA_LATLNG[0]}
              lng={BRITANNIA_LATLNG[1]} />
          </GoogleMapReact>
          </Box>
          <Box background="white" gridArea="bot1">asdfasdfas dafsdfasdf</Box>
          <Box background="light-5" gridArea="bot2">asdfasdfas dafsdfasdf</Box>
      </Grid>
    </ResizedSection>
  )
}


function calCurPage(height:number, curPos:number) {
  const pageOffsetHeight = PAGE_OFFSET * height
  const totHeight = height * TOTAL_PAGES
  return Math.floor(TOTAL_PAGES * (pageOffsetHeight + curPos) / totHeight)
}




