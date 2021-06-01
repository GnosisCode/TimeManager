import * as React from "react";
import {
  List,
  FocusZone,
  FocusZoneDirection,
  getRTLSafeKeyCode,
  KeyCodes,
} from "office-ui-fabric-react";
import ITimeListProps from "./ITimeListProps";
import ITimeItemProps from "./ITimeItemProps";
import { TimeSheetItem } from "../../../../models/TimeSheetItem";
import TimeItem from "./TimeItem";
import TimeText from "./TimeText";

export default class TimeList extends React.Component<ITimeListProps, {}> {
  constructor(props: ITimeListProps) {
    super(props);
    this._onRenderCell = this._onRenderCell.bind(this);
  }

  public render(): JSX.Element {
    return (
      <FocusZone
        direction={FocusZoneDirection.vertical}
        isInnerZoneKeystroke={(ev: React.KeyboardEvent<HTMLElement>) =>
          ev.which === getRTLSafeKeyCode(KeyCodes.right)
        }
      >
        <hr />
        <List items={this.props.timeSheets} onRenderCell={this._onRenderCell} />
        <hr />
        {/* {TimeInput} */}
      </FocusZone>
    );
  }

  private _onRenderCell(Time: TimeSheetItem, index: number) {
    return <TimeItem TimeSheetItem={Time} />;
  }
}
