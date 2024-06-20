import axios from "axios";
import { Record } from "../_types/Record";
import { useEffect, useState } from "react";

export function useRecord() {
  const [records, setRecords] = useState<Record[]>([]);

  // state初期化
  useEffect(() => {
    const getRecords = () => {
      axios
        .get<Array<Record>>("http://127.0.0.1:8000/record")
        .then((res) => {
          console.debug(res);
          setRecords(res.data);
        })
        .catch((error) => {
          console.debug("データの取得に失敗しました:", error);
        });
    };

    getRecords();
  }, []);

  return { records };
}
