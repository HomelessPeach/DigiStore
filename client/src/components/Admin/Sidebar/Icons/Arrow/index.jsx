import * as React from "react";
import styled from "styled-components";

export const Arrow = () => {
    return (
        <SvgBlock viewBox="0 0 72 96" xmlns="http://www.w3.org/2000/svg">
            <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z"/>
        </SvgBlock>
    )
}

const SvgBlock = styled.svg`
  height: 100%;
`