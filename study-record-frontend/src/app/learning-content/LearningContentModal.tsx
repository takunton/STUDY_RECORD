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
  Select,
  Stack,
} from "@chakra-ui/react";
import { PrimaryButton } from "../../_components/PrimaryButton";
import { useLearningContent } from "../../_hooks/useLearningContent";
import { ChangeEvent, useEffect, useState } from "react";
import { Record } from "../../_types/Record";
import axios from "axios";
import { LearningContent } from "../../_types/LearningContent";

type Props = {
  isNew: boolean;
  isOpen: boolean;
  selectedLearningContent: LearningContent | undefined;
  onClose: () => void;
};

export const LearningContentModal = (props: Props) => {
  const { isNew, isOpen, selectedLearningContent, onClose } = props;

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
  function onChangeSeq(e: ChangeEvent<HTMLInputElement>) {
    setSeq(Number(e.target.valueAsNumber));
    console.debug(e.target.valueAsNumber);
  }

  // 学習内容テキスト変更
  function onChangeContentName(e: ChangeEvent<HTMLInputElement>) {
    setContentName(e.target.value);
    console.debug(e.target.value);
  }

  // 保存ボタン押下
  const onClickSave = () => {
    const learningContent: LearningContent = {
      id: selectedLearningContent ? selectedLearningContent.id : 0,
      seq: seq,
      content_name: contentName,
    };

    if (isNew) {
      axios
        .post<LearningContent>(
          "http://127.0.0.1:8000/learning-content/create",
          learningContent
        )
        .then((res) => {
          console.debug(res);
        })
        .catch((error) => {
          console.debug("データの追加に失敗しました:", error);
        });
    } else {
      axios
        .post<LearningContent>(
          "http://127.0.0.1:8000/learning-content/update",
          learningContent
        )
        .then((res) => {
          console.debug(res);
        })
        .catch((error) => {
          console.debug("データの更新に失敗しました:", error);
        });
    }
    alert(`"保存しました[表示順=${seq}, 学習内容=${contentName}]`);
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
          {isNew ? "学習内容（追加）" : "学習内容（編集）"}
        </ModalHeader>
        <ModalBody mx={4}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>表示順</FormLabel>
              <Input type="number" onChange={onChangeSeq} value={seq} />
            </FormControl>
            <FormControl>
              <FormLabel>内容</FormLabel>
              <Input onChange={onChangeContentName} value={contentName} />
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
