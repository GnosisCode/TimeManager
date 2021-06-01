import * as React from "react";
import {
  PrimaryButton,
  TextField,
  ButtonType,
  Persona,
  PersonaSize,
  Label,
  Dropdown,
  IDropdownOption,
} from "office-ui-fabric-react";
import ITimeFormProps from "./ITimeFormProps";
import { TimeSheetItem } from "../../../../models/TimeSheetItem";
import ITimeFormState from "./ITimeFormState";
import styles from "../TimeManager.module.scss";

export default class TimeForm extends React.Component<
  ITimeFormProps,
  ITimeFormState
> {
  constructor(props: ITimeFormProps) {
    super(props);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._onSave = this._onSave.bind(this);
    this._setHours = this._setHours.bind(this);
    this._showError = this._showError.bind(this);
    this._showDescError = this._showDescError.bind(this);
    this.state = {
      Category: "",
      Description: "",
      Status: "",
      Title: "",
      TotalHours: 0,
      AllDayHours: 0,
      Error: false,
      Loading: false,
      NeedsApproval: false,
    };
  }

  private getCategories(menuItems: string[]): IDropdownOption[] {
    return menuItems.map((menuItem, index) => {
      return {
        key: index,
        text: menuItem,
      };
    });
  }

  public render(): JSX.Element {
    let categories = ["Billable", "Non-Billable", "Upskilling", "Meeting"];
    return (
      <form>
        <div className="ms-Grid-row">
          <TextField
            placeholder=""
            value={this.state.Title.toString()}
            autoComplete="on"
            inputClassName={styles.formTitle}
            label="Title:"
            onChanged={(newValue) => this.setState({ Title: newValue })}
          />

          <TextField
            placeholder=""
            value={this.state.Description.toString()}
            autoComplete="on"
            label="Description:"
            inputClassName={styles.formTitle}
            validateOnFocusOut
            required={true}
            rows={4}
            multiline={true}
            onChanged={(newValue) => this.setState({ Description: newValue })}
            onGetErrorMessage={this._showDescError}
          />

          <Dropdown
            label="Category"
            onChanged={(e, index) => {
              this.setState({ Category: categories[index] });
            }}
            defaultValue={this.state.Category.toString()}
            options={this.getCategories(categories)}
          />

          <TextField
            placeholder=""
            value={this.state.TotalHours.toString()}
            autoComplete="on"
            label="Hours"
            validateOnFocusOut={true}
            required={true}
            type="number"
            min={0}
            onChanged={this._setHours}
            onGetErrorMessage={this._showError}
          />
          <PrimaryButton
            className={styles.button}
            buttonType={ButtonType.primary}
            onClick={this._onSave}
            disabled={this.state.Error}
          >
            Submit
          </PrimaryButton>
          <PrimaryButton
            className={styles.button}
            buttonType={ButtonType.primary}
            onClick={this._onSave}
          >
            Cancel
          </PrimaryButton>
        </div>
      </form>
    );
  }
  private _setHours(newValue: any): void {
    debugger;
    if (!Number(newValue)) {
      return;
    } else {
      if (Number(newValue) > 0) {
        this.setState({ Error: false });
        this.setState({ TotalHours: Number(newValue) });
      } else {
        this.setState({ Error: true });
        this.setState({ TotalHours: Number(0) });
      }
    }
  }

  private _showError(value: string): string {
    debugger;
    if (Number(value) > 0) {
      this.setState({ Error: false });
      this.setState({ TotalHours: Number(value) });
      return "";
    } else {
      this.setState({ Error: true });
      this.setState({ TotalHours: Number(value) });
      return "The field requires a value";
    }
  }

  private _showDescError(value: string): string {
    debugger;
    if (value.length > 0) {
      this.setState({ Error: false });
      this.setState({ Description: value });
      return "";
    } else {
      this.setState({ Error: true });
      this.setState({ Description: value });
      return "The field requires a value";
    }
  }

  private _handleInputChange(newValue: string) {
    debugger;
    this.setState({});
  }

  private _onSave(event?: React.MouseEvent<HTMLButtonElement>) {
    debugger;
    this.setState({ Loading: true });

    let timeEntry = new TimeSheetItem();
    timeEntry.Title = this.state.Title;
    timeEntry.Category = this.state.Category;
    timeEntry.Description = this.state.Description;
    timeEntry.TotalHours = this.state.TotalHours;

    this.props.onTimeAdd(timeEntry);
  }
}
