import * as React from "react";
import styled from "styled-components"
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const TextInput = (props) => {

    const {
        value,
        label,
        onChange
    } = props

    function clickHandler(event) {
        const item = event.target.value;
        onChange(item)
    }

    return (
        <ContainerBlock>
            <LabelBlock>{label}</LabelBlock>
            <InputBlock defaultValue={(value)? value : ''} onChange={clickHandler}/>
        </ContainerBlock>
    )
}

const InputBlock = styled.input`
  border: 1px solid #000000;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
`