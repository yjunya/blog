/** @jsx jsx */
import { FC } from "react"
import { jsx, css } from "@emotion/react"
import { Link, graphql, PageProps } from "gatsby"

import Seo from "~/components/Seo"
import Layout from "~/components/Layout"

const postsTopStyles = css({
  paddingTop: "16px",
  fontWeight: "bold",
  fontSize: "16px",
  display: "flex",
  justifyContent: "center",
})

const postListItemStyles = css({
  backgroundColor: "#e3e3e3",
  padding: "16px 32px",
  borderRadius: "240px 15px 100px 15px / 15px 200px 15px 185px",
  borderStyle: "solid",
  borderWidth: "2px",
  borderColor: "black",
  marginBottom: "32px",
  marginTop: "32px",
  ":hover": {
    backgroundColor: "#efefef",
    padding: "14px 30px",
    borderWidth: "4px",
  },
})

const linkStyles = css({
  color: "inherit",
  textDecoration: "none",
})

type TPost = { date: string; title: String } & (
  | {
      type: "markdown"
      slug: string
      description: string
    }
  | {
      type: "rss"
      link: string
      description: string
    }
)

const BlogIndex: FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({
  data,
  location,
}) => {
  const siteTitle = data.site?.siteMetadata?.title || "Title"
  const markdownPosts: TPost[] = data.allMarkdownRemark.nodes.map(d => {
    return {
      type: "markdown",
      title: d.frontmatter?.title || "",
      date: d.frontmatter?.date || "",
      slug: d.fields?.slug || "",
      description: d.frontmatter?.description || d.excerpt || "",
    }
  })
  const rssPosts: TPost[] = data.allBlog.nodes.map(d => {
    return {
      type: "rss",
      title: d.title || "",
      date: d.date || "",
      link: d.link || "",
      description: d.description || "",
    }
  })
  const posts = [...markdownPosts, ...rssPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  if (posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo title="All posts" />
        <p>コンテンツが存在しません.</p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="All posts" />
      <div css={postsTopStyles}>All Posts</div>
      <hr />
      <ol style={{ listStyle: "none" }}>
        {posts.map(post => {
          const title = post.title || ""
          if (post.type === "rss") {
            return (
              <li key={post.link}>
                <a href={post.link} css={linkStyles}>
                  <article
                    css={postListItemStyles}
                    itemScope
                    itemType="http://schema.org/Article"
                  >
                    <header>
                      <h2>
                        <span itemProp="headline">{title}</span>
                      </h2>
                      <small>{new Date(post.date).toDateString()}</small>
                    </header>
                    <section>
                      <p itemProp="description">{post.description}</p>
                    </section>
                  </article>
                </a>
              </li>
            )
          }

          return (
            <li key={post.slug}>
              <Link to={post.slug} itemProp="url" css={linkStyles}>
                <article
                  css={postListItemStyles}
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <span itemProp="headline">{title}</span>
                    </h2>
                    <small>{new Date(post.date).toDateString()}</small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.description,
                      }}
                      itemProp="description"
                    />
                  </section>
                </article>
              </Link>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndex {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date
          title
          description
        }
      }
    }
    allBlog(sort: { fields: [date], order: DESC }) {
      nodes {
        title
        date
        link
        description
      }
    }
  }
`
