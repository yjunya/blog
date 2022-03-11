/** @jsx jsx */
import { VFC } from "react"
import { jsx, css } from "@emotion/react"
import { Link, PageProps, useStaticQuery, graphql } from "gatsby"

type TProps = { title: string } & Pick<
  PageProps<GatsbyTypes.BlogIndexQuery>,
  "location"
>

const headerStyles = css({
  display: "flex",
  position: "relative",
  height: "15vh",
  justifyContent: "center",
  alignItems: "end",
  backgroundColor: "#330033",
})

const containerStyles = css({
  display: "flex",
  position: "relative",
  paddingBottom: "2vh",
  width: "80%",
  justifyContent: "center",
  alignItems: "end",
})

const titleStyles = css({
  fontSize: "36px",
  color: "whitesmoke",
  textDecoration: "none",
  margin: 0,
})
const aboutMeStyles = css({
  position: "absolute",
  color: "whitesmoke",
  textDecoration: "none",
  right: 0,
})

const Header: VFC<TProps> = ({ location, title }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const data = useStaticQuery<GatsbyTypes.HeaderQueryQuery>(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          author {
            aboutMeUrl
          }
        }
      }
    }
  `)

  return (
    <header css={headerStyles}>
      <div css={containerStyles}>
        <h1>
          <Link css={titleStyles} to="/">
            {title}
          </Link>
        </h1>
        <a
          css={aboutMeStyles}
          href={data.site?.siteMetadata?.author?.aboutMeUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h3>About Me →</h3>
        </a>
      </div>
    </header>
  )
}

export default Header
