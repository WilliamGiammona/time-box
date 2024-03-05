import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { authOptions } from '@/pages/api/auth/[...nextauth].js';
import { getServerSession } from 'next-auth';
import SessionProvider from './SessionProvider';
import Navbar from '@/components/Navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    console.log('Children:', children); // Logging children variable
    const session = await getServerSession(authOptions);
    return (
        <html lang="en">
            <body className={inter.className}>
                <SessionProvider session={session}>
                    <Navbar />
                    {children}
                </SessionProvider>
            </body>
        </html>
    );
}
