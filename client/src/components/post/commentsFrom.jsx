import { Field, Form, Formik } from "formik"
import * as Yup from "yup"
import { useCallback, useContext, useEffect } from "react"
import AppContext from "../appContext"
import textArea from "../formikComponents/textArea"
import api from "../api"
import { useRouter } from "next/router"

const CommentsFromBlog = ({ postId, data, update }) => {
  const { handleSetComments } = useContext(AppContext)
  const router = useRouter()

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }

  const CommentSchema = Yup.object().shape({
    textarea: Yup.string()
      .max(500, "Comment max size 250!")
      .required(" Required"),
  })
  const handleFormSubmit = useCallback((value, { resetForm }) => {
    console.log(value)
    if (update) {
      api
        .put(
          "/comment/" + postId + "/" + data.id,
          {
            content: value.textarea,
            authorCommentId: localStorage.getItem("authId"),
          },
          { headers: { Authorization: localStorage.getItem("jwt") } }
        )
        .then((res) => {
          handleSetComments(res.data)
          router.push("/posts/" + postId)
        })
    } else {
      api
        .post(
          "/comment/" + postId,
          {
            content: value.textarea,
            authorCommentId: localStorage.getItem("authId"),
          },
          { headers: { Authorization: localStorage.getItem("jwt") } }
        )
        .then((res) => {
          handleSetComments(res.data)
          //router.push("/posts/" + res.data.postId)
        })
    }

    resetForm()
  }, [])
  console.log(data)
  return (
    <Formik
      validationSchema={CommentSchema}
      initialValues={
        update
          ? { textarea: data.content }
          : {
              textarea: "",
            }
      }
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit, isSubmitting, errors, touched, values }) => (
        <Form onSubmit={handleSubmit}>
          <Field
            name="textarea"
            placeholder="Right you comment here !!"
            as={textArea}
          />
          <p className={errors.textarea ? "text-red-600" : "text-black"}>
            {values.textarea.length} / 250
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
  )
}

export default CommentsFromBlog
