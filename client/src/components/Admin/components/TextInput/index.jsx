import * as React from "react";
import styled from "styled-components"
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const TextInput = (props) => {

    const {
        value,
        label
    } = props

    return (
        <ContainerBlock>
            <LabelBlock>{label}</LabelBlock>
            <InputBlock value={(value)? value : ''}/>
        </ContainerBlock>
    )
}

const InputBlock = styled.input`
  border: 1px solid #000000;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
`