import * as React from "react";
import styled from "styled-components";

export const Visible = () => {
    return (
        <SvgBlock viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h48v48h-48z" fill="none"/>
            <path d="M24 9c-10 0-18.54 6.22-22 15 3.46 8.78 12 15 22 15 10.01 0 18.54-6.22 22-15-3.46-8.78-11.99-15-22-15zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/>
        </SvgBlock>
    )
}

const SvgBlock = styled.svg`
  height: 100%;
`