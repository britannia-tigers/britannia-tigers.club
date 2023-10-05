import styled from "styled-components";


interface SocialIconProps {
  src: string
  link?: string
}

export function SocialIcon({ link, ...props }: SocialIconProps) {

  const clickHandler = link ? () => window.open(link, 'social') : undefined

  return <Social onClick={clickHandler} {...props} />
}

export const Social = styled.img<SocialIconProps>`
  content: url(${props => props.src});
  width: 30px;
  height: 30px;
  cursor: pointer;
  opacity: 1;
  transition: transform 0.15s ease-in-out, opacity 0.2s ease-in;
  &:hover {
    opacity: 0.75;
    transform: translate(0px, -3px);
  }
`