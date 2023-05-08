import * as React from "react";
import styled from "styled-components";
import {Telegram, Vk, WhatsApp} from "../Icons";
import {NavLink} from "react-router-dom";
import {RouteNames} from "../../Router";

export const Footer = () => {
    return (
        <FooterBlock id={'footer'}>
                <InfoBlock>
                    <Block>
                        <SocialContainer>
                            <Title>
                                Связь с нами:
                            </Title>
                            <SocialBlockContainer>
                                <SocialBlock
                                    onClick={() => window.open('https://web.telegram.org/')}
                                >
                                    <Icon>
                                        <Telegram/>
                                    </Icon>
                                    <Text>
                                        Telegram
                                    </Text>
                                </SocialBlock>
                            </SocialBlockContainer>
                            <SocialBlockContainer>
                                <SocialBlock
                                    onClick={() => window.open('https://vk.com/')}
                                >
                                    <Icon>
                                        <Vk/>
                                    </Icon>
                                    <Text>
                                        Vk
                                    </Text>
                                </SocialBlock>
                            </SocialBlockContainer>
                            <SocialBlockContainer>
                                <SocialBlock
                                    onClick={() => window.open('https://www.whatsapp.com/?lang=ru/')}
                                >
                                    <Icon>
                                        <WhatsApp/>
                                    </Icon>
                                    <Text>
                                        WhatsApp
                                    </Text>
                                </SocialBlock>
                            </SocialBlockContainer>
                        </SocialContainer>
                    </Block>
                    <Block>
                        <FeedbackButton
                            to={RouteNames.FEEDBACK}
                        >
                            Обратная связь
                        </FeedbackButton>
                    </Block>
                </InfoBlock>
                <BottomLine>
                    © DigiStore, 2023
                </BottomLine>
        </FooterBlock>
    )
}

const FooterBlock = styled.footer`
  position: relative;
  z-index: 3;
  width: 100%;
  height: ${({theme}) => theme.size.footer.height}px;
  background: ${({theme}) => theme.colors.tertiary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
`

const InfoBlock = styled.div`
  padding: 20px 0 0;
  display: flex;
  flex-direction: row;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: center;
  justify-content: center;
`

const SocialContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-size: 25px;
  padding: 0 0 10px;
`

const SocialBlockContainer = styled.div`
  &:after {
    transition: all 1s;
    content: "";
    background: none repeat scroll 0 0 #000000;
    display: block;
    height: 2px;
    width: 0;
  }
  &:hover:after {
    width: 100%;
  }
`

const SocialBlock = styled.div`
  display: flex;
  cursor: pointer;
`

const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 5px;
`

const Text = styled.div`
  font-size: 18px;
  padding: 5px;
  height: 40px;
  display: flex;
  align-items: center;
`

const FeedbackButton = styled(NavLink)`
  color: #000;
  font-size: 18px;
  background-color: rgba(255, 255, 255, 0.67);
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: rgba(255, 255, 255, 100);
    box-shadow: 0 0 10px 0 #3a3a3a;
  }
`

const BottomLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 10px 0 15px;
  font-size: 20px;
  font-weight: bold;
`