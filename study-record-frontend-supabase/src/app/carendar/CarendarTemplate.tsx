import { useEffect, useState } from "react";
import { useDisclosure } from "@chakra-ui/react";
import {
  EventClickArg,
  EventContentArg,
  EventSourceInput,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";

import { RecordModal } from "./RecordModal";
import { LearningRecord } from "../../_types/LearningRecord";
import { getAllLearningRecords } from "../../util/supabaseFunctions";
import { OperationModeType } from "../../_types/OperationModeType";
import { getLoginInfo } from "../../_hooks/useLoginInfo";

export const CarendarTemplate = () => {
  // 記録リスト
  const [learningRecords, setLearningRecords] = useState<LearningRecord[]>([]);

  // 選択された記録
  const [selectedRecord, setSelectedRecord] = useState<LearningRecord>();

  // モーダルのモード
  const [operationModeType, setOperationModeType] = useState<OperationModeType>(
    OperationModeType.Add
  );

  // モーダルの状態
  const { isOpen, onOpen, onClose } = useDisclosure();

  // 記録リストを初期化
  useEffect(() => {
    getLearningRecords();
  }, []);

  const getLearningRecords = async () => {
    const learningRecords = await getAllLearningRecords();
    setLearningRecords(learningRecords);
  };

  // 記録リストをeventオブジェクトに変換
  const events: EventSourceInput = learningRecords.map((learningRecord) => ({
    id: String(learningRecord.id),
    start: learningRecord.date,
    extendedProps: {
      learningContent: learningRecord.learning_content.content_name,
      time: learningRecord.time,
    },
  }));

  // イベントのフォーマット
  const renderEventContent = (eventInfo: EventContentArg) => {
    return (
      <div style={{ whiteSpace: "pre-wrap" }}>
        {`学習内容：${eventInfo.event.extendedProps.learningContent}\n学習時間：${eventInfo?.event.extendedProps.time}分`}
      </div>
    );
  };

  // 日付クリック
  const handleDateClick = (arg: DateClickArg) => {
    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = ("0" + (date.getMonth() + 1)).slice(-2);
      const day = ("0" + date.getDate()).slice(-2);
      return `${year}-${month}-${day}`;
    };

    const newLearningRecord: LearningRecord = {
      id: "",
      user_id: getLoginInfo().id,
      date: formatDate(arg.date),
      learning_content: { id: "", seq: -1, content_name: "" },
      time: 0,
    };

    console.log(newLearningRecord);

    setOperationModeType(OperationModeType.Add);

    setSelectedRecord(newLearningRecord);
    onOpen();
  };

  // イベントクリック
  const eventClick = (arg: EventClickArg) => {
    setOperationModeType(OperationModeType.Edit);
    const targetRecord = learningRecords.find(
      (learningRecord) => learningRecord.id === arg.event.id
    );
    setSelectedRecord(targetRecord);
    console.debug(arg.event.id);
    console.debug(targetRecord);
    onOpen();
  };

  // モーダルを閉じるときにデータを再取得
  const onCloseRecordModal = () => {
    getLearningRecords();
    onClose();
  };

  return (
    <>
      <FullCalendar
        locale="ja"
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth listWeek", // 追加
        }}
        dateClick={handleDateClick}
        eventContent={renderEventContent}
        initialView="dayGridMonth"
        eventClick={eventClick}
        events={events}
      />
      <RecordModal
        isOpen={isOpen}
        operationModeType={operationModeType}
        selectedRecord={selectedRecord!}
        onClose={onCloseRecordModal}
      ></RecordModal>
    </>
  );
};
