"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";


// --- CONTACT INFO CARD COMPONENT ---
const ContactInfoCard = ({ icon: Icon, title, lines, color = "red" }: any) => (
  <div className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div
      className={`p-3 rounded-xl ${
        color === "red"
          ? "bg-brand-red/10 text-brand-red"
          : "bg-brand-yellow/10 text-brand-yellow"
      }`}>
      <Icon size={24} />
    </div>
    <div>
      <h4 className="font-bold text-gray-900 mb-2">{title}</h4>
      {lines.map((line: string, i: number) => (
        <p
          key={i}
          className="text-gray-500 text-sm leading-relaxed">
          {line}
        </p>
      ))}
    </div>
  </div>
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

      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-gray-50 min-h-screen pt-24 pb-20">
      {/* --- HEADER SECTION --- */}
      <section className="text-center px-4 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
          <span className="inline-block py-1 px-3 rounded-full bg-brand-red/5 text-brand-red text-sm font-bold uppercase tracking-widest mb-4 border border-brand-red/10">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Let's Start <span className="text-brand-red">Manufacturing</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Ready to scale your production? Our team is standing by to discuss
            your custom requirements, prototypes, and export logistics.
          </p>
        </motion.div>
      </section>

      <SectionWrapper className="py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* =========================================
              LEFT COLUMN: INFO & MAP
          ========================================= */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6">
            {/* 1. Address (UPDATED TO CHITTAGONG) */}
            <ContactInfoCard
              icon={MapPin}
              title="Factory & HQ"
              lines={[
                "Plot #45, CEPZ, South Halishahar,",
                "Chattogram - 4223, Bangladesh",
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

            {/* 4. VISUAL MAP CARD */}
            <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg border-4 border-white group cursor-pointer">
              {/* Using a slightly different map style image 
                   Ideally, you would replace this 'src' with a real screenshot of Chittagong Map
                */}
              <Image
                src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1000&auto=format&fit=crop"
                alt="Chittagong Map Location"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-brand-red/10 mix-blend-multiply" />

              {/* Pin Animation */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="relative flex h-8 w-8">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-8 w-8 bg-brand-red border-4 border-white shadow-xl items-center justify-center">
                    <MapPin
                      size={14}
                      className="text-white"
                    />
                  </span>
                </span>
              </div>

              <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-lg shadow-md">
                <p className="text-xs font-bold text-gray-900">
                  View Chittagong HQ on Map
                </p>
              </div>
            </div>
          </motion.div>

          {/* =========================================
              RIGHT COLUMN: THE FORM
          ========================================= */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-8 md:p-10 rounded-[2rem] shadow-xl border border-gray-100 relative overflow-hidden">
            {/* Decorative Gradient Blob */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-yellow/10 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />

            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Send a Message
            </h3>

            {/* SUCCESS STATE */}
            <AnimatePresence>
              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex items-center gap-3 text-green-700">
                  <CheckCircle2 size={24} />
                  <div>
                    <p className="font-bold">Message Sent!</p>
                    <p className="text-sm">
                      We will get back to you within 24 hours.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ERROR STATE */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-6 relative z-10">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/10 outline-none transition-all duration-300"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/10 outline-none transition-all duration-300"
                />
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Inquiry about custom manufacturing..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/10 outline-none transition-all duration-300"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wide">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project requirements..."
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-brand-red focus:ring-4 focus:ring-brand-red/10 outline-none transition-all duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-brand-red to-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-brand-red/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </SectionWrapper>
    </main>
  );
}
