import { Inter } from "next/font/google";
import "./globals.css";
import Provider from '@/components/theme/Provider';
import { AuthProvider } from "./_contexts/authContext";
import { PharmAuthProvider } from "./_contexts/pharmauthContext";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MediLink",
  description: "Helping You Make Informed Medical Decisions",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background dark:bg-background">
        <PharmAuthProvider>
          <AuthProvider>
            <Provider>
              {children}
            </Provider>
          </AuthProvider>
        </PharmAuthProvider>
      </body>
    </html>
  );
}