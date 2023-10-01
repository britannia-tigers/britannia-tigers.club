import styled from 'styled-components';
import logo from '../../public/tiger_emblem.svg';
import { CSSProperties } from 'react';


interface EmblemProps extends Partial<ImgProps> {
  style?: CSSProperties
}

export function Emblem({ width='auto', height='115px', style }:EmblemProps) {

  return (
    <Img style={style} width={width} height={height} src={logo} />
  )
}

interface ImgProps {
  width: string
  height: string
}

const Img = styled.img<ImgProps>`
  width: ${props => props.width}
  height: ${props => props.height}
`