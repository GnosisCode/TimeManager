import * as React from "react";
import {
  ButtonType,
  FocusZone,
  FocusZoneDirection,
  css,
} from "office-ui-fabric-react";
import { Checkbox } from "office-ui-fabric-react/lib/Checkbox";
import { Label } from "office-ui-fabric-react/lib/Label";

import ITimeItemProps from "./ITimeItemProps";

export default class TimeItem extends React.Component<ITimeItemProps, {}> {
  constructor(props: ITimeItemProps) {
    super(props);
  }

  public shouldComponentUpdate(newProps: ITimeItemProps): boolean {
    return this.props.TimeSheetItem !== newProps.TimeSheetItem;
  }

  public render(): JSX.Element {
    const classTimeSheetItem: string = css("ms-Grid", "ms-u-slideDownIn20");

    return (
      <div role="row" className={classTimeSheetItem} data-is-focusable={false}>
        <div
          style={{ width: "100%", margin: "4px" }}
          className={css("ms-Grid-row")}
        >
          {this.props.TimeSheetItem.Description}
        </div>
      </div>
    );
  }
}
