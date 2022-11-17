import * as React from "react";
import styled from "styled-components";

export const Home = () => {
    return (
        <SvgBlock viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 40v-12h8v12h10v-16h6l-20-18-20 18h6v16z"/>
            <path d="M0 0h48v48h-48z" fill="none"/>
        </SvgBlock>
    )
}

const SvgBlock = styled.svg`
  height: 100%;
`