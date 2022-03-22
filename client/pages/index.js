import { Tab } from "@headlessui/react"
import HeaderNavBar from "../src/components/header/header"
import PostBlog from "../src/components/post/post"

export default function Home() {
  return (
    <div>
      <HeaderNavBar />
      <PostBlog
        title={"Test"}
        subTitle={"Test2"}
        owner={"Moi même"}
        date={"22/03/2022"}
        content={"nike zebi"}
      />
    </div>
  )
}
