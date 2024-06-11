import { Helmet } from "react-helmet";
import { ResizedSection } from "../components/ResizedSection";
import { Emblem } from "../components/Emblem";
import { InnerContainer } from "../components/InnerContainer";
import { useContext, useEffect } from "react";
import { ResponsiveContext } from "grommet";
import { Navi } from "../components/Navi";
import { useNaviStore } from "../stores/NaviStore";
import { User } from "../components/User";
import { Masonry } from 'react-masonry'

export function Highlight() {

  const size = useContext(ResponsiveContext)
  const { setTextColor, setBgDark, setFormVisible } = useNaviStore();

  // initially set 
  useEffect(() => setTextColor('#ffffff'), []);
  const numberOfBoxes = 16;

  return (
    <>
      <Helmet>
        <title>Highlights</title>
      </Helmet>
      <User />
      <Navi />
      <ResizedSection bgVignette={true}>
        <Masonry>
          {Array.from({ length: numberOfBoxes }).map((_, index) => (
            <div
              key={index}
              style={{
                width: '33.33333%',
                height: [200, 230, 380, 300, 260, 180][Math.round(Math.random()*6)],
                backgroundColor: [
                  '#63D3BF',
                  '#D36363',
                  '#D0D363',
                  '#D063D3'
                ][Math.round(Math.random()*4)]
              ,
              }}
            >
              {index}
            </div>
          ))}
        </Masonry>
      </ResizedSection>
    </>
  )
}