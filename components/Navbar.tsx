import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 py-4 px-6">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-lg tracking-tight">Marca.</Link>
        <div className="flex gap-6 text-sm text-zinc-400">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/projects" className="hover:text-white transition">Projects</Link>
        </div>
      </div>
    </nav>
  );
}