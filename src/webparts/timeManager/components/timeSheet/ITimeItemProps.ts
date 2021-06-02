import { TimeSheetItem } from "../../../../models/TimeSheetItem";

interface ITimeItemProps {
  TimeSheetItem: TimeSheetItem;
  onTimeDelete: (deleteItem: TimeSheetItem) => void;
}

export default ITimeItemProps;
