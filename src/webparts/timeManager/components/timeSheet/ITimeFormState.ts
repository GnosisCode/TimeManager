import { TimeSheetItem } from "../../../../models/TimeSheetItem";

interface ITimeFormState {
  Title: String;
  TotalHours: Number;
  AllDayHours: Number;
  Status: String;
  Category: String;
  Description: String;
  Error: boolean;
  Loading: boolean;
  NeedsApproval: boolean;
}

export default ITimeFormState;
