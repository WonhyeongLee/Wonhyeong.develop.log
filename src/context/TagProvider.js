import React, { useState } from "react"
import TagContext from "./TagContext"

const TagProvider = ({ children }) => {
  const [selectedTag, setSelectedTag] = useState(null)

  const handleSetSelectedTag = tag => {
    console.log(`Setting selected tag: ${tag}`)
    setSelectedTag(tag)
  }

  return (
    <TagContext.Provider
      value={{ selectedTag, setSelectedTag: handleSetSelectedTag }}
    >
      {children}
    </TagContext.Provider>
  )
}

export default TagProvider
