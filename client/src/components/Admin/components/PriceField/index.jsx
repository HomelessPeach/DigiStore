import * as React from "react";
import styled from "styled-components"
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";
import {priceFormat} from "../../../../utils";

export const PriceField = (props) => {

    const {
        value = '',
        label,
        currency
    } = props

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
            }
            <ValueBlock>
                {(value)? priceFormat(value) :  ''}
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