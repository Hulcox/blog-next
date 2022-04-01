import { Field, Form, Formik } from "formik"
import { useCallback, useContext } from "react"
import AppContext from "../appContext"
import * as Yup from "yup"
import textArea from "../formikComponents/textArea"
import InputForm from "../formikComponents/InputFrom"

const WritePost = () => {
  const { user, handleSetComments } = useContext(AppContext)

  const logout = () => {}

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }

  const CommentSchema = Yup.object().shape({
    textarea: Yup.string()
      .max(500, "Comment max size 500!")
      .required(" Required"),
  })

  const handleFormSubmit = useCallback(
    (value, { resetForm }) => {
      console.log(value)
      handleSetComments({
        owner: "Romain le boss",
        date: Date.now(),
        comment: value.textarea,
      })
      resetForm()
    },
    [handleSetComments]
  )

  return (
    <div className="mx-auto w-1/2 shadow-gray-100 shadow-md p-8">
      <h1 className="text-3xl font-bold text-black p-4">Write new post</h1>
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
        <Formik
          validationSchema={CommentSchema}
          initialValues={{
            title: "",
            subTitle: "",
            textarea: "",
          }}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, isSubmitting, errors, touched, values }) => (
            <Form onSubmit={handleSubmit}>
              <div className="mt-1 flex rounded-md shadow-sm flex-wrap flex-col">
                <Field
                  name="title"
                  placeholder="Write your title"
                  required
                  as={InputForm}
                ></Field>
                <Field
                  name="subTitle"
                  placeholder="Write your sub title"
                  required
                  as={InputForm}
                ></Field>
              </div>
              <Field
                name="textarea"
                placeholder="Right you comment here !!"
                as={textArea}
              />
              <p className={errors.textarea ? "text-red-600" : "text-black"}>
                {values.textarea.length} / 500
              </p>
              <p className={errors.textarea ? "text-red-600" : "text-black"}>
                {errors.textarea && touched.textarea ? errors.textarea : null}
              </p>
              <div className="mt-4">
                <button
                  className={classNames(
                    isSubmitting
                      ? "bg-[#2e496f] text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
                      : "bg-[#2e496f] hover:bg-[#1f2937] text-white font-bold py-2 px-4 rounded"
                  )}
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default WritePost
