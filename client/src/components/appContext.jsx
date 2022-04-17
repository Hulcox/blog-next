import { createContext, useCallback, useEffect, useState } from "react"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const [user, setUser] = useState("")
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [userLevel, setUserLevel] = useState(null)
  const [authId, setAuthId] = useState(null)

  useEffect(() => {
    if (localStorage.getItem("userLevel"))
      handleUserLevel(localStorage.getItem("userLevel"))
    else if (localStorage.getItem("authId"))
      handleAuthId(localStorage.getItem("authId"))
    else if (localStorage.getItem("profile"))
      handleSetUser(localStorage.getItem("profile"))
  }, [])

  const handleSetUser = useCallback((value) => {
    setUser(value)
  }, [])

  const handleSetComments = useCallback((value) => {
    setComments(value)
  }, [])

  const handleSetPost = useCallback((value) => {
    setPost([value])
  }, [])

  const handleUserLevel = useCallback((value) => {
    setUserLevel(value)
  }, [])
  const handleAuthId = useCallback((value) => {
    setAuthId(value)
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
