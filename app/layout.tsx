import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import './globals.css';

const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
    title: 'ZenNotes - Minimalist Note-Taking App',
    description: 'A beautiful, minimalist note-taking app with offline support',
    manifest: '/manifest.json',
    themeColor: '#ffffff',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: 'ZenNotes',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${jetbrainsMono.variable} font-mono antialiased`}>
                {children}
            </body>
        </html>
    );
}
