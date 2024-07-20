export enum OperationModeType {
  Add = "01",
  Edit = "02",
  Delete = "03",
}

export type OperationModeTypeOption = {
  value: string;
  label: string;
};

export const OperationModeTypeOptions: OperationModeTypeOption[] = [
  { value: OperationModeType.Add, label: "追加" },
  { value: OperationModeType.Edit, label: "編集" },
  { value: OperationModeType.Delete, label: "削除" },
];

// 操作文字列を取得
export const GetOperationModeString = (
  operationModeType: OperationModeType
) => {
  const option = OperationModeTypeOptions.find(
    (opt) => opt.value === operationModeType
  );

  return option?.label;
};

// ヘッダー文字列を生成
export const GenerateOperationModeTypeHeader = (
  title: string,
  operationModeType: OperationModeType
) => {
  const operationModeString = GetOperationModeString(operationModeType);

  return `${title}（${operationModeString}）`;
};

// 操作完了文字列を取得
export const GetOperationFinishMessage = (
  operationModeType: OperationModeType
) => {
  const operationModeString = GetOperationModeString(operationModeType);

  return `${operationModeString}しました。`;
};
