import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavBar from '@/components/navbar';
import ReduxProvider from '@/providers/redux-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TO DO',
  description: '간단한 TO DO',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <ReduxProvider>
        <body className={inter.className}>
          <NavBar />
          <main className='min-h-screen max-w-screen-md w-full flex justify-center -mt-[90px] mx-auto'>
            {children}
          </main>
        </body>
      </ReduxProvider>
    </html>
  );
}
