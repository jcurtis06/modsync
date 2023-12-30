import Link from "next/link";

export default function YourPacks() {
  return (
    <div>
      <p className="font-bold">Your Packs</p>

      <p>
        There's nothing here yet!{" "}
        <Link href={"/"} className="text-primary">
          Try making a modpack
        </Link>
      </p>
    </div>
  );
}
