import { ErrorMessage, Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback, useContext } from "react"
import * as Yup from "yup"
import api from "../api"
import AppContext from "../appContext"
import InputForm from "./InputFrom"

const FormSecurity = ({ data }) => {
  const { handleUserLevel, handleAuthId } = useContext(AppContext)
  const router = useRouter()

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }

  const CommentSchema = Yup.object().shape({
    password: Yup.string()
      .required("Please enter your password")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/gm,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirm_password: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords don't match."),
  })

  const handleFormSubmit = useCallback((value, { resetForm }) => {
    try {
      fetchRemote(value)
    } catch (error) {
      resetForm()
    }
  }, [])

  const fetchRemote = async (value) => {
    api
      .put(
        "/user",
        {
          email: data.email,
          password: value.password,
        },
        { headers: { Authorization: localStorage.getItem("jwt") } }
      )
      .then(() => {
        api
          .post("/sign-in", {
            email: data.email,
            password: value.password,
          })
          .then((res) => {
            const data = res.data
            console.log(data)
            localStorage.setItem("jwt", data.token)
            localStorage.setItem("userLevel", data.userLevel)
            localStorage.setItem("authId", data.profile.id)
            document.cookie = "jwt=" + data.token + "; path=/"
            document.cookie = "authId=" + data.profile.id + "; path=/"
            handleUserLevel(data.userLevel)
            handleAuthId(data.profile.id)
            router.push("/profile/account")
          })
      })
  }

  const signIn = () => {
    router.push("/login/sign-in")
  }

  return (
    <div>
      <div className="mt-2 md:mt-0 md:col-span-2">
        <Formik
          validationSchema={CommentSchema}
          initialValues={{
            password: "",
            confirm_password: "",
          }}
          onSubmit={handleFormSubmit}
        >
          {({ handleSubmit, isSubmitting, errors, touched, values }) => (
            <Form onSubmit={handleSubmit}>
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        as={InputForm}
                        required
                      />
                      <ErrorMessage
                        name="password"
                        render={(msg) => (
                          <div className="text-red-500 text-sm">{msg}</div>
                        )}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Confirm Password
                      </label>
                      <Field
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm Password"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        as={InputForm}
                        required
                      />
                      <ErrorMessage
                        name="confirm_password"
                        render={(msg) => (
                          <div className="text-red-500 text-sm">{msg}</div>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
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
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default FormSecurity
