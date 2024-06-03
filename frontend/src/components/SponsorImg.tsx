import styled from "styled-components";

interface SponsorImgProps {
  src: string
  width?: number
  height?: number
  position?: string
}

export const SponsorImg = styled.a<SponsorImgProps>`
  display: flex;
  flex-direction: row;
  background-image: url(${props => props.src});
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: ${props => props.position ? props.position : 'center'};
  width: ${props => props.width ? `${props.width}px` : '100%'};
  height: ${props => props.height ? `${props.height}px` : '100%'};

`