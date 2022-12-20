import * as React from "react";
import styled from "styled-components";
import {Arrow} from "../../Icons";

export const CarouselButton = (props) => {

    const {
        back,
        roundButton,
        onClick,
    } = props

    return (
        <ButtonContainer roundButton={roundButton} onClick={onClick} reverse={back}>
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
  height: ${({roundButton}) => (roundButton)? '50px' : '100%'};
  margin: ${({roundButton}) => (roundButton)? 1 : 0}%;
  border-radius: ${({roundButton}) => (roundButton)? 50 : 0}%;
  width: ${({roundButton}) => (roundButton)? '50px' : '10%'};
  background-color: #ffffff;
  opacity: 0.4;
  transform: rotate(${({reverse}) => (reverse) ? '180deg' : '0'});
  ${({reverse}) => (reverse) ? 'left: 0' : 'right: 0'};
  cursor: pointer;
  border-top-right-radius: ${({roundButton}) => (roundButton)? '50%' : 'inherit'};
  border-bottom-right-radius: ${({roundButton}) => (roundButton)? '50%' : 'inherit'};
  &:hover {
    opacity: 0.6;
  }
`

const IconBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 30px;
  padding: 0 5px 0 0;
  fill: #595959;
`