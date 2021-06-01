import * as React from "react";
import styles from "./TimeManager.module.scss";
import { ITimeManagerProps } from "./ITimeManagerProps";
import { escape } from "@microsoft/sp-lodash-subset";

import TimeList from "./timeSheet/TimeList";

import {
  PersonaSize,
  IFacepileProps,
  Facepile,
  OverflowButtonType,
  Spinner,
  MessageBar,
  MessageBarType,
  ButtonType,
} from "office-ui-fabric-react/lib/index";

import {
  IconButton,
  IconType,
  PrimaryButton,
  Link,
} from "office-ui-fabric-react";
import { TimeSheetItem } from "../../../models/TimeSheetItem";
import { ITimeManagerState } from "./ITimeManagerState";
import Toolbar from "./toolbar/Toolbar";

export default class TimeManager extends React.Component<
  ITimeManagerProps,
  ITimeManagerState
> {
  constructor(props: ITimeManagerProps) {
    super(props);
    this.state = {
      timeSheetItems: null,
      numberofEntries: 0,
      currentUser: null,
      error: null,
      loading: true,
      totalDayHours: 0,
    };
  }

  public componentDidMount(): void {
    this.props.listProvider
      .fetchMyTimeSheetSPList()
      .then((items: TimeSheetItem[]) => {
        debugger;
        this.setState(
          (
            prevState: ITimeManagerState,
            props: ITimeManagerProps
          ): ITimeManagerState => {
            prevState.timeSheetItems = items;
            prevState.loading = false;
            prevState.numberofEntries = items.length;
            return prevState;
          }
        );
      });
  }

  public render(): React.ReactElement<ITimeManagerProps> {
    const error =
      this.state.error != null ? (
        <MessageBar messageBarType={MessageBarType.error}>
          {this.state.error}
        </MessageBar>
      ) : null;

    const loading = this.state.loading ? (
      <div style={{ margin: "0 auto" }}>
        <Spinner label={"Loading ..."} />
      </div>
    ) : null;
    const timeSheet: JSX.Element =
      this.state.numberofEntries > 0 ? (
        <TimeList timeSheets={this.state.timeSheetItems} />
      ) : (
        <div />
      );

    return (
      <div className={styles.timeManager}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div>
              <Toolbar
                message={"Welcome, "}
                displayName={this.props.currentUser.toString()}
                userEmail={this.props.userEmail}
              />
              {error}
              {loading}
              {timeSheet}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
