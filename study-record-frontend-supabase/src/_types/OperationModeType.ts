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
