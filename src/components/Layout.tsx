import React, { FC } from "react"
import { Link, PageProps } from "gatsby"
import Header from "./Header"
import Footer from "./Footer"

type TProps = { title: string } & Pick<
  PageProps<GatsbyTypes.BlogIndexQuery>,
  "location"
>

const Layout: FC<TProps> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <>
      <Header location={location} title={title} />
      <div className="global-wrapper" data-is-root-path={isRootPath}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
