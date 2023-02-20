import * as React from "react";
import {ContainerBlock, LabelBlock, ValueBlock} from "../ComponentsStyledBlocks";
import {formattedText} from "../../utils";

export const TextField = (props) => {

    const {
        value = '',
        label
    } = props

    return (
        <ContainerBlock>
            {label &&
                <LabelBlock>{label}</LabelBlock>
            }
            <ValueBlock>
                {(value)? formattedText(value) :  ''}
            </ValueBlock>
        </ContainerBlock>
    )
}