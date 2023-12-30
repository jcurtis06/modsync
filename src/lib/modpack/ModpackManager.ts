import { getModData } from "./ModDownloader";
import { SyncMod } from "./SyncMod";
import { SyncPack } from "./SyncPack";

export async function createPack(
  name: string,
  version: string,
  author: string,
  mods: SyncMod[]
) {
  const pack = new SyncPack(name, version, author);
  pack.createDir();
  pack.setMods(mods);
  return pack;
}

export async function getSyncMod(
  projectId: string,
  fileId: string
): Promise<SyncMod> {
  const data = await getModData(projectId, fileId, "mods");

  // Return the SyncMod object
  return {
    name: "mod",
    version: "1.0.0",
    downloadUrl: data.downloadUrl,
  };
}
