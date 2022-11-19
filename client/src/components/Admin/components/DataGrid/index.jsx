import * as React from "react";
import styled from "styled-components"
import {NavLink, useLocation} from "react-router-dom";
import {AdminRouteNames} from "../../../../Router";

export const DataGrid = (props) => {

    const {
        data,
        children,
        idName
    } = props

    const {pathname} = useLocation()

    console.log(props)

    return (
        <DataGridBlock data={data}>
            <HeaderBlock>
                {
                    children.map((child) =>
                        <HeaderItemTitleBlock widthField={100 / children.length}>
                            {child.props.name}
                        </HeaderItemTitleBlock>
                    )
                }
            </HeaderBlock>
            {
                (data.length)?
                    data.map((item) =>
                        <ItemBlock
                            to={`${pathname}/${item[idName]}`}
                        >
                            {
                                children.map((child) =>
                                    <ItemValueBlock widthField={100 / children.length}>
                                        {{...child, props: {...props, value: item[child.props.source]}}}
                                    </ItemValueBlock>
                                )
                            }
                        </ItemBlock>
                    )
                    :

                    <ItemEmptyBlock>
                        Эта таблица пуста
                    </ItemEmptyBlock>

            }
        </DataGridBlock>
    )

}

const DataGridBlock = styled.div`
  border: 1px solid ${({theme}) => theme.colors.primary};
  border-radius: 10px;
`

const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({theme}) => theme.colors.primary};
`

const HeaderItemTitleBlock = styled.div`
  width: ${({widthField}) => widthField}%;
  color: #000000;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px 5px;
`

const ItemBlock = styled(NavLink)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${({theme}) => theme.colors.primary};
  text-decoration: none;
  color: #000000;
  &:last-child {
    border-bottom: none;
  }
`

const ItemValueBlock = styled.div`
  width: ${({widthField}) => widthField}%;
  padding: 10px 5px;
`

const ItemEmptyBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
`