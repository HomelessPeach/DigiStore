import * as React from "react";
import styled from "styled-components"
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const EmailField = (props) => {

    const {
        value,
        label,
    } = props

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
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

const ValueBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Link = styled.a`
  text-decoration: none;
  color: ${({theme}) => theme.colors.tertiary};
`