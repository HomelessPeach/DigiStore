import * as React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";
import {Invisible, Visible} from "../Icons";

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
        w,
        ...another
    } = props

    const [visible, setVisible] = useState(false)
    const [isNotValid, setIsNotValid] = useState(false)

    useEffect(() => {
        if (validationError) {
            setIsNotValid(!validate(value))
        }
    }, [validationError])

    function onInput(event) {
        const eventValue = event.target.value
        onChange(eventValue)
        if (validationError || isNotValid) {
            setIsNotValid(!validate(eventValue))
        }
    }

    function checkValidateOnBlur(event) {
        const item = event.target.value;
        if (item) {
            setIsNotValid(!validate(item))
        }
    }

    return (
        <TextInputBlock w={w}>
            {label &&
                <LabelBlock>
                    {label}
                </LabelBlock>
            }
            <InputContainer>
                <Input
                    type={(visible) ? "text" : "password"}
                    defaultValue={value}
                    onChange={onInput}
                    onBlur={checkValidateOnBlur}
                    contentEditable={true}
                    {...another}
                />
                <IconButton
                    onClick={() => setVisible(!visible)}
                >
                    {(visible) ? <Invisible/> : <Visible/>}
                </IconButton>
            </InputContainer>
            {(isNotValid) ?
                <ValidationMessage>
                    {validationMessage}
                </ValidationMessage>
                : null
            }
        </TextInputBlock>
    )
}

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const IconButton = styled.div`
  padding: 15px 10px;
  border-radius: 0 10px 0 0;
  border-left: 1px solid black;
  background-color: rgb(237, 194, 255);
  height: 100%;
  position: absolute;
  right: 0;
  &:active {
    box-shadow: 0 0 3px 0 #888888;
  }
`

const TextInputBlock = styled.div`
  width: ${({w}) => (w) ? w : '300px'};
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
`

const LabelBlock = styled.div`
  width: 100%;
  color: #888888;
  font-size: 15px;
  padding: 0 5px;
`

const Input = styled.input`
  width: 100%;
  font-size: 16px;
  background-color: rgba(158, 0, 182, 0.3);
  border-radius: 10px 10px 0 0;
  padding: 25px 15px 15px;
  border: none;
  outline: none;
  color: #414141;

  &:focus {
    box-shadow: 0 0 3px 0 #888888;
  }
`

const ValidationMessage = styled.div`
  color: #ee0000;
  font-size: 15px;
  padding: 3px 0;
`