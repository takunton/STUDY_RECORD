import { useEffect, useState } from "react";
import { LearningContent } from "../_types/LearningContent";
import axios from "axios";

export function useLearningContent() {
  const [learningContents, seLearningContents] = useState<LearningContent[]>(
    []
  );

  // state初期化
  useEffect(() => {
    const getLearningContents = () => {
      axios
        .get<Array<LearningContent>>("http://127.0.0.1:8000/learning-content")
        .then((res) => {
          console.debug(res);
          seLearningContents(res.data);
        })
        .catch((error) => {
          console.debug("データの取得に失敗しました:", error);
        });
    };

    getLearningContents();
  }, []);
  return { learningContents };
}
