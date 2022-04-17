import { ErrorMessage, Field, Form, Formik } from "formik"
import { useCallback, useContext } from "react"
import AppContext from "../appContext"
import * as Yup from "yup"
import textArea from "../formikComponents/textArea"
import InputForm from "../formikComponents/InputFrom"
import api from "../api"
import { useRouter } from "next/router"
import { useEffect } from "react/cjs/react.development"

const WritePost = ({ update, data }) => {
  const { user, handleSetUser } = useContext(AppContext)
  const router = useRouter()

  const logout = () => {}

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }

  useEffect(() => {
    handleSetUser(localStorage.getItem("profile"))
  }, [])

  const CommentSchema = Yup.object().shape({
    Title: Yup.string().required(),
    subTitle: Yup.string(),
    textarea: Yup.string()
      .max(500, "Comment max size 500!")
      .required(" Required"),
  })

  const handleFormSubmit = useCallback((value, { resetForm }) => {
    console.log(value)
    if (update) {
      api
        .put(
          "/post/" + data.id,
          {
            title: value.Title,
            subTitle: value.subTitle,
            content: value.textarea,
            authorId: localStorage.getItem("authId"),
          },
          { headers: { Authorization: localStorage.getItem("jwt") } }
        )
        .then((res) => router.push("/posts/" + res.data.postId))
    } else {
      api
        .post(
          "/post",
          {
            title: value.Title,
            subTitle: value.subTitle,
            content: value.textarea,
            authorId: localStorage.getItem("authId"),
          },
          { headers: { Authorization: localStorage.getItem("jwt") } }
        )
        .then((res) => router.push("/posts/" + res.data.postId))
    }

    resetForm()
  }, [])
  console.log(update)
  return (
    <Formik
      validationSchema={CommentSchema}
      initialValues={
        update
          ? {
              Title: data.title,
              subTitle: data.subTitle,
              textarea: data.content,
            }
          : {
              Title: "",
              subTitle: "",
              textarea: "",
            }
      }
      onSubmit={handleFormSubmit}
    >
      {({ handleSubmit, isSubmitting, errors, touched, values }) => (
        <Form onSubmit={handleSubmit}>
          <div className="mt-1 flex rounded-md shadow-sm flex-wrap flex-col">
            <Field
              name="Title"
              placeholder="Write your title"
              required
              as={InputForm}
            />
            <ErrorMessage
              name="title"
              render={(msg) => (
                <div className="text-red-500 text-sm">{msg}</div>
              )}
            />
            <Field
              name="subTitle"
              placeholder="Write your sub title"
              as={InputForm}
            />
            <ErrorMessage
              name="suTitle"
              render={(msg) => (
                <div className="text-red-500 text-sm">{msg}</div>
              )}
            />
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
              type="submit"
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default WritePost
