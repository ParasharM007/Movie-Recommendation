
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import { Toaster } from "sonner";
import Sidebar from "./side-bar/page";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body className="bg-black">

        <AuthProvider>
         
       <Sidebar />
        {children}
         
        <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
