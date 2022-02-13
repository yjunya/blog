/** @jsx jsx */
import { VFC } from "react"
import { jsx, css } from "@emotion/react"
import Bio from "./Bio"

const footerStyles = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "30vh",
  backgroundColor: "#333",
  color: "#808080",
})

const Footer: VFC = () => {
  return (
    <footer css={footerStyles}>
      <Bio />
      <div>
        © {new Date().getFullYear()}, Built with{" "}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </div>
    </footer>
  )
}

export default Footer
