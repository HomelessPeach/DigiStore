import * as React from "react";
import styled from "styled-components";

export const Back = () => {
    return (
        <SvgBlock viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M30.83 14.83l-2.83-2.83-12 12 12 12 2.83-2.83-9.17-9.17z"/>
            <path d="M0 0h48v48h-48z" fill="none"/>
        </SvgBlock>
    )
}

const SvgBlock = styled.svg`
  height: 100%;
`