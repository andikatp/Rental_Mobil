import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(url);
      setData(res.data);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  const reFetch = async () => {
    setLoading(true);
    fetchData();
  };
  return { data, loading, error, reFetch };
};

export default useFetch;
