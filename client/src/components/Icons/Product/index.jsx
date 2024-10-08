import * as React from "react";
import styled from "styled-components";

export const Product = () => {
    return (
        <SvgBlock viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M42 4h-36c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h14l-4 6v2h16v-2l-4-6h14c2.21 0 4-1.79 4-4v-24c0-2.21-1.79-4-4-4zm0 24h-36v-20h36v20z"/>
        </SvgBlock>
    )
}

const SvgBlock = styled.svg`
  height: 100%;
`