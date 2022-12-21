import * as React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";

export const CarouselDot = (props) => {

    const {
        itemsCount,
        setPage,
        activePage,
        itemsToShow,
        infinity
    } = props

    const [dots, setDots] = useState([])

    function getActivePage() {
        if (!infinity) {
            return activePage
        }
        if (activePage < itemsToShow) {
            return itemsCount + activePage
        }
        if (activePage > itemsCount + itemsToShow - 1) {
            return itemsToShow
        }
        return activePage
    }

    useEffect(() => {
        const items = []
        for (let i = 0; i < itemsCount; i++) {
            items.push(
                <Dots
                    key={i}
                    activePage={getActivePage()}
                    dotIndex={(infinity)? i + itemsToShow : i}
                    onClick={() => setPage((infinity)? i + itemsToShow : i)}
                />
            )
        }
        setDots(items)
    }, [itemsCount, activePage])

    return (
        <CarouselDotBlock>
            {dots}
        </CarouselDotBlock>
    )
}

const CarouselDotBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  z-index: 1;
  width: 80%;
  height: 15%;
  gap: 10px;
`

const Dots = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ffffff;
  opacity: ${({activePage, dotIndex}) => (activePage === dotIndex) ? 0.8 : 0.5};
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`