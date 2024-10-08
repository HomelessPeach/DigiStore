import * as React from "react";
import styled from "styled-components";

export const News = () => {
    return (
        <SvgBlock viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 38h20v-30h-20v30zm-10-4h8v-22h-8v22zm32-22v22h8v-22h-8z"/>
            <path d="M0 0h48v48h-48z" fill="none"/>
        </SvgBlock>
    )
}

const SvgBlock = styled.svg`
  height: 100%;
`