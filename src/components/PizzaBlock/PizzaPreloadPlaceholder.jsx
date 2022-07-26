import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="pizza-block"
    speed={2}
    width={280}
    height={457}
    viewBox="0 0 280 457"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="3" y="306" rx="16" ry="16" width="272" height="81" /> 
    <rect x="6" y="259" rx="21" ry="21" width="263" height="35" /> 
    <rect x="4" y="410" rx="5" ry="5" width="105" height="43" /> 
    <rect x="127" y="405" rx="27" ry="27" width="149" height="50" /> 
    <circle cx="140" cy="125" r="125" />
  </ContentLoader>
)

export default Skeleton;