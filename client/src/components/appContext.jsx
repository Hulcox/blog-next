import { createContext, useCallback, useEffect, useState } from "react"

const AppContext = createContext({})

export const AppContextProvider = (props) => {
  return <AppContext.Provider {...props} value={{}} />
}

export default AppContext
