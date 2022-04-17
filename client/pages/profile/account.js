import { useState } from "react"
import api from "../../src/components/api"
import InputForm from "../../src/components/formikComponents/InputFrom"
import FormAccount from "../../src/components/formikComponents/FormAccount"
import HeaderNavBar from "../../src/components/header/header"
import ProfileMenu from "../../src/components/profileMenu"
import { Switch } from "@headlessui/react"
import { useEffect } from "react/cjs/react.development"

const ProfileAccountPage = ({ data }) => {
  const [modified, setModified] = useState(false)
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    if (
      localStorage.getItem("userLevel") == "a" ||
      localStorage.getItem("userLevel") == "admin"
    )
      handlePublished(true)
    else handlePublished(false)
  }, [])
  const handlePublished = () => {
    setEnabled(!enabled)
    api.put(
      "/user",
      { published: !enabled, userLevel: localStorage.getItem("userLevel") },
      { headers: { Authorization: localStorage.getItem("jwt") } }
    )
  }

  return (
    <div>
      <HeaderNavBar />
      <div className="mx-auto w-1/2 mt-8 shadow-gray-100 shadow-md p-4 flex justify-between bg-slate-200 items-center rounded">
        <h1 className="text-xl font-bold">{"My Profile"}</h1>
      </div>
      <ProfileMenu>
        {modified ? (
          <FormAccount data={data} />
        ) : (
          <div className="w-3/4 h-1/2 bg-slate-100 shadow-gray-100 shadow-md rounded">
            <div className="text-xl font-bold p-2">
              <p>Become a creator</p>
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
            </div>
            <div className="grid grid-cols-6 gap-6 p-2">
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  First name
                </label>
                <InputForm
                  type="text"
                  value={data.profile.firstName}
                  placeholder="First name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  disabled
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Last name
                </label>
                <InputForm
                  type="text"
                  value={data.profile.lastName}
                  placeholder="Last name"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  disabled
                />
              </div>
              <div className="col-span-6 sm:col-span-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <InputForm
                  type="text"
                  value={data.email}
                  placeholder="Email"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  disabled
                />
              </div>

              <div className="col-span-6">
                <label className="block text-sm font-medium text-gray-700">
                  Street address
                </label>
                <InputForm
                  type="text"
                  value={data.profile.address}
                  placeholder="Address"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  disabled
                />
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <InputForm
                  type="text"
                  value={data.profile.city}
                  placeholder="City"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  disabled
                />{" "}
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  ZIP / Postal code
                </label>
                <InputForm
                  type="text"
                  value={data.profile.zip_code}
                  placeholder="Zip Code"
                  className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  disabled
                />
              </div>
            </div>
            <button
              className={
                "text-white flex rounded-md items-center ml-1 bg-[#2e496f] p-1 m-2"
              }
              onClick={setModified}
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
              Modified
            </button>
          </div>
        )}
      </ProfileMenu>
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
      .get("/session", {
        headers: { Authorization: jwt },
      })
      .then((res) => {
        data = res.data
      })
    await request
    return { props: { data: data.profile } }
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }
}

export default ProfileAccountPage
