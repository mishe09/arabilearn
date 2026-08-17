import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';
import { ProgressProvider } from '@/context/ProgressContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <ProgressProvider>
            {children}
            <Toaster position="top-center" />
          </ProgressProvider>
        </AuthProvider>
      </body>
    </html>
  );
}