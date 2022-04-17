import HeaderNavBar from "../../src/components/header/header"
import ProfileMenu from "../../src/components/profileMenu"

const ProfilePage = () => {
  return (
    <div>
      <HeaderNavBar />
      <div className="mx-auto w-1/2 mt-8 shadow-gray-100 shadow-md p-4 flex justify-between bg-slate-200 items-center rounded">
        <h1 className="text-xl font-bold">{"My Profile"}</h1>
      </div>
      <ProfileMenu></ProfileMenu>
    </div>
  )
}

export default ProfilePage
