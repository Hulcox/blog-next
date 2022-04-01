import { createContext, useCallback, useEffect, useState } from "react"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const [user, setUser] = useState("Romain")
  const [comments, setComments] = useState([])

  const handleSetUser = useCallback((value) => {
    setUser(value)
  }, [])

  const handleSetComments = useCallback(
    (value) => {
      setComments([...comments, value])
    },
    [comments]
  )

  return (
    <AppContext.Provider
      {...props}
      value={{ user, handleSetUser, comments, handleSetComments }}
    />
  )
}

export default AppContext
