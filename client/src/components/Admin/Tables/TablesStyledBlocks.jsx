import * as React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const ListContainer = styled.div`
  padding: 10px;
`

export const EditContainer = styled.div`
  padding: 10px;
`

export const ShowContainer = styled.div`
  padding: 10px;
`

export const ToolbarBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 10px 0 30px;
  user-select: none;
`

export const EditToolbarBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 20px 30px;
  user-select: none;
`

export const LinkButton = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 45px;
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

export const DeleteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 45px;
  background-color: #ff4646;
  border-radius: 10px;
  color: white;
  text-decoration: none;
  box-shadow: 0 0 10px 0 #5e5e5e;
  margin: 0 10px;
  text-align: center;
  padding: 3px;
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
`

export const Button = styled.div`
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
  &:disabled {
    box-shadow: none;
    pointer-events: none;
  }
`
export const LabelBlock = styled.div`
  font-size: 14px;
  padding: 7px 0;
  color: #888888;
  display: flex;
  align-items: center;
`

export const ContainerBlock = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  padding: 5px;
`