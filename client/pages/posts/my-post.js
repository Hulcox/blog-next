import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import api from "../../src/components/api"
import AppContext from "../../src/components/appContext"
import HeaderNavBar from "../../src/components/header/header"
import PostBlog from "../../src/components/post/post"
import WritePost from "../../src/components/post/writePost"

const MyPost = ({ data }) => {
  const [writepost, setWritepost] = useState(false)
  const { handleSetPost, user, handleSetUser } = useContext(AppContext)
  console.log(data)
  useEffect(() => {
    handleSetPost(data)
    handleSetUser(localStorage.getItem("profile"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const handleClick = () => {
    setWritepost(!writepost)
  }

  const router = useRouter()
  const logout = () => {
    router.push("/logout")
  }

  return (
    <div>
      <HeaderNavBar />
      <div className="mx-auto w-1/2 mt-8 shadow-gray-100 shadow-md p-4 flex justify-between bg-slate-200 items-center rounded">
        <h1 className="text-xl font-bold">{user + "'s posts list"}</h1>
        <button
          className={
            "bg-[#2e496f] hover:bg-[#1f2937] text-white font-bold py-2 px-4 rounded"
          }
          onClick={handleClick}
        >
          <p className="flex">
            Write new
            <span className="pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </span>
          </p>
        </button>
      </div>
      <div className="mx-auto w-1/2 mt-8 bg-slate-400 h-px"></div>
      {writepost ? (
        <div className="mx-auto w-1/2 shadow-gray-100 shadow-md p-8">
          <h1 className="text-3xl font-bold text-black p-4">Write new post</h1>
          <div className="mt-4 mx-2 flex flex-row items-center">
            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-red-300 mr-2">
              <a className="text-xl font-bold">{user.slice(0, 1)}</a>
            </div>
            <p>
              <span> Signed as </span>
              <span className="font-bold">{user}</span>
              <span>. </span>
              <span className="underline" onClick={logout}>
                logout ?
              </span>
            </p>
          </div>
          <div className="m-4 mt-[5vh]">
            <WritePost />
          </div>
        </div>
      ) : (
        data.map(
          (
            {
              id,
              title,
              subTitle,
              createdAt,
              content,
              authorPost,
              authorId,
              published,
            },
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
              authorId={authorId}
            />
          )
        )
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
    const authId = req.headers.cookie
      .split("; ")
      .find((row) => row.startsWith("authId="))
      .split("=")[1]
    let data = []
    const request = api
      .get("/post/mypost/" + authId, {
        headers: { Authorization: jwt },
      })
      .then((res) => {
        data = res.data
      })
    await request
    return { props: { data: data } }
  } catch (error) {
    return {
      props: { error: error },
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }
}

export default MyPost
