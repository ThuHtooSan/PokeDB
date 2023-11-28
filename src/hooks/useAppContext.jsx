import { useContext } from "react"
import { GlobalContext } from "../contexts/AppContext"

const useAppContext = () => useContext(GlobalContext);

export default useAppContext