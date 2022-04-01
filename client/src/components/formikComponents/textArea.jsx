const textArea = (props) => {
  return (
    <textarea
      {...props}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-2 my-2"
      rows="7"
      wrap="hard"
      cols="30"
    />
  )
}

export default textArea
