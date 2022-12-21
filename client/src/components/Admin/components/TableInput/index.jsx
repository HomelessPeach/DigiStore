import * as React from "react";
import styled from "styled-components"
import {cloneElement, useEffect, useState} from "react";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const TableInput = (props) => {
    const {
        value = [],
        children,
        label,
        validation: {
            validate = () => true,
            validationError = false,
            validationMessage = 'Некорректно введённые данные',
        } = {
            validate: () => true,
            validationError: false,
            validationMessage: 'Некорректно введённые данные',
        },
        onChange
    } = props

    const [rows, setRows] = useState([])
    const [rowCount, setCountRow] = useState(value.length? value.length : 1)
    const [isNotValid, setIsNotValid] = useState(false)

    useEffect(() => {
        if (validationError) {
            setIsNotValid(!validate(value))
        }
    }, [validationError])

    useEffect(() => {
        if (children) {
            const blocks = []
            const TableCeil = (props) => {

                const {
                    child,
                    ceilValue = '',
                    index,
                } = props

                const [childValue, setChildValue] = useState(ceilValue)

                useEffect(() => {
                    setIsNotValid(!validate(value))
                }, [isNotValid, childValue])

                return (
                    cloneElement(child, {
                        value: childValue,
                        validation: {
                            validate: (value) => value,
                            validationError: isNotValid,
                            validationMessage: ''
                        },
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
                    <TableRowBlock key={i}
                    >
                        {
                            children.map((child, index) =>
                                <TableCeilBlock
                                    key={index}
                                    widthField={100 / children.length}
                                >
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
    }, [rowCount, children, isNotValid])

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock
                    isNotValid={isNotValid}
                >
                    {label}
                </LabelBlock>
                :null
            }
            <ContentBlock
                isNotValid={isNotValid}
            >
                <TableBlock>
                    {children && rows}
                </TableBlock>
                {(isNotValid)?
                    <ValidationMessage>
                        {validationMessage}
                    </ValidationMessage>
                    : null
                }
                <ToolBar>
                    <AddButton onClick={() => {setCountRow(rowCount + 1)}}>
                        Добавить
                    </AddButton>
                    <DeleteButton onClick={() => {
                        if (rowCount) {
                            setCountRow(rowCount - 1)
                            value.pop()
                        }
                    }}>
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
  border: 1px solid ${({isNotValid}) => (isNotValid)? '#ee0000' : '#000000'};
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

const ValidationMessage = styled.div`
  color: #ee0000;
  font-size: 13px;
  padding: 3px 10px;
`