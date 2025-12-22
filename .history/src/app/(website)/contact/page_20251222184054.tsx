/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
  ArrowRight,
  Globe,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { createContact, CreateContactPayload } from "@/services/ContactService";
import { cn } from "@/lib/utils";

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

// --- CONTACT INFO CARD COMPONENT ---
const ContactInfoCard = ({
  icon: Icon,
  title,
  lines,
  color = "red",
}: {
  icon: any;
  title: string;
  lines: string[];
  color?: "red" | "yellow";
}) => (
  <motion.div
    variants={itemVariants}
    className="group flex items-start gap-5 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-gray-200 transition-all duration-300 relative overflow-hidden">
    {/* Hover Accent Line */}
    <div
      className={cn(
        "absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-2",
        color === "red" ? "bg-brand-red" : "bg-brand-yellow"
      )}
    />

    <div
      className={cn(
        "p-3 rounded-xl transition-colors duration-300",
        color === "red"
          ? "bg-brand-red/5 text-brand-red group-hover:bg-brand-red group-hover:text-white"
          : "bg-brand-yellow/10 text-brand-yellow group-hover:bg-brand-yellow group-hover:text-black"
      )}>
      <Icon size={24} />
    </div>
    <div>
      <h4 className="font-bold text-gray-900 mb-2 text-lg">{title}</h4>
      {lines.map((line: string, i: number) => (
        <p
          key={i}
          className="text-gray-500 text-sm leading-relaxed font-medium">
          {line}
        </p>
      ))}
    </div>
  </motion.div>
);

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<CreateContactPayload>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createContact(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen relative overflow-hidden pt-32 pb-24">
      {/* Background Decor */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-white to-gray-50 z-0" />
      <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-brand-red/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[200px] left-[-100px] w-[300px] h-[300px] bg-brand-yellow/10 rounded-full blur-[100px] pointer-events-none" />

      {/* --- HEADER SECTION --- */}
      <section className="text-center px-4 mb-20 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-white shadow-sm text-brand-red text-xs font-bold uppercase tracking-widest mb-6 border border-gray-100">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tight leading-tight">
            Let's Start <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-red-800">
              Manufacturing
            </span>
          </h1>
          <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Ready to scale your production? Our team is standing by to discuss
            your custom requirements, prototypes, and export logistics.
          </p>
        </motion.div>
      </section>

      <SectionWrapper className="py-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* =========================================
              LEFT COLUMN: INFO & MAP
          ========================================= */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6">
            {/* 1. Address (UPDATED: Khowaj Nagar, Ajimpara) */}
            <ContactInfoCard
              icon={MapPin}
              title="Factory & HQ"
              lines={[
                "Khowaj Nagar, Ajimpara,",
                "Karnaphuli, Chattogram, Bangladesh",
              ]}
              color="red"
            />

            {/* 2. Contacts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ContactInfoCard
                icon={Mail}
                title="Email Us"
                lines={["sales@kft-toys.com", "support@kft-toys.com"]}
                color="yellow"
              />
              <ContactInfoCard
                icon={Phone}
                title="Call Us"
                lines={["+880 1234 567 890", "+880 1987 654 321"]}
                color="yellow"
              />
            </div>

            {/* 3. Hours */}
            <ContactInfoCard
              icon={Clock}
              title="Operating Hours"
              lines={["Sat - Thu: 9:00 AM - 6:00 PM", "Friday: Closed"]}
              color="red"
            />

            {/* 4. GOOGLE MAP EMBED (UPDATED LOCATION) */}
            <motion.div
              variants={itemVariants}
              className="relative h-72 w-full rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white group">
              {/* GOOGLE MAPS IFRAME WITH NEW ADDRESS */}
              <iframe
                src="https://maps.google.com/maps?q=Khowaj+Nagar,+Ajimpara,+Karnaphuli,+Chattogram&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                // CSS FILTER: Grayscale by default, Color on Hover
                className="w-full h-full filter grayscale contrast-125 opacity-90 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:contrast-100"
              />

              {/* Bottom Badge */}
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-white/50">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
                    Location
                  </p>
                  <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                    <Globe
                      size={14}
                      className="text-brand-red"
                    />{" "}
                    Karnaphuli, BD
                  </p>
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <ArrowRight
                    size={18}
                    className="text-brand-red"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* =========================================
              RIGHT COLUMN: THE FORM
          ========================================= */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white relative overflow-hidden">
            {/* Form Decoration */}
            <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-r from-brand-yellow via-brand-red to-brand-red" />
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-brand-red/5 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                Send a Message
              </h3>
              <p className="text-gray-500 mb-8">
                We typically reply within{" "}
                <span className="text-brand-red font-bold">24 hours</span>.
              </p>

              {/* SUCCESS STATE */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-8 flex items-start gap-4">
                    <div className="p-2 bg-green-100 rounded-full text-green-600">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-green-800">
                        Message Sent Successfully!
                      </h4>
                      <p className="text-green-700 text-sm mt-1">
                        Thank you for reaching out. Our team will review your
                        request and get back to you shortly.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ERROR STATE */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm font-medium flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500" />
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSubmit}
                className="space-y-6">
                {/* Name */}
                <div className="group space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-brand-red transition-colors">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brand-red/20 focus:ring-4 focus:ring-brand-red/5 outline-none transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                {/* Email */}
                <div className="group space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-brand-red transition-colors">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brand-red/20 focus:ring-4 focus:ring-brand-red/5 outline-none transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                {/* Subject */}
                <div className="group space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-brand-red transition-colors">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Inquiry about..."
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brand-red/20 focus:ring-4 focus:ring-brand-red/5 outline-none transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400"
                  />
                </div>

                {/* Message */}
                <div className="group space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1 group-focus-within:text-brand-red transition-colors">
                    Message
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project requirements..."
                    className="w-full px-5 py-4 rounded-xl bg-gray-50 border-2 border-transparent focus:bg-white focus:border-brand-red/20 focus:ring-4 focus:ring-brand-red/5 outline-none transition-all duration-300 font-medium text-gray-900 placeholder:text-gray-400 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-brand-red to-[#991b1b] text-white font-bold text-lg rounded-xl shadow-xl shadow-brand-red/20 hover:shadow-brand-red/40 hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none mt-4">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </main>
  );
}
