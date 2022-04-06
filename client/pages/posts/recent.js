import axios from "axios"
import { useContext, useEffect } from "react"
import api from "../../src/components/api"
import AppContext from "../../src/components/appContext"
import HeaderNavBar from "../../src/components/header/header"
import PostBlog from "../../src/components/post/post"

const RecentPost = ({ data }) => {
  const { handleSetPost, post } = useContext(AppContext)
  console.log(data)

  useEffect(() => {
    handleSetPost(data)
  }, [handleSetPost, data])

  return (
    <div>
      <HeaderNavBar />
      <div className="mx-auto w-1/2 mt-8 shadow-gray-100 shadow-md p-4 flex justify-between bg-slate-200 items-center rounded">
        <h1 className="text-xl font-bold">{"Recent Posts List"}</h1>
      </div>
      {data.map(({ title, subTitle, createdAt, content, authorPost }, key) => (
        <PostBlog
          key={key}
          id={1}
          title={title}
          subTitle={subTitle}
          owner={authorPost.firstName + " " + authorPost.lastName}
          date={new Date(createdAt).toDateString()}
          content={content}
        />
      ))}
    </div>
  )
}

export async function getServerSideProps() {
  const res = await api.get("/post/recent")
  const data = await res.data

  return { props: { data } }
}

export default RecentPost
