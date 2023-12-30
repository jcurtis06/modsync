/*
{
  "minecraft": {
    "version": "1.20.1",
    "modLoaders": [
      {
        "id": "forge-47.2.0",
        "primary": true
      }
    ]
  },
  "manifestType": "minecraftModpack",
  "manifestVersion": 1,
  "name": "New Jonathan mod",
  "version": "",
  "author": "",
  "files": [
    {
      "projectID": 649832,
      "fileID": 4946509,
      "required": true
    },
    {
      "projectID": 549225,
      "fileID": 4718251,
      "required": true
    }
  ],
  "overrides": "overrides"
}

manifest example
*/

/**
 * Manifest for a CurseForge modpack
 */
export interface CurseManifest {
  minecraft: {
    version: string;
    modLoaders: {
      id: string;
      primary: boolean;
    }[];
  };
  manifestType: string;
  manifestVersion: number;
  name: string;
  version: string;
  files: {
    projectID: number;
    fileID: number;
    required: boolean;
  }[];
}

/**
 * Manifest for a CurseForge mods
 */
export interface CurseMod {
  projectID: number;
  fileID: number;
}
