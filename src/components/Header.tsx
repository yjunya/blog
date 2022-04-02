/** @jsx jsx */
import { Fragment, VFC } from "react"
import { jsx, css } from "@emotion/react"
import { Link, PageProps, useStaticQuery, graphql } from "gatsby"

type TProps = { title: string } & Pick<
  PageProps<GatsbyTypes.BlogIndexQuery>,
  "location"
>

const headerStyles = css({
  display: "flex",
  height: "10vh",
  justifyContent: "center",
  alignItems: "end",
  backgroundColor: "#330033",
})

const containerStyles = css({
  display: "flex",
  position: "relative",
  width: "80%",
  justifyContent: "space-between",
  "@media (max-width: 600px)": {
    width: "90%",
  },
})

const titleContainerStyles = css({
  display: "flex",
  alignItems: "flex-end",
  paddingBottom: "0.4vh",
})
const titleStyles = css({
  fontSize: "36px",
  color: "whitesmoke",
  textDecoration: "none",
})
const aboutMeContainerStyles = css({
  display: "flex",
  alignItems: "flex-end",
  paddingBottom: "1vh",
})
const aboutMeStyles = css({
  fontSize: "16px",
  color: "whitesmoke",
  textDecoration: "none",
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
        <div css={titleContainerStyles}>
          <Link css={titleStyles} to="/">
            {title}
          </Link>
        </div>
        <div css={aboutMeContainerStyles}>
          <a
            css={aboutMeStyles}
            href={data.site?.siteMetadata?.author?.aboutMeUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            About Me →
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
