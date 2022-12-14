import * as React from "react";
import styled from "styled-components"
import {useLocation, useNavigate} from "react-router-dom";
import {userAPI} from "../../../../services/UserService";
import {AdminRouteNames} from "../../../../Router";
import {TextInput} from "../../components/TextInput";
import {ImageInput} from "../../components/ImageInput";
import {BoolInput} from "../../components/BoolInput";
import {PhoneNumberInput} from "../../components/PhoneNumberInput";
import {TextField} from "../../components/TextField";
import {useEffect, useState} from "react";
import {UserChangePasswordForm} from "./UserChangePasswordForm";
import {emailValidate, passwordHook, passwordValidate, userNameValidate} from "../../../../utils";
import {ToolbarBlock, LinkButton, DeleteButton, EditContainer, EditToolbarBlock, Button} from "../TablesStyledBlocks";

export const UserEdit = () => {

    const navigate = useNavigate();
    const {pathname} = useLocation()
    const userId = pathname.replace(`${AdminRouteNames.ADMIN_USERS}/edit/`, '')
    const [deleteUser] = userAPI.useUserDeleteMutation()
    const [updateUser] = userAPI.useUserUpdateMutation()
    const {data, isLoading} = userAPI.useUserShowQuery(userId)
    const [userData, setUserData] = useState(data || {})
    const [password, setPassword] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [isNotValid, setIsNotValid] = useState(false)

    const validation = {
        user_email: (email) => email && emailValidate(email),
        user_password: (password) => password && passwordValidate(password),
        user_phone_number: (phoneNumber) => {
            return phoneNumber?.length === 10
        },
        user_name: (name) => name && userNameValidate(name),
        checkValidate: () =>
            validation.user_email(userData.user_email) &&
            (!password || validation.user_password(password)) &&
            validation.user_phone_number(userData.user_phone_number) &&
            validation.user_name(userData.user_name)
    }

    useEffect(() => {
        if (data)
            setUserData(data)
    }, [data])

    async function updateUserHandler() {
        if (validation.checkValidate()) {
            const res = await updateUser((password.length > 0) ? {...userData, user_password: await passwordHook(password)} : userData)
                .unwrap()
                .catch((err) => {
                    console.log(err)
                })
            if (res) {
                navigate(`/admin/user/${userId}`)
            }
        } else {
            setIsNotValid(true)
        }
    }

    async function deleteUserHandler() {
        const res = await deleteUser(userId)
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
        if (res) {
            navigate(`/admin/user`)
        }
    }

    if (isLoading)
        return <h1>LOADING...</h1>

    return (
        <EditContainer>
            <ToolbarBlock>
                <LinkButton
                    to={`${AdminRouteNames.ADMIN_USERS}`}
                >
                    Список пользователей
                </LinkButton>
                <DeleteButton onClick={deleteUserHandler}>
                    Удалить пользователя
                </DeleteButton>
            </ToolbarBlock>
            <EditBlock>
                <EditContent>
                    <LeftBlock>
                        <ImageInput
                            value={userData.image?.new_image || userData.image?.image_path || ''}
                            size={{h: "300px", w: "300px", br: '250px'}}
                            label={'Аватар'}
                            onChange={(value) => (value) ?
                                setUserData({...userData, image: {...userData.image, new_image: value}})
                                : null}
                        />
                    </LeftBlock>
                    <RightBlock>
                        <IdBlock>
                            <TextField
                                value={data.user_id}
                                label={'id'}
                            />
                        </IdBlock>
                        <EditDataBlock>
                            <EditDataChildBlock>
                                <TextInput
                                    value={userData.user_email}
                                    onChange={(value) => setUserData({...userData, user_email: value})}
                                    validation={{
                                        validate: validation.user_email,
                                        validationError: isNotValid,
                                        validationMessage: 'Некорректный e-mail'
                                    }}
                                    label={'e-mail'}
                                />
                                <ButtonChangePassword
                                    onClick={() => setIsOpen(true)}
                                >
                                    Изменить пароль
                                </ButtonChangePassword>
                            </EditDataChildBlock>
                            <EditDataChildBlock>
                                <TextInput
                                    value={userData.user_name}
                                    onChange={(value) => setUserData({...userData, user_name: value})}
                                    validation={{
                                        validate: validation.user_name,
                                        validationError: isNotValid,
                                        validationMessage: 'Некорректное имя пользователя. Имя пользователя должно состоять из букв латинского или русского алфавита (минимум 2 буквы), допускается наличие арабских цифр, а так же специальных символов: ' +
                                            '"#", "*", "(", ")", ":", "_", "-", ".". Запрещается использование подряд идущих пробелов. Максимальная длина – 30 символов.'
                                    }}
                                    label={'Имя'}
                                />
                                <PhoneNumberInput
                                    value={userData.user_phone_number}
                                    validation={{
                                        validate: validation.user_phone_number,
                                        validationError: isNotValid,
                                        validationMessage: 'Номер телефона введён не корректно. Заполнены не все поля.'
                                    }}
                                    onChange={(value) => setUserData({...userData, user_phone_number: value})}
                                    label={'Номер телефона'}
                                />
                                <BoolInput
                                    value={userData.is_admin}
                                    onChange={(value) => setUserData({...userData, is_admin: value})}
                                    label={'Права администратора'}
                                />
                            </EditDataChildBlock>
                        </EditDataBlock>
                    </RightBlock>
                </EditContent>
                <EditToolbarBlock>
                    <Button onClick={updateUserHandler}>
                        Сохранить
                    </Button>
                </EditToolbarBlock>
                {
                    (isOpen) ?
                        <UserChangePasswordForm
                            setIsOpen={setIsOpen}
                            setPassword={setPassword}
                            validation={{
                                validate: validation.user_password,
                                validationError: isNotValid,
                                validationMessage: 'Некорректный пароль. Пароль должен состоять из букв латинского алфавит (минимум 1), арабских цифр (минимум 1), длиной от 5 до 25 символов. Допускается содержание специальных символов: ' +
                                    '"!", "@", "#", "$", "%", "^", "&", "*", ":", "(", ")", ".", ";", "<", ">", "\'", """, "{", "}", "[", "]", "?", "\\", "/", "|", "-", "_", "~".'
                            }}
                        />
                        : null
                }
            </EditBlock>
        </EditContainer>
    )

}

const EditBlock = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #9f9e9e;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  position: relative;
`

const EditContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: stretch;
`

const LeftBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 60px 0;
`

const RightBlock = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 60px 20px;
  width: 100%;
`

const IdBlock = styled.div`
  padding: 0 0 10px;
`

const EditDataBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const EditDataChildBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 47%;
`

const ButtonChangePassword = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 40px;
  background-color: ${({theme}) => theme.colors.tertiary};
  border-radius: 10px;
  color: white;
  text-decoration: none;
  box-shadow: 0 0 10px 0 #5e5e5e;
  margin: 30px auto 17px;
  text-align: center;
  padding: 3px;
  user-select: none;
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
`