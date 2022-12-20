import * as React from "react";
import styled from "styled-components"
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const TableInput = (props) => {
    const {
        value = [],
        label
    } = props

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
            }
            <TableBlock>

            </TableBlock>
        </ContainerBlock>
    )

}

const TableBlock = styled.div`

`