import HeaderNavBar from "../../src/components/header/header"
import PostBlog from "../../src/components/post/post"

const FeedPage = () => {
  return (
    <div>
      <HeaderNavBar />
      <div className="mx-auto w-1/2 mt-8 shadow-gray-100 shadow-md p-4 flex justify-between bg-slate-200 items-center rounded">
        <h1 className="text-xl font-bold">{"Your Feeds"}</h1>
      </div>
      <PostBlog
        id={1}
        title={"Test"}
        subTitle={"Test2"}
        owner={"Moi même"}
        date={"22/03/2022"}
        content={"nike zebi"}
      />
    </div>
  )
}

export default FeedPage
