import * as React from "react";
import {
  PrimaryButton,
  TextField,
  ButtonType,
  Persona,
  PersonaSize,
} from "office-ui-fabric-react";
import ITimeTextProps from "./ITimeTextProps";
import { TimeSheetItem } from "../../../../models/TimeSheetItem";
import ITimeTextState from "./ITimeTextState";

export default class TimeText extends React.Component<
  ITimeTextProps,
  ITimeTextState
> {
  constructor(props: ITimeTextProps) {
    super(props);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._onSave = this._onSave.bind(this);
    this.state = {
      Category: null,
      Description: null,
      Status: null,
      Title: null,
      TotalHours: null,
    };
  }

  public render(): JSX.Element {
    return (
      <form>
        <div className="ms-Grid-row">
          <div className="TimeLabel">Title</div>
          <TextField
            placeholder=""
            value={this.state.Title.toString()}
            id="txtTime"
            autoComplete="on"
            onChanged={(newValue) => this.setState({ Title: newValue })}
            className="TimeText"
          />
          <div className="TimeLabel">Description</div>
          <TextField
            placeholder=""
            value={this.state.Description.toString()}
            id="txtTime"
            autoComplete="on"
            multiline={true}
            onChanged={(newValue) => this.setState({ Description: newValue })}
            className="TimeText"
          />
          <div className="TimeLabel">Category</div>
          <TextField
            placeholder=""
            value={this.state.Category.toString()}
            id="txtTime"
            autoComplete="on"
            multiline={true}
            onChanged={(newValue) => this.setState({ Category: newValue })}
            className="TimeText"
          />
          <div className="TimeLabel">Hours</div>
          <TextField
            placeholder=""
            value={this.state.TotalHours.toString()}
            id="txtTime"
            autoComplete="on"
            multiline={true}
            onChanged={(newValue) => this.setState({ TotalHours: newValue })}
            className="TimeText"
          />
          <PrimaryButton
            className="TimePost"
            buttonType={ButtonType.primary}
            onClick={this._onSave}
          >
            Submit
          </PrimaryButton>
        </div>
      </form>
    );
  }

  private _handleInputChange(newValue: string) {
    debugger;
    this.setState({});
  }

  private _onSave(event?: React.MouseEvent<HTMLButtonElement>) {
    debugger;
    
    let timeEntry = new TimeSheetItem();
    timeEntry.Title = this.state.Title;
    timeEntry.Category = this.state.Category;
    timeEntry.Description = this.state.Description;
    timeEntry.TotalHours = this.state.TotalHours;

    this.props.onTimeAdd(timeEntry);
    this.setState({
      Title: "",
    });
    event.currentTarget.disabled = true;
  }
}
