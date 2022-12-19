import * as React from "react";
import styled from "styled-components";
import {cloneElement, useEffect, useState} from "react";
import {CarouselButton} from "./CarouselButton";
import {CarouselDot} from "./CarouselDot";

const AnimationTime = 300

export const Carousel = (props) => {

    const {
        children,
        width = 480,
        itemWidth = 480,
        height = 270,
        button = true,
        infinity = true,
        dots = true,
        scroll = true,
        scrollSpeed = 5,
        itemsToShow = 1
    } = props

    const [showButton, setShowButton] = useState(false)
    const [items, setItems] = useState([])
    const [page, setPage] = useState((infinity)? itemsToShow : 0)
    const [animationTime, setAnimationTime] = useState(AnimationTime)
    const [positionOnClick, setPositionOnClick] = useState(0)
    const [swipeWay, setSwipeWay] = useState(0)
    const [pagePosition, setPagePosition] = useState((infinity)? -itemWidth * itemsToShow: 0)

    useEffect(() => {

        function cloneItems(children, start, end) {
            let items = []
            for (let i = start; i < end; i++) {
                items.push(cloneElement(children[i], {
                    style: {
                        minWidth: itemWidth,
                        minHeight: height,
                        maxWidth: itemWidth,
                        maxHeight: height
                    }
                }))

            }
            return items
        }

        if (infinity) {
            setItems([
                ...cloneItems(children, children.length - itemsToShow, children.length),
                ...children.map((child) =>
                    cloneElement(child, {
                            style: {
                                minWidth: itemWidth,
                                minHeight: height,
                                maxWidth: itemWidth,
                                maxHeight: height
                            }
                        }
                    )),
                ...cloneItems(children, 0, itemsToShow),
            ])
            return;
        }
        setItems(children.map((child) =>
            cloneElement(child, {
                minWidth: itemWidth,
                minHeight: height,
                maxWidth: itemWidth,
                maxHeight: height
            })
        ))
    }, [children, infinity])

    useEffect(() => {
        if (!infinity)
            return;

        if (page === 0) {
            setTimeout(() => {
                setAnimationTime(0)
                setPage(items.length - itemsToShow - 1)
                setTimeout(() => {
                    setAnimationTime(AnimationTime)
                }, AnimationTime)
            }, AnimationTime)
            return;
        }
        if (page === items.length - 1) {
            setTimeout(() => {
                setAnimationTime(0)
                setPage(itemsToShow)
                setTimeout(() => {
                    setAnimationTime(AnimationTime)
                }, AnimationTime)
            }, AnimationTime)
        }

    }, [infinity, page])

    useEffect(() => {
        if (scroll && showButton === false && page < items.length - 1) {
            setTimeout(nextHandler, scrollSpeed * 1000)
        }
    }, [page, scroll, showButton])

    useEffect(() => {
        if (page === 0 || page === items.length - 1) {
            setPagePosition(-page * itemWidth)
            return
        }
        setPagePosition(-page * itemWidth - swipeWay)
    }, [page, swipeWay])

    function nextHandler() {
        if (items.length - 1 !== page) {
            setPage(page + 1)
        }
    }

    function backHandler() {
        if (page !== 0) {
            setPage(page - 1)
        }
    }

    function mouseDownHandler(event) {
        setPositionOnClick(event.clientX)
    }

    function mouseMoveHandler(event) {
        if (positionOnClick > 0) {
            setSwipeWay(positionOnClick - event.clientX)
        }
    }

    function mouseUpHandler() {
        if (page !== 0 && swipeWay < -itemWidth * 0.2) {
            backHandler()
        }
        if (page !== items.length - 1 && swipeWay > width * 0.2) {
            nextHandler()
        }
        setPositionOnClick(0)
        setSwipeWay(0)
    }

    return (
        <CarouselContainer
            w={width}
            h={height}
            onMouseOver={() => setShowButton(true)}
            onMouseOut={() => setShowButton(false)}
        >
            {(button && showButton) ?
                <CarouselButton
                    onClick={backHandler}
                    back={true}
                />
                : null
            }
            <CarouselBlock>
                <ItemsContainer
                    onMouseDown={mouseDownHandler}
                    onMouseMove={mouseMoveHandler}
                    onMouseUp={mouseUpHandler}
                    onMouseLeave={mouseUpHandler}
                    animationTime={animationTime}
                    showItem={pagePosition}
                >
                    {items}
                </ItemsContainer>
                {(dots)?
                    <CarouselDot
                        items={children}
                        setPage={setPage}
                        activePage={page}
                        itemsToShow={itemsToShow}
                        infinity={infinity}
                    />
                    :null
                }
            </CarouselBlock>
            {(button && showButton) ?
                <CarouselButton onClick={nextHandler}/>
                : null
            }
        </CarouselContainer>
    )
}

const CarouselContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: ${({h}) => h}px;
  width: ${({w}) => w}px;
  user-select: none;
  border-radius: 10px;
  cursor: pointer;
`

const CarouselBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: inherit;
  overflow: hidden;
`

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  transform: translateX(${({showItem}) => showItem}px);
  transition: ${({animationTime}) => animationTime}ms;
`