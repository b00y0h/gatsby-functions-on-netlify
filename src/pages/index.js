import * as React from "react"

const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
}
const headingAccentStyles = {
  color: "#663399",
}

fetch('http://localhost:8000/api/boop', {
  method: 'POST',
  body: JSON.stringify({
    url: 'https://grad.morgan.edu',
  }),
})
  .then(response => response.text())
  .then(data => {
    console.log("🚀 ~ file: index.js:25 ~ data", data)
    // insert the HTML into a div on the page at siteB
   
  });

const IndexPage = () => {
  return (
    <main style={pageStyles}>
      <h1 style={headingStyles}>
        Congratulations, Chad!
        <br />
        <span style={headingAccentStyles}>— Let's play with gatsby functions!</span>
      </h1>
     
    </main>
  )
}

export default IndexPage

export const Head = () => <title>Home Page</title>
