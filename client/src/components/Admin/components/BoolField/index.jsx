import * as React from "react";
import styled from "styled-components"
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";
import {CheckMark, Cross} from "../../Icons";

export const BoolField = (props) => {

    const {
        value,
        label
    } = props

    return (
        <ContainerBlock>
            {
                (label)?
                    <LabelBlock>{label}</LabelBlock>
                    :null
            }
            <ValueBlock value={value}>{(value)? <CheckMark/> : <Cross/>}</ValueBlock>
        </ContainerBlock>
    )
}

const ValueBlock = styled.div`
  display: flex;
  align-items: center;
  height: 25px;
  fill: ${({value}) => (value)? '#0ebb00' : '#ee0000'};
`