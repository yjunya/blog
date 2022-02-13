/** @jsx jsx */
import { FC, Fragment } from "react"
import { PageProps } from "gatsby"
import { jsx, css, Global } from "@emotion/react"

import Header from "./Header"
import Footer from "./Footer"

type TProps = { title: string } & Pick<
  PageProps<GatsbyTypes.BlogIndexQuery>,
  "location"
>

const globalStyles = css({
  html: {
    lineHeight: 1.15,
    WebkitTextSizeAdjust: "100%",
  },
  body: {
    margin: 0,
    backgroundColor: "#fffafa",
  },
})

const mainStyles = css({
  margin: "0 auto",
  maxWidth: "80vw",
  minHeight: "60vh",
  padding: "10px",
})

const Layout: FC<TProps> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <Fragment>
      <Global styles={globalStyles} />
      <Header location={location} title={title} />
      <main css={mainStyles}>{children}</main>
      <Footer />
    </Fragment>
  )
}

export default Layout
