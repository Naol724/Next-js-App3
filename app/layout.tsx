import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100">
        {/* Navigation */}
        <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 flex gap-6 text-lg">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/add-student" className="hover:underline">
            Add Student
          </Link>
          <Link href="/view-students" className="hover:underline">
            View Students
          </Link>
        </nav>

        {/* Page Content */}
        <main className="min-h-[calc(100vh-64px)] flex justify-center items-center p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
