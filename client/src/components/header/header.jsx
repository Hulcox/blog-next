import { Disclosure } from "@headlessui/react"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import AppContext from "../appContext"
import MenuDropDown from "../MenuDropDown/MenuDropDown"

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ")
}

const HeaderNavBar = () => {
  const { userLevel } = useContext(AppContext)
  const [navigation, setNavigation] = useState([
    { name: "Post Popullaire", href: "/posts/popular", current: true },
    { name: "Post récent", href: "/posts/recent", current: false },
  ])
  const router = useRouter()
  const selected = router.asPath
  useEffect(() => {
    if (userLevel == "a" || userLevel == "su")
      setNavigation([
        { name: "Post Popullaire", href: "/posts/popular", current: true },
        { name: "Post récent", href: "/posts/recent", current: false },
        { name: "Mes posts", href: "/posts/my-post", current: false },
      ])
  }, [userLevel])

  const handleClick = (href) => {
    console.log(href)
    router.push(href)
  }

  const handleClickFeed = () => {
    router.push("/posts/feeds")
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="relative flex items-center justify-between h-16 mx-4">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <h1
              className="text-2xl text-white font-bold hover:cursor-pointer"
              onClick={handleClickFeed}
            >
              BLOG DE OUF MALADE
            </h1>
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4 ">
              {navigation.map((item) => (
                <p
                  key={item.name}
                  onClick={() => handleClick(item.href)}
                  className={classNames(
                    selected == item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "px-3 py-2 rounded-md text-sm font-medium hover:cursor-pointer"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
          {userLevel == "a" || userLevel == "su" ? (
            <div className="text-white flex flex-row mx-2 rounded-md shadow-sm bg-slate-700 p-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
              <div className="bg-white w-px mx-2"></div>
              <p> 500 </p>
            </div>
          ) : null}
          {userLevel == "a" || userLevel == "su" ? (
            <div className="text-white flex flex-row mx-2 rounded-md shadow-sm bg-slate-700 p-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
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
              </span>
              <div className="bg-white w-px mx-2"></div>
              <p> 100 </p>
            </div>
          ) : null}
          {userLevel == "a" || userLevel == "su" ? (
            <div className="text-white flex flex-row ml-2 mr-3 rounded-md shadow-sm bg-slate-700 p-2">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>
              <div className="bg-white w-px mx-2"></div>
              <p> 200 </p>
            </div>
          ) : null}
          <MenuDropDown>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white text-5xl"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </MenuDropDown>
        </div>
      </div>
    </Disclosure>
  )
}

export default HeaderNavBar
