"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import Script from 'next/script';

interface GTMContextType {
  gtmLoaded: boolean;
  pushDataLayer: (data: any) => void;
}

const GTMContext = createContext<GTMContextType>({
  gtmLoaded: false,
  pushDataLayer: () => {}
});

interface GTMProviderProps {
  children: React.ReactNode;
  gtmId?: string;
}

export function GTMProvider({ children, gtmId }: GTMProviderProps) {
  const [gtmLoaded, setGtmLoaded] = useState(false);
  const [consentGiven, setConsentGiven] = useState<boolean | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  const GTM_ID = gtmId || process.env.NEXT_PUBLIC_GTM_ID;

  useEffect(() => {
    // Delay hydration to avoid SSR mismatch
    const timer = setTimeout(() => {
      setIsHydrated(true);
      
      // Check for existing consent (GDPR/LGPD compliance)
      if (typeof window !== 'undefined') {
        try {
          const consent = localStorage.getItem('analytics_consent');
          if (consent) {
            setConsentGiven(JSON.parse(consent));
          } else {
            // Default to false for LATAM compliance
            setConsentGiven(false);
          }
        } catch (error) {
          console.log('Error checking consent:', error);
          setConsentGiven(false);
        }
      }
    }, 100); // Small delay to ensure client-side hydration

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (consentGiven && GTM_ID && !gtmLoaded) {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      });
      setGtmLoaded(true);
    }
  }, [consentGiven, GTM_ID, gtmLoaded]);

  const pushDataLayer = (data: any) => {
    if (consentGiven && window.dataLayer) {
      window.dataLayer.push({
        ...data,
        consent_analytics: true,
        consent_marketing: consentGiven
      });
    }
  };

  const handleConsentChange = (consent: boolean) => {
    setConsentGiven(consent);
    
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('analytics_consent', JSON.stringify(consent));
        
        if (consent && window.dataLayer) {
          window.dataLayer.push({
            event: 'consent_update',
            analytics_consent: true,
            marketing_consent: true
          });
        }
      } catch (error) {
        console.log('Error setting consent:', error);
      }
    }
  };

  return (
    <GTMContext.Provider value={{ gtmLoaded, pushDataLayer }}>
      {consentGiven && GTM_ID && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`
          }}
        />
      )}

      {/* Consent Banner for LATAM compliance - Protected from browser extensions */}
      {isHydrated && consentGiven === false && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 shadow-lg z-50" suppressHydrationWarning>
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              <p>
                🍪 Usamos cookies para mejorar tu experiencia y analizar nuestro tráfico. 
                Al continuar navegando, aceptas nuestro uso de cookies.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleConsentChange(false)}
                className="px-4 py-2 text-sm border border-border rounded hover:bg-muted"
              >
                Solo necesarias
              </button>
              <button
                onClick={() => handleConsentChange(true)}
                className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90"
              >
                Aceptar todas
              </button>
            </div>
          </div>
        </div>
      )}

      {children}
    </GTMContext.Provider>
  );
}

export const useGTM = () => {
  const context = useContext(GTMContext);
  if (!context) {
    throw new Error('useGTM must be used within a GTMProvider');
  }
  return context;
};

// Declare global dataLayer type
declare global {
  interface Window {
    dataLayer: any[];
  }
}