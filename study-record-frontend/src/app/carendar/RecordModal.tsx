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

type Props = {
  isNew: boolean;
  isOpen: boolean;
  selectedRecord: Record | undefined;
  onClose: () => void;
};

export const RecordModal = (props: Props) => {
  const { isNew, isOpen, selectedRecord, onClose } = props;

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
  const onClickSave = () => {
    // 学習内容の取得
    const targetLearningContent = learningContents.find(
      (learningContent) => learningContent.id === learningContentId
    );
    // 学習記録の生成
    const record: Record = {
      id: selectedRecord ? selectedRecord.id : 0,
      date: date,
      learning_content: targetLearningContent!,
      time: time,
    };

    if (isNew) {
      axios
        .post<Record>("http://127.0.0.1:8000/record/create", record)
        .then((res) => {
          console.debug(res);
        })
        .catch((error) => {
          console.debug("データの追加に失敗しました:", error);
        });
    } else {
      axios
        .post<Record>("http://127.0.0.1:8000/record/update", record)
        .then((res) => {
          console.debug(res);
        })
        .catch((error) => {
          console.debug("データの更新に失敗しました:", error);
        });
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
        <ModalHeader>{isNew ? "記録（追加）" : "記録（編集）"}</ModalHeader>
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
          <PrimaryButton onClick={onClickSave}>保存</PrimaryButton>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
