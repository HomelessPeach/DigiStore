import * as React from "react";
import styled from "styled-components"
import {useEffect, useRef, useState} from "react";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const ReferenceInputField = (props) => {

    const {
        value: id,
        label,
        searchFunc,
        idName,
        searchFieldName,
        validation: {
            validate = (id) => (!!id),
            validationError = false,
            validationMessage = 'Поле не заполнено',
        } = {
            validate: () => true,
            validationError: false,
            validationMessage: 'Поле не заполнено',
        },
        onChange,
    } = props

    const [func] = searchFunc()
    const [values, setValues] = useState(null)
    const [selectValue, setSelectValue] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [isNotValid, setIsNotValid] = useState(false)
    const selectRef = useRef(null)

    useEffect(() => {
        (async () => {
            const res = await func()
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
            setValues(res)
        })()
    }, [])

    useEffect(() => {
        if (validationError) {
            setIsNotValid(!validate(selectValue))
        }
    }, [validationError])

    useEffect(() => {
        if (values?.length && id) {
            values.forEach((item) =>
                (item[idName] === id) ?
                    setSelectValue(item[searchFieldName])
                    : null
            )
            return
        }
        setSelectValue(null)
    }, [id, values])


    useEffect(() => {
        if (!isOpen) return;

        function clickHandler(event) {
            if (!selectRef.current.contains(event.target)) {
                setIsOpen(false)
            }
        }
        window.addEventListener("click", clickHandler);
        return () => {
            window.removeEventListener("click", clickHandler);
        };

    }, [isOpen])

    function changeValue(value) {
        onChange(value)
        if (validationError || isNotValid) {
            setIsNotValid(!validate(value))
        }
        setIsNotValid(!validate(value))
    }

    return (
        <ContainerBlock>
            <LabelBlock
                isNotValid={isNotValid}
            >
                {label}
            </LabelBlock>
            <SelectBlock
                ref={selectRef}
            >
                <SelectValue
                    onClick={() => setIsOpen(!isOpen)}
                    isNotValid={isNotValid}
                >
                    {(selectValue)? selectValue : <>&nbsp;</>}
                </SelectValue>
                {(isOpen)?
                    <OptionsContainer
                        onClick={() => setIsOpen(false)}
                    >
                        <OptionBlock
                            value={null}
                            onClick={() => changeValue(null)}
                        >
                            &nbsp;
                        </OptionBlock>
                        {(values)?
                            values.map((item) =>
                                <OptionBlock
                                    onClick={() => changeValue(item[idName])}
                                >
                                    {item[searchFieldName]}
                                </OptionBlock>
                            )
                            : null
                        }
                    </OptionsContainer>
                    :null
                }
            </SelectBlock>
            {(isNotValid)?
                <ValidationMessage>
                    {validationMessage}
                </ValidationMessage>
                : null
            }
        </ContainerBlock>
    )
}

const SelectBlock = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`

const SelectValue = styled.div`
  border: 1px solid ${({isNotValid}) => (isNotValid) ? '#ee0000' : '#000000'};
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
`

const OptionsContainer = styled.div`
  position: absolute;
  top: 46px;
  width: 100%;
  border-radius: 10px;
  overflow: scroll;
  box-shadow: 0 1px 10px 0 #5b5b5b;
  background-color: #ffffff;
`

const OptionBlock = styled.div`
  font-size: 16px;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #c9c9c9;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background-color: #c9c9c9;
  }
`

const ValidationMessage = styled.div`
  color: #ee0000;
  font-size: 13px;
  padding: 3px 0;
`