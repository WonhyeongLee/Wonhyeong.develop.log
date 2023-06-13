import React, { createContext } from "react"

const TagContext = createContext({
  selectedTag: null,
  setSelectedTag: () => {},
  resetSelectedTag: () => {},
})

export default TagContext
