import axios from "axios"
import { useContext, useEffect } from "react"
import api from "../../src/components/api"
import AppContext from "../../src/components/appContext"
import HeaderNavBar from "../../src/components/header/header"
import PostBlog from "../../src/components/post/post"

const PopularPost = ({ data }) => {
  const { handleSetPost, post } = useContext(AppContext)
  console.log(data)

  useEffect(() => {
    handleSetPost(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div>
      <HeaderNavBar />
      <div className="mx-auto w-1/2 mt-8 shadow-gray-100 shadow-md p-4 flex justify-between bg-slate-200 items-center rounded">
        <h1 className="text-xl font-bold">{"Most Popular Posts"}</h1>
      </div>
      {data.map(
        (
          { id, title, subTitle, createdAt, content, authorPost, published },
          key
        ) => (
          <PostBlog
            key={key}
            index={key}
            id={id}
            title={title}
            subTitle={subTitle}
            owner={authorPost.firstName + " " + authorPost.lastName}
            date={new Date(createdAt).toDateString()}
            content={content}
            published={published}
          />
        )
      )}
    </div>
  )
}

export async function getServerSideProps() {
  const res = await api.get("/post/popular")
  const data = await res.data

  return { props: { data: data } }
}

export default PopularPost
