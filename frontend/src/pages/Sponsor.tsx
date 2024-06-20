import { useParams } from "react-router-dom"
import { useSponsorFull } from "../api/sponsors";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { WhitePage } from "../components/WhitePage";
import { InnerContainer } from "../components/InnerContainer";
import { Suspense, useContext } from "react";
import { ResponsiveContext } from "grommet";
import { SponsorImg } from "../components/SponsorImg";
import { MobileView } from "react-device-detect";
import { Emblem } from "../components/Emblem";
import { RadarChart } from "../components/RadarChart";

export function Sponsor() {

  const size = useContext(ResponsiveContext)
  const { id } = useParams();
  const sponsor = useSponsorFull(id);

  return sponsor && (
    <WhitePage backTo='/sponsors' flexHeight>
      <InnerContainer size={size} paddingTop='large'>
        <Emblem  height='45px' style={{ position:'fixed', left: '30px', top: '25px'  }}/>
        <SponsorImg position='left' width={200} height={200} src={sponsor.logo?.url} />
        {sponsor?.about && documentToReactComponents(sponsor.about)}
      </InnerContainer>
    </WhitePage>
  )
}