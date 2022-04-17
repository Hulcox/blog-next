import { useRouter } from "next/router"
import { useContext, useEffect } from "react"
import api from "../../src/components/api"
import AppContext from "../../src/components/appContext"
import HeaderNavBar from "../../src/components/header/header"
import CommentsFromBlog from "../../src/components/post/commentsFrom"
import CommentList from "../../src/components/post/commentsList"
import PostBlog from "../../src/components/post/post"

const DetailPost = ({ data, comment }) => {
  const { handleSetPost, handleSetComments, userLevel, user, handleSetUser } =
    useContext(AppContext)
  const router = useRouter()
  const logout = () => {
    router.push("/logout")
  }

  useEffect(() => {
    handleSetPost(data)
    handleSetComments(comment)
    handleSetUser(localStorage.getItem("profile"))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return (
    <div>
      <HeaderNavBar />
      {data.map(
        (
          {
            id,
            title,
            subTitle,
            createdAt,
            content,
            authorPost,
            authorId,
            published,
          },
          key
        ) => (
          <PostBlog
            key={key}
            id={id}
            title={title}
            subTitle={subTitle}
            owner={authorPost.firstName + " " + authorPost.lastName}
            date={new Date(createdAt).toDateString()}
            content={content}
            published={published}
            authorId={authorId}
          />
        )
      )}
      {userLevel ? (
        <div className="mx-auto w-1/2 mt-8 shadow-gray-100 shadow-md p-8">
          <div className="w-full bg-slate-400 h-px"></div>
          <h1 className="text-3xl font-bold text-black p-4">Comments</h1>
          <div className="mt-4 mx-2 flex flex-row items-center">
            <div className="rounded-full h-10 w-10 flex items-center justify-center bg-red-300 mr-2">
              <a className="text-xl font-bold">{user.slice(0, 1)}</a>
            </div>
            <p>
              <span> Signed as </span>
              <span className="font-bold">{user}</span>
              <span>. </span>
              <span className="underline" onClick={logout}>
                logout ?
              </span>
            </p>
          </div>
          <div className="m-4 mt-[5vh]">
            <CommentsFromBlog postId={data[0].id} />
          </div>{" "}
        </div>
      ) : null}
      {comment.map(({ id, authorComment, createdAt, content }, index) => (
        <CommentList
          postId={data[0].id}
          data={{ id, authorComment, createdAt, content, index }}
        />
      ))}
    </div>
  )
}
export async function getServerSideProps({ req, res, params }) {
  try {
    const jwt = req.headers.cookie
      .split("; ")
      .find((row) => row.startsWith("jwt="))
      .split("=")[1]
    let data = []
    let comment = []
    const request = api
      .get("/post/" + params.details, {
        headers: { Authorization: jwt },
      })
      .then((res) => {
        data = res.data
      })
    await request
    const requestComment = api
      .get("/comment/" + params.details, {
        headers: { Authorization: jwt },
      })
      .then((res) => {
        comment = res.data
      })
    await requestComment
    return { props: { data: data, comment: comment } }
  } catch (error) {
    return {
      props: { error: error },
      redirect: {
        permanent: false,
        destination: "/",
      },
    }
  }
}

export default DetailPost
