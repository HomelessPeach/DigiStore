import * as React from "react";
import styled from "styled-components";

export const CheckMark = () => {
    return (
        <SvgBlock viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h48v48h-48z" fill="none"/>
            <path d="M18 32.34l-8.34-8.34-2.83 2.83 11.17 11.17 24-24-2.83-2.83z"/>
        </SvgBlock>
    )
}

const SvgBlock = styled.svg`
  height: 100%;
`