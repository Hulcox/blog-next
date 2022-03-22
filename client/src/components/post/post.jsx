const PostBlog = ({ title, subTitle, owner, date, content }) => {
  return (
    <div className="mx-auto w-1/2 mt-8 shadow-gray-100 shadow-md p-8">
      <h2 className="text-5xl font-bold">{title}</h2>
      <p className="mt-2 mx-2">
        by <span className="font-bold underline">{owner}</span> on{" "}
        <span>{date}</span>
      </p>
      <div className="mt-4 mx-2">
        <h4 className="text-2xl font-bold">{subTitle}</h4>
        <p className="text_xl mt-2">{content}</p>
      </div>
      <div className="text-center">
        <button className="font-bold text-2xl text-gray-700">...</button>
      </div>
    </div>
  )
}

export default PostBlog
