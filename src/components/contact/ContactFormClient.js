'use client';

import { useState, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { apiConfig, postToAPI } from '@/config/api';

function useIsLargeScreen() {
  const subscribe = (callback) => {
    const mq = window.matchMedia('(min-width: 1024px)');
    mq.addEventListener('change', callback);
    return () => mq.removeEventListener('change', callback);
  };
  const getSnapshot = () => window.matchMedia('(min-width: 1024px)').matches;
  const getServerSnapshot = () => false;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const ContactMapDesktop = dynamic(() => import('./ContactMapDesktop'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[400px] bg-[var(--white)] animate-pulse flex items-center justify-center">
      <span className="text-gray-500 text-sm">Loading map…</span>
    </div>
  ),
});

const ContactMapMobile = dynamic(() => import('./ContactMapMobile'), {
  ssr: false,
  loading: () => (
    <div className="w-full min-h-[200px] bg-[var(--white)] animate-pulse flex items-center justify-center">
      <span className="text-gray-500 text-sm">Loading map…</span>
    </div>
  ),
});

// Add after imports, before useIsLargeScreen:
const validateContactForm = (formData, validation = {}) => {
  const v = validation;
  if (!formData.firstName.trim()) return v.firstNameRequired || 'First name is required.';
  if (!formData.lastName.trim()) return v.lastNameRequired || 'Last name is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return v.invalidEmail || 'Please enter a valid email address.';
  if (!/^\+?[\d\s()\-]{7,15}$/.test(formData.phone.trim())) return v.invalidPhone || 'Please enter a valid phone number.';
  if (!formData.serviceInterest) return v.serviceRequired || 'Please select a service.';
  if (!formData.propertyType) return v.propertyTypeRequired || 'Please select a property type.';
  return '';
};
const ContactFormFields = ({
  formContent,
  formData,
  services,
  propertyTypes,
  handleChange,
  handlePhoneKeyDown,
  handleSubmit,
  isSubmitting,
}) => {
  const title = formContent?.title || "Contact Us";
  const fields = formContent?.fields || {};
  const submitText = formContent?.submit || "Submit";
  const sendingText = formContent?.sending || "Sending...";
  return (
    <form onSubmit={handleSubmit} className="mx-auto lg:px-0 px-[2.25rem]">
      <h1 className="font-bold text-2xl lg:text-[2rem] mb-[1.5rem] lg:mb-[2.5rem] text-center">
        {title}
      </h1>
      <div className="flex mb-[1.5rem] gap-[1.25rem] md:gap-[2rem]">
        <div className="flex-1 rounded-[12px] bg-[#F3F3F3] shadow-[0px_0px_6px_#0075c930] px-[1rem] py-[0.75rem]">
          <input
            type="text"
            name="firstName"
            placeholder={fields.firstName || "First Name"}
            value={formData.firstName}
            onChange={handleChange}
            className="w-full placeholder:text-black border-none outline-none text-xs md:text-base"
            required
          />
        </div>
        <div className="flex-1 rounded-[12px] bg-[#F3F3F3] shadow-[0px_0px_6px_#0075c930] px-[1rem] py-[0.75rem]">
          <input
            type="text"
            name="lastName"
            placeholder={fields.lastName || "Last Name"}
            value={formData.lastName}
            onChange={handleChange}
            className="w-full placeholder:text-black border-none outline-none text-xs md:text-base"
            required
          />
        </div>
      </div>
      <div className="rounded-[12px] bg-[#F3F3F3] shadow-[0px_0px_6px_#0075c930] px-[1rem] py-[0.75rem] mb-[1.5rem]">
        <input
          type="email"
          name="email"
          placeholder={fields.email || "Email"}
          value={formData.email}
          onChange={handleChange}
          className="w-full placeholder:text-black border-none outline-none text-xs md:text-base"
          required
        />
      </div>
      <div className="rounded-[12px] bg-[#F3F3F3] shadow-[0px_0px_6px_#0075c930] px-[1rem] py-[0.75rem] mb-[1.5rem]">
        <input
          type="tel"
          name="phone"
          placeholder={fields.phone || "Phone"}
          value={formData.phone}
          onChange={handleChange}
          onKeyDown={handlePhoneKeyDown}
          className="rtl:text-end w-full placeholder:text-black border-none outline-none text-xs md:text-base"
          required
        />
      </div>
      <div className="flex mb-[1.5rem] gap-[1.25rem] md:gap-[2rem]">
        <div className="flex-1 rounded-[12px] bg-[#F3F3F3] shadow-[0px_0px_6px_#0075c930] px-[1rem] py-[0.75rem]">
          <select
            name="serviceInterest"
            value={formData.serviceInterest}
            onChange={handleChange}
            className="w-full placeholder:text-black border-none outline-none text-xs md:text-base appearance-none cursor-pointer"
            required
            style={{ backgroundColor: 'transparent' }}
          >
            <option value="">{fields.serviceInterest || "Service Interest"}</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-1 rounded-[12px] bg-[#F3F3F3] shadow-[0px_0px_6px_#0075c930] px-[1rem] py-[0.75rem]">
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="w-full placeholder:text-black border-none outline-none text-xs md:text-base appearance-none cursor-pointer"
            required
            style={{ backgroundColor: 'transparent' }}
          >
            <option value="">{fields.propertyType || "Property Type"}</option>
            {propertyTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="rounded-[12px] bg-[#F3F3F3] shadow-[0px_0px_6px_#0075c930] px-[1rem] py-[0.75rem] mb-[1.5rem]">
        <textarea
          name="message"
          placeholder={fields.message || "Message"}
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full placeholder:text-black border-none outline-none resize-none min-h-[160px]"
        />
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-[12px] w-full bg-[var(--primary-blue-first)] text-white font-bold py-3 px-6 hover:bg-[var(--primary-blue-second)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? sendingText : submitText}
      </button>
    </form>
  );
};

const ImageBlock = ({ isLargeScreen }) => (
  <div className="relative w-full h-full lg:rounded-[24px] overflow-hidden">
    <Image
      src={isLargeScreen ? '/contact/contact.svg' : '/contact/contact-sm.svg'}
      alt="Contact us"
      width={200}
      height={200}
      priority
      sizes="50vw"
      className="w-full h-full object-cover"
    />
  </div>
);

const MapBlock = ({ locations = [], isLargeScreen }) => {
  const [active, setActive] = useState(false);
  const ActiveMap = isLargeScreen ? ContactMapDesktop : ContactMapMobile;

  return (
    <div
      className="relative w-full h-full lg:min-h-[400px] min-h-[200px]"
      onMouseLeave={() => setActive(false)}
    >
      <ActiveMap locations={locations} />
      {!active && (
        <div
          className="absolute inset-0 z-10 cursor-pointer flex items-center justify-center"
          onClick={() => setActive(true)}
          onTouchStart={() => setActive(true)}
        >
          <span className="bg-black/50 text-white text-sm px-4 py-2 rounded-full pointer-events-none">
            Tap to interact with map
          </span>
        </div>
      )}
    </div>
  );
};

const ContactFormClient = ({ services = [], propertyTypes = [], locations = [], error = null, content = null }) => {
  const formContent = content?.contactForm || null;
  const messages = content?.messages || {};
  const isLargeScreen = useIsLargeScreen();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceInterest: '',
    propertyType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneKeyDown = (e) => {
    const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', '+', '(', ')', '-', ' '];
    if (!allowed.includes(e.key) && !/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    const validationError = validateContactForm(formData, content?.validation || {});
if (validationError) {
  setSubmitError(validationError);
  return;
}

    setIsSubmitting(true);

    try {
      const payload = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        property_type_id: Number(formData.propertyType),
        service_id: Number(formData.serviceInterest),
        message: formData.message,
      };
      const data = await postToAPI(apiConfig.endpoints.contactSubmit, payload);
      setSubmitSuccess(data.msg || messages.successTitle || 'Your message has been sent successfully.');
      setFormData({ firstName: '', lastName: '', email: '', phone: '', serviceInterest: '', propertyType: '', message: '' });
    } catch (error) {
      setSubmitError(error.message || messages.somethingWrong || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (services.length === 0 || propertyTypes.length === 0) {
    const message = error
      ? (messages.contactLoadError || 'Unable to load contact form right now. Please try again later.')
      : (messages.emptyForm || 'Form data is not available at the moment. Please check back soon!');

    return (
      <section className="lg:py-[6rem] pb-[3.75rem] xl:px-[15rem] lg:px-[7rem]">
        <div className="hidden lg:flex gap-[3rem] mb-[3rem]">
          <div className="w-1/2">
            <ImageBlock isLargeScreen={isLargeScreen} />
          </div>
          <div className="w-1/2 flex items-center justify-center min-h-[400px]">
            <p className="text-center lg:text-xl md:text-lg text-base text-gray-600">{message}</p>
          </div>
        </div>
        <div className="hidden lg:block w-full">
          {isLargeScreen && <MapBlock locations={locations} isLargeScreen={isLargeScreen} />}
        </div>
        <div className="lg:hidden flex flex-col gap-[3rem]">
          <div className="flex">
            <div className="w-1/2">
              <ImageBlock isLargeScreen={isLargeScreen} />
            </div>
            <div className="w-1/2">
              {!isLargeScreen && <MapBlock locations={locations} isLargeScreen={isLargeScreen} />}
            </div>
          </div>
          <div className="w-full flex items-center justify-center px-[2.25rem]">
            <p className="text-center text-base text-gray-600">{message}</p>
          </div>
        </div>
      </section>
    );
  }

  const feedback = (
    <>
      {submitError && (
        <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-xs md:text-base text-red-700 lg:text-left text-center">
          <p className="font-semibold mb-1">{messages.errorTitle || "We couldn't send your message"}</p>
          <p>{submitError}</p>
        </div>
      )}
      {submitSuccess && (
        <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs md:text-base text-emerald-800 lg:text-left text-center">
          <p className="font-semibold mb-1">{messages.successTitle || "Thank you for getting in touch"}</p>
          <p>{submitSuccess}</p>
        </div>
      )}
    </>
  );

  return (
    <section className="lg:py-[6rem] pb-[3.75rem] xl:px-[15rem] lg:px-[7rem]">
      <div className="hidden lg:flex gap-[3rem] mb-[3rem]">
        <div className="w-1/2">
          <ImageBlock isLargeScreen={isLargeScreen} />
        </div>
        <div className="w-1/2 lg:px-0 px-[2.25rem]">
          <ContactFormFields
            formContent={formContent}
            formData={formData}
            services={services}
            propertyTypes={propertyTypes}
            handleChange={handleChange}
            handlePhoneKeyDown={handlePhoneKeyDown}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
          {feedback}
        </div>
      </div>
      <div className="hidden lg:block w-full">
        {isLargeScreen && <MapBlock locations={locations} isLargeScreen={isLargeScreen} />}
      </div>
      <div className="lg:hidden flex flex-col gap-[3rem]">
        <div className="flex">
          <div className="w-1/2">
            <ImageBlock isLargeScreen={isLargeScreen} />
          </div>
          <div className="w-1/2">
            {!isLargeScreen && <MapBlock locations={locations} isLargeScreen={isLargeScreen} />}
          </div>
        </div>
        <div className="w-full">
          <ContactFormFields
            formContent={formContent}
            formData={formData}
            services={services}
            propertyTypes={propertyTypes}
            handleChange={handleChange}
            handlePhoneKeyDown={handlePhoneKeyDown}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
          {feedback}
        </div>
      </div>
    </section>
  );
};

export default ContactFormClient;