import React, { createContext } from "react"

const TagContext = createContext({
  selectedTag: null,
  setSelectedTag: () => {},
})

export default TagContext
