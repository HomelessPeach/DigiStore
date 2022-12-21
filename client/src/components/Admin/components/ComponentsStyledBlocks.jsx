import * as React from "react";
import styled from "styled-components";

export const LabelBlock = styled.div`
  font-size: 14px;
  padding: 7px 0;
  color: ${({isNotValid}) => (!isNotValid)? '#888888' : '#ee0000'};
  display: flex;
  align-items: center;
`

export const ContainerBlock = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.5;
  padding: 5px;
  gap: 5px;
`