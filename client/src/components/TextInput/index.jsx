import * as React from "react";
import styled from "styled-components";

export const TextInput = (props) => {

    const {
        value,
        label,
        onChange,
        w,
    } = props

    function onInput(event) {
        const eventValue = event.target.value
        onChange(eventValue)
    }

    return (
        <TextInputBlock w={w}>
            {label &&
                <LabelBlock>
                    {label}
                </LabelBlock>
            }
            <Input
                defaultValue={value}
                onChange={onInput}
                contentEditable={true}
            />
        </TextInputBlock>
    )
}

const TextInputBlock = styled.div`
  width: ${({w}) => (w)? w: '300px'};
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