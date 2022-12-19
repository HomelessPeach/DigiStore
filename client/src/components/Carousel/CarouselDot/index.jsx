import * as React from "react";
import styled from "styled-components";
import {useEffect, useState} from "react";

export const CarouselDot = (props) => {

    const {
        items,
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
        if (activePage === 0) {
            return items.length + itemsToShow - 1
        }
        if (activePage > items.length) {
            return itemsToShow
        }
        return activePage
    }

    useEffect(() => {
        setDots(items.map((item, index) => {
            return <Dots activePage={getActivePage()} dotIndex={(infinity)? index + itemsToShow : index} onClick={() => setPage((infinity)? index + itemsToShow : index)}/>
        }))
    }, [items, activePage])

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
  width: 66%;
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