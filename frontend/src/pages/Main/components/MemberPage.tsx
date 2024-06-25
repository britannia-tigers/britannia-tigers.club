import React, { PropsWithChildren, useMemo } from 'react'
import { PageProps } from '../Main.interface'
import unknownBg from '../../../../public/unknown.png';
import unknownBg1 from '../../../../public/unknown2.png';
import unknownBg2 from '../../../../public/unknown3.png';
import { ResizedSection } from '../../../components/ResizedSection';
import { ParallaxLayer } from '@react-spring/parallax';
import { InnerContainer, InnerTitle, MobileInnerTitle } from '../../../components/InnerContainer';
import { BrowserView, MobileView } from 'react-device-detect';
import { Avatar, Box, Button, Paragraph, ResponsiveContext, Stack, Tip } from 'grommet';
import { WIP } from '../../../components/WIP';
import { SubTitle } from '../../../components/Titles';
import { useUserList } from '../../../hooks/user';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip'

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

  const users = useUserList();

  const members = useMemo(() => {
    const m = []

    const found = users?.filter(u => u.app_metadata?.type.findIndex(t => t === 'team') > -1) || []
    const len = found?.length || 0;

    let i = 0
    while(i < len) {
      const c = Math.floor(Math.random() * colors.length)
      const u = Math.floor(Math.random() * unknown.length)
      m.push({ 
        id: btoa(found[i].user_id), 
        picture: unknown[u], 
        bgColor: colors[c],
        name: found[i].name,
        position: found[i]?.user_metadata?.stats?.position
      })
      i++
    }

    return m.sort((a, b) => {
      if(a.name < b.name) return -1
      else if(a.name > b.name) return 1
      return 0
    })
  }, [users])

  const size = React.useContext(ResponsiveContext);

  return (
    <ResizedSection bgColor="white" color="black">
        <InnerContainer size={size}>
          <Box justify="center">  
            <Box 
              wrap={true} 
              pad="none"
              justify="between" 
              direction="row">
                { members.map(s => (
                    <>
                    {/* <Link to={`/team/${s.id}`}> */}
                      <Avatar 
                        data-tooltip-id={s.id}
                        margin={size === 'small' ? {
                          vertical: 'large',
                          horizontal: 'large'
                        } : {
                          vertical: 'medium',
                          horizontal: 'small'
                        }}
                        size={size === 'small' ? 'medium' : 'xlarge'}
                        src={s.picture} 
                        background={s.bgColor}
                        
                      />
                      <Tooltip id={s.id} style={{ backgroundColor: "rgb(247, 236, 19)", color: "#222" }}>
                        {s.name}{s?.position ? ` - ${s.position}` : ''}
                      </Tooltip>
                    {/* </Link> */}
                    </>
                )) }
            </Box>
          </Box>

        </InnerContainer>
      {/* temporary until team players are decided */}
      {/* <ParallaxLayer offset={2} speed={0.25}>
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
      </ParallaxLayer> */}
    </ResizedSection>
  )
}
