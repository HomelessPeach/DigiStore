import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const TextInput = (props) => {

    const {
        value,
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
        onChange,
        multiply
    } = props

    const [isNotValid, setIsNotValid] = useState(false)

    useEffect(() => {
        if (validationError) {
            setIsNotValid(!validate(value))
        }
    }, [validationError])

    function onInput(event) {
        const item = event.target.value;
        onChange(item)
        if (validationError || isNotValid) {
            setIsNotValid(!validate(item))
        }
    }

    function checkValidateOnBlur(event) {
        const item = event.target.value;
        if (item) {
            setIsNotValid(!validate(item))
        }
    }

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
            {(multiply)?
                <TextAreaBlock
                    defaultValue={(String(value))? value : ''}
                    rows={8}
                    onChange={onInput}
                    onBlur={checkValidateOnBlur}
                    isNotValid={isNotValid}
                />
                :
                <InputBlock
                    defaultValue={(String(value))? value : ''}
                    onChange={onInput}
                    onBlur={checkValidateOnBlur}
                    isNotValid={isNotValid}
                />
            }
            {(isNotValid)?
                <ValidationMessage>
                    {validationMessage}
                </ValidationMessage>
                : null
            }
        </ContainerBlock>
    )
}

const InputBlock = styled.input`
  border: 1px solid ${({isNotValid}) => (isNotValid)? '#ee0000' : '#000000'};
  border-radius: 10px;
  font-size: 16px;
  padding: 10px;
`

const TextAreaBlock = styled.textarea`
  border: 1px solid ${({isNotValid}) => (isNotValid)? '#ee0000' : '#000000'};
  border-radius: 10px;
  font-size: 16px;
  padding: 10px 15px;
  line-height: 1.5;
  width: 100%;
  overflow: visible;
  resize: none;
`

const ValidationMessage = styled.div`
  color: #ee0000;
  font-size: 13px;
  padding: 3px 0;
`