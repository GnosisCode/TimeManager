import * as React from "react";
import {
  List,
  FocusZone,
  FocusZoneDirection,
  getRTLSafeKeyCode,
  KeyCodes,
  ButtonType,
  PrimaryButton,
  MessageBar,
  MessageBarType,
} from "office-ui-fabric-react";
import styles from "../TimeManager.module.scss";
import ITimeListProps from "./ITimeListProps";
import ITimeItemProps from "./ITimeItemProps";
import { TimeSheetItem } from "../../../../models/TimeSheetItem";
import TimeItem from "./TimeItem";
import TimeForm from "./TimeForm";
import {
  Dialog,
  DialogType,
  DialogFooter,
} from "office-ui-fabric-react/lib/Dialog";

export default class TimeList extends React.Component<ITimeListProps, any> {
  constructor(props: ITimeListProps) {
    super(props);
    this.state = {
      showDialog: false,
    };
    this._onTimeAdd = this._onTimeAdd.bind(this);
    this._onRenderCell = this._onRenderCell.bind(this);
    this._showForm = this._showForm.bind(this);
  }

  private _onTimeAdd(newTime: TimeSheetItem) {
    debugger;
    this._showForm(false);
    this.props.onTimeAdd(newTime);
  }

  public render(): JSX.Element {
    const emptylist =
      (this.props.timeSheets == null || this.props.timeSheets.length <= 0) ? (
        <MessageBar messageBarType={MessageBarType.info}>
          No Entries for the day
        </MessageBar>
      ) : null;

    const TimeInputForm = (
      <TimeForm
        onTimeAdd={this._onTimeAdd}
        AllDayHours={this.props.TotalHours}
      />
    );
    return (
      <FocusZone
        direction={FocusZoneDirection.vertical}
        isInnerZoneKeystroke={(ev: React.KeyboardEvent<HTMLElement>) =>
          ev.which === getRTLSafeKeyCode(KeyCodes.right)
        }
      >
        <hr />
        {/* custom heading */}
        <div
          role="row"
          className={"ms-Grid-col ms-lg12"}
          style={{
            height: 40,
            background: "rgb(152, 111, 11)",
            paddingTop: 10,
            marginBottom: 5,
            color: "#fff",
          }}
        >
          <div className={"ms-Grid-col ms-lg3"}>Title</div>
          <div className={"ms-Grid-col ms-lg3"}>Description</div>
          <div className={"ms-Grid-col ms-lg2"}>Category</div>
          <div className={"ms-Grid-col ms-lg2"}>Status</div>
          <div className={"ms-Grid-col ms-lg1"}>Hours</div>
          <div className={"ms-Grid-col ms-lg1"}>Delete</div>
        </div>
        <List items={this.props.timeSheets} onRenderCell={this._onRenderCell} />
        {emptylist}
        <hr />
        <PrimaryButton
          buttonType={ButtonType.primary}
          onClick={() => this._showForm(true)}
          id="btnUpdate"
          type="submit"
          text="Capture Time"
        />

        <Dialog
          hidden={!this.state.showDialog}
          onDismiss={() => this._showForm(false)}
          dialogContentProps={{
            type: DialogType.largeHeader,
            title: "Capture Time",
            subText: "",
          }}
          modalProps={{
            isBlocking: true,
            containerClassName: styles.timeManager,
          }}
        >
          {TimeInputForm}
        </Dialog>
      </FocusZone>
    );
  }

  private _showForm(show: boolean) {
    debugger;
    this.setState({ showDialog: show });
  }

  private _onRenderCell(Time: TimeSheetItem, index: number) {
    index;

    return <TimeItem TimeSheetItem={Time} />;
  }
}
