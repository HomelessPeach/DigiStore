import * as React from "react";
import styled from "styled-components"
import {useLocation} from "react-router-dom";
import {orderAPI} from "../../../../services/OrderService";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";
import {ToolbarBlock, LinkButton, ShowContainer} from "../TablesStyledBlocks";
import {NotThatWay} from "../../NotThatWay";

export const OrderShow = () => {

    const {pathname} = useLocation()
    const orderId = pathname.replace(`${AdminRouteNames.ADMIN_ORDER}/`, '')
    const {data, isLoading} = orderAPI.useOrderShowQuery(orderId)

    if (isLoading)
        return <h1>LOADING...</h1>

    if (!data && !isLoading)
        return <NotThatWay/>

    return (
        <ShowContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_ORDER}`}
                >
                    Список заказов
                </LinkButton>
            </ToolbarBlock>
            <ShowBlock>

            </ShowBlock>
        </ShowContainer>
    )

}

const ShowBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #9f9e9e;
  border-radius: 10px;
`