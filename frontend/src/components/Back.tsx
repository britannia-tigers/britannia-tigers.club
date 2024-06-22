import styled from "styled-components";
import backImg from '../../public/back.svg'

interface BackProps {
  color?: string
}

export const Back = styled.div<BackProps>`
  background-color: ${props => props.color ? props.color : 'black'};
  mask: url(${backImg}) no-repeat center;
  /* content: url(${backImg}); */
  width: 50px;
  height: 50px;
  cursor: pointer;

`