import { useContext, useEffect } from "react"
import { useState } from "react/cjs/react.development"
import AppContext from "../appContext"
import CommentsFromBlog from "./commentsFrom"

const CommentList = ({ postId, data }) => {
  const { id, authorComment, createdAt, content, index } = data
  const { comments, authId, handleAuthId, userLevel } = useContext(AppContext)
  const [modifyPost, setModifyPost] = useState(false)
  console.log(comments)
  useEffect(() => {
    handleAuthId(Number(localStorage.getItem("authId")))
  }, [])

  const DeletComment = (id) => {
    api.delete("/comment/" + id, {
      headers: { Authorization: localStorage.getItem("jwt") },
    })
  }

  const ModifyPost = () => {
    setModifyPost(!modifyPost)
  }

  return (
    <div className="mx-auto w-1/2 shadow-gray-100 shadow-md px-8">
      <ul>
        <li key={index} className={index % 2 ? "bg-slate-200" : "bg-white"}>
          <div className="flex justify-between">
            <div className="mt-4 mx-2 flex flex-row items-center pt-2">
              <div className="rounded-full h-10 w-10 flex items-center justify-center bg-red-300 mr-2">
                <a className="text-xl font-bold">
                  {authorComment.firstName.slice(0, 1)}
                </a>
              </div>

              <p>
                <span className="font-bold">
                  {authorComment.firstName + " " + authorComment.lastName}
                </span>

                <span> commented on </span>
                <span className="font-bold underline">
                  {new Date(createdAt).toDateString()}
                </span>
              </p>
            </div>
            {authId == authorComment.id ||
            userLevel == "a" ||
            userLevel == "su" ? (
              <div className="flex">
                <button
                  className={
                    "text-white flex rounded-md items-center m-1 bg-[#2e496f] h-8 p-1"
                  }
                  onClick={() => DeletComment(id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Delete
                </button>
                <button
                  className={
                    "text-white flex rounded-md items-center m-1 bg-[#2e496f] h-8 p-1"
                  }
                  onClick={ModifyPost}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
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
                  Modify
                </button>
              </div>
            ) : null}
          </div>
          {modifyPost ? (
            <CommentsFromBlog
              postId={postId}
              update
              data={{ content: content, id: id }}
            />
          ) : (
            <p className="p-6 overflow-auto font-md leading-8">{content}</p>
          )}
        </li>
      </ul>
    </div>
  )
}

export default CommentList
