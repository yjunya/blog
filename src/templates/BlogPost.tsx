/** @jsx jsx */
import { FC } from "react"
import { jsx, css } from "@emotion/react"
import { Link, graphql, PageProps } from "gatsby"

import Layout from "~/components/Layout"
import Seo from "~/components/Seo"

const titleStyles = css({
  marginTop: "48px",
  paddingBottom: "32px",
})

const navigationStyles = css({
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  listStyle: "none",
  padding: 0,
})

const spaceStyles = css({
  marginTop: "128px",
})

const BlogPostTemplate: FC<PageProps<GatsbyTypes.BlogPostBySlugQuery>> = ({
  data,
  location,
}) => {
  const post = data.markdownRemark
  const siteTitle = data.site?.siteMetadata?.title || "Title"
  const { previous, next } = data

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post?.frontmatter?.title || ""}
        description={post?.frontmatter?.description || post?.excerpt}
      />
      <article itemScope itemType="http://schema.org/Article">
        <div css={titleStyles}>
          <h1 itemProp="headline">{post?.frontmatter?.title}</h1>
          <p>{post?.frontmatter?.date}</p>
        </div>
        <section
          dangerouslySetInnerHTML={{ __html: post?.html || "" }}
          itemProp="articleBody"
        />
        <div css={spaceStyles} />
        <hr />
      </article>
      <nav>
        <ul css={navigationStyles}>
          <li>
            {previous && (
              <Link to={previous?.fields?.slug || ""} rel="prev">
                ← {previous?.frontmatter?.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next?.fields?.slug || ""} rel="next">
                {next?.frontmatter?.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
