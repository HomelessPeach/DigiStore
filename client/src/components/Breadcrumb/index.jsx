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
  font-size: 24px;
`

const LinkBlock = styled.div`

`

const Link = styled(NavLink)`
  text-decoration: none;
  color: ${({theme}) => theme.colors.tertiary};
`