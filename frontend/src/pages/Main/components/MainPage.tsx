import { PropsWithChildren, useState } from "react";
import { PageProps } from "../Main.interface";
import { ResizedSection } from "../../../components/ResizedSection";
import { ParallaxLayer } from "@react-spring/parallax";
import { CenteredOuterContainer, InnerContainer } from "../../../components/InnerContainer";
import { Emblem } from "../../../components/Emblem";
import { isMobile, BrowserView, MobileView } from "react-device-detect";
import mainBg from '../../../../public/abhishek-chandra-kXJksx1kdJ0-unsplash@0.5x.jpg';
import { MainTitle } from "../../../components/Navi";
import { useNaviStore } from "../../../stores/NaviStore";
import { useNavigate } from "react-router-dom";
import { Box } from "grommet";


export function MainPage({ offset }:PropsWithChildren<PageProps>) {

  const { navi: { bgIsDark, textColor } } = useNaviStore();
  const navigate = useNavigate()
  const [isMobileOpen, setIsMobileOpen] = useState(false)


  return (
    <ResizedSection bgVignette={true} bgImg={mainBg}>
        <ParallaxLayer offset={0} speed={0.5}>
          <BrowserView style={{ height: '100%' }}>
            <CenteredOuterContainer>
              <Emblem height={isMobile ? '80px' : '115px'}/>
            </CenteredOuterContainer>
          </BrowserView>
          <MobileView style={{ height: '100%' }}>
            <Box justify="center" pad={{ vertical: 'none', right: 'none', 'left': 'large' }} fill direction="column" alignContent="start" flex>
              <InnerContainer>
                <MainTitle 
                  fontSize="48px"
                  onClick={() => navigate('/')}
                  bgIsDark={bgIsDark} 
                  color={textColor} >
                    Britannia<br/>Tigers<br/>Club
                </MainTitle>
              </InnerContainer>
            </Box>
          </MobileView>
        </ParallaxLayer>
    </ResizedSection>
  )
}