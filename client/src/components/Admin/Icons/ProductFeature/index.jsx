import * as React from "react";
import styled from "styled-components";

export const ProductFeature = () => {
    return (
        <SvgBlock viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h48v48h-48z" fill="none"/>
            <path d="M40 26h-34c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h34c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2zm0-20h-34c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h34c1.1 0 2-.9 2-2v-12c0-1.1-.9-2-2-2z"/>
        </SvgBlock>
    )
}

const SvgBlock = styled.svg`
  height: 100%;
`