import * as React from "react";
import styled from "styled-components"
import {useLocation, useNavigate} from "react-router-dom";
import {productAPI} from "../../../../services/ProductService";
import {productCategoryAPI} from "../../../../services/ProductCategoryService";
import {productFeatureAPI} from "../../../../services/ProductFeatureService";
import {AdminRouteNames} from "../../../../Router";
import {TextField} from "../../components/TextField";
import {ReferenceField} from "../../components/ReferenceField";
import {BoolField} from "../../components/BoolField";
import {PriceField} from "../../components/PriceField";
import {TableField} from "../../components/TableField";
import {ImagesField} from "../../components/ImagesField";
import {ToolbarBlock, LinkButton, DeleteButton, ShowContainer} from "../TablesStyledBlocks";
import {NotThatWay} from "../../NotThatWay";

export const ProductShow = () => {

    const navigate = useNavigate();
    const {pathname} = useLocation()
    const productId = pathname.replace(`${AdminRouteNames.ADMIN_PRODUCT}/`, '')
    const [deleteProduct] = productAPI.useProductDeleteMutation()
    const {data, isLoading} = productAPI.useProductShowQuery(productId)

    async function deleteProductHandler() {
        const res = await deleteProduct(productId)
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
        if (res) {
            navigate(AdminRouteNames.ADMIN_PRODUCT)
        }
    }

    if (isLoading)
        return <h1>LOADING...</h1>

    if (!data && !isLoading)
        return <NotThatWay/>

    return (
        <ShowContainer>
            <ToolbarBlock>
                <LinkButton
                    to={AdminRouteNames.ADMIN_PRODUCT}
                >
                    Список товаров
                </LinkButton>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_PRODUCT}/edit/${productId}`}
                >
                    Изменить данные
                </LinkButton>
                <DeleteButton onClick={deleteProductHandler}>
                    Удалить товар
                </DeleteButton>
            </ToolbarBlock>
            <ShowBlock>
                <TextField
                    value={data.product_id}
                    label={'id'}
                />
                <ImagesField
                    value={data.product_images}
                    label={'Изображения'}
                />
                <DoubleFieldBlock>
                    <LeftFieldBlock>
                        <TextField
                            value={data.product_name}
                            label={'Название продукта'}
                        />
                        <ReferenceField
                            value={data.fk_product_category}
                            label={'Категория продукта'}
                            searchFunc={productCategoryAPI.useGetProductCategoryDataMutation}
                            searchFieldName={'product_category_name'}
                            link={AdminRouteNames.ADMIN_PRODUCT_CATEGORY}
                        />
                        <PriceField
                            value={data.product_price}
                            label={'Цена'}
                            currency={'руб.'}
                        />
                    </LeftFieldBlock>
                    <RightFieldBlock>
                        <BoolField
                            value={data.is_publish}
                            label={'Опубликован'}
                        />
                        {/*<TextField*/}
                        {/*    value={data.product_rating}*/}
                        {/*    label={'Рейтинг товара'}*/}
                        {/*/>*/}
                    </RightFieldBlock>
                </DoubleFieldBlock>
                <TextField
                    value={data.product_description}
                    label={'Описание'}
                />
                <TableField
                    value={data.product_feature_values}
                    label={'Характеристики продукта'}
                >
                    <ReferenceField
                        fieldName={'fk_product_feature'}
                        name={'Характеристика'}
                        searchFunc={productFeatureAPI.useGetProductFeatureDataMutation}
                        searchFieldName={'product_feature_name'}
                        link={AdminRouteNames.ADMIN_PRODUCT_CATEGORY}
                    />
                    <TextField
                        fieldName={'product_features_values_value'}
                        name={'Значение'}
                    />
                </TableField>
            </ShowBlock>
        </ShowContainer>
    )

}

const ShowBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 40px 60px;
  border: 1px solid #9f9e9e;
  border-radius: 10px;
`

const DoubleFieldBlock = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`

const LeftFieldBlock = styled.div`
  width: 50%;
  padding-right: 100px;
`

const RightFieldBlock = styled.div`
  width: 50%;
  padding-left: 100px;
`