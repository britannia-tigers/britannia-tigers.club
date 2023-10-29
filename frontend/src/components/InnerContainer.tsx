import { PropsWithChildren } from "react";
import styled from "styled-components";

type PaddingTopType = 'thick' | 'thin' | number

interface InnerContainerProps {
  paddingTop?: PaddingTopType
  title?: string | JSX.Element
}

interface InnerTitleProps {
  bottomPadding?: 'large' | 'small' | 'medium'
}

interface InnerProps {
  paddingTop: PaddingTopType
}

export const CenteredOuterContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Inner = styled.div<InnerProps>`
  padding-top: ${
    props => props.paddingTop === 'thick' ? 
      '135px' : props.paddingTop === 'thin' ? 
      '30px' : typeof props.paddingTop === 'number' ?
      `${props.paddingTop}px` : 0
  };
  padding-bottom: ${
    props => props.paddingTop === 'thick' ? 
      '135px' : props.paddingTop === 'thin' ? 
      '30px' : typeof props.paddingTop === 'number' ?
      `${props.paddingTop}px` : 0
  };
  display: block;
  width: 680px;
  height: fill-available;
`

export function InnerContainer({ children, title, paddingTop = 'thick'}:PropsWithChildren<InnerContainerProps>) {


  return (
    <CenteredOuterContainer>
      <Inner paddingTop={paddingTop}>
        {title || null}
        {children}
      </Inner>
    </CenteredOuterContainer>
  )
}

export const InnerTitle = styled.h3<InnerTitleProps>`
  display: block;
  text-align: right;
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
  padding: 0 45px;
  line-height: 1.25em;
`

interface InnerContentProps {
}

export const InnerContent = styled.div<InnerContentProps>`
  margin: 0;
  padding: 20px 45px 20px;

`