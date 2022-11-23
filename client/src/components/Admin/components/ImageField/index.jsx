import styled from "styled-components";
import * as React from "react";
import {baseUrl} from "../../../../services";

export const ImageField = (props) => {

    const {
        value,
        label,
        size: {h, w}
    } = props

    return (
        <ImageFieldBlock h={h} w={w}>
            <LabelBlock>{label}</LabelBlock>
            <ImgBlock src={(value !== '')? `${baseUrl}${value}` : ''}/>
        </ImageFieldBlock>
    )

}

const ImageFieldBlock = styled.div`
  border: 1px solid ${({theme}) => theme.colors.tertiary};
  border-radius: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 1.5;
  padding: 5px;
  height: ${({h}) => h};
  width: ${({w}) => w};
`

const ImgBlock = styled.div`
  max-width: 100%;
  max-height: 100%;
  background: no-repeat url(${({src}) => src})
`

const LabelBlock = styled.div`
  font-size: 12px;
  color: #888888;
  display: flex;
  align-items: center;
`