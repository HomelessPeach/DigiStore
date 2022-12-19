import * as React from "react";
import styled from "styled-components";
import {Arrow} from "../../Icons";

export const CarouselButton = (props) => {

    const {
        back,
        onClick
    } = props

    return (
        <ButtonContainer onClick={onClick} reverse={back}>
            <IconBlock>
                <Arrow/>
            </IconBlock>
        </ButtonContainer>
    )

}

const ButtonContainer = styled.div`
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 10%;
  padding: 10px;
  background-color: #ffffff;
  opacity: 0.4;
  transform: rotate(${({reverse}) => (reverse) ? '180deg' : '0'});
  ${({reverse}) => (reverse)? 'left: 0' : 'right: 0'};
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`

const IconBlock = styled.div`
  width: 25px;
  fill: #595959;
`