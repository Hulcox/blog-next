import { createContext, useCallback, useEffect, useState } from "react"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  const [user, setUser] = useState("Romain")
  const [post, setPost] = useState([])
  const [comments, setComments] = useState([])
  const [jwt, setJwt] = useState("")

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

  const handleSetJwt = useCallback((value) => {
    setJwt([value])
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
        jwt,
        handleSetJwt,
      }}
    />
  )
}

export default AppContext
