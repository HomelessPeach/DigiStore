import * as React from "react";
import styled from "styled-components";
import {ContainerBlock, LabelBlock} from "../ComponentsStyledBlocks";
import {priceFormat} from "../../utils";

export const OrderProductComponent = (props) => {

    const {
        products,
        label
    } = props

    function getSum() {
        return products.reduce((result, item) => result + (item.order_product_price * item.order_product_count), 0)
    }

    return (
        <ContainerBlock>
            {(label)?
                <LabelBlock>{label}</LabelBlock>
                :null
            }
            <OrderProductContainer>
                <Line>
                    <HeaderTitle>
                        Название товара
                    </HeaderTitle>
                    <HeaderTitle>
                        Цена
                    </HeaderTitle>
                    <HeaderTitle>
                        Количество
                    </HeaderTitle>
                    <HeaderTitle>
                        Стоимость
                    </HeaderTitle>
                </Line>
                {
                    products.map((item, index) =>
                        <Line key={index}>
                            <ValueBlock>
                                {item.order_product_name || 'Нет данных'}
                            </ValueBlock>
                            <ValueBlock>
                                {(item.order_product_price)? `${priceFormat(item.order_product_price)}руб.`
                                    : 'Нет данных'
                                }
                            </ValueBlock>
                            <ValueBlock>
                                {(item.order_product_count)?
                                    priceFormat(item.order_product_count)
                                    : 'Нет данных'
                                }
                            </ValueBlock>
                            <ValueBlock>
                                {(item.order_product_price && item.order_product_count)?
                                    `${priceFormat(item.order_product_price * item.order_product_count)}руб.`
                                    : 'Нет данных'
                                }
                            </ValueBlock>
                        </Line>
                    )
                }
                <AllSumBlock>
                    <AllSumText>
                        Итог:
                    </AllSumText>
                    <AllSumText>
                        {priceFormat(getSum())}р
                    </AllSumText>
                </AllSumBlock>
            </OrderProductContainer>
        </ContainerBlock>
    )

}

const OrderProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 30px;
  padding: 25px 50px;
  font-size: 18px;
  background-color: #e8e8e8;
`

const Line = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #888888;
`

const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 20%;
  border-left: 1px solid #888888;
  &:first-child {
    width: 40%;
    border-left: none;
  }
`

const ValueBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  width: 20%;
  border-left: 1px solid #888888;
  &:first-child {
    width: 40%;
    border-left: none;
    justify-content: left;
  }
`

const AllSumBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px 15px;
`

const AllSumText = styled.div`
  font-size: 25px;
  font-weight: bolder;
  color: #888888;
`