import { Paragraph as GPara } from "grommet";
import styled from "styled-components";

interface SubTitleProps {
  marginBottom?: string
}

export const SubTitle = styled.h3<SubTitleProps>`
  font-size: 24px;
  margin:0;
  padding: 0;
  margin-bottom: ${props => props.marginBottom || '36px'};
`

export const MobileSubTitle = styled(SubTitle)<SubTitleProps>`
  padding: 0 30px 0px;
`;

export const Paragraph = styled(GPara)`
  margin: 0;
  padding: 0;
`