import { TimeSheetItem } from "../../../../models/TimeSheetItem";

interface ITimeListProps {
  timeSheets: TimeSheetItem[];
  TotalHours:Number;
  onTimeAdd: (newTime: TimeSheetItem) => void;
}

export default ITimeListProps;
