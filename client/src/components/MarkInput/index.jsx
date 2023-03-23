import * as React from "react";
import styled from "styled-components"
import {Star} from "../Icons";
import {useEffect, useState} from "react";

export const MarkInput = (props) => {

    const {
        value = 0,
        onChange
    } = props

    const [mouseOver, setMouseOver] = useState(value)
    const [mark, setMark] = useState(value)

    useEffect(() => {
        onChange(mark)
    }, [mark])

    return (
        <MarkContainer>
            <StarBlock
                mark={mouseOver > 0}
                onMouseOver={() => setMouseOver(1)}
                onMouseOut={() => setMouseOver(mark)}
                onClick={() => setMark(1)}
            >
                <Star/>
            </StarBlock>
            <StarBlock
                mark={mouseOver > 1}
                onMouseOver={() => setMouseOver(2)}
                onMouseOut={() => setMouseOver(mark)}
                onClick={() => setMark(2)}
            >
                <Star/>
            </StarBlock>
            <StarBlock
                mark={mouseOver > 2}
                onMouseOver={() => setMouseOver(3)}
                onMouseOut={() => setMouseOver(mark)}
                onClick={() => setMark(3)}
            >
                <Star/>
            </StarBlock>
            <StarBlock
                mark={mouseOver > 3}
                onMouseOver={() => setMouseOver(4)}
                onMouseOut={() => setMouseOver(mark)}
                onClick={() => setMark(4)}
            >
                <Star/>
            </StarBlock>
            <StarBlock
                mark={mouseOver > 4}
                onMouseOver={() => setMouseOver(5)}
                onMouseOut={() => setMouseOver(mark)}
                onClick={() => setMark(5)}
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