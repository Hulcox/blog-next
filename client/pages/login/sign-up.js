import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useCallback, useContext } from "react"
import * as Yup from "yup"
import AppContext from "../../src/components/appContext"
import InputForm from "../../src/components/formikComponents/InputFrom"
import HeaderNavBar from "../../src/components/header/header"

const LoginPageSignUp = () => {
  const { handleSetComments } = useContext(AppContext)
  const router = useRouter()

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
              firstName: null,
              lastName: null,
              email: null,
              address: null,
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
                          required
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
                      </div>
                    </div>
                  </div>
                  <p>
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
