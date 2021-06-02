import { TimeSheetItem } from "../../../../models/TimeSheetItem";

interface ITimeListProps {
  timeSheets: TimeSheetItem[];
  TotalHours: Number;
  onTimeAdd: (newTime: TimeSheetItem) => void;
  onTimeDelete: (deleteItem: TimeSheetItem) => void;
}

export default ITimeListProps;
