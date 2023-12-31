import { supabase } from "@/supabaseClient";
import { useState } from "react";

interface Modpack {
  id: number;
  name: string;
  loader: string;
}

interface Mod {
  id?: number;
  name: string;
  download: string;
  modpack_id: number;
}

const CreateModpack = () => {
  const [modpackName, setModpackName] = useState("");
  const [loaderVersion, setLoaderVersion] = useState("");
  const [modName, setModName] = useState("");
  const [modDownload, setModDownload] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { data: modpackData, error: modpackError } = await supabase
      .from("modpacks")
      .insert([{ name: modpackName, loader: loaderVersion }])
      .select("*");

    console.log("Modpack Data: ", modpackData);

    if (modpackError || !modpackData) {
      console.error(modpackError);
      return;
    }

    const modpackId = (modpackData as Modpack[])[0].id;
    console.log("Modpack ID: ", modpackId);

    const { error: modError } = await supabase
      .from("mods")
      .insert([
        { name: modName, download: modDownload, modpack_id: modpackId },
      ]);

    if (modError) {
      console.error("Mod error: ", modError);
      return;
    }

    alert("Modpack and Mod added successfully!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Modpack Name:</label>
        <input
          type="text"
          value={modpackName}
          onChange={(e) => setModpackName(e.target.value)}
        />
      </div>
      <div>
        <label>Loader Version:</label>
        <input
          type="text"
          value={loaderVersion}
          onChange={(e) => setLoaderVersion(e.target.value)}
        />
      </div>
      <div>
        <label>Mod Name:</label>
        <input
          type="text"
          value={modName}
          onChange={(e) => setModName(e.target.value)}
        />
      </div>
      <div>
        <label>Mod Download URL:</label>
        <input
          type="text"
          value={modDownload}
          onChange={(e) => setModDownload(e.target.value)}
        />
      </div>
      <button type="submit">Create Modpack</button>
    </form>
  );
};

export default CreateModpack;
