import ContactMap from './ContactMap';

export default function ContactMapMobile({ locations = [] }) {
  return <ContactMap locations={locations} className="min-h-[200px]" />;
}