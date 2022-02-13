/** @jsx jsx */
import { VFC } from "react"
import { jsx, css } from "@emotion/react"
import { Link, PageProps } from "gatsby"

type TProps = { title: string } & Pick<
  PageProps<GatsbyTypes.BlogIndexQuery>,
  "location"
>

const headerStyles = css({
  display: "flex",
  height: "15vh",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "#330033",
})

const titleStyles = css({
  fontSize: "32px",
  color: "whitesmoke",
  textDecoration: "none",
  margin: 0,
})

const Header: VFC<TProps> = ({ location, title }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <header css={headerStyles}>
      <h1>
        {isRootPath ? (
          <Link css={titleStyles} to="/aboutme">
            {title}
          </Link>
        ) : (
          <Link css={titleStyles} to="/">
            {title}
          </Link>
        )}
      </h1>
    </header>
  )
}

export default Header
