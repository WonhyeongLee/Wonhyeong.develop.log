import React, { useState } from "react"
import TagContext from "./TagContext"

const TagProvider = ({ children }) => {
  const [selectedTag, setSelectedTag] = useState(null)

  const handleSetSelectedTag = tag => {
    console.log(`Setting selected tag: ${tag}`)
    setSelectedTag(tag)
  }

  const resetSelectedTag = () => {
    console.log("resetSelectedTag" + selectedTag)
    setSelectedTag(null)
  }

  return (
    <TagContext.Provider
      value={{
        selectedTag,
        setSelectedTag: handleSetSelectedTag,
        resetSelectedTag,
      }}
    >
      {children}
    </TagContext.Provider>
  )
}

export default TagProvider
