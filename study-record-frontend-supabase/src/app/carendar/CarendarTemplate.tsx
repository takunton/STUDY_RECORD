import { useCallback, useEffect, useState } from "react";
import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import {
  DatesSetArg,
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
import { getLearningRecordsByYm } from "../../util/supabaseFunctions";
import { OperationModeType } from "../../_types/OperationModeType";
import { getLoginInfo } from "../../_hooks/useLoginInfo";

export const CarendarTemplate = () => {
  // 表示中のカレンダー年月
  const [calendarYM, setCalendarYM] = useState<string>("");

  // 記録リスト
  const [learningRecords, setLearningRecords] = useState<LearningRecord[]>([]);

  // 選択された記録
  const [selectedRecord, setSelectedRecord] = useState<LearningRecord>();

  // 記録サマリー
  const [sumDate, setSumDate] = useState<number>(0);
  const [sumTime, setSumTime] = useState<number>(0);
  const [contentSummary, setContentSummary] = useState<Record<string, number>>(
    {}
  );

  // モーダルのモード
  const [operationModeType, setOperationModeType] = useState<OperationModeType>(
    OperationModeType.Add
  );

  // モーダルの状態
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getLearningRecords = useCallback(async (ym: string) => {
    const learningRecords = await getLearningRecordsByYm(ym);
    console.log(`取得した年月:${ym}`);
    console.log(`取得したデータ:${learningRecords}`);
    setLearningRecords(learningRecords);
    setLearningRecordSummary(learningRecords);
  }, []);

  // 記録リストを初期化
  useEffect(() => {
    getLearningRecords(calendarYM);
    console.log("記録リスト初期化");
  }, [calendarYM, getLearningRecords]);

  const handleDatesSet = (arg: DatesSetArg) => {
    const currentData = arg.view.currentStart;
    const year = currentData.getFullYear();
    const month = String(currentData.getMonth() + 1).padStart(2, "0"); // 月は0から始まるので+1

    const ym = `${year}-${month}`;
    console.log(ym);

    setCalendarYM(ym);
  };

  const setLearningRecordSummary = (records: LearningRecord[]) => {
    const uniqueDates = new Set<string>();
    let timeSum: number = 0;
    const contentTimeSummary: Record<string, number> = {};

    records.forEach((record) => {
      uniqueDates.add(record.date);
      timeSum += record.time;

      const contentName = record.learning_content.content_name;
      if (!contentTimeSummary[contentName]) {
        contentTimeSummary[contentName] = 0;
      }
      contentTimeSummary[contentName] += record.time;
    });

    setSumDate(uniqueDates.size);
    setSumTime(timeSum);
    setContentSummary(contentTimeSummary);
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
        {`${eventInfo.event.extendedProps.learningContent}：${eventInfo?.event.extendedProps.time}分`}
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
    getLearningRecords(calendarYM);
    onClose();
  };

  return (
    <>
      <Box p={4}>
        <Flex justifyContent="space-evenly">
          <Box textAlign="center">
            <Text fontSize="sm" mb={2}>
              学習日数
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
              {sumDate}
            </Text>
            <Text fontSize="lg">日</Text>
          </Box>
          <Box textAlign="center">
            <Text fontSize="sm" mb={2}>
              学習時間
            </Text>
            <Text fontSize="3xl" fontWeight="bold">
              {sumTime}
            </Text>
            <Text fontSize="lg"> 分</Text>
          </Box>
          {Object.entries(contentSummary).map(([contentName, time]) => (
            <Box key={contentName} textAlign="center">
              <Text fontSize="sm" mb={2}>
                {contentName}
              </Text>
              <Text fontSize="3xl" fontWeight="bold">
                {time}
              </Text>
              <Text fontSize="lg">分</Text>
            </Box>
          ))}
        </Flex>
      </Box>
      <FullCalendar
        locale="ja"
        plugins={[dayGridPlugin, interactionPlugin, listPlugin]}
        businessHours={{ daysOfWeek: [1, 2, 3, 4, 5] }}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth listWeek",
        }}
        dateClick={handleDateClick}
        eventContent={renderEventContent}
        initialView="dayGridMonth"
        initialDate={new Date()}
        datesSet={handleDatesSet}
        height="auto"
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
