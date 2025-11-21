/**
 * ExtensionGuard - Protection against browser extension interference
 * Prevents hydration mismatches caused by browser extensions modifying DOM
 */
"use client";

import { useEffect, useState } from 'react';

interface ExtensionGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function ExtensionGuard({ children, fallback }: ExtensionGuardProps) {
  const [isClient, setIsClient] = useState(false);
  const [extensionDetected, setExtensionDetected] = useState(false);

  useEffect(() => {
    // Mark as client-side rendered
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }

    // Detection for common extension interference
    const detectExtensions = () => {
      // Check for common extension modifications
      const checks = [
        // AdBlockers often inject elements
        () => document.querySelectorAll('[data-adblock]').length > 0,
        () => document.querySelectorAll('[id*="adblock"]').length > 0,
        
        // Password managers inject inputs
        () => document.querySelectorAll('input[data-onepassword-field]').length > 0,
        () => document.querySelectorAll('input[data-lastpass-field]').length > 0,
        
        // Grammarly injects elements
        () => document.querySelectorAll('[data-grammarly-extension]').length > 0,
        
        // Check for unexpected script tags
        () => {
          const scripts = document.querySelectorAll('script[src]');
          return Array.from(scripts).some((script: Element) => {
            const scriptElement = script as HTMLScriptElement;
            return scriptElement.src?.includes('extension://') || 
                   scriptElement.src?.includes('chrome-extension://');
          });
        }
      ];

      const detected = checks.some(check => {
        try {
          return check();
        } catch {
          return false;
        }
      });

      if (detected) {
        console.warn('🔍 Browser extension interference detected');
        setExtensionDetected(true);
      }
    };

    // Run detection after a delay to let extensions load
    const timer = setTimeout(detectExtensions, 500);

    return () => clearTimeout(timer);
  }, []);

  // Show fallback during SSR or if extensions interfere
  if (!isClient) {
    return fallback || children;
  }

  // If extension detected, add protective wrapper
  if (extensionDetected) {
    return (
      <div data-extension-protected="true" suppressHydrationWarning>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}

/**
 * Hook for components that need extension detection
 */
export function useExtensionDetection() {
  const [extensionDetected, setExtensionDetected] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
    
    // Simple extension detection
    const hasExtensionElements = () => {
      // Check for common extension-injected attributes
      return document.querySelector('[data-extension]') !== null ||
             document.querySelector('[data-adblock]') !== null ||
             document.querySelector('[data-grammarly-extension]') !== null;
    };

    const timer = setTimeout(() => {
      setExtensionDetected(hasExtensionElements());
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return { extensionDetected, isClient };
}