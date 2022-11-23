import * as React from "react";
import styled from "styled-components"

export const TextInput = (props) => {

    const {
        value,
        label
    } = props

    return (
        <TextInputBlock>
            <LabelBlock>{label}</LabelBlock>
            <InputBlock value={(value)? value : ''}/>
        </TextInputBlock>
    )
}

const TextInputBlock = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  padding: 5px;
`

const InputBlock = styled.input`
  display: flex;
  align-items: center;
  border: 1px solid #000000;
  border-radius: 10px;
  font-size: 16px;
  width: 400px;
  padding: 10px;
`

const LabelBlock = styled.div`
  font-size: 12px;
  color: #888888;
  display: flex;
  align-items: center;
`