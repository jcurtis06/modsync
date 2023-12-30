import Link from "next/link";

export default function SideBarItem({
  title,
  href,
  className,
}: {
  title: string;
  href: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`p-3 hover:bg-dark transition-all ${className}`}
    >
      {title}
    </Link>
  );
}
