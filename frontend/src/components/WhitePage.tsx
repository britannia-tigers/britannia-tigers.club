import { PropsWithChildren } from "react";
import { ResizedSection } from "./ResizedSection";
import styled from "styled-components";
import closeImg from '../../public/close.svg';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Close } from "grommet-icons";




interface WhitePageProps {
  bgColor?: string
  textColor?: string
  backTo?: string | number
}

export function WhitePage({ children, backTo, bgColor = 'white', textColor = 'black' }: PropsWithChildren<WhitePageProps>) {

  const navigate = useNavigate()

  return (
    <ResizedSection 
      color={textColor}
      bgColor={bgColor}>
        {children}
      {backTo ? (
        <CloseContainer>
          {/* A bit stupid in the navigate function to avoid typescript error as it only recognis navigate as 2 different associated function */}
          <Close color={textColor} onClick={() => typeof backTo === 'string' ? navigate(backTo) : navigate(backTo)}/>
        </CloseContainer>
      ) : null}
    </ResizedSection>
  )
}

const CloseContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  padding: 30px 30px 30px 30px;
  cursor: pointer;

`

const CloseButton = styled.img`
  content: url(${closeImg});
`