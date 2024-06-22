import { LearningContent } from "./LearningContent";

export type LearningRecord = {
  id: number;
  date: string;
  learning_content: LearningContent;
  time: number;
};

export const defaultLearningRecord: Partial<LearningRecord> = {
  date: "",
  time: 0,
  learning_content: {
    id: 0,
    seq: 0,
    content_name: "",
  },
};
