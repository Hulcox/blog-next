import { Switch } from "@headlessui/react"
import { useRouter } from "next/router"
import React, { useContext, useEffect, useState } from "react"
import api from "../api"
import AppContext from "../appContext"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const PostBlog = ({
  index,
  id,
  title,
  subTitle,
  owner,
  date,
  content,
  authorId,
  subscribed,
  published,
}) => {
  const [liked, setLiked] = useState(false)
  const [subscriber, setSubscriber] = useState(subscribed)
  const router = useRouter()
  const { authId, handleAuthId, userLevel } = useContext(AppContext)
  const [enabled, setEnabled] = useState(published)

  const handlePublished = () => {
    setEnabled(!enabled)
    api.put(
      "/post/" + id,
      { published: !enabled },
      { headers: { Authorization: localStorage.getItem("jwt") } }
    )
  }

  const DeletPost = () => {
    api.delete("/post/" + id, {
      headers: { Authorization: localStorage.getItem("jwt") },
    })
  }

  const handleClickLike = () => {
    setLiked(!liked)
  }

  const handleClickSubscribe = () => {
    setSubscriber(!subscriber)
  }

  const handleClickView = () => {
    router.push("/posts/" + id)
  }

  useEffect(() => {
    handleAuthId(Number(localStorage.getItem("authId")))
  }, [])
  console.log(index)
  return (
    <div
      className={`${
        index % 2 ? "bg-slate-200" : "bg-white"
      } mx-auto w-1/2 mt-2 shadow-gray-100 shadow-md p-8`}
    >
      <div className="flex justify-between">
        <h2 className="text-3xl font-bold">{title}</h2>
        <div className="flex items-center">
          {authorId == authId ? (
            <>
              <p className="font-bold pr-2">
                {enabled ? "Published" : "Not Publish"}
              </p>
              <Switch
                checked={enabled}
                onChange={handlePublished}
                className={`${
                  enabled ? "bg-[#2e496f]" : "bg-gray-200"
                } relative inline-flex items-center h-6 rounded-full w-11`}
              >
                <span
                  className={`${
                    enabled ? "translate-x-6" : "translate-x-1"
                  } inline-block w-4 h-4 transform bg-white rounded-full`}
                />
              </Switch>
            </>
          ) : null}
          {authId == authorId || userLevel == "a" || userLevel == "su" ? (
            <button
              className={
                "text-white flex rounded-md items-center ml-1 bg-[#2e496f] p-1"
              }
              onClick={DeletPost}
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
          ) : null}
        </div>
      </div>
      <div className="mt-4 mx-2 flex flex-row items-center">
        <div className="rounded-full h-10 w-10 flex items-center justify-center bg-red-300 mr-2">
          <a className="text-xl font-bold">{owner.slice(0, 1)}</a>
        </div>
        <p>
          <span className="font-bold underline">{owner}</span>
        </p>
        <button onClick={handleClickSubscribe}>
          {subscriber ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          )}{" "}
        </button>
      </div>
      <div className="mt-4 mx-2">
        <h4 className="text-2xl font-bold">{subTitle}</h4>
        <p className="text_xl mt-2">{content}</p>
      </div>
      <div className="flex justify-between mt-8">
        <div>
          <button onClick={handleClickLike}>
            {liked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 hover:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="text-center">
          <button
            className="font-bold text-2xl text-gray-700"
            onClick={handleClickView}
          >
            ...
          </button>
        </div>
        <div>
          <p>
            on <span>{date}</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default PostBlog
