import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { site } from "@/data/site";

export function SocialLinks({ className = "" }: { className?: string }) {
  const links = [
    { href: site.social.github, icon: FaGithub, label: "GitHub" },
    { href: site.social.linkedin, icon: FaLinkedinIn, label: "LinkedIn" },
    { href: `mailto:${site.email}`, icon: MdEmail, label: "Email" },
  ];
  return (
    <div className={`flex gap-4 ${className}`}>
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border p-2.5 text-zinc-400 transition hover:border-violet-500/50 hover:text-violet-300"
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
