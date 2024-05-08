import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';

import './globals.css';
import { auth } from '@/auth';
import SessionProvider from './SessionProvider';
import Navbar from '@/components/Navbar/Navbar';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
    title: 'EvoCal',
    description: 'Organise your day',
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // Logging children variable
    const session = await auth();

    return (
        <html lang="en" suppressHydrationWarning>
            {' '}
            <body className={`${poppins.variable} ${inter.className}`}>
                <SessionProvider session={session}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navbar />
                        {children}
                        <Toaster />
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
