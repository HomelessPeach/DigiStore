import * as React from "react";
import styled from "styled-components"

export const TextField = (props) => {

    const {
        item,
        source,
        value,
        name,
    } = props

    return (
        <TextFieldBlock>
            {(value)? value : item[source]}
        </TextFieldBlock>
    )
}

const TextFieldBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`