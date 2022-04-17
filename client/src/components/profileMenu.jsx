import { useRouter } from "next/router"
import { useState } from "react"
import api from "./api"

const ProfileMenu = ({ children }) => {
  const router = useRouter()
  const selected = router.asPath
  const handleRoute = (href) => {
    selected = href
    router.push("/" + href)
  }

  const DeletAccount = () => {
    api.delete("/profile", {
      headers: { Authorization: localStorage.getItem("jwt") },
    })
  }

  console.log(selected)
  return (
    <div className="flex flex-row mx-auto w-1/2 mt-8 ">
      <div className="w-1/4 h-auto bg-slate-200 shadow-gray-100 shadow-md rounded">
        <ul className="p-1">
          <li className="my-1">
            <button
              className={`${
                selected == "/profile/account"
                  ? "bg-[#1f2937] opacity-75 text-white"
                  : "hover:bg-[#1f2937] hover:opacity-75 hover:text-white text-gray-900"
              } group flex rounded-md items-center w-full px-2 py-2 text-xl`}
              onClick={() => handleRoute("profile/account")}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              Account
            </button>
          </li>
          <li className="my-1">
            <button
              className={`${
                selected == "/profile/security"
                  ? "bg-[#1f2937] opacity-75 text-white"
                  : "hover:bg-[#1f2937] hover:opacity-75 hover:text-white text-gray-900"
              } group flex rounded-md items-center w-full px-2 py-2 text-xl`}
              onClick={() => handleRoute("profile/security")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Security
            </button>
          </li>
          <li className="my-1">
            <button
              className={
                "hover:bg-[#1f2937] hover:opacity-75 hover:text-white text-gray-900 group flex rounded-md items-center w-full px-2 py-2 text-xl"
              }
              onClick={DeletAccount}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
              Delete Account
            </button>
          </li>
        </ul>
      </div>
      {children}
    </div>
  )
}

export default ProfileMenu
