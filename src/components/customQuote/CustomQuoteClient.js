'use client';
import { useState } from 'react';
import { getApiUrl } from '@/config/api';
import contact from '@/content/contact.json';

const quoteRequest = contact.quoteRequest;
const fields = quoteRequest.fields;
const contactInfo = fields.contactInfo;
const siteDetails = fields.siteDetails;
const additional = fields.additional;
const services = fields.services;
const consent = fields.consent;
const submit = fields.submit;

const firstName = contactInfo.fields.find((field) => field.name === 'firstName')?.label;
const lastName = contactInfo.fields.find((field) => field.name === 'lastName')?.label;
const email = contactInfo.fields.find((field) => field.name === 'email')?.label;
const phone = contactInfo.fields.find((field) => field.name === 'phone')?.label;
const postCode = siteDetails.fields.find((field) => field.name === 'postcode')?.label;
const propertyType =
  siteDetails.fields.find((field) => field.name === 'propertyType')?.label;
const requirements =
  additional.fields.find((field) => field.name === 'message')?.placeholder;
const preferredContact =
  additional.fields.find((field) => field.name === 'preferredContact')?.label;
const budgetRange =
  additional.fields.find((field) => field.name === 'budgetRange')?.label;
const fileUpload =
  additional.fields.find((field) => field.name === 'fileUpload')?.label;

const validateQuoteForm = (formData) => {
  if (!formData.firstName.trim()) return 'First name is required.';
  if (!formData.lastName.trim()) return 'Last name is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return 'Please enter a valid email address.';
  if (!/^[0-9+()\-\s]{6,20}$/.test(formData.phone)) return 'Please enter a valid phone number.';
  if (!formData.propertyTypeId) return 'Please select a property type.';
  if (!formData.postCode.trim()) return 'Post code is required.';
  if (formData.serviceIds.length === 0) return 'Please select at least one service.';
  if (!formData.requirements.trim()) return 'Please add your requirements.';
  if (!formData.preferredContactMethodId) return 'Please select a preferred contact method.';
  if (!formData.budgetRangeId) return 'Please select a budget range.';
  if (!formData.file) return 'Please upload a file.';
  if (!formData.confirmation) return 'Please confirm the consent checkbox.';
  return '';
};

const EmptyState = ({ message }) => (
  <section className="lg:py-[6rem] pb-[3.75rem] xl:px-[15rem] lg:px-[7rem]">
    <div className="flex gap-[3rem] mb-[3rem]">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-center lg:text-xl md:text-lg text-base text-gray-600 px-4">{message}</p>
        </div>
      </div>
  </section>
);

const CustomQuoteClient = ({
  formOptions = {
    services: [],
    propertyType: [],
    preferredContactMethod: [],
    budgetRange: [],
  },
  error = null,
}) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    postCode: '',
    propertyTypeId: '',
    serviceIds: [],
    requirements: '',
    preferredContactMethodId: '',
    budgetRangeId: '',
    file: null,
    confirmation: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleServiceToggle = (serviceId) => {
    setFormData((prev) => {
      const current = new Set(prev.serviceIds);
      if (current.has(serviceId)) {
        current.delete(serviceId);
      } else {
        current.add(serviceId);
      }
      return { ...prev, serviceIds: Array.from(current) };
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    setSubmitSuccess('');

    const validationError = validateQuoteForm(formData);
    if (validationError) {
      setSubmitError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = new FormData();
      payload.append('first_name', formData.firstName);
      payload.append('last_name', formData.lastName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('post_code', formData.postCode);
      payload.append('property_type_id', String(formData.propertyTypeId));
      if (formData.serviceIds.length > 0) {
        payload.append('service_id', String(formData.serviceIds[0]));
        formData.serviceIds.forEach((id) => {
          payload.append('service_id[]', String(id));
        });
      }
      payload.append('requirements', formData.requirements);
      payload.append('preferred_contact_method_id', String(formData.preferredContactMethodId));
      payload.append('budget_range_id', String(formData.budgetRangeId));
      payload.append('confirmation', formData.confirmation ? '1' : '0');

      if (formData.file) {
        payload.append('file', formData.file);
      }

      const response = await fetch(getApiUrl('/api/request-for-a-quote'), {
        method: 'POST',
        body: payload,
      });

      if (!response.ok) {
        throw new Error(`Failed to submit form: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.msg || 'Failed to submit form');
      }

      setSubmitSuccess(data.msg || 'Your quote request has been sent successfully.');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        postCode: '',
        propertyTypeId: '',
        serviceIds: [],
        requirements: '',
        preferredContactMethodId: '',
        budgetRangeId: '',
        file: null,
        confirmation: false,
      });

      const fileInput = e.target.querySelector('input[name="file"]');
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (submitErr) {
      setSubmitError(submitErr.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEmpty =
    formOptions.services.length === 0 ||
    formOptions.propertyType.length === 0 ||
    formOptions.preferredContactMethod.length === 0 ||
    formOptions.budgetRange.length === 0;

  if (error) {
    return <EmptyState message="Unable to load quote form. Try again!" />;
  }

  if (isEmpty) {
    return <EmptyState message="Form data is not available at the moment. Please check back soon!" />;
  }

  return (
    <section className="px-[1.3rem] px-0">
        <div className="relative top-[-1.5rem] lg:top-[-8rem] mx-auto w-[fit-content] bg-[var(--white)] px-[3rem] py-[3.5rem] lg:p-[6.5rem]">
  <form onSubmit={handleSubmit} className="">
    <h2 className="font-bold md:text-2xl lg:text-[2rem] mb-[1rem] md:mb-[1.5rem] lg:mb-[1.5rem] text-start">
      {quoteRequest.title}
    </h2>

    <div className="flex mb-[1rem] md:mb-[1.5rem] gap-[0.8rem] md:gap-[2rem]">
      <div className="flex-1 bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem]">
        <input
          type="text"
          name="firstName"
          placeholder={firstName}
          value={formData.firstName}
          onChange={handleChange}
          className="w-full placeholder:text-black border-none outline-none text-[0.6rem] sm:text-base"
          required
        />
      </div>
      <div className="flex-1 bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem]">
        <input
          type="text"
          name="lastName"
          placeholder={lastName}
          value={formData.lastName}
          onChange={handleChange}
          className="w-full placeholder:text-black border-none outline-none text-[0.6rem] md:text-base"
          required
        />
      </div>
    </div>

    <div className="bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem] mb-[1rem] md:mb-[1.5rem]">
      <input
        type="email"
        name="email"
        placeholder={email}
        value={formData.email}
        onChange={handleChange}
        className="w-full placeholder:text-black border-none outline-none text-[0.6rem] md:text-base"
        required
      />
    </div>

    <div className="flex-1 bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem] mb-[1rem] md:mb-[1.5rem]">
        <input
          type="tel"
          name="phone"
          placeholder={phone}
          value={formData.phone}
          onChange={handleChange}
          className="w-full placeholder:text-black border-none outline-none text-[0.6rem] md:text-base"
          required
        />
    </div>
    <h3 className="font-bold md:text-2xl lg:text-[2rem] mb-[1rem] md:mb-[1.5rem] lg:mb-[1.5rem] text-start">
      {services.title}
    </h3>

    <div className="flex mb-[1rem] md:mb-[1.5rem] gap-[0.8rem] md:gap-[2rem]">
      <div className="flex-1 bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem]">
        <select
          name="propertyTypeId"
          value={formData.propertyTypeId}
          onChange={handleChange}
          className="w-full placeholder:text-black border-none outline-none text-[0.6rem] md:text-base appearance-none cursor-pointer"
          required
          style={{ backgroundColor: 'transparent' }}
        >
          <option value="">{propertyType}</option>
          {formOptions.propertyType.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex-1 bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem]">
        <input
          type="text"
          name="postCode"
          placeholder={postCode}
          value={formData.postCode}
          onChange={handleChange}
          className="w-full placeholder:text-black border-none outline-none text-[0.6rem] md:text-base"
          required
        />
      </div>
    </div>
    <h3 className="font-bold md:text-2xl lg:text-[2rem] mb-[1rem] md:mb-[1.5rem] md:mb-[1.5rem] text-start">{services.title}</h3>
      <div className="mb-[1.5rem] rounded-[4px] md:rounded-[12px] px-[1rem]">
        <div className="flex flex-col gap-2">
{formOptions.services.map((service) => {
  const isChecked = formData.serviceIds.includes(service.id);

  return (
    <label
      key={service.id}
      className="flex items-center gap-2 text-[0.6rem] sm:text-base cursor-pointer select-none"
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => handleServiceToggle(service.id)}
        className="hidden"
      />

      <div
        className={`
          w-5 h-5
          flex items-center justify-center
          transition duration-200
          ${isChecked ? "bg-[var(--primary-blue-first)]" : "bg-white"}
        `}
      >
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          viewBox="0 0 24 24"
        >
          {isChecked && (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          )}
        </svg>
      </div>

      <span>{service.name}</span>
    </label>
  );
})}
        </div>
      </div>
    <div className="bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[1rem] py-[0.5rem] md:px-[1rem] md:py-[0.75rem] mb-[1rem] md:mb-[1.5rem]">
      <textarea
        name="requirements"
        placeholder={requirements}
        value={formData.requirements}
        onChange={handleChange}
        rows={4}
        className="w-full placeholder:text-black border-none outline-none resize-none min-h-[160px] text-xs md:text-base"
        required
      />
    </div>

    <div className="flex mb-[1rem] md:mb-[1.5rem] gap-[0.8rem] md:gap-[1.5rem]">
      <div className="flex-1 bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem]">
        <select
          name="preferredContactMethodId"
          value={formData.preferredContactMethodId}
          onChange={handleChange}
          className="w-full placeholder:text-black border-none outline-none text-[0.6rem] md:text-base appearance-none cursor-pointer"
          required
          style={{ backgroundColor: 'transparent' }}
        >
          <option value="">{preferredContact}</option>
          {formOptions.preferredContactMethod.map((method) => (
            <option key={method.id} value={method.id}>
              {method.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem]">
        <select
          name="budgetRangeId"
          value={formData.budgetRangeId}
          onChange={handleChange}
          className="w-full placeholder:text-black border-none outline-none text-[0.6rem] md:text-base appearance-none cursor-pointer"
          required
          style={{ backgroundColor: 'transparent' }}
        >
          <option value="">{budgetRange}</option>
          {formOptions.budgetRange.map((range) => (
            <option key={range.id} value={range.id}>
              {range.name}
            </option>
          ))}
        </select>
      </div>
    </div>

    <div className="bg-[#F3F3F3] rounded-[4px] md:rounded-[12px] px-[0.5rem] py-[0.35rem] md:px-[1rem] md:py-[0.75rem] mb-[2.5rem] md:mb-[4.5rem]">
      <label className="flex items-center justify-between gap-4 text-[0.6rem] md:text-base cursor-pointer">
        <span className="text-[var(--secondary)]">{formData.file?.name || 'File upload'}</span>
        <input
          type="file"
          name="file"
          accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
          onChange={handleFileChange}
          title={fileUpload}
          aria-label={fileUpload}
          className="hidden"
          required
        />
      </label>
    </div>

<label className="pe-[1rem] flex items-start gap-2 mb-[1rem] md:mb-[3rem] text-xs md:text-base cursor-pointer">
  <input
    type="checkbox"
    name="confirmation"
    checked={formData.confirmation}
    onChange={handleChange}
    className="hidden"
    required
  />

  <div
    className={`
      mt-1
      w-5 h-5
      flex items-center justify-center
      transition-all duration-200
      ${
        formData.confirmation
          ? "bg-[var(--primary-blue-first)]"
          : "bg-white"
      }
    `}
  >
    <svg
      className="w-4 h-4 text-white"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      viewBox="0 0 24 24"
    >
      {formData.confirmation && (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      )}
    </svg>
  </div>

  <span>{consent.label}</span>
</label>
<div className='w-[fit-content] mx-[auto] '>
    <button
      type="submit"
      disabled={isSubmitting || !formData.confirmation}
      className="text-xs md:text-base bg-[var(--primary-blue-first)] text-white font-bold py-[0.35rem] px-[1rem] md:py-[0.75rem] md:px-[3rem] hover:bg-[var(--primary-blue-second)] transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isSubmitting ? 'Sending...' : submit.text}
    </button>
</div>
  </form>

          {submitError && (
            <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-xs md:text-base text-red-700">
              <p className="font-semibold mb-1">We couldnt send your request</p>
              <p>{submitError}</p>
            </div>
          )}
          {submitSuccess && (
            <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs md:text-base text-emerald-800">
              <p className="font-semibold mb-1">Thank you for your request</p>
              <p>{submitSuccess}</p>
            </div>
          )}
        </div>
    </section>
  );
};

export default CustomQuoteClient;
