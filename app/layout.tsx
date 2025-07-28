import type React from "react"
import type { Metadata } from "next"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import WhatsappButton from "@/components/whatsapp-button"

export const metadata: Metadata = {
  title: {
    default: "Vancouver Canning - Moda Urbana y Jeans | Tienda Online",
    template: "%s | Vancouver Canning"
  },
  description: "Descubre la mejor moda urbana en Vancouver Canning. Jeans, remeras, camperas y más para hombre y mujer. Calidad premium, estilo único. Envíos a todo el país.",
  keywords: "vancouver canning, moda urbana, jeans, remeras, camperas, ropa hombre, ropa mujer, tienda online argentina, moda argentina",
  authors: [{ name: "Vancouver Canning" }],
  creator: "Vancouver Canning",
  publisher: "Vancouver Canning",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://vancouvercanning.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Vancouver Canning - Moda Urbana y Jeans",
    description: "Descubre la mejor moda urbana en Vancouver Canning. Jeans, remeras, camperas y más para hombre y mujer.",
    url: 'https://vancouvercanning.com',
    siteName: 'Vancouver Canning',
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vancouver Canning - Moda Urbana y Jeans',
    description: 'Descubre la mejor moda urbana en Vancouver Canning. Jeans, remeras, camperas y más.',
    creator: '@vancouvercanning',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Open+Sans:wght@300;400;600;700&display=swap"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            window.fbq = fbq;
            fbq('init', '2152006971941111');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=2152006971941111&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          storageKey="vancouver-theme"
        >
          {children}
          <WhatsappButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
