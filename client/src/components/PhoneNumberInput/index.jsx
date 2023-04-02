import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {LabelBlock} from "../ComponentsStyledBlocks";

export const PhoneNumberInput = (props) => {

    const {
        value = '',
        label,
        validation: {
            validate = () => true,
            validationError = false,
            validationMessage = 'Некорректно введён номер телефона',
        } = {
            validate: () => true,
            validationError: false,
            validationMessage: 'Некорректно введён номер телефона',
        },
        onChange,
        w
    } = props

    const [number, setNumber] = useState(value.split('') || Array(10))
    const [isNotValid, setIsNotValid] = useState(false)
    const inputRefs = [];


    useEffect(() => {
        if (validationError) {
            setIsNotValid(!validate(number.join('')))
        }
    }, [validationError])

    useEffect(() => {
        setNumber(value.split(''))
    }, [value])

    function onInput(event) {
        const item = event.target.value
        const index = Number(event.target.dataset.index);
        let stringNumber = number.join('')
        let countNumbers = index
        if (!isNaN(parseFloat(item)) && isFinite(item)) {
            number[index] = item
            stringNumber = number.join('')
            countNumbers++
            setNumber(number)
            onChange(stringNumber)
            if (index < 9) {
                inputRefs[countNumbers].focus();
                inputRefs[countNumbers].select();
            } else {
                inputRefs[index].blur();
            }
        } else {
            number[countNumbers] = ''
            event.target.value = ''
        }
        if (validationError || stringNumber.length !== checkRow(number)) {
            setIsNotValid(!validate(stringNumber))
        } else {
            setIsNotValid(false)
        }
    }

    function checkBackSpace(event) {
        const index = Number(event.target.dataset.index);
        const key = event.key
        let stringNumber = number.join('')
        if (key === "Backspace") {
            if (inputRefs[index].value) {
                inputRefs[index].value = ''
                number[index] = ''
            } else if (index > 0) {
                inputRefs[index - 1].value = ''
                number[index - 1] = ''
                inputRefs[index - 1].focus();
                inputRefs[index - 1].select();
            }
            stringNumber = number.join('')
        } else if (key <= 9) {
            number[index] = ''
            inputRefs[index].value = ''
        }
        if (validationError || stringNumber.length !== checkRow(number)) {
            setIsNotValid(!validate(stringNumber))
        } else {
            setIsNotValid(false)
        }
    }

    function checkRow(array) {
        let result = 0
        for (let item of array) {
            if (!item)
                break
            result++
        }
        return result
    }

    return (
        <ContainerBlock w={w}>
            {(label)?
                <LabelBlock
                    isNotValid={isNotValid}
                >
                    {label}
                </LabelBlock>
                :null
            }
            <PhoneNumberBlock>
                <TextBlock>+7&nbsp;(</TextBlock>
                <InputBlock
                    isNotValid={isNotValid}
                    defaultValue={number[0]}
                    data-index={0}
                    ref={input => inputRefs[0] = input}
                    onInput={onInput}
                    onKeyDown={checkBackSpace}
                    maxLength={1}
                />
                <InputBlock
                    isNotValid={isNotValid}
                    defaultValue={number[1]}
                    data-index={1}
                    ref={input => inputRefs[1] = input}
                    onChange={onInput}
                    onKeyDown={checkBackSpace}
                    maxLength={1}
                />
                <InputBlock
                    isNotValid={isNotValid}
                    defaultValue={number[2]}
                    data-index={2}
                    ref={input => inputRefs[2] = input}
                    onChange={onInput}
                    onKeyDown={checkBackSpace}
                    maxLength={1}
                />
                <TextBlock>)&nbsp;</TextBlock>
                <InputBlock
                    isNotValid={isNotValid}
                    defaultValue={number[3]}
                    data-index={3}
                    ref={input => inputRefs[3] = input}
                    onChange={onInput}
                    onKeyDown={checkBackSpace}
                    maxLength={1}
                />
                <InputBlock
                    isNotValid={isNotValid}
                    defaultValue={number[4]}
                    data-index={4}
                    ref={input => inputRefs[4] = input}
                    onChange={onInput}
                    onKeyDown={checkBackSpace}
                    maxLength={1}
                />
                <InputBlock
                    isNotValid={isNotValid}
                    defaultValue={number[5]}
                    data-index={5}
                    ref={input => inputRefs[5] = input}
                    onChange={onInput}
                    onKeyDown={checkBackSpace}
                    maxLength={1}
                />
                <TextBlock>-</TextBlock>
                <InputBlock
                    isNotValid={isNotValid}
                    defaultValue={number[6]}
                    data-index={6}
                    ref={input => inputRefs[6] = input}
                    onChange={onInput}
                    onKeyDown={checkBackSpace}
                    maxLength={1}
                />
                <InputBlock
                    isNotValid={isNotValid}
                    defaultValue={number[7]}
                    data-index={7}
                    ref={input => inputRefs[7] = input}
                    onChange={onInput}
                    onKeyDown={checkBackSpace}
                    maxLength={1}
                />
                <TextBlock>-</TextBlock>
                <InputBlock
                    isNotValid={isNotValid}
                    defaultValue={number[8]}
                    data-index={8}
                    ref={input => inputRefs[8] = input}
                    onChange={onInput}
                    onKeyDown={checkBackSpace}
                    maxLength={1}
                />
                <InputBlock
                    isNotValid={isNotValid}
                    defaultValue={number[9]}
                    data-index={9}
                    ref={input => inputRefs[9] = input}
                    onChange={onInput}
                    onKeyDown={checkBackSpace}
                    maxLength={1}
                />
            </PhoneNumberBlock>
            {(isNotValid)?
                <ValidationMessage>
                    {validationMessage}
                </ValidationMessage>
                : null
            }
        </ContainerBlock>
    )
}

const PhoneNumberBlock = styled.div`
  display: flex;
  align-items: center;
  min-height: 40.5px;
  width: 310px;
`

const TextBlock = styled.div`
  color: ${({isNotValid}) => (isNotValid)? '#ee0000' : '#000000'};
  white-space: nowrap;
`

const InputBlock = styled.input`
  border: none;
  outline: none;
  border-radius: 10px;
  font-size: 16px;
  width: 22px;
  height: 30px;
  margin: 0.7%;
  text-align: center;
  background-color: rgba(158, 0, 182, 0.3);
  &:focus {
    box-shadow: 0 0 3px 0 #888888;
  }
`

const ValidationMessage = styled.div`
  color: #ee0000;
  font-size: 13px;
  padding: 3px 0;
`

const ContainerBlock = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  padding: 5px;
  gap: 5px;
  width: ${({w}) => (w)? w: '300px'};
`