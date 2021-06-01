import { TimeSheetItem } from "../models/TimeSheetItem";
import { ITimeSheetListProvider } from "./ITimeSheetListProvider";
import { Log } from "@microsoft/sp-core-library";
import { Web, ListEnsureResult } from "@pnp/sp";

const LOG_SOURCE: string = "TimeSheetManager_WebPart";

export class TimeSheetListProvider implements ITimeSheetListProvider {
  private readonly _webAbsoluteUrl: string;
  private readonly _spTimeSheetList: string;
  private readonly _spUserID: string; 

  constructor(
    webAbsoluteUrl: string,
    spTimeSheetList: string,
    spUserID: string
  ) {
    this._webAbsoluteUrl = webAbsoluteUrl;
    this._spTimeSheetList = spTimeSheetList;
    this._spUserID = spUserID;
  }

  fetchMyTimeSheetSPList(): Promise<TimeSheetItem[]> {
    return new Promise<TimeSheetItem[]>((resolve, reject) => {
      let web: Web = new Web(this._webAbsoluteUrl);
      let today = new Date();
      today.setHours(0, 0, 0, 0);

      web.lists
        .ensure(this._spTimeSheetList)
        .then((listResult: ListEnsureResult) => {
          listResult.list.items
            .select(
              "ID",
              "Title",
              "TimeManagementCategory",
              "TimeManagementDescription",
              "Hours",
              "Created",
              "Author/ID"
            )
            .expand("Author")
            .filter(
              `Created ge datetime'${today.toISOString()}' and Author/ID eq '${encodeURIComponent(
                this._spUserID
              )}'`
            )
            .get()
            .then((items: TimeSheetItem[]) => {
              var myEntries = items.map((item) => {
                return {
                  TimeSheetID: item["ID"],
                  Title: item["Title"],
                  Category: item["TimeManagementCategory"],
                  Description: item["TimeManagementDescription"],
                  Status: item["Status"],
                  TotalHours: item["Hours"],
                  Created: new Date(Date.parse(item["Created"].toString())),
                  CreatedBy: item["Author"].ID,
                };
              });
              resolve(myEntries);
            })
            .catch((error) => {
              Log.error(
                LOG_SOURCE,
                new Error(`${this._spTimeSheetList} List does not exits.`)
              );

              reject(error);
            });
        })
        .catch((error) => {
          Log.error(
            LOG_SOURCE,
            new Error(`${this._spTimeSheetList} List does not exits.`)
          );
          reject(error);
        });
    });
  }

  addMyTimeSheetSPList(newItem: TimeSheetItem): Promise<Boolean> {
    return new Promise<Boolean>((resolve, reject) => {
      debugger;
      let spSite = new Web(this._webAbsoluteUrl);
      return spSite.lists
        .getByTitle(this._spTimeSheetList)
        .items.add({
          Title: newItem.Title,
          TimeManagementDescription: newItem.Description,
          TimeManagementCategory: newItem.Category,         
          Hours: newItem.TotalHours
        })
        .then(async (data: any) => {
          resolve(true);
        })
        .catch((error) => {
          Log.error(
            LOG_SOURCE,
            new Error(`${this._spTimeSheetList} Could not create entry.`)
          );
          reject(false);
        });
    });
  }
}
