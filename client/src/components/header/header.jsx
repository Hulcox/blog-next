import { Disclosure } from "@headlessui/react"
import { useRouter } from "next/router"
import MenuDropDown from "../MenuDropDown/MenuDropDown"

const navigation = [
  { name: "Post Popullaire", href: "/posts/popular", current: true },
  { name: "Post récent", href: "/posts/recent", current: false },
  { name: "Mes posts", href: "/posts/my-post", current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const HeaderNavBar = () => {
  const router = useRouter()
  const selected = router.asPath

  const handleClick = (href) => {
    console.log(href)
    router.push(href)
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="relative flex items-center justify-between h-16 mx-4">
        <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl text-white font-bold">
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
                    "px-3 py-2 rounded-md text-sm font-medium"
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
          <MenuDropDown list={[{ title: "test", href: "test" }]}>
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
