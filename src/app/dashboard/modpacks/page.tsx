import CreatePack from "../components/CreatePack";
import YourPacks from "../components/YourPacks";

export default function Modpacks() {
  return (
    <div className="p-4 w-full">
      <YourPacks />
      <CreatePack />
    </div>
  );
}
