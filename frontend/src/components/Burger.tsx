import styled from "styled-components";
import burgerImg from '../../public/burger.svg'

interface BurgerProps {
  bgIsDark: boolean
}

export const Burger = styled.div<BurgerProps>`
  content: url(${burgerImg});
  filter: invert(${props => props.bgIsDark ? '0%' : '100%'});
  width: 35px;
  height: 35px;
  cursor: pointer;
  transition: filter 0.25s ease-in-out;

`