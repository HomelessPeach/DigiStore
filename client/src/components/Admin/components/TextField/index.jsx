import * as React from "react";
import styled from "styled-components"
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";
import {formattedText} from "../../../../utils";

export const TextField = (props) => {

    const {
        value = '',
        label
    } = props

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
            }
            <ValueBlock>
                {(value)? formattedText(value) :  ''}
            </ValueBlock>
        </ContainerBlock>
    )
}


const ValueBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 1.5;
`