import { ResponseType, fetch } from "@tauri-apps/api/http";
import { env } from "process";
import { fs } from "@tauri-apps/api";
import { downloadFile } from "../utils/FileDownloader";

/**
 * Gets the download URL a mod from CurseForge
 * @param modId The mod's ID, aka Project ID
 * @param fileId The ID of the file/version to download
 * @param out The output **directory**
 */
export async function getModData(
  modId: string,
  fileId: string,
  out: string
): Promise<any> {
  const res = await fetch<ResponseType.JSON>(
    `https://api.curseforge.com/v1/mods/${modId}/files/${fileId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "x-api-key":
          "$2a$10$7zEnUSGkqtsAVq4njPOX3.SCNDKgL8YWp/3Ec/TqYdfPJ25HjED66",
      },
    }
  );

  const data = res.data as any;
  return data.data;
}
