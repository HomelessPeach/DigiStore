import * as React from "react";
import styled from "styled-components"
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const ReachTextField = (props) => {
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
            <ValueBlock
                dangerouslySetInnerHTML={{__html: value}}
            />
        </ContainerBlock>
    )
}

const ValueBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 1.5;
  border-radius: 10px;
  padding: 15px;
  background-color: rgba(159, 157, 157, 0.2);
`