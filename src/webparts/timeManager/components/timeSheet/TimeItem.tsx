import * as React from "react";
import {
  ButtonType,
  FocusZone,
  FocusZoneDirection,
  css,
  IconButton,
} from "office-ui-fabric-react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { Label } from "office-ui-fabric-react/lib/Label";

import ITimeItemProps from "./ITimeItemProps";
import { TimeSheetItem } from "../../../../models/TimeSheetItem";

export default class TimeItem extends React.Component<ITimeItemProps, {}> {
  constructor(props: ITimeItemProps) {
    super(props);
    this._onTimeDelete = this._onTimeDelete.bind(this);
  }

  private _onTimeDelete(deleteItem: TimeSheetItem) {
    debugger;
    this.props.onTimeDelete(deleteItem);
  }

  public shouldComponentUpdate(newProps: ITimeItemProps): boolean {
    return this.props.TimeSheetItem !== newProps.TimeSheetItem;
  }

  public render(): JSX.Element {
    return (
      <div
        role="row"
        className={"ms-Grid-col ms-lg12"}
        style={{ color: "#000" }}
        data-is-focusable={false}
      >
        <div className={"ms-Grid-col ms-lg3"}>
          {this.props.TimeSheetItem.Title}
        </div>
        <div className={"ms-Grid-col ms-lg3"}>
          {this.props.TimeSheetItem.Description}
        </div>
        <div className={"ms-Grid-col ms-lg2"}>
          {this.props.TimeSheetItem.Category}
        </div>
        <div className={"ms-Grid-col ms-lg2"}>
          {this.props.TimeSheetItem.Status}
        </div>
        <div className={"ms-Grid-col ms-lg1"}>
          {this.props.TimeSheetItem.TotalHours}
        </div>
        <div className={"ms-Grid-col ms-lg1"}>
          <IconButton
            checked={true}
            iconProps={{ iconName: "Cancel" }}
            className="close"
            onClick={() => this._onTimeDelete(this.props.TimeSheetItem)}
          />
        </div>
      </div>
    );
  }
}
