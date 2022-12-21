import * as React from "react";
import styled from "styled-components"
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";

export const TableField = (props) => {

    const {
        value,
        children,
        label
    } = props

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
            }
            <TableBlock>
                <TableHeaderBlock>
                    {
                        children.map((child, index) =>
                            <ItemHeaderBlock key={index} widthField={100 / children.length}>
                                {child.props.name}
                            </ItemHeaderBlock>
                        )
                    }
                </TableHeaderBlock>
                <TableBodyBlock>
                    {(value.length)?
                        value.map((item, index) =>
                            <TableRow key={index}>
                                {
                                    children.map((child, i) =>
                                        <TableCeil key={i} widthField={100 / children.length}>
                                            {{...child, props: {...child.props, value: item[child.props.fieldName]}}}
                                        </TableCeil>
                                    )
                                }
                            </TableRow>
                        )
                        :
                        <ItemEmptyBlock>
                            Нет данных для отображения
                        </ItemEmptyBlock>
                    }
                </TableBodyBlock>
            </TableBlock>
        </ContainerBlock>
    )

}

const TableBlock = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  border: 1px solid #000000;
  width: 100%;
  line-height: 1.5;
`

const TableHeaderBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
`

const ItemHeaderBlock = styled.div`
  width: ${({widthField}) => widthField}%;
  color: #000000;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px 5px;
  border-right: 1px solid #000000;
  &:last-child {
    border: none;
  }
`

const TableBodyBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TableRow = styled.div`
  border-top: 1px solid #000000;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`

const TableCeil = styled.div`
  display: flex;
  width: ${({widthField}) => widthField}%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #000000;
  &:last-child {
    border: none;
  }
`

const ItemEmptyBlock = styled.div`
  display: flex;
  border-top: 1px solid #000000;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 10px 5px;
`