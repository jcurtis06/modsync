// Gets the data from PortableMC

import { fs, path } from "@tauri-apps/api";
import type { MinecraftAccount } from "./types";

export async function getMinecraftAccount(): Promise<MinecraftAccount> {
    const fileContent = await fs.readTextFile(await path.appDataDir() + "launcher\\portablemc_auth.json")
    console.log(await path.appDataDir() + "launcher\\portablemc_auth.json")
    console.log(fileContent)
    const json = JSON.parse(fileContent)
    const sessions = json.microsoft.sessions;
    const firstSessionKey = Object.keys(sessions)[0];
    let account = sessions[firstSessionKey] as MinecraftAccount;
    account.email = firstSessionKey;
    return account;
}
