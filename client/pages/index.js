import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import api from "../src/components/api"
import AppContext from "../src/components/appContext"
import HeaderNavBar from "../src/components/header/header"

export default function Home(props) {
  const router = useRouter()
  const { handleUserLevel, handleAuthId } = useContext(AppContext)
  console.log(props)

  useEffect(() => {
    if (document.cookie) fetchRemote()
    else {
      router.push("/posts/popular")
      localStorage.removeItem("jwt")
      localStorage.removeItem("userLevel")
      localStorage.removeItem("authId")
      localStorage.removeItem("profile")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const fetchRemote = () => {
    api
      .get("/session", {
        headers: {
          Authorization: document.cookie
            .split("; ")
            .find((row) => row.startsWith("jwt="))
            .split("=")[1],
        },
      })
      .then((res) => {
        localStorage.setItem("jwt", res.data.token)
        localStorage.setItem("userLevel", res.data.userLevel)
        localStorage.setItem("authId", res.data.authId)
        localStorage.setItem("profile", res.data.authName)
        handleUserLevel(res.data.userLevel)
        handleAuthId(res.data.authId)
        handleSetUser(res.data.authName)
        router.push("/posts/feeds")
      })
      .catch(() => {
        router.push("/posts/popular")
      })
  }

  return (
    <div>
      <HeaderNavBar />
    </div>
  )
}
