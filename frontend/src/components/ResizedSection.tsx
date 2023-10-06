import styled from "styled-components";
import { useWindowSize } from "../hooks/windowSize";
import { PropsWithChildren } from "react";


interface iSesction {
  color?: string
  bgColor?: string
  bgImg?: string
  bgVignette?: boolean
}

/**
 * Base Section
 * @param param0 
 * @returns 
 */
export function ResizedSection({ 
  children, 
  color =  'white',
  bgColor = 'black' ,
  bgImg,
  bgVignette = false
}: PropsWithChildren<iSesction>) {

  const [width, height] = useWindowSize();

  return (
    <Container 
      bgVignette={bgVignette}
      bgImg={bgImg}
      color={color}
      bgColor={bgColor} 
      width={width} 
      height={height}>
      { children }
    </Container>
  )
}

interface iContainer {
  width: number
  height: number
  bgColor: string
  color: string
  bgImg?: string
  bgVignette?: boolean;
}

const Container = styled.div<iContainer>`
    /* DO NOT Put position: relative here or it will break the page */
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    color: ${props => props.color};
    background-color: ${props => props.bgColor};
    background-image: ${props => props.bgImg ? `url(${props.bgImg})` : 'none'};
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: ${ props => props.bgVignette ? 'inset 0 0 5em 1.5em #000' : 'none'};
`