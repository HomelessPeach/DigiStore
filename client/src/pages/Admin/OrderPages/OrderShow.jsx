import * as React from "react";
import styled from "styled-components"
import {useParams} from "react-router-dom";
import {orderAPI} from "../../../services/OrderService";
import {AdminRouteNames} from "../../../Router";
import {TextField} from "../../../components/Admin/components/TextField";
import {ToolbarBlock, LinkButton, ShowContainer} from "../../../components/Admin/TablesStyledBlocks";
import {DataError} from "../../../components/Admin/DataError";

export const OrderShow = () => {

    const {id} = useParams()
    const {data, isLoading} = orderAPI.useOrderShowQuery(id)

    if (isLoading)
        return <h1>LOADING...</h1>

    if (!data && !isLoading)
        return <DataError/>

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