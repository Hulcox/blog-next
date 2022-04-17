import { ErrorMessage, Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback, useContext } from "react"
import * as Yup from "yup"
import api from "../../src/components/api"
import AppContext from "../../src/components/appContext"
import InputForm from "../../src/components/formikComponents/InputFrom"
import HeaderNavBar from "../../src/components/header/header"

const LoginPageSignUp = () => {
  const { handleUserLevel, handleAuthId } = useContext(AppContext)
  const router = useRouter()

  const classNames = (...classes) => {
    return classes.filter(Boolean).join(" ")
  }

  const CommentSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(" Required")
      .min(1, "Please enter your First Name"),
    lastName: Yup.string()
      .required(" Required")
      .min(1, "Please enter your Last Name"),
    email: Yup.string()
      .email("Incorect Email: example@example.com")
      .required(" Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().nullable(),
    zip_code: Yup.number()
      .positive("Negative value is not allowed")
      .integer()
      .nullable(),
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
      .post("/sign-up", {
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email,
        address: value.address,
        city: value.city,
        zip_code: value.zip_code,
        password: value.password,
      })
      .then(() => {
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
            localStorage.setItem("authId", data.profile.id)
            document.cookie = "jwt=" + data.token + "; path=/"
            document.cookie = "authId=" + data.profile.id + "; path=/"
            handleUserLevel(data.userLevel)
            handleAuthId(data.profile.id)
            router.push("/posts/feeds")
          })
      })
      .catch((error) => console.log(error))
  }

  const signIn = () => {
    router.push("/login/sign-in")
  }

  return (
    <div>
      <HeaderNavBar />
      <div className="mt-2 w-1/2 mx-auto">
        <h3 className="text-4xl font-bold leading-6 text-gray-900 p-2 mb-6">
          Sign Up
        </h3>
        <div className="mt-2 md:mt-0 md:col-span-2">
          <Formik
            validationSchema={CommentSchema}
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              address: "",
              city: null,
              zip_code: null,
              password: null,
              confirm_password: null,
            }}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit, isSubmitting, errors, touched, values }) => (
              <Form onSubmit={handleSubmit}>
                <div className="shadow overflow-hidden sm:rounded-md">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 p-2">
                    Profile
                  </h3>
                  <div className="px-4 py-3 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          First name
                        </label>
                        <Field
                          type="text"
                          name="firstName"
                          placeholder="First name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          as={InputForm}
                          required
                        />
                        <ErrorMessage
                          name="firstName"
                          render={(msg) => (
                            <div className="text-red-500 text-sm">{msg}</div>
                          )}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label className="block text-sm font-medium text-gray-700">
                          Last name
                        </label>
                        <Field
                          type="text"
                          name="lastName"
                          placeholder="Last name"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          as={InputForm}
                        />
                        <ErrorMessage
                          name="lastName"
                          render={(msg) => (
                            <div className="text-red-500 text-sm">{msg}</div>
                          )}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-4">
                        <label className="block text-sm font-medium text-gray-700">
                          Email address
                        </label>
                        <Field
                          type="text"
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

                      <div className="col-span-6">
                        <label className="block text-sm font-medium text-gray-700">
                          Street address
                        </label>
                        <Field
                          type="text"
                          name="address"
                          placeholder="Address"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          as={InputForm}
                          required
                        />
                        <ErrorMessage
                          name="address"
                          render={(msg) => (
                            <div className="text-red-500 text-sm">{msg}</div>
                          )}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                          City
                        </label>
                        <Field
                          type="text"
                          name="city"
                          placeholder="City"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          as={InputForm}
                        />{" "}
                        <ErrorMessage
                          name="city"
                          render={(msg) => (
                            <div className="text-red-500 text-sm">{msg}</div>
                          )}
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                          ZIP / Postal code
                        </label>
                        <Field
                          type="text"
                          name="zip_code"
                          placeholder="Zip Code"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          as={InputForm}
                        />
                        <ErrorMessage
                          name="zip_code"
                          render={(msg) => (
                            <div className="text-red-500 text-sm">{msg}</div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900 p-2">
                    Password
                  </h3>
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
                  <p className="pl-2">
                    {"Already have an account ? "}
                    <span
                      className="font-bold hover:cursor-pointer"
                      onClick={signIn}
                    >
                      sign-in
                    </span>
                  </p>
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
    </div>
  )
}

export default LoginPageSignUp
