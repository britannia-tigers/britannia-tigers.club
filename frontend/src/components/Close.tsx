import styled from "styled-components";
import closeImg from '../../public/close.svg'

interface CloseProps {
  color?: string
}

export const Close = styled.div<CloseProps>`
  background-color: ${props => props.color ? props.color : 'black'};
  mask: url(${closeImg}) no-repeat center;
  /* content: url(${closeImg}); */
  width: 35px;
  height: 35px;
  cursor: pointer;

`