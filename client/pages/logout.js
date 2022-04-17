import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import AppContext from "../src/components/appContext"

const LogoutPage = () => {
  const { handleUserLevel, handleAuthId } = useContext(AppContext)
  const router = useRouter()
  useEffect(() => {
    router.push("/posts/popular")
    localStorage.removeItem("jwt")
    localStorage.removeItem("userLevel")
    localStorage.removeItem("authId")
    document.cookie = "jwt=;"
    document.cookie = "authId=;"
    handleUserLevel("")
    handleAuthId(null)
  })
  return <></>
}

export default LogoutPage
