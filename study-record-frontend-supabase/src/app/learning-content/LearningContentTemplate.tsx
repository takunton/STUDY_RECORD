import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { PrimaryButton } from "../../_components/PrimaryButton";
import { LearningContent } from "../../_types/LearningContent";
import { LearningContentModal } from "./LearningContentModal";
import { getAllLearningContents } from "../../util/supabaseFunctions";
import { OperationModeType } from "../../_types/OperationModeType";
import { DeleteButton } from "../../_components/DeleteButton";

export const LearningContentTemplate = () => {
  // 内容リスト
  const [learningContents, seLearningContents] = useState<LearningContent[]>(
    []
  );

  // 内容リストを初期化
  useEffect(() => {
    getLearningContents();
  }, []);

  const getLearningContents = async () => {
    const learningContents = await getAllLearningContents();
    seLearningContents(learningContents);
  };

  // 選択された内容
  const [selectedLearningContent, setSelectedLearningContent] = useState<
    LearningContent | undefined
  >();

  // モーダルのモード
  const [operationModeType, setOperationModeType] = useState<OperationModeType>(
    OperationModeType.Add
  );

  // モーダルの状態
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 追加ボタン押下
  const onClickInsert = () => {
    setOperationModeType(OperationModeType.Add);
    setSelectedLearningContent(undefined);
    onOpen();
  };

  // 編集ボタン押下
  function onClickUpdate(id: string) {
    setOperationModeType(OperationModeType.Edit);
    const targetLearningContent = learningContents.find(
      (learningContent) => learningContent.id === id
    );
    setSelectedLearningContent(targetLearningContent);
    onOpen();
  }

  // 削除ボタン押下
  const onClickDelete = (id: string) => {
    setOperationModeType(OperationModeType.Delete);
    const targetLearningContent = learningContents.find(
      (learningContent) => learningContent.id === id
    );
    setSelectedLearningContent(targetLearningContent);
    onOpen();
  };

  // モーダルを閉じるときにデータを再取得
  const handleModalClose = () => {
    getLearningContents();
    onClose();
  };

  return (
    <>
      <PrimaryButton onClick={onClickInsert}>新規</PrimaryButton>
      <TableContainer mt={30}>
        <Table variant="simple">
          <Thead bgColor="black">
            <Tr>
              <Th color="white">表示順</Th>
              <Th color="white">学習内容</Th>
              <Th color="white"></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {learningContents.map((learningContent) => (
              <Tr>
                <Td>{learningContent.seq}</Td>
                <Td>{learningContent.content_name}</Td>
                <Td>
                  <PrimaryButton
                    onClick={() => onClickUpdate(learningContent.id)}
                  >
                    編集
                  </PrimaryButton>
                  <DeleteButton
                    onClick={() => onClickDelete(learningContent.id)}
                  >
                    削除
                  </DeleteButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <LearningContentModal
        isOpen={isOpen}
        operationModeType={operationModeType}
        selectedLearningContent={selectedLearningContent}
        onClose={handleModalClose}
      ></LearningContentModal>
    </>
  );
};
