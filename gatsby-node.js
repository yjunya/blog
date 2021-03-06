const path = require("path")
const { createFilePath } = require("gatsby-source-filesystem")
const Parser = require("rss-parser")
const parser = new Parser()

const ZENN_RSS_URL = "https://zenn.dev/yjunya/feed?all=1&include_scraps=1"
const ZENN_DESCRIPTION = "Link to Zenn"
const NOTE_RSS_URL = "https://note.com/yjunya/rss"
const NOTE_DESCRIPTION = "Link to Note"
const INTERNAL_TYPE_BLOG = "Blog"

exports.sourceNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const zennFeed = await parser.parseURL(ZENN_RSS_URL)
  const zennPosts = zennFeed.items.map(item => {
    return {
      title: item.title,
      date: new Date(item.pubDate).toISOString(),
      link: item.link,
      description: ZENN_DESCRIPTION,
    }
  })
  const noteFeed = await parser.parseURL(NOTE_RSS_URL)
  const notePosts = noteFeed.items.map(item => {
    return {
      title: item.title,
      date: new Date(item.pubDate).toISOString(),
      link: item.link,
      description: NOTE_DESCRIPTION,
    }
  })
  return [...zennPosts, ...notePosts].map(post =>
    actions.createNode({
      ...post,
      id: createNodeId(`${INTERNAL_TYPE_BLOG}-${post.link}`),
      internal: {
        type: INTERNAL_TYPE_BLOG,
        contentDigest: createContentDigest(post),
      },
    })
  )
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve("./src/templates/BlogPost.tsx")

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: ASC }
          limit: 1000
        ) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      "There was an error loading your blog posts",
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.nodes

  // Create blog posts pages
  // But only if there's at least one markdown file found at "content/blog" (defined in gatsby-config.js)
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id
      const nextPostId = index === posts.length - 1 ? null : posts[index + 1].id

      createPage({
        path: post.fields.slug,
        component: blogPost,
        context: {
          id: post.id,
          previousPostId,
          nextPostId,
        },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: "slug",
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
      aboutMeUrl: String
    }

    type Social {
      twitter: String
      github: String
    }

    type Blog implements Node {
      title: String
      date: Date @dateformat
      link: String
      description: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
