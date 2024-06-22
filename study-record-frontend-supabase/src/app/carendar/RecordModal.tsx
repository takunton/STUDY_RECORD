import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
} from "@chakra-ui/react";
import { PrimaryButton } from "../../_components/PrimaryButton";
import { useLearningContent } from "../../_hooks/useLearningContent";
import { ChangeEvent, useEffect, useState } from "react";
import { LearningRecord } from "../../_types/LearningRecord";
import {
  GenerateOperationModeTypeHeader,
  OperationModeType,
} from "../../_types/OperationModeType";
import { LearningContent } from "../../_types/LearningContent";
import {
  deleteLearningRecord,
  insertLearningRecord,
  updateLearningRecord,
} from "../../util/supabaseFunctions";
import { DeleteButton } from "../../_components/DeleteButton";

type Props = {
  isOpen: boolean;
  operationModeType: OperationModeType;
  selectedRecord: LearningRecord | undefined;
  onClose: () => void;
};

export const RecordModal = (props: Props) => {
  const { isOpen, operationModeType, selectedRecord, onClose } = props;

  // 内容リスト
  const { learningContents } = useLearningContent();

  // 日付
  const [date, setDate] = useState<string>("");

  // 内容
  const [learningContentId, setLearningContentId] = useState<number>(0);

  // 時間
  const [time, setTime] = useState<number>(0);

  // stateの初期化
  useEffect(() => {
    setDate(selectedRecord ? selectedRecord.date : "");
    setLearningContentId(
      selectedRecord ? selectedRecord.learning_content.id : 0
    );
    setTime(selectedRecord ? selectedRecord.time : 0);
  }, [selectedRecord]);

  // 日付テキスト変更
  function onChangeDate(e: ChangeEvent<HTMLInputElement>) {
    setDate(e.target.value);
    console.debug(e.target.value);
  }

  // 内容テキスト変更
  function onChangeLearningContents(e: ChangeEvent<HTMLSelectElement>) {
    setLearningContentId(Number(e.target.value));
    console.debug(e.target.value);
  }

  // 時間テキスト変更
  function onChangeTime(e: ChangeEvent<HTMLInputElement>) {
    setTime(e.target.valueAsNumber);
    console.debug(e.target.valueAsNumber);
  }

  // 保存ボタン押下
  const onClickSave = async () => {
    // 学習内容の取得
    const targetLearningContent = learningContents.find(
      (learningContent) => learningContent.id === learningContentId
    );

    switch (operationModeType) {
      case OperationModeType.Add:
        await insert(targetLearningContent!);
        break;
      case OperationModeType.Edit:
        await update(targetLearningContent!);
    }

    onClose();
  };

  // 追加
  const insert = async (targetLearningContent: LearningContent) => {
    // 追加する学習記録を生成
    const newLearningRecord: Omit<LearningRecord, "id"> = {
      date: date,
      learning_content: targetLearningContent,
      time: time,
    };

    //
    try {
      await insertLearningRecord(newLearningRecord);
    } catch (error) {
      console.error("Error adding learning_content:", error);
    }
  };

  // 編集
  const update = async (targetLearningContent: LearningContent) => {
    // 編集する学習記録を生成
    const newLearningRecord: LearningRecord = {
      id: selectedRecord ? selectedRecord.id : 0,
      date: date,
      learning_content: targetLearningContent,
      time: time,
    };

    //
    try {
      await updateLearningRecord(newLearningRecord);
    } catch (error) {
      console.error("Error updating learning_content:", error);
    }
  };

  // 削除ボタン押下
  const onClickDelete = async () => {
    //
    try {
      await deleteLearningRecord(selectedRecord!.id);
    } catch (error) {
      console.error("Error deleting learning_content:", error);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      autoFocus={false}
      motionPreset="slideInTop"
    >
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>
          {" "}
          {GenerateOperationModeTypeHeader("学習記録", operationModeType)}
        </ModalHeader>
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>日付</FormLabel>
              <Input type="date" onChange={onChangeDate} value={date} />
            </FormControl>
            <FormControl>
              <FormLabel>内容</FormLabel>
              <Select
                onChange={onChangeLearningContents}
                placeholder="選択してください"
                value={learningContentId}
              >
                {learningContents.map((learningContent) => (
                  <option value={learningContent.id}>
                    {learningContent.content_name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>時間</FormLabel>
              <Input type="number" onChange={onChangeTime} value={time} />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Flex w="100%" justify="space-between">
            <Box>
              {operationModeType === OperationModeType.Edit && (
                <DeleteButton onClick={onClickDelete}>削除</DeleteButton>
              )}
            </Box>
            <Box>
              <PrimaryButton onClick={onClickSave}>保存</PrimaryButton>
            </Box>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
