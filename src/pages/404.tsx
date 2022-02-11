import React, { FC } from "react"
import { graphql, PageProps } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/Seo"

const NotFoundPage: FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({
  data,
  location,
}) => {
  const siteTitle = data.site?.siteMetadata?.title || "Title"

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title="404: Not Found" />
      <h1>404: Not Found</h1>
      <p>お探しのページは見つかりませんでした...</p>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
