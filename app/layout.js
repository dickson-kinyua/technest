// app/layout.js
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

// React-Toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// NextAuth Session Provider
import { SessionProviderWrapper } from '@/components/SessionProviderWrapper';

// Google Fonts
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Metadata
export const metadata = {
  title: 'Technest',
  description: 'one stop shop for all your tech needs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="antialiased bg-gray-50 text-gray-800"
        style={{
          fontFamily: `${geistSans.style.fontFamily}, ${geistMono.style.fontFamily}`,
        }}
      >
        {/* Wrap with SessionProvider */}
        <SessionProviderWrapper>
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}

          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
