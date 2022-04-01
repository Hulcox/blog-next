import { useState } from "react"
import HeaderNavBar from "../../src/components/header/header"
import PostBlog from "../../src/components/post/post"
import WritePost from "../../src/components/post/writePost"

const MyPost = () => {
  const [writepost, setWritepost] = useState(false)
  const state = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const handleClick = () => {
    setWritepost(!writepost)
  }

  return (
    <div>
      <HeaderNavBar />
      <div className="mx-auto w-1/2 mt-8 shadow-gray-100 shadow-md p-4 flex justify-between bg-slate-200 items-center rounded">
        <h1 className="text-xl font-bold">{"Romain's posts list"}</h1>
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
        <WritePost />
      ) : (
        state.map(() => (
          <>
            <PostBlog
              title={"Test"}
              subTitle={"Test2"}
              owner={"Moi même"}
              date={"22/03/2022"}
              content={"nike zebi"}
            />
          </>
        ))
      )}
    </div>
  )
}

export default MyPost
