import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SSD WAD CALENDAR',
  description: 'Assessment test for PT Sukses Solusindo Digital',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
