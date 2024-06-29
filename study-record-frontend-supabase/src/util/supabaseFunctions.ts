import { LearningContent } from "../_types/LearningContent";
import { LearningRecord } from "../_types/LearningRecord";
import { supabase } from "./supabase";
import { getLoginInfo, removeLoginInfo } from "../_hooks/useLoginInfo";

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    alert("サインアウトに失敗しました");
  }

  removeLoginInfo();
  console.log(supabase.auth.getUser());
};

export const getAllLearningRecords = async (): Promise<LearningRecord[]> => {
  const { data, error } = await supabase
    .from("learning_record")
    .select(
      `
    id,
    date,
    learning_content (
      id,
      seq,
      content_name
    ),
    time
    `
    )
    .match({ user_id: getLoginInfo().id });

  if (error) {
    console.error("Error fetching learning_records:", error);
    return [];
  }

  // 型変換
  const LearningRecords: LearningRecord[] =
    data?.map((learningRecordData: any) => ({
      id: learningRecordData.id,
      user_id: learningRecordData.user_id,
      date: learningRecordData.date,
      learning_content: {
        id: learningRecordData.learning_content.id,
        seq: learningRecordData.learning_content.seq,
        content_name: learningRecordData.learning_content.content_name,
      },
      time: learningRecordData.time,
    })) || [];

  return LearningRecords;
};

export const insertLearningRecord = async (
  newLearningRecord: LearningRecord
): Promise<LearningRecord> => {
  const { data, error } = await supabase
    .from("learning_record")
    .insert([
      {
        id: newLearningRecord.id,
        user_id: newLearningRecord.user_id,
        date: newLearningRecord.date,
        learning_content_id: newLearningRecord.learning_content.id,
        time: newLearningRecord.time,
      },
    ])
    .single();

  if (error) {
    console.error("Error insert learning_record:", error);
    throw error;
  }

  return data;
};

export const updateLearningRecord = async (
  newLearningRecord: LearningRecord
): Promise<LearningRecord> => {
  const { data, error } = await supabase
    .from("learning_record")
    .update([
      {
        date: newLearningRecord.date,
        learning_content_id: newLearningRecord.learning_content.id,
        time: newLearningRecord.time,
      },
    ])
    .match({ id: newLearningRecord.id })
    .single();

  if (error) {
    console.error("Error update learning_record:", error);
    throw error;
  }

  return data;
};

export const deleteLearningRecord = async (
  id: string
): Promise<LearningRecord> => {
  const { data, error } = await supabase
    .from("learning_record")
    .delete()
    .match({ id: id })
    .single();

  if (error) {
    console.error("Error delete learning_record:", error);
    throw error;
  }

  return data;
};

export const getAllLearningContents = async (): Promise<LearningContent[]> => {
  const { data, error } = await supabase
    .from("learning_content")
    .select("*")
    .order("seq");

  if (error) {
    console.error("Error fetching learning_contents:", error);
    return [];
  }

  // 型変換
  const LearningContents: LearningContent[] =
    data?.map((learningContentData: LearningContent) => ({
      id: learningContentData.id,
      seq: learningContentData.seq,
      content_name: learningContentData.content_name,
    })) || [];

  return LearningContents;
};

export const insertLearningContent = async (
  newLearningContent: LearningContent
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
