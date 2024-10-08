import * as React from "react";
import styled from "styled-components";

export const ProductCategory = () => {
    return (
        <SvgBlock viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.06 39.31l2.69 1.11v-18.05l-4.85 11.71c-.84 2.03.13 4.38 2.16 5.23zm39-7.42l-9.92-23.93c-.62-1.5-2.08-2.43-3.61-2.46-.53-.01-1.07.09-1.6.3l-14.73 6.1c-1.5.62-2.42 2.07-2.46 3.6-.01.54.08 1.08.3 1.61l9.91 23.93c.63 1.52 2.1 2.44 3.66 2.46.52 0 1.04-.09 1.55-.3l14.73-6.1c2.03-.84 3.01-3.18 2.17-5.21zm-28.31-14.39c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm-4 22c0 2.2 1.8 4 4 4h2.91l-6.91-16.68v12.68z"/>
            <path d="M0 0h48v48h-48z" fill="none"/>
        </SvgBlock>
    )
}

const SvgBlock = styled.svg`
  height: 100%;
`