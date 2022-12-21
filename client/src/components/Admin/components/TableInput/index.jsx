import * as React from "react";
import styled from "styled-components"
import {cloneElement, useEffect, useState} from "react";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const TableInput = (props) => {
    const {
        value = [],
        children,
        label,
        onChange
    } = props

    const [rows, setRows] = useState([])
    const [rowCount, setCountRow] = useState(value.length? value.length : 1)

    useEffect(() => {
        if (children) {
            const blocks = []
            const TableCeil = (props) => {

                const {
                    child,
                    ceilValue = '',
                    index
                } = props

                const [childValue, setChildValue] = useState(ceilValue)

                return (
                    cloneElement(child, {
                        value: childValue,
                        onChange: (itemValue) => {
                            value[index] = {...value[index], [child.props.fieldName]: itemValue}
                            setChildValue(itemValue)
                        }
                    })
                )
            }
            for (let i = 0; i < rowCount; i++) {
                if (!value[i]) {
                    onChange({})
                }

                blocks.push(
                    <TableRowBlock key={i}>
                        {
                            children.map((child, index) =>
                                <TableCeilBlock key={index} widthField={100 / children.length}>
                                    <TableCeil
                                        child={child}
                                        ceilValue={value[i]?.[child.props.fieldName]}
                                        index={i}
                                    />
                                </TableCeilBlock>
                            )
                        }
                    </TableRowBlock>
                )
            }
            setRows(blocks)
        }
    }, [rowCount, children])

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
            }
            <ContentBlock>
                <TableBlock>
                    {children && rows}
                </TableBlock>
                <ToolBar>
                    <AddButton onClick={() => {setCountRow(rowCount + 1)}}>
                        Добавить
                    </AddButton>
                    <DeleteButton onClick={() => setCountRow((rowCount !== 0)? rowCount - 1 :0)}>
                        Удалить
                    </DeleteButton>
                </ToolBar>
            </ContentBlock>
        </ContainerBlock>
    )

}

const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: right;
  align-items: flex-start;
  border-radius: 10px;
  padding: 10px;
  gap: 10px;
  border: 1px solid #000000;
`

const TableBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  padding: 10px;
`

const TableRowBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
`

const TableCeilBlock = styled.div`
  width: ${({widthField}) => widthField}%;
`

const ToolBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
  padding: 10px;
`

const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 35px;
  background-color: #ff4646;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  box-shadow: 0 0 10px 0 #5e5e5e;
  margin: 0 0 0 10px;
  text-align: center;
  padding: 3px;
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
`

const AddButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 35px;
  background-color: ${({theme}) => theme.colors.tertiary};
  border-radius: 10px;
  color: white;
  text-decoration: none;
  box-shadow: 0 0 10px 0 #5e5e5e;
  margin: 0 0 0 10px;
  text-align: center;
  padding: 3px;
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
`