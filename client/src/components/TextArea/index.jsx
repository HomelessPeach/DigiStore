import * as React from "react";
import styled from "styled-components";

export const TextArea = (props) => {

    const {
        value,
        label,
        onChange,
        rows = 10,
        w,
        ...another
    } = props

    function onInput(event) {
        const item = event.target.value;
        onChange(item)
    }

    return (
        <TextInputBlock w={w}>
            {label &&
                <LabelBlock>
                    {label}
                </LabelBlock>
            }
            <TextAreaBlock
                defaultValue={(value)? value : ''}
                rows={rows}
                onChange={onInput}
                {...another}
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

const TextAreaBlock = styled.textarea`
  border: none;
  border-radius: 10px;
  font-size: 16px;
  padding: 10px 15px;
  line-height: 1.5;
  width: 100%;
  overflow: visible;
  resize: none;
  outline: none;
  background-color: rgba(158, 0, 182, 0.3);
  &:focus {
    box-shadow: 0 0 3px 0 #888888;
  }
`