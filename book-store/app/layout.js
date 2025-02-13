import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sharon's Library Of Knowledge",
  description: "Mental Knowledge and Refrences",
  keywords: "skill acquiring, educational courses, education books and tutorials",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost normal-case text-xl"> "Sharon's Library Of Knowledge" </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/about/contact">Contact</Link></li>
              <li><Link href="/githubusers">GitHub Users</Link></li></ul>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
