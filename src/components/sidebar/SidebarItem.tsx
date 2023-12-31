import Link from "next/link";

export default function SideBarItem({
  title,
  href,
  className,
  action,
}: {
  title: string;
  href?: string;
  className?: string;
  action?: () => void;
}) {
  if (href) {
    return (
      <Link
        href={href}
        className={`p-3 hover:bg-dark transition-all ${className}`}
      >
        {title}
      </Link>
    );
  } else if (action) {
    return (
      <div
        onClick={action}
        className={`p-3 hover:bg-dark transition-all ${className}`}
      >
        {title}
      </div>
    );
  }
}
