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
