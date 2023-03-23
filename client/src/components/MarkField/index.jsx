import * as React from "react";
import styled from "styled-components"
import {Star} from "../Icons";

export const MarkField = (props) => {

    const {
        value
    } = props

    return (
        <MarkContainer>
            <StarBlock
                mark={value > 0}
            >
                <Star/>
            </StarBlock>
            <StarBlock
                mark={value > 1}
            >
                <Star/>
            </StarBlock>
            <StarBlock
                mark={value > 2}
            >
                <Star/>
            </StarBlock>
            <StarBlock
                mark={value > 3}
            >
                <Star/>
            </StarBlock>
            <StarBlock
                mark={value > 4}
            >
                <Star/>
            </StarBlock>
        </MarkContainer>
    )
}

const MarkContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const StarBlock = styled.div`
  width: 25px;
  height: 25px;
  fill: ${({mark}) => (mark)? '#fac917': '#000000'};
`