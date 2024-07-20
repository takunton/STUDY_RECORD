import { LearningContent } from "./LearningContent";

export type LearningRecord = {
  id: string;
  user_id: string;
  learning_content: LearningContent;
  date: string;
  time: number;
};
