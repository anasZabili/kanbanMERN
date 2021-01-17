import { useEffect, useState } from "react";

const useFetchData = (url) => {

  const [column, setColumn] = useState(null);
  useEffect(() => {
    // fetch data;
  }, [url]);

  return { 
    data: column
  }
};

export default useFetchData;
