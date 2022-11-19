import * as React from "react";
import styled from "styled-components"
import {NavLink} from "react-router-dom";
import {AdminRouteNames} from "../../../Router";

export const DataGrid = (props) => {

    const {
        headerFields,
        data,
        idName
    } = props

    return (
        <DataGridBlock>
            <HeaderBlock>
                {
                    headerFields.map((headerItem) =>
                        <HeaderItemTitleBlock widthField={100 / headerFields.length}>
                            {headerItem.name}
                        </HeaderItemTitleBlock>
                    )
                }
            </HeaderBlock>
            {
                data.map((item) =>
                    <ItemBlock
                        to={`${AdminRouteNames.ADMIN_USERS}/${item[idName]}`}
                    >
                        {
                            headerFields.map((headerItem) =>
                                <ItemValueBlock widthField={100 / headerFields.length}>
                                    {item[`${headerItem.field}`]}
                                </ItemValueBlock>
                            )
                        }
                    </ItemBlock>
                )
            }
        </DataGridBlock>
    )

}

const DataGridBlock = styled.div`
  
`

const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({theme}) => theme.colors.primary};
`

const HeaderItemTitleBlock = styled.div`
  width: ${({widthField}) => widthField}%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px 5px;
`

const ItemBlock = styled(NavLink)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({theme}) => theme.colors.primary};
`

const ItemValueBlock = styled.div`
  width: ${({widthField}) => widthField}%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px 5px;
`