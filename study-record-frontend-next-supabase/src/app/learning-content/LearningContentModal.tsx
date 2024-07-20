"use client";

import {
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { PrimaryButton } from "../../_components/PrimaryButton";
import { ChangeEvent, useEffect, useState } from "react";
import { LearningContent } from "../../_types/LearningContent";
import {
  deleteLearningContent,
  insertLearningContent,
  updateLearningContent,
} from "../../util/supabaseFunctions";
import {
  GenerateOperationModeTypeHeader,
  GetOperationFinishMessage,
  OperationModeType,
} from "../../_types/OperationModeType";
import { uuidv7 } from "uuidv7";

type Props = {
  isOpen: boolean;
  operationModeType: OperationModeType;
  selectedLearningContent: LearningContent | undefined;
  onClose: () => void;
};

export const LearningContentModal = (props: Props) => {
  const { isOpen, operationModeType, selectedLearningContent, onClose } = props;

  const toast = useToast();

  // 表示順
  const [seq, setSeq] = useState<number>(0);

  // 学習内容
  const [contentName, setContentName] = useState<string>("");

  // stateの初期化
  useEffect(() => {
    setSeq(selectedLearningContent ? selectedLearningContent.seq : 0);
    setContentName(
      selectedLearningContent ? selectedLearningContent.content_name : ""
    );
  }, [selectedLearningContent]);

  // 表示順テキスト変更
  const onChangeSeq = (valueAsString: string, valueAsNumber: number) => {
    setSeq(valueAsNumber);
    console.debug(valueAsNumber);
  };

  // 学習内容テキスト変更
  const onChangeContentName = (e: ChangeEvent<HTMLInputElement>) => {
    setContentName(e.target.value);
    console.debug(e.target.value);
  };

  // 保存ボタン押下
  const onClickSave = async () => {
    switch (operationModeType) {
      case OperationModeType.Add:
        await insert();
        break;
      case OperationModeType.Edit:
        await update();
        break;
      case OperationModeType.Delete:
        await deletes();
    }

    // 保存メッセージ表示
    toast({
      title: GetOperationFinishMessage(operationModeType),
      status: "success",
      position: "top",
      isClosable: true,
    });

    // 画面初期化
    setSeq(0);
    setContentName("");

    onClose();
  };

  // 追加
  const insert = async () => {
    // 追加する学習内容を生成
    const newLearningContent: LearningContent = {
      id: uuidv7(),
      seq: seq,
      content_name: contentName,
    };

    //
    try {
      await insertLearningContent(newLearningContent);
    } catch (error) {
      console.error("Error adding learning_content:", error);
    }
  };

  // 更新
  const update = async () => {
    // 更新する学習内容を生成
    const newLearningContent: LearningContent = {
      id: selectedLearningContent!.id,
      seq: seq,
      content_name: contentName,
    };

    //
    try {
      await updateLearningContent(newLearningContent);
    } catch (error) {
      console.error("Error updating learning_content:", error);
    }
  };

  // 削除
  const deletes = async () => {
    // 更新する学習内容を生成
    const newLearningContent: LearningContent = {
      id: selectedLearningContent!.id,
      seq: seq,
      content_name: contentName,
    };

    //
    try {
      await deleteLearningContent(newLearningContent);
    } catch (error) {
      console.error("Error deleting learning_content:", error);
    }
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
          {GenerateOperationModeTypeHeader("学習内容", operationModeType)}
        </ModalHeader>
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>表示順</FormLabel>
              <NumberInput
                onChange={onChangeSeq}
                value={seq}
                isReadOnly={operationModeType === OperationModeType.Delete}
                min={0}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>学習内容</FormLabel>
              <Input
                isReadOnly={operationModeType === OperationModeType.Delete}
                onChange={onChangeContentName}
                value={contentName}
              />
            </FormControl>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <PrimaryButton onClick={onClickSave}>保存</PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
