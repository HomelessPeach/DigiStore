import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const ReachTextInput = (props) => {

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
    } = props

    const [isNotValid, setIsNotValid] = useState(false)
    const [content, setContent] = useState()

    useEffect(() => {
        setContent(value)
    }, [])

    useEffect(() => {
        if (validationError) {
            setIsNotValid(!validate(value))
        }
    }, [validationError])

    function onInput(event) {
        const item = event.target.innerHTML;
        onChange(item)
        if (validationError || isNotValid) {
            setIsNotValid(!validate(item))
        }
    }

    function checkValidateOnBlur(event) {
        const item = event.target.innerHTML;
        if (item) {
            setIsNotValid(!validate(item))
        }
    }

    const modifyText = (command, defaultUi, value) => {
        document.execCommand(command, defaultUi, value);
    };

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
            <ReachTextBlock isNotValid={isNotValid}>
                <RichTextOptions>
                    <RichTextOptionsLine>
                        <OptionButton
                            onClick={() => modifyText('bold',false, null)}
                        >
                            <i className="fa-solid fa-bold"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('italic',false, null)}
                        >
                            <i className="fa-solid fa-italic"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('underline',false, null)}
                        >
                            <i className="fa-solid fa-underline"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('strikethrough',false, null)}
                        >
                            <i className="fa-solid fa-strikethrough"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('superscript',false, null)}
                        >
                            <i className="fa-solid fa-superscript"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('subscript',false, null)}
                        >
                            <i className="fa-solid fa-subscript"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('insertOrderedList',false, null)}
                        >
                            <div className="fa-solid fa-list-ol"></div>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('insertUnorderedList',false, null)}
                        >
                            <i className="fa-solid fa-list"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('undo',false, null)}
                        >
                            <i className="fa-solid fa-rotate-left"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('redo',false, null)}
                        >
                            <i className="fa-solid fa-rotate-right"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => {
                                let userLink = prompt("Enter a URL");
                                if (!/http/i.test(userLink)) {
                                    userLink = "http://" + userLink;
                                }
                                modifyText('createLink', false, userLink);
                            }}
                            onChange={(event) => modifyText('createLink',false, event.target.value)}
                        >
                            <i className="fa fa-link"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('unlink',false, null)}
                        >
                            <i className="fa fa-unlink"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('justifyLeft',false, null)}
                        >
                            <i className="fa-solid fa-align-left"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('justifyCenter',false, null)}
                        >
                            <i className="fa-solid fa-align-center"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('justifyRight',false, null)}
                         >
                            <i className="fa-solid fa-align-right"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('justifyFull',false, null)}
                        >
                            <i className="fa-solid fa-align-justify"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('indent',false, null)}
                        >
                            <i className="fa-solid fa-indent"></i>
                        </OptionButton>
                        <OptionButton
                            onClick={() => modifyText('outdent',false, null)}
                        >
                            <i className="fa-solid fa-outdent"></i>
                        </OptionButton>
                    </RichTextOptionsLine>
                    <RichTextOptionsLine>
                        <OptionSelect
                            onChange={(event) => modifyText('formatBlock',false, event.target.value)}
                        >
                            <option value="H1">H1</option>
                            <option value="H2">H2</option>
                            <option value="H3">H3</option>
                            <option value="H4">H4</option>
                            <option value="H5">H5</option>
                            <option value="H6">H6</option>
                        </OptionSelect>

                        <OptionSelect
                            onChange={(event) => modifyText('fontName',false, event.target.value)}
                        >
                            <option value="Arial">Arial</option>
                            <option value="Verdana">Verdana</option>
                            <option value="Times New Roman">Times New Roman</option>
                            <option value="Garamond">Garamond</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Courier New">Courier New</option>
                            <option value="cursive">cursive</option>
                        </OptionSelect>
                        <OptionSelect
                            onChange={(event) => modifyText('fontSize', false, event.target.value)}
                            defaultValue={4}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </OptionSelect>

                        <InputColorContainer>
                            <InputColor
                                type="color"
                                onChange={(event) => modifyText('foreColor',false, event.target.value)}
                            />
                            <OptionLabel htmlFor="foreColor">Font Color</OptionLabel>
                        </InputColorContainer>
                        <InputColorContainer>
                            <InputColor
                                type="color"
                                onChange={(event) => modifyText('backColor',false, event.target.value)}
                            />
                            <OptionLabel htmlFor="backColor">Highlight Color</OptionLabel>
                        </InputColorContainer>

                    </RichTextOptionsLine>
                </RichTextOptions>

                <ReachTextInputBlock>
                    <InputBlock
                        defaultValue={(value)? value : ''}
                        onInput={onInput}
                        onBlur={checkValidateOnBlur}
                        isNotValid={isNotValid}
                        contentEditable={true}
                        dangerouslySetInnerHTML={{__html: content}}
                    />
                </ReachTextInputBlock>

            </ReachTextBlock>
            {(isNotValid)?
                <ValidationMessage>
                    {validationMessage}
                </ValidationMessage>
                : null
            }
        </ContainerBlock>
    )
}

const ReachTextBlock = styled.div`
  border: 1px solid ${({isNotValid}) => (isNotValid)? '#ee0000' : '#000000'};
  background-color: #ffffff;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid ${({isNotValid}) => (isNotValid)? '#ee0000' : '#000000'};
`

const RichTextOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 0;
`

const RichTextOptionsLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 15px;
  width: 100%;
  padding: 10px 20px;
  
`

const OptionButton = styled.button`
  height: 28px;
  width: 28px;
  display: grid;
  place-items: center;
  border-radius: 3px;
  border: none;
  background-color: #ffffff;
  box-shadow: 0 0 2px 0 #817b7b;
  outline: none;
  color: #020929;
  &:active {
    background-color: rgba(177, 58, 142, 0.6);
    box-shadow: none;
  }
`

const OptionSelect = styled.select`
  padding: 7px;
  border: 1px solid #020929;
  border-radius: 3px;
  font-family: "Poppins", sans-serif;
`

const OptionLabel = styled.div`
  font-family: "Poppins", sans-serif;
`

const ValidationMessage = styled.div`
  color: #ee0000;
  font-size: 13px;
  padding: 3px 0;
`

const InputColorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const InputColor = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  width: 40px;
  height: 28px;
  border: none;
  cursor: pointer;
  &::-webkit-color-swatch {
    border-radius: 15px;
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 3px #020929;
  }
  &::-moz-color-swatch {
    border-radius: 15px;
    box-shadow: 0 0 0 2px #ffffff, 0 0 0 3px #020929;
  }
`

const ReachTextInputBlock = styled.div`
  padding: 10px 20px 15px;
  width: 100%;
`

const InputBlock = styled.div`
  border: 1px solid ${({isNotValid}) => (isNotValid)? '#ee0000' : '#000000'};
  border-radius: 10px;
  padding: 10px 25px;
  height: 600px;
  overflow-y: auto;
`