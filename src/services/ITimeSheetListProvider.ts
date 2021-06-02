import { TimeSheetItem } from "../models/TimeSheetItem";

export interface ITimeSheetListProvider {
  fetchMyTimeSheetSPList(): Promise<TimeSheetItem[]>;
  addMyTimeSheetSPList(newItem: TimeSheetItem): Promise<Boolean>;
  deleteMyTimeSheetSPList(newItem: TimeSheetItem): Promise<Boolean>;
}
