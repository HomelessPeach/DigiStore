import * as React from "react";
import styled from "styled-components"
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const TextField = (props) => {

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
            <ValueBlock>{(value)? value :  ''}</ValueBlock>
        </ContainerBlock>
    )
}


const ValueBlock = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`