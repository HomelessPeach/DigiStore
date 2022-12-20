import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const ReferenceField = (props) => {

    const {
        value: id,
        label,
        searchFunc,
        searchFieldName,
        link
    } = props

    const [func] = searchFunc()
    const [value, setValue] = useState()

    useEffect(() => {
        if (id) {
            (async () => {
                const res = await func(id)
                    .unwrap()
                    .catch((err) => {
                        console.log(err)
                    })
                setValue(res[searchFieldName])
            })()
        }
    }, [id])

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
            }
            <ValueBlock>
                {(id)?
                    (value)?
                        <Link
                            to={`${link}/${id}`}
                        >
                            {value}
                        </Link>
                        : ''
                    : 'Объект удалён'
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