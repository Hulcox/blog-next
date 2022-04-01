import { Tab } from "@headlessui/react"
import { useRouter } from "next/router"
import { useEffect } from "react"
import HeaderNavBar from "../src/components/header/header"
import PostBlog from "../src/components/post/post"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    router.push("/posts/popular")
  }, [router])

  return (
    <div>
      <HeaderNavBar />
    </div>
  )
}
