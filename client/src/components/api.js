import axios from "axios"

const api = axios.create({
  baseURL: process.env.URL_API,
  transformRequest: [
    (data, headers) => {
      headers.post["Access-Control-Allow-Origin"] = "*"
      headers.post["Access-Control-Allow-Headers"] =
        "Origin, Content-Type, Accept, Authorization, X-Request-With"
      headers.post["Content-Type"] = "application/json"
      headers.put["Content-Type"] = "application/json"
      headers.patch["Content-Type"] = "application/json"
      headers.delete["Content-Type"] = "application/json"

      return JSON.stringify(data)
    },
  ],
})

export default api
