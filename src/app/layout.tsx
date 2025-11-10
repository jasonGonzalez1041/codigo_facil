import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CodigoFacil.com - Desarrollo Web Profesional para LATAM | Desde $99 USD",
  description: "🚀 Desarrollo web profesional para empresas de Latinoamérica. Sitios web modernos, tiendas online y aplicaciones que impulsan tu negocio. Planes desde $99 USD, hosting incluido y soporte en español. ¡Tu presencia digital lista en 7 días!",
  keywords: "desarrollo web LATAM, sitios web profesionales, e-commerce latinoamérica, páginas web empresariales, tiendas online, desarrollo Next.js, diseño web responsive, hosting incluido, soporte español",
  authors: [{ name: "CodigoFacil.com" }],
  creator: "CodigoFacil.com",
  publisher: "CodigoFacil.com",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://codigofacil.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es',
      'es-MX': '/mx',
      'es-AR': '/ar',
      'es-CO': '/co',
      'es-CL': '/cl',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://codigofacil.com',
    title: 'CodigoFacil.com - Desarrollo Web Profesional para LATAM',
    description: 'Desarrollo web profesional para empresas de Latinoamérica. Planes desde $99 USD con hosting incluido y soporte en español.',
    siteName: 'CodigoFacil.com',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'CodigoFacil.com - Desarrollo Web para LATAM',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CodigoFacil.com - Desarrollo Web para LATAM',
    description: 'Desarrollo web profesional para empresas latinoamericanas. Desde $99 USD.',
    images: ['/og-image.png'],
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
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CodigoFacil.com",
    "description": "Desarrollo web profesional para empresas de Latinoamérica",
    "url": "https://codigofacil.com",
    "logo": "https://codigofacil.com/icon.svg",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+56995022549",
      "contactType": "customer service",
      "areaServed": ["MX", "AR", "CO", "CL", "PE", "EC", "UY", "BO", "PY"],
      "availableLanguage": "Spanish"
    },
    "serviceType": "Desarrollo de Software",
    "priceRange": "$99 - $20/hora"
  };

  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}