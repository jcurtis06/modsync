import { fs } from "@tauri-apps/api";
import { BaseDirectory } from "@tauri-apps/api/fs";
import { ResponseType, fetch } from "@tauri-apps/api/http";

/**
 * Downloads a file from a URL
 * @param url The URL to download from (must be direct link)
 * @param out The output **file** (not directory)
 */
export async function downloadFile(url: string, out: string) {
  console.log("Downloading " + url + "...");
  await fetch(url, {
    method: "GET",
    responseType: ResponseType.Binary,
  })
    .then((res) => {
      const contents = res.data as any;

      fs.writeFile(
        {
          path: out,
          contents: contents,
        },
        { dir: BaseDirectory.AppData }
      );

      console.log("Downloaded " + out + "!");
    })
    .catch((err) => {
      console.log(err);
    });
}
