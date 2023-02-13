import * as React from "react";
import styled from "styled-components";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authAPI} from "../../../services/AuthService";
import {UserSlice} from "../../../store/reducers/UserSlice";
import {FormSlice} from "../../../store/reducers/FormSlice";
import {attributeFilesUrl} from "../../../services";
import {TextInput} from "../../TextInput";


export const LoginForm = () => {

    const dispatch = useDispatch()
    const [login] = authAPI.useUserLoginMutation()
    const loginForm = useSelector(state => state.form.loginForm)
    const {setLoginForm} = FormSlice.actions
    const {setUserData} = UserSlice.actions
    const [loginData, setLoginData] = useState({})

    async function loginHandler() {
        const res = await login({user_email: loginData.email, user_password: loginData.password})
            .unwrap()
            .catch((err) => {
                console.log(err)
            })
        dispatch(setUserData({
            id: res.user_id,
            email: res.user_email,
            name: res.user_name,
            phoneNumber: res.user_phone_number,
            isAdmin: res.is_admin,
            avatar: res.image
        }))
        dispatch(setLoginForm(false))
    }

    if (!loginForm)
        return;

    return (
        <LoginFormContainer
            onClick={() => dispatch(setLoginForm(false))}
        >
            <FormBlock
                onClick={(event) => event.stopPropagation()}
            >
                <IconBlock>
                    <Img src={`${attributeFilesUrl}/mask-1.svg`}/>
                </IconBlock>
                <InputBlock>
                    <TextInput
                        label={'Логин'}
                        onChange={(value) => setLoginData({...loginData, email: value})}
                        w={'100%'}
                    />
                    <TextInput
                        onChange={(value) => setLoginData({...loginData, password: value})}
                        label={'Пароль'}
                        w={'100%'}
                        type={'password'}
                    />
                </InputBlock>
                <ButtonBlock>
                    <Button
                        onClick={loginHandler}
                    >
                        Войти
                    </Button>
                </ButtonBlock>
            </FormBlock>
        </LoginFormContainer>
    )
}

const LoginFormContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 500;
  background-color: rgba(150, 150, 150, 0.52);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const FormBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 600px;
  padding: 50px;
  border-radius: 20px;
  background-color: white;
`

const IconBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30%;
`

const Img = styled.img`
  max-height: 100%;
  max-width: 100%;
`

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
`

const ButtonBlock = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 20%;
`

const Button = styled.div`
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  background-color: #b13a8e;
  border-radius: 15px;
  color: white;
  box-shadow: 0 0 10px 0 #5e5e5e;
  text-align: center;
  padding: 10px 50px;
  cursor: pointer;
  &:active {
    box-shadow: none;
  }
  &:disabled {
    box-shadow: none;
    pointer-events: none;
  }
`



