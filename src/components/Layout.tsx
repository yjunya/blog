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
    backgroundColor: "whitesmoke",
    fontFamily: "Noto Sans JP",
  },
})

const mainStyles = css({
  margin: "0 auto",
  maxWidth: "80%",
  minHeight: "60vh",
  padding: "10px",
  "@media (max-width: 600px)": {
    maxWidth: "95%",
  },
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
