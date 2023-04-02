import * as React from "react";
import styled from "styled-components";
import {useState} from "react";
import {TextInput} from "../../components/TextInput";
import {Button} from "../../components/Admin/TablesStyledBlocks";
import {PhoneNumberInput} from "../../components/PhoneNumberInput";

export const Registration = () => {

    const [userData, setUserData] = useState({})
    const [repeatPassword, setRepeatPassword] = useState('')

    return (
        <RegistrationPage>
            <CreateUserContainer>
                <Title>Регистрация</Title>
                <TextInput
                    value={userData?.user_name}
                    onChange={(value) => setUserData({...userData, user_name: value})}
                    label={'Имя'}
                    w={'50%'}
                />
                <TextInput
                    value={userData?.user_email}
                    onChange={(value) => setUserData({...userData, feedback_email: value})}
                    label={'e-mail'}
                    w={'50%'}
                />
                <TextInput
                    value={userData?.user_password}
                    onChange={(value) => setUserData({...userData, user_password: value})}
                    label={'Пароль'}
                    w={'50%'}
                />
                <TextInput
                    value={repeatPassword}
                    onChange={(value) => setRepeatPassword(value)}
                    label={'Повторите пароль'}
                    w={'50%'}
                />
                <PhoneNumberInput
                    value={userData?.user_phone_number}
                    onChange={(value) => setUserData({...userData, user_phone_number: value})}
                    label={'Номер телефона'}
                    w={'50%'}
                />
                <Toolbar>
                    <Button
                        width={210}
                    >
                        Зарегистрироваться
                    </Button>
                </Toolbar>
            </CreateUserContainer>
        </RegistrationPage>
    )

}

const RegistrationPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 400px;
`

const CreateUserContainer = styled.div`
  width: 100%;
  min-height: calc(100vh - ${({theme}) => theme.size.header.height}px);
  box-shadow: 0 0 10px 0 #808080;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
`

const Title = styled.div`
  font-size: 35px;
  padding: 0 10px 20px;
`

const Toolbar = styled.div`
  display: flex;
  justify-content: right;
  padding: 30px;
`