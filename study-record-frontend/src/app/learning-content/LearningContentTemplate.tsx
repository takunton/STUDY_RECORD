import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

import { useLearningContent } from "../../_hooks/useLearningContent";
import { PrimaryButton } from "../../_components/PrimaryButton";
import { LearningContent } from "../../_types/LearningContent";

export const LearningContentTemplate = () => {
  // 内容リスト
  const { learningContents } = useLearningContent();
  // 選択された内容
  const [selectedLearningContent, setSelectedLearningContent] = useState<
    LearningContent | undefined
  >();

  // モーダルのモード
  const [isNew, setIsNew] = useState(false);
  // モーダルの状態
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 追加ボタン押下
  function onClickInsert() {
    setIsNew(true);
    setSelectedLearningContent(undefined);
    onOpen();
  }

  // 編集ボタン押下
  function onClickUpdate(id: string) {
    console.debug(id);
    setIsNew(false);
    const targetLearningContent = learningContents.find(
      (learningContent) => learningContent.id === id
    );
    setSelectedLearningContent(targetLearningContent);
    onOpen();
  }

  return (
    <>
      <PrimaryButton onClick={onClickInsert}>新規</PrimaryButton>
      <TableContainer mt={30}>
        <Table variant="simple">
          <Thead bgColor="black">
            <Tr>
              <Th color="white">表示順</Th>
              <Th color="white">内容</Th>
              <Th color="white"></Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {learningContents.map((learningContent) => (
              <Tr>
                <Td>{learningContent.seq}</Td>
                <Td>{learningContent.contentName}</Td>
                <Td>
                  <PrimaryButton
                    onClick={() => onClickUpdate(learningContent.id)}
                  >
                    編集
                  </PrimaryButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
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
                <Input
                  type="number"
                  onChange={() => {}}
                  value={selectedLearningContent?.seq}
                />
              </FormControl>
              <FormControl>
                <FormLabel>内容</FormLabel>
                <Input
                  onChange={() => {}}
                  value={selectedLearningContent?.contentName}
                />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <PrimaryButton onClick={() => {}}>保存</PrimaryButton>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
