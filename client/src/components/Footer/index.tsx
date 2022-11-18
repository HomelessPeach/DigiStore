import * as React from "react";
import styled from "styled-components";

export const Footer = () => {
    return (
        <FooterBlock id={'footer'}>
            <FooterContainer>
                footer
            </FooterContainer>
        </FooterBlock>
    )
}

const FooterBlock = styled.footer`
  width: 100%;
  height: ${({theme}) => theme.size.footer.height}px;
`

const FooterContainer = styled.footer`
  position: relative;
  height: 100%;
  background: ${({theme}) => theme.colors.tertiary};;
`