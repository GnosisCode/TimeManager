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
    this._onTimeAdd = this._onTimeAdd.bind(this);
    this._onTimeDelete = this._onTimeDelete.bind(this);

    this.state = {
      timeSheetItems: null,
      numberofEntries: 0,
      currentUser: null,
      error: null,
      loading: true,
      totalDayHours: 0,
    };
  }

  private _onTimeAdd(newTime: TimeSheetItem) {
    this.setState(
      (
        prevState: ITimeManagerState,
        props: ITimeManagerProps
      ): ITimeManagerState => {
        prevState.loading = true;
        return prevState;
      }
    );
    if (newTime.Category.length > 0 && newTime.TotalHours > 0) {
      this.props.listProvider.addMyTimeSheetSPList(newTime).then((success) => {
        debugger;
        if (success) {
          this._fetchData();
        } else {
          this.setState({ error: "Something Went Wrong" });
        }
      });
    } else {
      //CANCEL
      this.setState(
        (
          prevState: ITimeManagerState,
          props: ITimeManagerProps
        ): ITimeManagerState => {
          prevState.loading = false;
          return prevState;
        }
      );
    }
  }

  private _onTimeDelete(deleteTime: TimeSheetItem) {
    this.setState(
      (
        prevState: ITimeManagerState,
        props: ITimeManagerProps
      ): ITimeManagerState => {
        prevState.loading = true;
        return prevState;
      }
    );
    if (deleteTime.TimeSheetID != null) {
      this.props.listProvider
        .deleteMyTimeSheetSPList(deleteTime)
        .then((success) => {
          debugger;
          if (success) {
            this._fetchData();
          } else {
            this.setState({ error: "Something Went Wrong" });
          }
        });
    } else {
      //CANCEL
      this.setState(
        (
          prevState: ITimeManagerState,
          props: ITimeManagerProps
        ): ITimeManagerState => {
          prevState.loading = false;
          return prevState;
        }
      );
    }
  }

  private _fetchData(): void {
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
            prevState.error = null;
            if (items.length > 0) {
              debugger;
              prevState.numberofEntries = items.length;
              prevState.totalDayHours = Number(
                items
                  .map((e) => e.TotalHours)
                  .reduce((x: number, y: number) => x + y)
              );
            }
            return prevState;
          }
        );
      })
      .catch((error) => {
        this.setState({ error: "Something Went Wrong" });
        this.setState({ loading: false });
      });
  }

  public componentDidMount(): void {
    this._fetchData();
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
    const timeSheet: JSX.Element = !this.state.loading ? (
      <TimeList
        timeSheets={this.state.timeSheetItems}
        onTimeAdd={this._onTimeAdd}
        onTimeDelete={this._onTimeDelete}
        TotalHours={this.state.totalDayHours}
      />
    ) : null;
    return (
      <div className={styles.timeManager}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div>
              <Toolbar
                message={"Welcome"}
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
