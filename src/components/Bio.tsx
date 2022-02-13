/** @jsx jsx */
import { Fragment, VFC } from "react"
import { jsx, css } from "@emotion/react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { IconContext } from "@react-icons/all-files"
import { AiFillGithub } from "@react-icons/all-files/ai/AiFillGithub"
import { AiFillTwitterCircle } from "@react-icons/all-files/ai/AiFillTwitterCircle"

const bioStyles = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})

const snsIconsStyles = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginTop: "40px",
})

const snsIconStyles = css({
  marginRight: "8px",
  marginLeft: "8px",
})

const bioMeStyles = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  marginTop: "8px",
})

const bioMeAvatarStyles = css({
  marginRight: "8px",
  marginBottom: "0px",
  minWidth: "50px",
  borderRadius: "100%",
})

const Bio: VFC = () => {
  const data = useStaticQuery<GatsbyTypes.BioQueryQuery>(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site?.siteMetadata?.author
  const social = data.site?.siteMetadata?.social

  return (
    <div css={bioStyles}>
      <IconContext.Provider value={{ color: "white", size: "50px" }}>
        <div css={snsIconsStyles}>
          <a css={snsIconStyles} href={social?.github}>
            <AiFillGithub />
          </a>
          <a css={snsIconStyles} href={social?.twitter}>
            <AiFillTwitterCircle />
          </a>
        </div>
      </IconContext.Provider>
      <div css={bioMeStyles}>
        <StaticImage
          css={bioMeAvatarStyles}
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/me.png"
          width={50}
          height={50}
          quality={95}
          alt="Profile picture"
        />
        {author?.name && (
          <p>
            {author?.summary && (
              <Fragment>
                {author?.summary} <br />
              </Fragment>
            )}
            Written by <strong>{author.name}</strong>
          </p>
        )}
      </div>
    </div>
  )
}

export default Bio
