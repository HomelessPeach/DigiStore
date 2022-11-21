import * as React from "react";
import styled from "styled-components"
import {useState} from "react";
import {NavLink, useLocation} from "react-router-dom";
import {Back, Next} from "../../Icons";

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

    const {data: response, isLoading} = getData({limit: pagination, offset: pagination * page, sort: sort, order: order})

    if (isLoading)
        return <h1>Loading...</h1>

    const {data, totalCount} = response
    const maxPageCount = String(10 ** Math.ceil(totalCount/pagination) - 1).split('')

    return (
        <DataGridBlock>
            <GridBlock>
                {(children)?
                    <>
                        <HeaderBlock>
                            {
                                children.map((child) =>
                                    <HeaderItemTitleBlock onClick={() => changeSort(child.props.source)} widthField={100 / children.length}>
                                        {child.props.name}
                                    </HeaderItemTitleBlock>
                                )
                            }
                        </HeaderBlock>
                        {
                            (totalCount)?
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
                    </>
                    : <ItemEmptyBlock>
                        Нет данных для отображения
                    </ItemEmptyBlock>
                }
            </GridBlock>
            {
                (totalCount)?
                    <PageBlock>
                        <ButtonBlock onClick={() => (page > 0)? setPage(page - 1) : null} pageNumber={null} activePage={page}>
                            <ButtonItemBlock>
                                <Back/>
                            </ButtonItemBlock>
                        </ButtonBlock>
                        {
                            maxPageCount.map((item, index) =>
                                <ButtonBlock onClick={() => setPage(index)} pageNumber={index} activePage={page}>
                                    <ButtonItemBlock>
                                        {index + 1}
                                    </ButtonItemBlock>
                                </ButtonBlock>
                            )
                        }
                    <ButtonBlock onClick={() => (page < maxPageCount.length - 1)? setPage(page + 1) : null} pageNumber={null} activePage={page}>
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
  padding: 10px 5px;
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