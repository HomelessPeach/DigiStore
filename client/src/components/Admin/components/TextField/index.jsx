import * as React from "react";
import styled from "styled-components"

export const TextField = (props) => {

    const {
        item,
        source,
        value,
        label
    } = props

    return (
        <TextFieldBlock>
            <LabelBlock>{label}</LabelBlock>
            <ValueBlock>{(value)? value : item[source]}</ValueBlock>
        </TextFieldBlock>
    )
}

const TextFieldBlock = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5;
`

const ValueBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

const LabelBlock = styled.div`
  font-size: 12px;
  color: #888888;
  display: flex;
  align-items: center;
`