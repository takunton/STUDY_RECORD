import { LearningContent } from "../_types/LearningContent";
import { supabase } from "./supabase";

export const getAllLearningContents = async (): Promise<LearningContent[]> => {
  // 学習内容を取得
  const { data, error } = await supabase.from("learning_content").select("*");

  if (error) {
    console.error("Error fetching learning_contents:", error);
    return [];
  }

  // 型変換
  const LearningContents: LearningContent[] =
    data?.map((todoData: LearningContent) => ({
      id: todoData.id,
      seq: todoData.seq,
      content_name: todoData.content_name,
    })) || [];

  return LearningContents;
};

export const insertLearningContent = async (
  newLearningContent: Omit<LearningContent, "id">
): Promise<LearningContent> => {
  const { data, error } = await supabase
    .from("learning_content")
    .insert(newLearningContent)
    .single();

  if (error) {
    console.error("Error insert learning_content:", error);
    throw error;
  }

  return data;
};

export const updateLearningContent = async (
  newLearningContent: LearningContent
): Promise<LearningContent> => {
  const { data, error } = await supabase
    .from("learning_content")
    .update(newLearningContent)
    .match({ id: newLearningContent.id })
    .single();

  if (error) {
    console.error("Error update learning_content:", error);
    throw error;
  }

  return data;
};

export const deleteLearningContent = async (
  newLearningContent: LearningContent
): Promise<LearningContent> => {
  const { data, error } = await supabase
    .from("learning_content")
    .delete()
    .match({ id: newLearningContent.id })
    .single();

  if (error) {
    console.error("Error delete learning_content:", error);
    throw error;
  }

  return data;
};
