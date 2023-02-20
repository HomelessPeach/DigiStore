import * as React from "react";
import {ContainerBlock, LabelBlock, Link, ValueBlock} from "../ComponentsStyledBlocks";

export const EmailField = (props) => {

    const {
        value,
        label,
    } = props

    return (
        <ContainerBlock>
            {label &&
                <LabelBlock>{label}</LabelBlock>
            }
            <ValueBlock>
                {(value)?
                    <Link
                        href={`mailto:${value}`}
                        onClick={(event) => event.stopPropagation()}
                    >
                        {value}
                    </Link>
                    : ''
                }
            </ValueBlock>
        </ContainerBlock>
    )
}