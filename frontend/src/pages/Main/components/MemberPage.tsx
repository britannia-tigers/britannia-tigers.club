import React, { PropsWithChildren, useMemo } from 'react'
import { PageProps } from '../Main.interface'
import unknownBg from '../../../../public/unknown.png';
import unknownBg1 from '../../../../public/unknown2.png';
import unknownBg2 from '../../../../public/unknown3.png';
import { ResizedSection } from '../../../components/ResizedSection';
import { ParallaxLayer } from '@react-spring/parallax';
import { InnerContainer, InnerTitle, MobileInnerTitle } from '../../../components/InnerContainer';
import { BrowserView, MobileView } from 'react-device-detect';
import { Avatar, Box, Button, Paragraph } from 'grommet';
import { WIP } from '../../../components/WIP';
import { SubTitle } from '../../../components/Titles';


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
          <BrowserView>
            <InnerTitle>Tigers Team</InnerTitle>
          </BrowserView>
          <MobileView>
            <MobileInnerTitle>Tigers Team</MobileInnerTitle>
          </MobileView>
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
      {/* temporary until team players are decided */}
      <ParallaxLayer offset={2} speed={0.25}>
        <WIP>
          <BrowserView>
            <SubTitle>2023-2024 Team trial</SubTitle>
            <Paragraph margin={{ top: 'none', bottom: 'medium' }}>Would you like to compete with us for the upcoming season?  Sign up to our trial session on
              the 19th Oct!
            </Paragraph>
            <Paragraph color='dark-1' size='small' margin={{ top: 'none', bottom: 'none' }}>
              Haggerston School<br />Weymouth Terrace<br/>
              London E2 8LS<br/>
            </Paragraph>
            <Paragraph size="small" margin={{ top: 'none', bottom: 'large' }}>
              <a target="_blank" href='https://www.google.com/maps/dir//haggerston+school/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x48761cbf134d1105:0x877e35d372be628f?sa=X&ved=2ahUKEwjR_Z-uneGBAxUaQUEAHWFdAScQ9Rd6BAhYEAA&ved=2ahUKEwjR_Z-uneGBAxUaQUEAHWFdAScQ9Rd6BAhkEAQ'>
                How to get there
              </a>
            </Paragraph>
            <Button onClick={() => window.open('https://awp4c37iy5z.typeform.com/to/Qc9QoWfL', "tigers_trial_signup")} alignSelf="start" size='small' primary label='Sign up' />
          </BrowserView>
          <MobileView>
            <Box pad={{vertical: '0px', horizontal: '30px'}}>
              <SubTitle>
                2023-2024 Team trial
              </SubTitle>
              <Paragraph margin={{ top: 'none', bottom: 'medium' }}>Would you like to compete with us for the upcoming season?  Sign up to our trial session on
                the 19th Oct!
              </Paragraph>
              <Paragraph color='dark-1' size='small' margin={{ top: 'none', bottom: 'none' }}>
                Haggerston School<br />Weymouth Terrace<br/>
                London E2 8LS<br/>
              </Paragraph>
              <Paragraph size="small" margin={{ top: 'none', bottom: 'large' }}>
                <a target="_blank" href='https://www.google.com/maps/dir//haggerston+school/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x48761cbf134d1105:0x877e35d372be628f?sa=X&ved=2ahUKEwjR_Z-uneGBAxUaQUEAHWFdAScQ9Rd6BAhYEAA&ved=2ahUKEwjR_Z-uneGBAxUaQUEAHWFdAScQ9Rd6BAhkEAQ'>
                  How to get there
                </a>
              </Paragraph>
              <Button onClick={() => window.open('https://awp4c37iy5z.typeform.com/to/Qc9QoWfL', "tigers_trial_signup")} alignSelf="start" size='small' primary label='Sign up' />
            </Box>
          </MobileView>
        </WIP>
      </ParallaxLayer>
    </ResizedSection>
  )
}
