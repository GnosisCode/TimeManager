import { TimeSheetItem } from "../../../../models/TimeSheetItem";

interface ITimeFormProps {
  Title?: String;
  TotalHours?: Number;
  AllDayHours?: Number;
  Status?: String;
  Category?: String;
  Description?: String;
  onTimeAdd: (newTime: TimeSheetItem) => void;
}

export default ITimeFormProps;
