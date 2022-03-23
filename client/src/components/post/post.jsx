import React, { useState } from "react"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const PostBlog = ({ title, subTitle, owner, date, content, subscribed }) => {
  const [liked, setLiked] = useState(false)
  const [subscriber, setSubscriber] = useState(subscribed)

  const handleClickLike = () => {
    setLiked(!liked)
  }

  const handleClickSubscribe = () => {
    setSubscriber(!subscriber)
  }

  return (
    <div className="mx-auto w-1/2 mt-8 shadow-gray-100 shadow-md p-8">
      <h2 className="text-5xl font-bold">{title}</h2>
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
          <button className="font-bold text-2xl text-gray-700">...</button>
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
