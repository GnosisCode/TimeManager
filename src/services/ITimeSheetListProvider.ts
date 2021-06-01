import { TimeSheetItem } from "../models/TimeSheetItem";

export interface ITimeSheetListProvider {
  fetchMyTimeSheetSPList(): Promise<TimeSheetItem[]>;
}
