import * as React from "react";
import styled from "styled-components"
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const TextField = (props) => {

    const {
        value = '',
        label
    } = props

    const formattedText = (text) => {
        const lines = String(text).split('\\n')
        const lastLineIndex = lines.length - 1
        return lines.map((item, index) =>
            (lastLineIndex !== index)?
                <>{item}<br/></>
                : item
        )
    }

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