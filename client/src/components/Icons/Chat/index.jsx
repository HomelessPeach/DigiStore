import * as React from "react";
import styled from "styled-components";

export const Chat = () => {
    return (
        <SvgBlock viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 4h-32c-2.21 0-3.98 1.79-3.98 4l-.02 36 8-8h28c2.21 0 4-1.79 4-4v-24c0-2.21-1.79-4-4-4zm-22 18h-4v-4h4v4zm8 0h-4v-4h4v4zm8 0h-4v-4h4v4z"/>
            <path d="M0 0h48v48h-48z" fill="none"/>
        </SvgBlock>
    )
}

const SvgBlock = styled.svg`
  height: 100%;
`