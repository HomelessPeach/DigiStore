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
        height = 270,
        button = true,
        infinity = true,
        dots = true,
        itemsToShow = 1
    } = props

    const [items, setItems] = useState([])
    const [page, setPage] = useState((infinity)? itemsToShow : 0)
    const [animationTime, setAnimationTime] = useState(AnimationTime)

    useEffect(() => {
        if (infinity) {
            setItems([cloneElement(children[children.length - 1], {
                style: {
                    minWidth: width,
                    minHeight: height
                }
            }),
                ...children.map((child) =>
                cloneElement(child, {
                    style: {
                        minWidth: width,
                        minHeight: height
                    }
                }
            )),
            cloneElement(children[0], {
                style: {
                    minWidth: width,
                    minHeight: height
                }
            })])
            return;
        }
        setItems(children.map((child) =>
            cloneElement(child, {
                width: width,
                height: height
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

    return (
        <CarouselContainer w={width} h={height}>
            {(button) ?
                <CarouselButton onClick={backHandler} back={true}/>
                : null
            }
            <CarouselBlock>
                <ItemsContainer animationTime={animationTime} showItem={-page * width}>
                    {items}
                </ItemsContainer>
                {(dots)?
                    <CarouselDot items={children} setPage={setPage} activePage={page} itemsToShow={itemsToShow} infinity={infinity}/>
                    :null
                }
            </CarouselBlock>
            {(button) ?
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
`

const CarouselBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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