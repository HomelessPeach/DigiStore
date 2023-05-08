import * as React from "react";
import {Star} from "../../../Icons";
import styled from "styled-components";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const RatingField = (props) => {

    const {
        value,
        label
    } = props

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
            }
            <RatingProduct>
                <ProductRating>
                    {value?.toFixed(1) || '0.0'}
                </ProductRating>
                <RatingIcon>
                    <Star/>
                </RatingIcon>
            </RatingProduct>
        </ContainerBlock>
    )
}

const RatingProduct = styled.div`
  display: flex;
  flex-direction: row;
  align-items: start;
  gap: 5px;
  user-select: none;
`

const RatingIcon = styled.div`
  width: 20px;
  height: 20px;
  fill: #fac917;
`

const ProductRating = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
  line-height: 1.5;
  color: #000000;
`