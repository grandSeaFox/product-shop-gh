import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Products - GH Shop ',
    description: 'Hello this is a description for better SEO in products',
  };
  
  export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
      <main className="flex flex-col w-full h-full font-inter pt-14">
        {children}
      </main>
    );
  }
  