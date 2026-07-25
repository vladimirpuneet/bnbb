'use client';

import { useEffect } from 'react';
import { property } from '@/lib/property';

export default function WhatsAppRedirect() {
  useEffect(() => {
    window.location.href = `https://wa.me/${property.whatsappNumber}`;
  }, []);
  
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <p>Redirecting to WhatsApp...</p>
    </div>
  );
}
