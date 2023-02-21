import * as React from "react";
import styled from "styled-components"
import {useParams} from "react-router-dom";
import {orderAPI} from "../../../services/OrderService";
import {AdminRouteNames} from "../../../Router";
import {TextField} from "../../../components/Admin/components/TextField";
import {
    ToolbarBlock,
    LinkButton,
    ShowContainer,
    EditToolbarBlock,
    Button, DeleteButton
} from "../../../components/Admin/TablesStyledBlocks";
import {DataError} from "../../../components/Admin/DataError";
import {UncertainLink} from "../../../components/Admin/components/UncertainLink";
import {PhoneNumberField} from "../../../components/Admin/components/PhoneNumberField";
import {BoolField} from "../../../components/Admin/components/BoolField";
import {EmailField} from "../../../components/Admin/components/EmailField";
import {OrderProductComponent} from "../../../components/Admin/OrderProductComponent";

export const OrderShow = () => {

    const {id} = useParams()
    const {data, isLoading} = orderAPI.useOrderShowQuery(id, {refetchOnFocus: true})
    const [cancelOrder] = orderAPI.useOrderCancelMutation()
    const [completeOrder] = orderAPI.useOrderCompleteMutation()

    async function cancelOrderHandler() {
        await cancelOrder(id)
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
    }

    async function completeOrderHandler() {
        await completeOrder(id)
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
    }

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
                <ShowContent>
                    <TextField value={data.order_id} label={'id'}/>
                    <DoubleFieldBlock>
                        <LeftFieldBlock>
                            <TextField value={data.order_number} label={'Номер заказа'}/>
                        </LeftFieldBlock>
                        <CenterFieldBlock>
                            <BoolField value={data.is_complete} label={'Выполнен'}/>
                        </CenterFieldBlock>
                        <RightFieldBlock>
                            <BoolField value={data.is_cancel} label={'Отменён'}/>
                        </RightFieldBlock>
                    </DoubleFieldBlock>
                    <UncertainLink value={data.client_name} label={'Имя заказчика'} params={['fk_user']} paramsValue={{fk_user: data.fk_user}} link={AdminRouteNames.ADMIN_USERS}/>
                    <EmailField value={data.client_email} label={'e-mail'}/>
                    <PhoneNumberField value={data.client_phone_number} label={'Номер телефона'}/>
                    <OrderProductComponent products={data.order_products} label={'Продукты'}/>
                </ShowContent>
                {(data.is_complete == false && data.is_cancel == false)?
                    <EditToolbarBlock>
                        <Button
                            onClick={completeOrderHandler}
                            width={200}
                            height={45}
                        >
                            Отметить как выполненный
                        </Button>
                        <DeleteButton
                            onClick={cancelOrderHandler}
                        >
                            Отменить
                        </DeleteButton>
                    </EditToolbarBlock>
                    : null
                }
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

const ShowContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 40px 50px 40px;
`

const DoubleFieldBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const LeftFieldBlock = styled.div`
  width: 33%;
  padding-right: 50px;
`

const CenterFieldBlock = styled.div`
  width: 33%;
  padding: 0 50px;
`

const RightFieldBlock = styled.div`
  width: 33%;
  padding-left: 50px;
`