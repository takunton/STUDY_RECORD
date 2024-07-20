import axios from "axios";
import { LearningRecord } from "../_types/LearningRecord";
import { useEffect, useState } from "react";
import { getAllLearningRecords } from "../util/supabaseFunctions";

export function useRecord() {
  const [records, setRecords] = useState<LearningRecord[]>([]);

  // state初期化
  useEffect(() => {
    const getRecords = () => {
      axios
        .get<Array<LearningRecord>>("http://127.0.0.1:8000/record")
        .then((res) => {
          console.debug(res);
          setRecords(res.data);
        })
        .catch((error) => {
          console.debug("データの取得に失敗しました:", error);
        });
    };

    getAllLearningRecords();
    getRecords();
  }, []);

  return { records };
}
