import * as React from "react";
import {
  ButtonType,
  FocusZone,
  FocusZoneDirection,
  css,
} from "office-ui-fabric-react";

import { Persona, PersonaSize } from "office-ui-fabric-react/lib/Persona";

export interface IToolbarProps {
  message: string;
  displayName: string;
  userEmail: string;
}

export default class Toolbar extends React.Component<IToolbarProps, {}> {
  constructor(props: IToolbarProps) {
    super(props);
  }

  public render(): JSX.Element {
    return (
      <div role="row" data-is-focusable={false}>
        <div
          style={{ width: "100%", margin: "4px", color: "#000" }}
          className={css("ms-Grid-row")}
        >
          <Persona
            size={PersonaSize.size24}
            imageUrl={`/_layouts/15/userphoto.aspx?size=M&accountname=${this.props.userEmail}`}
            primaryText={`${this.props.message}, ${this.props.displayName}`}
          />
        </div>
      </div>
    );
  }
}
