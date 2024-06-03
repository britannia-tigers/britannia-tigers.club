import { PropsWithChildren } from "react";
import styled from "styled-components";

type PaddingType = 'large' | 'medium' | 'small' | number | string

interface InnerContainerProps {
  size?: 'small' | 'medium' | 'large' | string
  paddingTop?: PaddingType
  title?: string | JSX.Element
}

interface InnerTitleProps {
  bottomPadding?: 'large' | 'small' | 'medium'
}

interface InnerProps {
  paddingTop?: PaddingType
  size?: PaddingType
}

export const CenteredOuterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Inner = styled.div<InnerProps>`
  padding-top: ${props => props.paddingTop === 'large' ? '90px' : 'auto'};
  padding-left: ${
    props => props.size === 'small' ? 
      '30px' : 0
  };
  padding-right: ${
    props => props.size === 'small' ? 
      '30px' : 0
  };

  display: block;
  width: 680px;
  /* height: fill-available; */
`

export function InnerContainer({ children, title, size, paddingTop = 'large'}:PropsWithChildren<InnerContainerProps>) {


  return (
    <CenteredOuterContainer>
      <Inner size={size} paddingTop={paddingTop}>
        {title || null}
        {children}
      </Inner>
    </CenteredOuterContainer>
  )
}

export const InnerTitle = styled.h3<InnerTitleProps>`
  display: block;
  text-align: left;
  font-size: 36px;
  text-transform: uppercase;
  padding: 0 0 ${props => props.bottomPadding === 'large'  ? '90px' : props.bottomPadding === 'medium' ? '60px' : '42px'} 0;
  margin: 0;
`

export const MobileInnerTitle = styled(InnerTitle)<InnerTitleProps>`
  padding: 0px 30px ${props => props.bottomPadding === 'large'  ? '90px' : props.bottomPadding === 'medium' ? '60px' : '42px'} 0px;
`

export const InnerSubTitle = styled.h4`
  margin: 0;
  padding: 0 0px;
  line-height: 1.25em;
`

interface InnerContentProps {
}

export const InnerContent = styled.div<InnerContentProps>`
  margin: 0;
  padding: 20px 45px 20px;

`