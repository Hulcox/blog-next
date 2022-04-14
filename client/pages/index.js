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
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const fetchRemote = () => {
    api
      .get("/sign-in", {
        headers: {
          Authorization: document.cookie
            .split("; ")
            .find((row) => row.startsWith("jwt="))
            .split("=")[1],
        },
      })
      .then((res) => {
        router.push("/posts/feeds")
        localStorage.setItem("jwt", res.data.token)
        localStorage.setItem("userhLevel", res.data.userLevel)
        localStorage.setItem("authId", res.data.profile.id)
        handleUserLevel(res.data.userLevel)
        handleAuthId(res.data.profile.id)
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
