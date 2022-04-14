import { createContext, useCallback, useEffect, useState } from "react"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const [user, setUser] = useState("Romain")
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [userLevel, setUserLevel] = useState(null)
  const [authId, setAuthId] = useState(null)

  const handleSetUser = useCallback((value) => {
    setUser(value)
  }, [])

  const handleSetComments = useCallback(
    (value) => {
      setComments([...comments, value])
    },
    [comments]
  )

  const handleSetPost = useCallback((value) => {
    setPost([value])
  }, [])

  const handleUserLevel = useCallback((value) => {
    setUserLevel([value])
  }, [])
  const handleAuthId = useCallback((value) => {
    setAuthId([value])
  }, [])

  return (
    <AppContext.Provider
      {...props}
      value={{
        user,
        handleSetUser,
        comments,
        handleSetComments,
        post,
        handleSetPost,
        userLevel,
        handleUserLevel,
        authId,
        handleAuthId,
      }}
    />
  )
}

export default AppContext
