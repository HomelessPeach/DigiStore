import * as React from "react";
import {ContainerBlock, LabelBlock, ValueBlock} from "../ComponentsStyledBlocks";

export const PhoneNumberField = (props) => {

    const {
        value,
        label
    } = props

    return (
        <ContainerBlock>
            {label &&
                <LabelBlock>{label}</LabelBlock>
            }
            <ValueBlock>
                {(value)? `+7 (${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 8)}-${value.slice(8, 10)}` :  ''}
            </ValueBlock>
        </ContainerBlock>
    )
}