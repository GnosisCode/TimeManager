import { ITimeSheetListProvider } from "../../../services/ITimeSheetListProvider";

export interface ITimeManagerProps {
  userEmail:string;
  numberofEntries: number;
  totalDayHours: number;
  currentUser: String;
  listProvider: ITimeSheetListProvider;
}
