"use client"; // Ajout de la directive pour forcer le rendu côté client

import React from 'react';
import { KitchnProvider } from 'kitchn';
import { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <KitchnProvider>
      <Component {...pageProps} />
    </KitchnProvider>
  );
}

export default App;
