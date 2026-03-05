import React, { useState, useEffect } from 'react';

/**
 * Install PWA button. Shows when the app is installable (beforeinstallprompt fired)
 * and hides after install or when not available (e.g. already installed, or not HTTPS).
 */
export default function InstallPWA() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setIsVisible(true);
    };
    window.addEventListener('beforeinstallprompt', handler);

    const installed = () => {
      setIsInstalled(true);
      setIsVisible(false);
    };
    window.addEventListener('appinstalled', installed);

    // Already in standalone (installed) mode
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
      setIsInstalled(true);
      setIsVisible(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', installed);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
      setInstallPrompt(null);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible || isInstalled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <div className="bg-white border border-orange-200 shadow-lg rounded-xl px-4 py-3 flex items-center gap-3 max-w-xs">
        <span className="text-sm text-gray-700">इस ऐप को इंस्टॉल करें</span>
        <div className="flex gap-2 shrink-0">
          <button
            type="button"
            onClick={handleDismiss}
            className="text-gray-500 hover:text-gray-700 text-sm px-2 py-1"
            aria-label="Dismiss"
          >
            ✕
          </button>
          <button
            type="button"
            onClick={handleInstall}
            className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
          >
            इंस्टॉल करें
          </button>
        </div>
      </div>
    </div>
  );
}
