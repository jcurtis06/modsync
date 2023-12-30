import { randomInt } from "crypto";
import { fs } from "@tauri-apps/api";
import { SyncMod } from "./SyncMod";
import { downloadFile } from "../utils/FileDownloader";
import { BaseDirectory } from "@tauri-apps/api/fs";

export class SyncPack {
  dir = "";
  modsDir = "";
  name: string;
  version: string;
  author: string;
  id: string;
  mods: SyncMod[];

  constructor(name: string, version: string, author: string) {
    this.name = name;
    this.version = version;
    this.author = author;
    this.id = "sync-123";
    this.mods = [];
  }

  createDir() {
    this.dir = this.name + "-" + this.version;
    this.modsDir = this.dir + "/mods";
    fs.createDir(this.dir, { dir: BaseDirectory.AppData });
  }

  addMod(mod: SyncMod) {
    this.mods.push(mod);
    console.log("Added mod " + mod.name);
  }

  async installMods() {
    if (await fs.exists(this.modsDir, { dir: BaseDirectory.AppData })) {
      return;
    }

    await fs
      .createDir(this.modsDir, { dir: BaseDirectory.AppData })
      .catch((err) => {
        console.log(err);
      });

    for (const mod of this.mods) {
      downloadFile(
        mod.downloadUrl,
        this.modsDir + "/" + mod.name + "-" + mod.version + ".jar"
      );
    }
  }

  removeMod(mod: SyncMod) {
    this.mods.splice(this.mods.indexOf(mod), 1);
  }

  getMods() {
    return this.mods;
  }

  setMods(mods: SyncMod[]) {
    this.mods = mods;
  }

  getName() {
    return this.name;
  }

  setName(name: string) {
    this.name = name;
  }

  getVersion() {
    return this.version;
  }

  setVersion(version: string) {
    this.version = version;
  }

  getAuthor() {
    return this.author;
  }

  setAuthor(author: string) {
    this.author = author;
  }

  getId() {
    return this.id;
  }
}
