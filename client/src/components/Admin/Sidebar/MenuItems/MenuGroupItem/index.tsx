import {FC, ReactElement, useState} from 'react';
import {SidebarItem} from '../../../index';
import {Arrow} from "../../Icons";
import * as React from "react";
import {MenuItems} from "../index";
import styled from "styled-components";

export interface MenuGroupItemProps {
    item: SidebarItem
    paddingLeft: number
}



export const MenuGroupItem: FC<MenuGroupItemProps> = (props) => {

    const {
        item,
        paddingLeft
    } = props

    const [isOpen, setOpen] = useState(false)

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
            {(isOpen && item.items)?
                <SidebarGroupWrapper>
                    <MenuItems items={item.items} paddingLeft={paddingLeft + 10}/>
                </SidebarGroupWrapper>
                : null
            }
        </>
    )
}

interface MenuTitleBlock {
    isOpen: boolean
    paddingLeft: number
}

interface IconTitleGroupBlockProps {
    isOpen: boolean
}

const MenuTitleBlock = styled.div<MenuTitleBlock>`
  --padding-top-bootom: 5px;
  width: 100%;
  font-size: var(--sidebar-font-size);
  padding: var(--item-padding-vertical) 10px var(--item-padding-vertical) ${({paddingLeft}) => paddingLeft}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: ${({theme}) => theme.fonts.mainFont};
  background-color: ${({theme, isOpen}: any) => (isOpen)? 'rgba(177, 58, 142, 0.5)': theme.colors.secondary};
}
`

const SidebarGroupWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
`

const IconTitleGroupBlock = styled.div<IconTitleGroupBlockProps>`
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