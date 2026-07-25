'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/components/site/use-booking';

export default function WhatsAppRedirect() {
  const router = useRouter();
  const openBooking = useBooking((s) => s.open);

  useEffect(() => {
    // Navigate back to the home page
    router.replace('/');
    // Slightly delay opening the modal to ensure the home page is mounted
    setTimeout(() => {
      openBooking();
    }, 100);
  }, [router, openBooking]);
  
  return null;
}
