import { LearningContent } from "../_types/LearningContent";

const content_sample: LearningContent[] = [
  { id: "LearningContent_1", seq: 101, contentName: "サンプル1" },
  { id: "LearningContent_2", seq: 102, contentName: "サンプル2" },
  { id: "LearningContent_3", seq: 103, contentName: "サンプル3" },
  { id: "LearningContent_4", seq: 104, contentName: "サンプル4" },
  { id: "LearningContent_5", seq: 105, contentName: "サンプル5" },
];

export function useLearningContent() {
  const learningContents = content_sample; // TODO: API呼び出し

  return { learningContents };
}
