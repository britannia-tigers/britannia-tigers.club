// import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Parallax, IParallax } from '@react-spring/parallax'
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWindowSize } from "../../hooks/windowSize";
import { useNaviStore } from "../../stores/NaviStore";

import { Paragraph } from "grommet";
import { Navi } from "../../components/Navi";
import { isMobile } from "react-device-detect";
import { ContactForm, ContactFormDataProps } from "../../components/ContactForm";
import { ToastContainer, toast } from 'react-toastify'
import { sendEnquiries } from "../../api/notifications";
import { SponsorPage } from "./components/SponsorPage";
import { ContactPage } from "./components/ContactPage";
import { StoryPage } from "./components/StoryPage";
import { MemberPage } from "./components/MemberPage";
import { MainPage } from "./components/MainPage";

const TOTAL_PAGES = 5;
const PAGE_OFFSET = 0.25;

/**
 * Main
 * @returns 
 */
export function Main() {

  const { pathname } = useLocation();
  const [, setScrolling] = useState(false);
  
  const parallaxRef = useRef<IParallax>(null);
  const [, winHeight] = useWindowSize();
  const { setTextColor, setBgDark, setFormVisible } = useNaviStore();
  
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
  

  /**
   * scroll end handler
   */
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
  }, [winHeight, parallaxRef.current?.container.current])


  /**
   * form handler
   */
  const formHandler = useMemo(() => async (data: Partial<ContactFormDataProps>) => {
    try {
      await sendEnquiries(data)
      setFormVisible(false)
      toast.success(
        <Paragraph size="small" margin='0px'>
          Enquiry submitted successfully!
        </Paragraph>
      )
    } catch(e) {
      toast.error(
        <Paragraph size="small" margin='0px'>
          {(e as Error).message}
        </Paragraph>
      )
    }
  }, [])


  return (
    <>
      {/* <User /> */}
      <Navi />
      <Parallax pages={TOTAL_PAGES} ref={parallaxRef} className='my-class-name'>
        <MainPage offset={0} />
        <StoryPage offset={1}/>
        <MemberPage offset={2}/>
        <ContactPage offset={3}/>
        <SponsorPage offset={4} />
      </Parallax>
      <ContactForm title="Join us" onSubmit={formHandler}/>
      <ToastContainer 
          position={isMobile ? "top-center": "top-right"}
          closeButton={false}
          hideProgressBar={true}
          closeOnClick
          />

    </>
  )
}


/**
 * calculate current page
 * @param height : ;
 * @param curPos 
 * @returns 
 */
function calCurPage(height:number, curPos:number) {
  const pageOffsetHeight = PAGE_OFFSET * height
  const totHeight = height * TOTAL_PAGES
  return Math.floor(TOTAL_PAGES * (pageOffsetHeight + curPos) / totHeight)
}




