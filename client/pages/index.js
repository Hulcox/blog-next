import { useRouter } from "next/router"
import { useEffect } from "react"
import api from "../src/components/api"
import HeaderNavBar from "../src/components/header/header"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    console.log(document.cookie)
    if (document.cookie) fetchRemote()
    else router.push("/posts/popular")
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
      .then(() => {
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
