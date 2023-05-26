import * as React from "react";
import styled from "styled-components";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {authAPI} from "../../../services/AuthService";
import {FormSlice} from "../../../store/reducers/FormSlice";
import {attributeFilesUrl} from "../../../services";
import {TextInput} from "../../TextInput";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {RouteNames} from "../../../Router";
import {emailValidate} from "../../../utils";


export const LoginForm = () => {

    const navigate = useNavigate()
    const {pathname} = useLocation()
    const dispatch = useDispatch()
    const [login] = authAPI.useLoginMutation()
    const loginForm = useSelector(state => state.form.loginForm)
    const {setLoginForm} = FormSlice.actions
    const [loginData, setLoginData] = useState({})
    const [isNotValid, setIsNotValid] = useState(false)
    const [unauthorized, setUnauthorized] = useState(false)

    async function loginHandler() {
        if (emailValidate(loginData?.email)) {
            const res = await login({user_email: loginData.email, password: loginData.password, unauthorizedHandler: () => setUnauthorized(true)})
            if (res.data) {
                dispatch(setLoginForm(false))
                if (pathname === RouteNames.REGISTRATION ||
                    pathname === RouteNames.FORGOT_PASSWORD) {
                    navigate(RouteNames.HOME)
                }
            }
        } else {
            setIsNotValid(true)
        }
    }

    if (!loginForm)
        return;

    return (
        <LoginFormContainer
            onMouseDown={() => dispatch(setLoginForm(false))}
        >
            <FormBlock
                onMouseDown={(event) => event.stopPropagation()}
            >
                <IconBlock>
                    <Img src={`${attributeFilesUrl}/mask-1.svg`}/>
                </IconBlock>
                <InputBlock>
                    <TextInput
                        label={'Логин'}
                        onChange={(value) => {
                            setUnauthorized(false)
                            setLoginData({...loginData, email: value})
                        }}
                        validation={{
                            validate: emailValidate,
                            validationError: isNotValid,
                            validationMessage: 'Некорректный e-mail'
                        }}
                        w={'100%'}
                    />
                    <TextInput
                        onChange={(value) => {
                            setUnauthorized(false)
                            setLoginData({...loginData, password: value})
                        }}
                        label={'Пароль'}
                        w={'100%'}
                        type={'password'}
                    />
                    {(unauthorized) && <ValidationMessage>Неверный логин или пароль</ValidationMessage>}
                </InputBlock>
                <ActionsBlock>
                    <Action
                        to={RouteNames.REGISTRATION}
                        onClick={() => dispatch(setLoginForm(false))}
                    >
                        Зарегистрироваться
                    </Action>
                    <Action
                        to={RouteNames.FORGOT_PASSWORD}
                        onClick={() => dispatch(setLoginForm(false))}
                    >
                        Забыл пароль
                    </Action>
                </ActionsBlock>
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

const ActionsBlock = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`

const Action = styled(NavLink)`
  text-decoration: none;
  font-size: 15px;
  color: #b13a8e;
  cursor: pointer;
  user-select: none;
  &:after {
    transition: all 1s;
    content: "";
    background: none repeat scroll 0 0 #b13a8e;
    display: block;
    height: 2px;
    width: 0;
  }
  &:hover:after {
    width: 100%;
  }
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

const ValidationMessage = styled.div`
  color: #ee0000;
  font-size: 15px;
  padding: 3px 0;
`