import React, { VFC } from "react"
import Bio from "./Bio"

const Footer: VFC = () => {
  return (
    <div className="global-footer">
      <Bio />
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </div>
  )
}

export default Footer
