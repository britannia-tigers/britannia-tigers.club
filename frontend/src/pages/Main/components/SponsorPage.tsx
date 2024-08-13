import { PropsWithChildren, useContext } from "react";
import { PageProps } from "../Main.interface";
import { useSponsors } from "../../../api/sponsors";
import { ResizedSection } from "../../../components/ResizedSection";
import { ParallaxLayer } from "@react-spring/parallax";
import { InnerContainer, InnerTitle, MobileInnerTitle } from "../../../components/InnerContainer";
import { BrowserView, MobileView, isMobile } from "react-device-detect";
import { Box, ResponsiveContext } from "grommet";
import { SponsorImg } from "../../../components/SponsorImg";
import { useNavigate } from "react-router-dom";
import { sonnet } from "@cloudinary/url-gen/qualifiers/artisticFilter";



export function SponsorPage({ offset }:PropsWithChildren<PageProps>) {

  const sponsors = useSponsors();
  const navi = useNavigate()
  const size = useContext(ResponsiveContext);

  const latest = sponsors.filter(s => s.year === "2024")
  const past = sponsors.filter(s => s.year !== "2024")
  return (
    <ResizedSection bgColor="white" color="black">
      <ParallaxLayer offset={4} speed={0.5}>
        <InnerContainer size={size}>
          <InnerTitle>2024</InnerTitle>
          <Box wrap={true} gap={isMobile ? "none" : "medium"} justify="center" align="center" direction="row" pad={{ top: 'none', bottom: 'large', horizontal: 'none'}}>
            
            { latest.map(s => <SponsorImg width={150} height={150} src={s.logo.url} onClick={() => navi(`/sponsor/${s.id}`)}/>) }
          </Box>
          <InnerTitle>2023</InnerTitle>
          <Box wrap={true} gap={isMobile ? "none" : "medium"} justify="center" align="center" direction="row" pad={{ top: 'none', bottom: 'large', horizontal: 'none'}}>
            { past.map(s => <SponsorImg disabled width={150} height={150} src={s.logo.url} />) }
          </Box>
        </InnerContainer>
      </ParallaxLayer>
    </ResizedSection>

  )
}