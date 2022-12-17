import {useState} from "react";
import {Arrow} from "../../../Icons";
import * as React from "react";
import {MenuItems} from "../index";
import styled from "styled-components";

export const MenuGroupItem = (props) => {

    const {
        item,
        paddingLeft
    } = props

    const [isOpen, setOpen] = useState(true)

    return (
        <>
            <MenuTitleBlock onClick={() => setOpen(!isOpen)} isOpen={isOpen} paddingLeft={paddingLeft + 10}>
                <IconBlock>
                    <IconTitleGroupBlock isOpen={isOpen}>
                        <Arrow/>
                    </IconTitleGroupBlock>
                </IconBlock>
                <TextBlock>
                    {item.name}
                </TextBlock>
            </MenuTitleBlock>
            {(isOpen)?
                <SidebarGroupWrapper>
                    <MenuItems items={item.items} paddingLeft={paddingLeft + 20}/>
                </SidebarGroupWrapper>
                : null
            }
        </>
    )
}

const MenuTitleBlock = styled.div`
  width: 100%;
  font-size: var(--sidebar-font-size);
  padding: var(--item-padding-vertical) 10px var(--item-padding-vertical) ${({paddingLeft}) => paddingLeft}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: ${({theme}) => theme.fonts.mainFont};
  color: ${({isOpen}) => (isOpen)? '#424242' : '#000000'};
  fill: ${({isOpen}) => (isOpen)? '#424242' : '#000000'};
}
`

const SidebarGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
`

const IconTitleGroupBlock = styled.div`
  height: 100%;
  transform: rotate(${({isOpen}) => (isOpen) ? 90: 0}deg);
  transition: transform 0.2s ease-out;
`

const IconBlock = styled.div`
  width: 15%;
  height: var(--icon-height);
  display: flex;
  align-items: center;
`

const TextBlock = styled.div`
  width: 85%;
`