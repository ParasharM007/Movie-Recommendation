import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <body>

        <AuthProvider>
         

        {children}
         
        </AuthProvider>
      </body>
    </html>
  );
}
