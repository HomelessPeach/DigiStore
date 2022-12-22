import * as React from "react";
import styled from "styled-components"
import {useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {Back, Next} from "../../../Icons";
import {AdminNotFound} from "../../../../pages/Admin/AdminNotFound";

export const DataGrid = (props) => {

    const {
        getData,
        children,
        idName = 'id',
        pagination = 10
    } = props

    const [sort, setSort] = useState(idName)
    const [order, setOrder] = useState('ASC')
    const [page, setPage] = useState(0)

    const {pathname} = useLocation()

    function changeSort(sortName) {
        if (sortName === sort) {
            if (order === 'ASC') {
                setOrder('DESC')
            } else {
                setOrder('ASC')
            }
        } else {
            setSort(sortName)
            setOrder('ASC')
        }
    }

    const {data: response, isLoading} = getData({limit: pagination, offset: pagination * page, sort: sort, order: order}, {refetchOnFocus: true})

    if (isLoading)
        return <h1>Loading...</h1>

    if (!response && !isLoading)
        return <AdminNotFound/>

    const {data, totalCount} = response

    function getPagesButton() {
        const items = []
        for (let i = 0; i < totalCount/pagination; i++) {
            items.push(
                <ButtonBlock onClick={() => setPage(i)} pageNumber={i} activePage={page}>
                    <ButtonItemBlock>
                        {i + 1}
                    </ButtonItemBlock>
                </ButtonBlock>
            )
        }
        return items
    }

    return (
        <DataGridBlock>
            <GridBlock>
                {(children)?
                    <>
                        <HeaderBlock>
                            {
                                children.map((child, index) =>
                                    (child.props.sortable)?
                                        <HeaderItemTitleBlock key={index} widthField={100 / children.length}>
                                            <TextBlock onClick={() => changeSort(child.props.source)} >
                                              {child.props.name}
                                            </TextBlock>
                                        </HeaderItemTitleBlock>
                                        :
                                        <HeaderItemTitleBlock key={index} widthField={100 / children.length}>
                                            {child.props.name}
                                        </HeaderItemTitleBlock>
                                )
                            }
                        </HeaderBlock>
                        {(totalCount > 0)?
                            data.map((item, index) =>
                                <ItemBlock
                                    key={index}
                                    to={`${pathname}/${item[idName]}`}
                                >
                                    {
                                        children.map((child, index) =>
                                            <ItemValueBlock key={index} widthField={100 / children.length}>
                                                {{...child, props: {...child.props, value: item[child.props.source]}}}
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
                    </>
                    :
                    <ItemEmptyBlock>
                        Нет данных для отображения
                    </ItemEmptyBlock>
                }
            </GridBlock>
            {(totalCount > 0)?
                <PageBlock>
                    <ButtonBlock onClick={() => (page > 0)? setPage(page - 1) : null} pageNumber={null} activePage={page}>
                        <ButtonItemBlock>
                            <Back/>
                        </ButtonItemBlock>
                    </ButtonBlock>
                    {getPagesButton()}
                    <ButtonBlock onClick={() => (page < totalCount/pagination - 1)? setPage(page + 1) : null} pageNumber={null} activePage={page}>
                        <ButtonItemBlock>
                            <Next/>
                        </ButtonItemBlock>
                    </ButtonBlock>
                </PageBlock>
                : null
            }
        </DataGridBlock>
    )

}

const DataGridBlock = styled.div`
  padding: 10px 0;
`

const GridBlock = styled.div`
  border: 1px solid #9f9e9e;
  border-radius: 10px;
`

const PageBlock = styled.div`
  padding: 20px;
  --font-size: 17px;
  display: flex;
  flex-direction: row;
  justify-content: end;
  user-select: none;
`

const ButtonBlock = styled.div`
  border-radius: 50px;
  margin: 0 2px;
  padding: 3px;
  background-color: ${({pageNumber, activePage}) => (pageNumber === activePage)? '#cecdcd': null};
  &:hover {
    background-color: #cecdcd;
  }
`

const ButtonItemBlock = styled.div`
  height: var(--font-size);
  width: var(--font-size);
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeaderBlock = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #9f9e9e;
  user-select: none;
`

const HeaderItemTitleBlock = styled.div`
  width: ${({widthField}) => widthField}%;
  color: #000000;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px 5px;
`

const TextBlock = styled.div`
  cursor: pointer;
  line-height: 1.5;
`

const ItemBlock = styled(NavLink)`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #9f9e9e;
  text-decoration: none;
  color: #000000;
  &:last-child {
    border-bottom: none;
  }
`

const ItemValueBlock = styled.div`
  width: ${({widthField}) => widthField}%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ItemEmptyBlock = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
`