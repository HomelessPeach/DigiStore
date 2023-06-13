import * as React from "react";
import styled from "styled-components"
import {NavLink, useLocation} from "react-router-dom";

export const Breadcrumb = (props) => {

    const {
        links
    } = props

    return (
        links.length > 0 &&
            <BreadcrumbContainer>
                {links.map((item, index) =>
                    <LinkBlock>
                        {(index !== 0)? <>&thinsp;/&thinsp;</> : ''}
                        {(item.link)?
                            <Link
                                to={item.link}
                            >
                                {item.name}
                            </Link>
                            : item.name
                        }
                    </LinkBlock>
                )}
            </BreadcrumbContainer>
    )
}

const BreadcrumbContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 24px;
  @media (${({theme}) => theme.media.extraLarge}) {
    font-size: 20px;
  }
  @media (${({theme}) => theme.media.large}) {
    font-size: 18px;
  }
  @media (${({theme}) => theme.media.medium}) {
    font-size: 16px;
  }
`

const LinkBlock = styled.div`

`

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${({theme}) => theme.colors.tertiary};
`