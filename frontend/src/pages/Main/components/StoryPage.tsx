
import React, { PropsWithChildren } from 'react'
import { ResizedSection } from '../../../components/ResizedSection'
import { ParallaxLayer } from '@react-spring/parallax'
import { InnerContainer, InnerSubTitle, InnerTitle, MobileInnerTitle } from '../../../components/InnerContainer'
import { BrowserView, MobileView } from 'react-device-detect'
import { PageProps } from '../Main.interface'

export function StoryPage({ }:PropsWithChildren<PageProps>) {
  return (
    <ResizedSection>
      <ParallaxLayer offset={1} speed={0.75}>
      <InnerContainer>
        <BrowserView>
          <InnerTitle>Our Story</InnerTitle>
        </BrowserView>
        <MobileView>
          <MobileInnerTitle>Our Story</MobileInnerTitle>
        </MobileView>
        <InnerSubTitle>
          <p>The Britannia Tigers have undergone a commendable evolution, beginning as a group of basketball enthusiasts in early 2010 in Hackney, East London.</p>
          
          <p>This journey has transformed us into a more diverse and inclusive club, where people from various ethnicities, genders, and backgrounds have found a welcoming and open environment to come together and play.</p>

          <p>With this strong foundation of inclusivity, we have formed a competitive team of individuals who are eager to participate in recreational leagues and tournaments in the future.</p>
        </InnerSubTitle>
      </InnerContainer>
      </ParallaxLayer>
    </ResizedSection>
  )
}