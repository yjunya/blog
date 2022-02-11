import React, { VFC } from "react"
import { Link, PageProps } from "gatsby"

type TProps = { title: string } & Pick<
  PageProps<GatsbyTypes.BlogIndexQuery>,
  "location"
>

const Header: VFC<TProps> = ({ location, title }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <header className="global-header">
      {isRootPath ? (
        <h1 className="main-heading">
          <Link to="/AboutMe">{title}</Link>
        </h1>
      ) : (
        <h1 className="main-heading">
          <Link to="/">{title}</Link>
        </h1>
      )}
    </header>
  )
}

export default Header
