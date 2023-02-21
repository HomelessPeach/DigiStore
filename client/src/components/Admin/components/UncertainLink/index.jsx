import * as React from "react";
import styled from "styled-components"
import {NavLink} from "react-router-dom";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const UncertainLink = (props) => {

    const {
        value,
        label,
        link,
        params,
        paramsValue
    } = props

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
            }
            <ValueBlock>
                {(paramsValue[params[0]])?
                    <Link
                        to={`${link}/${paramsValue[params[0]]}`}
                    >
                        {value}
                    </Link>
                    : value
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

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${({theme}) => theme.colors.tertiary};
`