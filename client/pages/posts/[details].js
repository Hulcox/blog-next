import { useContext, useEffect } from "react"
import api from "../../src/components/api"
import AppContext from "../../src/components/appContext"
import HeaderNavBar from "../../src/components/header/header"
import CommentsFromBlog from "../../src/components/post/commentsFrom"
import CommentList from "../../src/components/post/commentsList"
import PostBlog from "../../src/components/post/post"

const DetailPost = ({ data, comment }) => {
  const { handleSetPost, handleSetComments, userLevel } = useContext(AppContext)
  useEffect(() => {
    handleSetPost(data)
    handleSetComments(comment)
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
      {userLevel ? <CommentsFromBlog postId={data[0].id} /> : null}
      <CommentList />
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
