import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";
import {Invisible, Visible} from "../../Icons";

export const PasswordInput = (props) => {

    const {
        value,
        label,
        validation: {
            validate = () => true,
            validationError = false,
            validationMessage = 'Некорректно введённый пароль',
        } = {
            validate: () => true,
            validationError: false,
            validationMessage: 'Некорректно введённый пароль',
        },
        onChange,
    } = props

    const [visible, setVisible] = useState(false)
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
            <LabelBlock
                isNotValid={isNotValid}
            >
                {label}
            </LabelBlock>
            <InputContainer>
                <InputBlock
                    type={(visible)? "text" : "password"}
                    defaultValue={(value)? value : ''}
                    onChange={onInput}
                    onBlur={checkValidateOnBlur}
                    isNotValid={isNotValid}
                />
                <IconButton
                    isNotValid={isNotValid}
                    onClick={() => setVisible(!visible)}
                >
                    {(visible)? <Invisible/> : <Visible/>}
                </IconButton>
            </InputContainer>
            {(isNotValid)?
                <ValidationMessage>
                    {validationMessage}
                </ValidationMessage>
                : null
            }
        </ContainerBlock>
    )
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const InputBlock = styled.input`
  border: 1px solid ${({isNotValid}) => (isNotValid)? '#ee0000' : '#000000'};
  border-radius: 10px;
  font-size: 16px;
  padding: 10px 25px 10px 10px;
  width: 90%;
`

const ValidationMessage = styled.div`
  color: #ee0000;
  font-size: 13px;
  padding: 3px 0;
`

const IconButton = styled.div`
  border: 1px solid ${({isNotValid}) => (isNotValid)? '#ee0000' : '#000000'};
  padding: 5px 10px;
  background-color: white;
  border-radius: 0 10px 10px 0;
  height: 100%;
  position: absolute;
  right: 0;
`