import { TimeSheetItem } from "../../../models/TimeSheetItem";

export interface ITimeManagerState {
  numberofEntries: number;
  totalDayHours: number;
  currentUser: String;
  timeSheetItems: TimeSheetItem[];
  loading: boolean;
  error: string;
}
