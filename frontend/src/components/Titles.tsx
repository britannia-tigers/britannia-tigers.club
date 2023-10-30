import { Paragraph as GPara } from "grommet";
import styled from "styled-components";

interface SubTitleProps {
  marginTop?: string
  marginBottom?: string
}

interface ParagraphProps {
  underline?: boolean
  marginBottom?: string
  marginTop?: string
  bold?: boolean
}

interface SubParagraphProps {
  isLink?: boolean
}

export const SubTitle = styled.h3<SubTitleProps>`
  font-size: 24px;
  margin:0;
  padding: 0;
  margin-bottom: ${props => props.marginBottom || '36px'};
`

export const SmallSubTitle = styled.h3<SubTitleProps>`
  font-size: 24x;
  margin:0;
  padding: 0;
  text-transform: capitalize;
  margin-top: ${props => props.marginTop || 0};
  margin-bottom: ${props => props.marginBottom || '36px'};
`

export const MobileSubTitle = styled(SubTitle)<SubTitleProps>`
  padding: 0 30px 0px;
`;

export const Paragraph = styled(GPara)<ParagraphProps>`
  padding: 0;
  font-size: 14px;
  line-height: 1.25em;
  text-decoration: ${props => props.underline ? 'underline' : 'none'};
  margin: ${props => props.marginTop || '0px'} 0 ${props => props.marginBottom || '0px'};
  font-weight: ${props => props.bold ? 'bold' : 'normal'}
`

export const SubParagraph = styled(GPara)<SubParagraphProps>`
  margin: 0;
  padding: 0;
  font-size: 12px;
  line-height: 1.3em;
  
  &:hover {
    cursor: ${props => props.isLink ? 'pointer' : 'default'};
    text-decoration: ${props => props.isLink ? 'underline' : 'none'};
  }
`
