import * as React from "react";
import styled from "styled-components";
import {cloneElement, useEffect, useState} from "react";
import {CarouselButton} from "./CarouselButton";
import {CarouselDot} from "./CarouselDot";

const AnimationTime = 300

export const Carousel = (props) => {

    const {
        children = [],
        carouselWidth = 770,
        aspect = 16/9,
        button = true,
        roundButton = false,
        infinity = true,
        dots = true,
        scroll = false,
        scrollSpeed = 5,
        itemsToShow = 1
    } = props

    const itemWidth = carouselWidth / itemsToShow
    const height = itemWidth * aspect ** -1

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
            setItems((children.length) ?
                [...cloneItems(children, children.length - itemsToShow, children.length),
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
                ] : [])
            return;
        }
        setItems((children.length) ? children.map((child) =>
            cloneElement(child, {
                style: {
                    minWidth: itemWidth,
                    minHeight: height,
                    maxWidth: itemWidth,
                    maxHeight: height
                }
            })
        ) : [])
    }, [children, infinity])

    useEffect(() => {
        if (!infinity)
            return;

        if (page < itemsToShow) {
            setTimeout(() => {
                setAnimationTime(0)
                setPage(items.length - itemsToShow - 1)
                setTimeout(() => {
                    setAnimationTime(AnimationTime)
                }, AnimationTime)
            }, AnimationTime)
            return;
        }
        if (page > items.length - itemsToShow - 1) {
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
        if (scroll && !showButton && page < items.length - 1) {
            setTimeout(() => {
                if (!showButton && page < items.length - 1) {
                    nextHandler()
                }
            }, scrollSpeed * 1000)
        }
    }, [page, scroll, showButton])

    useEffect(() => {
        if (items.length < itemsToShow) {
            setPagePosition(0)
            return;
        }
        if (-page * itemWidth - swipeWay < -itemWidth * items.length + carouselWidth) {
            setPagePosition(-itemWidth * items.length + carouselWidth)
            if (!infinity && !dots && items.length) {
                setPage(items.length - itemsToShow)
            }
            return;
        }
        if (page === 0 || page === items.length - 1) {
            setPagePosition(-page * itemWidth)
            return;
        }
        setPagePosition(-page * itemWidth - swipeWay)
    }, [page, itemWidth, swipeWay, pagePosition])

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
        if (page !== 0 && swipeWay < -itemWidth * 0.15) {
            backHandler()
        }
        if (page !== items.length - 1 && swipeWay > carouselWidth * 0.15) {
            nextHandler()
        }
        setPositionOnClick(0)
        setSwipeWay(0)
    }

    return (
        <CarouselContainer
            w={carouselWidth}
            h={height}
            onMouseOver={() => setShowButton(true)}
            onMouseOut={() => setShowButton(false)}
        >
            {(button && showButton || roundButton) ?
                <CarouselButton
                    roundButton={roundButton}
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
                        itemsCount={children.length}
                        setPage={setPage}
                        activePage={page}
                        itemsToShow={itemsToShow}
                        infinity={infinity}
                    />
                    :null
                }
            </CarouselBlock>
            {(button && showButton || roundButton) ?
                <CarouselButton
                    roundButton={roundButton}
                    onClick={nextHandler}
                />
                : null
            }
        </CarouselContainer>
    )
}

const CarouselContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: ${({h}) => h}px;
  width: ${({w}) => w}px;
  border-radius: 10px;
  cursor: pointer;
  user-select: none;
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
  img {
    -drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-drag: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
`