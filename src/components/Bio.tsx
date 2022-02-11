/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { VFC } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { IconContext } from "@react-icons/all-files"
import { AiFillGithub } from "@react-icons/all-files/ai/AiFillGithub"
import { AiFillTwitterCircle } from "@react-icons/all-files/ai/AiFillTwitterCircle"

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
    <div className="bio">
      <IconContext.Provider value={{ color: "white", size: "50px" }}>
        <div className="sns-icons">
          <a href={social?.github}>
            <AiFillGithub />
          </a>
          <a href={social?.twitter}>
            <AiFillTwitterCircle />
          </a>
        </div>
      </IconContext.Provider>
      <div className="bio-me">
        <StaticImage
          className="bio-avatar"
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
              <>
                {author?.summary} <br />
              </>
            )}
            Written by <strong>{author.name}</strong>
          </p>
        )}
      </div>
    </div>
  )
}

export default Bio
