import * as React from "react";
import styled from "styled-components"

export const BoolField = (props) => {

    const {
        value,
        label
    } = props

    return (
        <BoolFieldBlock>
            <LabelBlock>{label}</LabelBlock>
            <ValueBlock>{(value)? 'Да' : 'Нет'}</ValueBlock>
        </BoolFieldBlock>
    )
}

const BoolFieldBlock = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  padding: 5px;
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