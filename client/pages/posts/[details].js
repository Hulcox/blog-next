import HeaderNavBar from "../../src/components/header/header"
import CommentsFromBlog from "../../src/components/post/commentsFrom"
import CommentList from "../../src/components/post/commentsList"
import PostBlog from "../../src/components/post/post"

const DetailPost = () => {
  return (
    <div>
      <HeaderNavBar />
      <PostBlog
        title={"Test"}
        subTitle={"Test2"}
        owner={"Moi même"}
        date={"22/03/2022"}
        content={"nike zebi"}
      />
      <CommentsFromBlog />
      <CommentList />
    </div>
  )
}

export default DetailPost
