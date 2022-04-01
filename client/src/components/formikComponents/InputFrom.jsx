const InputForm = (props) => {
  return (
    <>
      <input
        {...props}
        className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300 p-2 my-2"
      />
    </>
  )
}

export default InputForm
