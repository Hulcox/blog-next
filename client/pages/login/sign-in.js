import axios from "axios"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback, useContext } from "react"
import * as Yup from "yup"
import api from "../../src/components/api"
import AppContext from "../../src/components/appContext"
import InputForm from "../../src/components/formikComponents/InputFrom"
import HeaderNavBar from "../../src/components/header/header"

const LoginPageSignIn = () => {
  const { handleUserLevel, handleAuthId } = useContext(AppContext)
  const router = useRouter()

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }

  const CommentSchema = Yup.object().shape({
    email: Yup.string().email().required(" Required"),
    password: Yup.string().required(" Required"),
  })

  const handleFormSubmit = useCallback((value, { resetForm }) => {
    try {
      fetchRemote(value)
    } catch (error) {
      resetForm()
    }
  }, [])

  const fetchRemote = (value) => {
    api
      .post("/sign-in", {
        email: value.email,
        password: value.password,
      })
      .then((res) => {
        const data = res.data
        console.log(data)
        localStorage.setItem("jwt", data.token)
        localStorage.setItem("userLevel", data.userLevel)
        localStorage.setItem("authId", data.authId)
        localStorage.setItem("profile", data.profile)
        document.cookie = "jwt=" + data.token + "; path=/"
        document.cookie = "authId=" + data.authId + "; path=/"
        handleUserLevel(data.userLevel)
        handleAuthId(data.profile.id)
        router.push("/posts/feeds")
      })
      .catch((error) => {})
  }

  const signUp = () => {
    router.push("/login/sign-up")
  }

  return (
    <div>
      <HeaderNavBar />
      <div className="mt-2 w-1/2 mx-auto">
        <h3 className="text-4xl font-bold leading-6 text-gray-900 p-2 mb-6">
          Sign In
        </h3>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <Formik
            validationSchema={CommentSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, isSubmitting, errors, touched, values }) => (
              <Form onSubmit={handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 p-2">
                    Connexion
                  </h3>
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <Field
                          type="email"
                          name="email"
                          placeholder="Email"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          as={InputForm}
                          required
                        />
                        <ErrorMessage
                          name="email"
                          render={(msg) => (
                            <div className="text-red-500 text-sm">{msg}</div>
                          )}
                        />
                      </div>

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
                    </div>
                  </div>
                  <p>
                    {"Don't have an account yet ? "}
                    <span
                      className="font-bold hover:cursor-pointer"
                      onClick={signUp}
                    >
                      sign-up
                    </span>
                  </p>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button
                      type="submit"
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
    </div>
  )
}

export default LoginPageSignIn
