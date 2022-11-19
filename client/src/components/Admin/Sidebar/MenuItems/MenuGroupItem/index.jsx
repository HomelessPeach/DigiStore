import {useState} from "react";
import {Arrow} from "../../Icons";
import * as React from "react";
import {MenuItems} from "../index";
import styled from "styled-components";

export const MenuGroupItem = (props) => {

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
            {(isOpen)?
                <SidebarGroupWrapper>
                    <MenuItems items={item.items} paddingLeft={paddingLeft + 10}/>
                </SidebarGroupWrapper>
                : null
            }
        </>
    )
}

const MenuTitleBlock = styled.div`
  --padding-top-bootom: 5px;
  width: 100%;
  font-size: var(--sidebar-font-size);
  padding: var(--item-padding-vertical) 10px var(--item-padding-vertical) ${({paddingLeft}) => paddingLeft}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: ${({theme}) => theme.fonts.mainFont};
  background-color: ${({theme, isOpen}) => (isOpen)? 'rgba(177, 58, 142, 0.5)': theme.colors.secondary};
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