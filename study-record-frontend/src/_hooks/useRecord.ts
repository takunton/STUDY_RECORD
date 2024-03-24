import axios from "axios";
import { Record } from "../_types/Record";
import { useEffect, useState } from "react";

const record_sample: Record[] = [
  {
    id: "record_1",
    date: "2024-03-01",
    LearningContent: {
      id: "LearningContent_1",
      seq: 101,
      contentName: "サンプル1",
    },
    time: 10,
  },
  {
    id: "record_2",
    date: "2024-03-02",
    LearningContent: {
      id: "LearningContent_2",
      seq: 101,
      contentName: "サンプル2",
    },
    time: 20,
  },
  {
    id: "record_3",
    date: "2024-03-03",
    LearningContent: {
      id: "LearningContent_3",
      seq: 101,
      contentName: "サンプル3",
    },
    time: 30,
  },
  {
    id: "record_4",
    date: "2024-03-04",
    LearningContent: {
      id: "LearningContent_4",
      seq: 101,
      contentName: "サンプル4",
    },
    time: 40,
  },
  {
    id: "record_5",
    date: "2024-03-05",
    LearningContent: {
      id: "LearningContent_5",
      seq: 101,
      contentName: "サンプル5",
    },
    time: 50,
  },
];

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
