import { useEffect } from "react";
import useAppContext from "./useAppContext";
import axios from "axios";

const useFetch = ({ url, successAction }) => {
  const {state, dispatch} = useAppContext();
  const controller = new AbortController();

  const fetchData = async () => {
    const randomId = Math.floor(Math.random() * 9999);
    try {
      dispatch({ 
        type: 'FETCH_START', 
        successActionType: successAction.type,
        taskId: randomId
      });
      const res = await axios.get(url, {
        signal: controller.signal
      });

      dispatch({ ...successAction, payload: res.data, taskId: randomId });
    } catch (err) {
      console.log(err)
      dispatch({ type: 'FETCH_FAIL', error: err.message, taskId: randomId });
    }
  }

  useEffect(() => {
    if (url) {
      fetchData(url);
    }
  }, [url])

  return () => {
    controller.abort()
  };
}

export default useFetch;