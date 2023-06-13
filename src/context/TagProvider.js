import React, { useState } from "react"
import TagContext from "./TagContext"

const TagProvider = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState([])

  const handleSetSelectedTag = tag => {
    setSelectedTags(prevSelectedTags => {
      if (prevSelectedTags.includes(tag)) {
        return prevSelectedTags.filter(selectedTag => selectedTag !== tag)
      } else {
        return [...prevSelectedTags, tag]
      }
    })
  }

  const resetSelectedTags = () => {
    setSelectedTags([])
  }

  return (
    <TagContext.Provider
      value={{
        selectedTags,
        setSelectedTags: handleSetSelectedTag,
        resetSelectedTags,
      }}
    >
      {children}
    </TagContext.Provider>
  )
}

export default TagProvider
