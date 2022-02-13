import React, { FC } from "react"
import { PageProps } from "gatsby"

import Layout from "~/components/Layout"

const AboutMe: FC<PageProps<GatsbyTypes.BlogIndexQuery>> = ({
  data,
  location,
}) => {
  return <Layout location={location} title={"Junya  Yanagisawa"}></Layout>
}

export default AboutMe
