import { TimeSheetItem } from "../../../../models/TimeSheetItem";

interface ITimeTextProps {
  Title: String;
  TotalHours: Number;
  Status: String;
  Category: String;
  Description: String;
  onTimeAdd: (newTime: TimeSheetItem) => void;
}

export default ITimeTextProps;
