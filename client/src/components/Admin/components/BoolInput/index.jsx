import * as React from "react";
import styled from "styled-components"
import {useState} from "react";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";
import {CheckMark, Cross} from "../../../Icons";

export const BoolInput = (props) => {

    const {
        value = false,
        label,
        onChange
    } = props

    function changeValue() {
        onChange(!value)
    }

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
            }
            <ValueBlock>
                <YesIconBlock>
                    <CheckMark/>
                </YesIconBlock>
                <SelectValue onClick={changeValue}>
                    <LineSelect>
                        <Cursor value={value}/>
                    </LineSelect>
                </SelectValue>
                <NoIconBlock>
                    <Cross/>
                </NoIconBlock>
            </ValueBlock>
        </ContainerBlock>
    )
}

const ValueBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 110px;
`

const YesIconBlock = styled.div`
  height: 25px;
  fill: #0ebb00;
`

const NoIconBlock = styled.div`
  height: 25px;
  fill: #ee0000;
`

const SelectValue = styled.div`
  width: 60px;
  padding: 10px;
`

const LineSelect = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 3px;
  width: 100%;
  border-radius: 2px;
  background-color: #9f9e9e;
  position: relative;
`

const Cursor = styled.div`
  background-color: ${({theme}) => theme.colors.tertiary};
  width: 17px;
  height: 17px;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 #5e5e5e;
  position: absolute;
  right: ${({value}) => (value)? 23 : 0}px;
  transition: 0.4s;
`