import * as React from "react";
import styled from "styled-components"
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const PriceField = (props) => {

    const {
        value = '',
        label,
        currency
    } = props

    const formattedText = (text) => {
        const newText = String(text)
        const result = []
        let str = ''
        for (let i = newText.length - 1; i >= 0; i--) {
            str += newText[i]
            if (i === 0 || str.length%3 === 0) {
                result.push(str.split('').reverse().join(''))
                str = ''
            }
        }
        return result.reverse().join('.')
    }

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
            }
            <ValueBlock>
                {(value)? formattedText(value) :  ''}
                &nbsp;
                {currency}
            </ValueBlock>
        </ContainerBlock>
    )
}


const ValueBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  line-height: 1.5;
`