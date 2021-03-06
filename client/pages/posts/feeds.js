import axios from "axios"
import { useContext, useEffect } from "react"
import api from "../../src/components/api"
import AppContext from "../../src/components/appContext"
import HeaderNavBar from "../../src/components/header/header"
import PostBlog from "../../src/components/post/post"

const FeedPage = ({ data }) => {
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
        <h1 className="text-xl font-bold">{"Your Feeds"}</h1>
      </div>
      {data ? (
        data.map(
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
        )
      ) : (
        <div className="mx-auto w-1/2 mt-8">
          <h4 className="text-lg font-bold mx-auto w-1/2">
            {"Vous n'avez pas d'abonnement"}
          </h4>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps({ req, res }) {
  try {
    const jwt = req.headers.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      .split("=")[1]
    let data = []
    const request = api
      .get("/post/feed", {
        headers: { Authorization: jwt },
      })
      .then((res) => {
        data = res.data
      })
    await request
    return { props: { data: data } }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }
}

export default FeedPage
