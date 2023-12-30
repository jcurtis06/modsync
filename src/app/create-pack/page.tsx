"use client";

import { createPack, getSyncMod } from "@/lib/modpack/ModpackManager";
import { useState } from "react";

export default function CreatePack() {
  const [packName, setPackName] = useState("");
  const [author, setAuthor] = useState("");
  const [version, setVersion] = useState("");
  const [projectId, setProjectId] = useState("");
  const [fileId, setFileId] = useState("");
  const [packCreated, setPackCreated] = useState(false);
  const [modList, setModList] = useState<
    { projectId: string; fileId: string }[]
  >([]);

  const handleCreatePack = async () => {
    setPackCreated(true);

    const resolvedSyncMods = await Promise.all(
      modList.map((mod) => getSyncMod(mod.projectId, mod.fileId))
    );

    const pack = await createPack(packName, author, version, resolvedSyncMods);
    pack.installMods();
  };
  const handleAddMod = () => {
    setModList([...modList, { projectId, fileId }]);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Create a Pack</h2>
      <div className="mb-3">
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Pack Name"
          value={packName}
          onChange={(e) => setPackName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Version"
          value={version}
          onChange={(e) => setVersion(e.target.value)}
        />
      </div>

      <h3 className="text-lg font-bold mb-2">Mods</h3>
      <div className="mb-3">
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Project ID"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <input
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="File ID"
          value={fileId}
          onChange={(e) => setFileId(e.target.value)}
        />
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
        onClick={handleAddMod}
      >
        Add Mod
      </button>
      <button
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCreatePack}
      >
        Create Pack
      </button>

      <div className="mt-4">
        <p>Mod List</p>
        {modList.map((mod) => (
          <div key={mod.projectId + mod.fileId} className="flex flex-row">
            <p>
              {mod.projectId} {mod.fileId}
            </p>
            <button
              className="ml-auto text-rose-500"
              onClick={() => {
                setModList(
                  modList.filter(
                    (m) =>
                      m.projectId !== mod.projectId && m.fileId !== mod.fileId
                  )
                );
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
