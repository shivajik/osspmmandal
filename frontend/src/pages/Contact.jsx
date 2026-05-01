import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import PageHero from "../components/PageHero";
import { ORG } from "../data/content";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill your name, email and message.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message received. The Mandal office will get back to you shortly.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Unable to submit right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div data-testid="contact-page">
      <PageHero
        kicker="Contact · Ways to Get in Touch"
        title={<>Write to us, visit the <span className="italic text-[#D4AF37]">Trust office</span>, or call.</>}
        subtitle="For admissions, donations, partnerships or general queries — our office team responds to every message."
      />

      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-24">
        <div className="grid grid-cols-12 gap-10">
          {/* Form */}
          <div className="col-span-12 lg:col-span-7">
            <div className="label-kicker text-[#1A5F5A] mb-4">Send Us a Message</div>
            <h2 className="font-display font-medium text-4xl md:text-5xl text-[#0A192F] leading-tight tracking-tight mb-10">
              Questions? <span className="italic">We&rsquo;re listening.</span>
            </h2>

            <form onSubmit={handleSubmit} data-testid="contact-form" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Field label="Your Name" name="name" value={form.name} onChange={handleChange} required />
                <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <Field label="Subject" name="subject" value={form.subject} onChange={handleChange} />
              <div>
                <label className="label-kicker text-[#4A5568] block mb-3">Message *</label>
                <textarea
                  name="message"
                  required
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  data-testid="contact-message-input"
                  className="w-full bg-transparent border-b border-[#0A192F]/20 focus:border-[#0A192F] outline-none py-3 font-body text-[#0A192F] placeholder:text-[#4A5568]/50 transition-colors resize-none"
                  placeholder="Tell us about your enquiry…"
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                data-testid="contact-submit-button"
                className="inline-flex items-center gap-3 label-kicker bg-[#0A192F] text-[#FBF9F6] hover:bg-[#D4AF37] hover:text-[#0A192F] transition-colors duration-300 px-10 py-5 disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send Message"} <Send size={14} />
              </button>
            </form>
          </div>

          {/* Contact info */}
          <div className="col-span-12 lg:col-span-5 lg:pl-10 lg:border-l border-[#0A192F]/10">
            <div className="label-kicker text-[#1A5F5A] mb-4">Trust Office</div>
            <h3 className="font-display font-medium text-3xl md:text-4xl text-[#0A192F] leading-tight mb-8">
              Reach the Mandal directly
            </h3>

            <div className="space-y-8">
              <div data-testid="contact-address" className="flex gap-4">
                <div className="w-10 h-10 border border-[#0A192F] flex items-center justify-center shrink-0">
                  <MapPin size={16} className="text-[#0A192F]" />
                </div>
                <div>
                  <div className="label-kicker text-[#4A5568] mb-2">Registered Address</div>
                  <div className="font-body text-[#0A192F]/85 leading-relaxed">
                    {ORG.address.line1}
                    <br />
                    {ORG.address.line2}
                    <br />
                    {ORG.address.line3}
                  </div>
                </div>
              </div>

              <div data-testid="contact-phones" className="flex gap-4">
                <div className="w-10 h-10 border border-[#0A192F] flex items-center justify-center shrink-0">
                  <Phone size={16} className="text-[#0A192F]" />
                </div>
                <div>
                  <div className="label-kicker text-[#4A5568] mb-2">Phone</div>
                  <div className="space-y-1">
                    {ORG.phones.map((p) => (
                      <a
                        key={p}
                        href={`tel:${p}`}
                        className="block font-display text-xl text-[#0A192F] hover:text-[#D4AF37] transition-colors"
                        data-testid={`phone-${p}`}
                      >
                        +91 {p}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div data-testid="contact-email" className="flex gap-4">
                <div className="w-10 h-10 border border-[#0A192F] flex items-center justify-center shrink-0">
                  <Mail size={16} className="text-[#0A192F]" />
                </div>
                <div>
                  <div className="label-kicker text-[#4A5568] mb-2">Email</div>
                  <a
                    href={`mailto:${ORG.email}`}
                    className="font-display text-xl text-[#0A192F] hover:text-[#D4AF37] transition-colors break-all"
                  >
                    {ORG.email}
                  </a>
                </div>
              </div>

              <div className="mt-10 p-6 border border-[#D4AF37] bg-[#FBF9F6]">
                <div className="label-kicker text-[#1A5F5A] mb-2">Donations</div>
                <div className="font-display text-2xl text-[#0A192F] leading-tight mb-3">
                  Accepts Donations under <span className="text-[#D4AF37]">12 AA &amp; 80 G</span>
                </div>
                <a
                  href={`tel:${ORG.phones[2]}`}
                  className="label-kicker text-[#0A192F] border-b border-[#0A192F] pb-1 hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors"
                  data-testid="contact-donate-link"
                >
                  Contact us @ +91 {ORG.phones[2]} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-[#0A192F]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
          <div className="label-kicker text-[#D4AF37] mb-4">Find Us</div>
          <h3 className="font-display text-3xl md:text-4xl text-[#FBF9F6] leading-tight mb-8">
            Samrat Nagar, Aurangabad 431001
          </h3>
          <div className="aspect-[16/6] overflow-hidden border border-white/10">
            <iframe
              title="OSSPM Location"
              className="w-full h-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Samrat+Nagar,+Aurangabad+431001&output=embed"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", value, onChange, required }) {
  return (
    <div>
      <label className="label-kicker text-[#4A5568] block mb-3">
        {label} {required && "*"}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        data-testid={`contact-${name}-input`}
        className="w-full bg-transparent border-b border-[#0A192F]/20 focus:border-[#0A192F] outline-none py-3 font-body text-[#0A192F] placeholder:text-[#4A5568]/50 transition-colors"
        placeholder={label}
      />
    </div>
  );
}
