import { useState } from "react"
import api from "../../src/components/api"
import FormSecurity from "../../src/components/formikComponents/FormSecurity"
import InputForm from "../../src/components/formikComponents/InputFrom"
import HeaderNavBar from "../../src/components/header/header"
import ProfileMenu from "../../src/components/profileMenu"

const ProfileSecurityPage = ({ data }) => {
  return (
    <div>
      <HeaderNavBar />
      <div className="mx-auto w-1/2 mt-8 shadow-gray-100 shadow-md p-4 flex justify-between bg-slate-200 items-center rounded">
        <h1 className="text-xl font-bold">{"My Profile"}</h1>
      </div>
      <ProfileMenu>
        <FormSecurity data={data} />
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

export default ProfileSecurityPage
