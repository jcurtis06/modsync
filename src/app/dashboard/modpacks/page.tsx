import ModpackBrowser from "../components/ModpackBrowser";
import YourPacks from "../components/YourPacks";

export default function Modpacks() {
  return (
    <div className="p-4 w-full">
      <YourPacks />

      <ModpackBrowser />
    </div>
  );
}
