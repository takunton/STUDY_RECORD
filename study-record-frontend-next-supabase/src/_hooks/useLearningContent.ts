import { useEffect, useState } from "react";
import { LearningContent } from "../_types/LearningContent";
import { getAllLearningContents } from "../util/supabaseFunctions";

export function useLearningContent() {
  const [learningContents, seLearningContents] = useState<LearningContent[]>(
    []
  );

  // 初期化
  useEffect(() => {
    getLearningContents();
  }, []);

  const getLearningContents = async () => {
    const learningContents = await getAllLearningContents();
    seLearningContents(learningContents);
  };

  return { learningContents };
}
