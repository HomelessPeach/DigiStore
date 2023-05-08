import * as React from "react";
import styled from "styled-components"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {productAPI} from "../../../services/ProductService";
import {productCategoryAPI} from "../../../services/ProductCategoryService";
import {productFeatureAPI} from "../../../services/ProductFeatureService";
import {AdminRouteNames} from "../../../Router";
import {TextInput} from "../../../components/Admin/components/TextInput";
import {ImagesInput} from "../../../components/Admin/components/ImagesInput";
import {TableInput} from "../../../components/Admin/components/TableInput";
import {ReferenceInputField} from "../../../components/Admin/components/ReferenceInputField";
import {BoolInput} from "../../../components/Admin/components/BoolInput";
import {ToolbarBlock, LinkButton, EditContainer, Button, EditToolbarBlock} from "../../../components/Admin/TablesStyledBlocks";

export const ProductCreate = () => {

    const navigate = useNavigate();
    const [createProduct] = productAPI.useProductCreateMutation()
    const [productData, setProductData] = useState({})
    const [isNotValid, setIsNotValid] = useState(false)

    const validation = {
        product_name: (name) => name,
        product_price: (price) => Number(price),
        fk_product_category: (productCategoryId) => productCategoryId,
        product_feature_values: (productFeatureValues) => {
            // console.log()
            if (productFeatureValues.length === 1 && !productFeatureValues[0]?.fk_product_feature && !productFeatureValues[0]?.product_features_values_value)
                return false
            for (let item of productFeatureValues) {
                if ((!item.fk_product_feature || !item.product_features_values_value) &&
                    (item.fk_product_feature || item.product_features_values_value)) {
                    return false
                }
            }
            return true
        },
        product_description: (description) => description?.length > 0,
        checkValidate: () =>
            validation.product_name(productData.product_name) &&
            validation.fk_product_category(productData.fk_product_category) &&
            validation.product_feature_values(productData.product_feature_values) &&
            validation.product_price(productData.product_price) &&
            validation.product_description(productData.product_description)
    }

    async function createProductHandler() {
        if (validation.checkValidate()) {
            const res = await createProduct(productData)
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
            if (res) {
                navigate(`${AdminRouteNames.ADMIN_PRODUCT}/${res.product_id}`)
            }
        } else {
            setIsNotValid(true)
        }
    }

    return (
        <EditContainer>
            <ToolbarBlock>
                <LinkButton
                    to={AdminRouteNames.ADMIN_USERS}
                >
                    Список пользователей
                </LinkButton>
            </ToolbarBlock>
            <EditBlock>
                <EditContent>
                    <ImagesInput
                        value={productData.product_images}
                        size={{h: 540, w: 960, br: 20}}
                        onChange={(value) => setProductData({...productData, product_images: [...(productData.product_images)? productData.product_images: [], ...value]})}
                        label={'Изображения'}
                    />

                    <DoubleFieldBlock>
                        <LeftFieldBlock>
                            <TextInput
                                value={productData.product_name}
                                onChange={(value) => setProductData({...productData, product_name: value})}
                                validation={{
                                    validate: validation.product_name,
                                    validationError: isNotValid,
                                    validationMessage: 'Продукт обязательно должен иметь название.'
                                }}
                                label={'Название'}
                            />
                            <ReferenceInputField
                                value={productData.fk_product_category}
                                onChange={(value) => setProductData({...productData, fk_product_category: value})}
                                validation={{
                                    validate: validation.fk_product_category,
                                    validationError: isNotValid,
                                    validationMessage: 'Продукт обязательно должен иметь категорию.'
                                }}
                                searchFunc={productCategoryAPI.useGetProductCategoriesDataMutation}
                                idName={'product_category_id'}
                                searchFieldName={'product_category_name'}
                                label={'Категория продукта'}
                            />
                            <TextInput
                                value={productData.product_price}
                                onChange={(value) => setProductData({...productData, product_price: value})}
                                validation={{
                                    validate: validation.product_price,
                                    validationError: isNotValid,
                                    validationMessage: 'Некорректная цена.'
                                }}
                                label={'Цена'}
                            />
                            <TextInput
                                value={productData.in_stock}
                                onChange={(value) => setProductData({...productData, in_stock: value})}
                                label={'В наличии, шт.'}
                            />
                        </LeftFieldBlock>
                        <RightFieldBlock>
                            <BoolInput
                                value={productData.is_publish}
                                onChange={(value) => setProductData({...productData, is_publish: value})}
                                label={'Опубликован'}
                            />
                        </RightFieldBlock>
                    </DoubleFieldBlock>
                    <TextInput
                        value={productData.product_description}
                        onChange={(value) => setProductData({...productData, product_description: value})}
                        validation={{
                            validate: validation.product_description,
                            validationError: isNotValid,
                            validationMessage: 'Продукт обязательно должен иметь описание.'
                        }}
                        multiply={true}
                        label={'Описание'}
                    />
                    <TableInput
                        value={productData.product_feature_values}
                        onChange={(value) => setProductData({...productData, product_feature_values: [...(productData.product_feature_values)? productData.product_feature_values: [], value]})}
                        validation={{
                            validate: validation.product_feature_values,
                            validationError: isNotValid,
                            validationMessage: 'Не все поля характеристик заполнены или нет ни одной характеристики.'
                        }}
                        label={'Характеристики продукта'}
                    >
                        <ReferenceInputField
                            fieldName={'fk_product_feature'}
                            searchFunc={productFeatureAPI.useGetProductFeaturesDataMutation}
                            idName={'product_feature_id'}
                            searchFieldName={'product_feature_name'}
                            label={'Характеристика'}
                        />
                        <TextInput
                            fieldName={'product_features_values_value'}
                            label={'Значение'}
                        />
                    </TableInput>
                </EditContent>
                <EditToolbarBlock>
                    <Button onClick={createProductHandler}>
                        Сохранить
                    </Button>
                </EditToolbarBlock>
            </EditBlock>
        </EditContainer>
    )

}

const EditBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  border: 1px solid #9f9e9e;
  border-radius: 10px;
`

const EditContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  padding: 10px 40px
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