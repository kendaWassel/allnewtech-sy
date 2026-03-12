'use client';
import ContactMap from './ContactMap';

export default function ContactMapDesktop({ locations = [] }) {
  return <ContactMap locations={locations} className="min-h-[400px]" />;
}