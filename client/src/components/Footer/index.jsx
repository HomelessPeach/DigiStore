import * as React from "react";
import styled from "styled-components";

export const Footer = () => {
    return (
        <FooterBlock id={'footer'}>
            <FooterContainer>
            </FooterContainer>
        </FooterBlock>
    )
}

const FooterBlock = styled.footer`
  width: 100%;
  height: ${({theme}) => theme.size.footer.height}px;
  position: relative;
  z-index: 3;
`

const FooterContainer = styled.footer`
  height: 100%;
  background: ${({theme}) => theme.colors.tertiary};;
`