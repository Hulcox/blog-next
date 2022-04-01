import { comment } from "postcss"
import { useContext } from "react"
import AppContext from "../appContext"

const CommentList = () => {
  const { comments } = useContext(AppContext)

  console.log(comments)

  return (
    <div className="mx-auto w-1/2 shadow-gray-100 shadow-md px-8">
      <ul>
        {comments.map(({ owner, date, comment }, key) => (
          <li key={key} className={key % 2 ? "bg-slate-200" : "bg-white"}>
            <div className="mt-4 mx-2 flex flex-row items-center pt-2">
              <div className="rounded-full h-10 w-10 flex items-center justify-center bg-red-300 mr-2">
                <a className="text-xl font-bold">{owner.slice(0, 1)}</a>
              </div>
              <p>
                <span className="font-bold">{owner}</span>
                <span> commented on </span>
                <span className="font-bold underline">{date}</span>
              </p>
            </div>
            <p className="p-6 overflow-auto font-md leading-8">{comment}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CommentList
