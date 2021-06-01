import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-webpart-base";

import * as strings from "TimeManagerWebPartStrings";
import TimeManager from "./components/TimeManager";
import { ITimeManagerProps } from "./components/ITimeManagerProps";
import { ITimeSheetListProvider } from "../../services/ITimeSheetListProvider";
import { TimeSheetListProvider } from "../../services/TimeSheetListProvider";
import { Web } from "@pnp/sp"; 

export interface ITimeManagerWebPartProps {
  numberofEntries: number;
  totalDayHours: number;
  currentUser: String;
  userEmail:String;
}

export default class TimeManagerWebPart extends BaseClientSideWebPart<ITimeManagerWebPartProps> {
  public async render(): Promise<void> {
    const element: React.ReactElement<ITimeManagerProps> = React.createElement(
      TimeManager,
      {
        numberofEntries: this.properties.numberofEntries,
        totalDayHours: this.properties.totalDayHours,
        currentUser: this.context.pageContext.user.displayName,
        userEmail:this.context.pageContext.user.loginName,
        listProvider: await this.getListProvider(),
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async getListProvider(): Promise<ITimeSheetListProvider> {
    debugger;
    let webUrl: string = this.context.pageContext.web.absoluteUrl;
    webUrl = this.context.pageContext.site.absoluteUrl;
    let userId = await this.getUserId(
      this.context.pageContext.user.loginName,
      webUrl
    );
    return new TimeSheetListProvider(
      webUrl,
      "Time Management List",
      userId.toString()
    );
  }

  private getUserId(email: string, url: String): Promise<number> {
    let curentSite = new Web(url.toString());
    return curentSite.ensureUser(email).then((result) => {
      return result.data.Id;
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
