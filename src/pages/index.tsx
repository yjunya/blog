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
  marginBottom: "32px",
  marginTop: "32px",
})

type TPost = { date: string; title: String } & (
  | {
      type: "markdown"
      slug: string
      description: string
    }
  | {
      type: "zenn"
      link: string
      description: string
      img: string
    }
)

const BlogIndex: FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({
  data,
  location,
}) => {
  const siteTitle = data.site?.siteMetadata?.title || "Title"
  // const posts = data.allMarkdownRemark.nodes
  const markdownPosts: TPost[] = data.allMarkdownRemark.nodes.map(d => {
    return {
      type: "markdown",
      title: d.frontmatter?.title || "",
      date: d.frontmatter?.date || "",
      slug: d.fields?.slug || "",
      description: d.frontmatter?.description || d.excerpt || "",
    }
  })
  const zennPosts: TPost[] = data.allBlog.nodes.map(d => {
    return {
      type: "zenn",
      title: d.title || "",
      date: d.date || "",
      link: d.link || "",
      description: d.description || "",
      img: d.img || "",
    }
  })
  const posts = [...markdownPosts, ...zennPosts].sort(
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
          if (post.type === "zenn") {
            return (
              <li key={post.link}>
                <article
                  css={postListItemStyles}
                  itemScope
                  itemType="http://schema.org/Article"
                >
                  <header>
                    <h2>
                      <a href={post.link}>
                        <span itemProp="headline">{title}</span>
                      </a>
                    </h2>
                    <small>{new Date(post.date).toDateString()}</small>
                  </header>
                  <section>
                    <p itemProp="description">{post.description}</p>
                  </section>
                </article>
              </li>
            )
          }

          return (
            <li key={post.slug}>
              <article
                css={postListItemStyles}
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={post.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
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
        img
      }
    }
  }
`
