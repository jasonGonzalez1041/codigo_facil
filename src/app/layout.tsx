import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { GTMProvider } from "@/components/analytics/gtm-provider";
import FloatingWhatsAppWithOffers from "@/components/layout/FloatingWhatsApp";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: `${process.env.NEXT_PUBLIC_SITE_NAME || 'CodigoFacil.com'} - Desarrollo Web Profesional para LATAM | Desde $99 USD`,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "🚀 Desarrollo web profesional para empresas de Latinoamérica. Sitios web modernos, tiendas online y aplicaciones que impulsan tu negocio. Planes desde $99 USD, hosting incluido y soporte en español. ¡Tu presencia digital lista en 7 días!",
    keywords: "desarrollo web LATAM, sitios web profesionales, e-commerce latinoamérica, páginas web empresariales, tiendas online, desarrollo Next.js, diseño web responsive, hosting incluido, soporte español, desarrollo web mexico, desarrollo web argentina, desarrollo web colombia, paginas web baratas, cuanto cuesta pagina web, empresa desarrollo web, sitios web profesionales baratos, tienda online barata, desarrollo web economico",
    authors: [{ name: process.env.NEXT_PUBLIC_COMPANY_NAME || "CodigoFacil.com" }],
    creator: process.env.NEXT_PUBLIC_COMPANY_NAME || "CodigoFacil.com",
    publisher: process.env.NEXT_PUBLIC_COMPANY_NAME || "CodigoFacil.com",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://codigofacil.com'),
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
        url: process.env.NEXT_PUBLIC_SITE_URL || 'https://codigofacil.com',
        title: `${process.env.NEXT_PUBLIC_SITE_NAME || 'CodigoFacil.com'} - Desarrollo Web Profesional para LATAM`,
        description: 'Desarrollo web profesional para empresas de Latinoamérica. Planes desde $99 USD con hosting incluido y soporte en español.',
        siteName: process.env.NEXT_PUBLIC_SITE_NAME || 'CodigoFacil.com',
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
        "name": process.env.NEXT_PUBLIC_SITE_NAME || "CodigoFacil.com",
        "description": process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "Desarrollo web profesional para empresas de Latinoamérica",
        "url": process.env.NEXT_PUBLIC_SITE_URL || "https://codigofacil.com",
        "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://codigofacil.com"}/icon.svg`,
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "50672904200"}`,
            "contactType": "customer service",
            "areaServed": ["MX", "AR", "CO", "CL", "PE", "EC", "UY", "BO", "PY"],
            "availableLanguage": "Spanish"
        },
        "serviceType": "Desarrollo de Software",
        "priceRange": "$99 - $20/hora"
    };

    return (
        <html lang="es" className="scroll-smooth" suppressHydrationWarning data-theme="system">
        <head>
            <Script 
                id="gtm-script"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'}');`
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />
        </head>
        <body
            className={`${inter.variable} ${jetBrainsMono.variable} antialiased mobile-safe`}
            suppressHydrationWarning
            data-extension-guard="true"
        >
        <noscript>
            <iframe 
                src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'}`}
                height="0" 
                width="0" 
                style={{display: 'none', visibility: 'hidden'}}
            />
        </noscript>
        
        <GTMProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
            >
                <Header />
                <main className="min-h-screen mobile-safe overflow-x-hidden">
                    {children}
                </main>
                <Footer />

                {/* Componente de WhatsApp con ofertas */}
                <FloatingWhatsAppWithOffers />

            </ThemeProvider>
        </GTMProvider>
        <Analytics />
        </body>
        </html>
    );
}