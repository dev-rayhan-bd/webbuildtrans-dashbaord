import { useState } from "react";
import {
  HelpCircle,
  Clock,
  Shield,
  FileText,
  Plus,
  ChevronDown,
  ChevronUp,
  Link2,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";

type CmsTab = "faq" | "about" | "privacy" | "terms";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const initialFaqs: FaqItem[] = [
  {
    id: "faq-1",
    question: "How do I book a vehicle?",
    answer:
      "You can browse our fleet directly in Guest Mode on the Cura Explore mobile application or web portal. Once you select your vehicle, dates, and pickup spot (such as Curaçao Hato International Airport), finalize your booking with secure credit card pre-authorization.",
  },
  {
    id: "faq-2",
    question: "What documents do I need to rent?",
    answer:
      "All drivers must present a valid government-issued driver's license held for at least one year and a valid passport. During digital pre-check-in on the app, you will securely snap photos of both documents for automated verification.",
  },
  {
    id: "faq-3",
    question: "How is the deposit handled?",
    answer:
      "A strict $400 USD security deposit hold is pre-authorized via Stripe upon check-in. Following post-trip automated sensor inspection and vehicle lock, the full $400 hold is instantly released back to your card within 24 hours.",
  },
  {
    id: "faq-4",
    question: "What happens if I return the vehicle late?",
    answer:
      "A 30-minute grace period applies to all rentals. Returns beyond this period without prior extension via the mobile app incur an hourly prorated rental fee as well as any applicable late penalty.",
  },
  {
    id: "faq-5",
    question: "Are the vehicles insured?",
    answer:
      "Yes, all Cura Explore fleet vehicles include standard third-party liability insurance and 24/7 island-wide roadside assistance across Curaçao. Optional Collision Damage Waiver (CDW) can be toggled in your reservation.",
  },
  {
    id: "faq-6",
    question: "Can I cancel or modify my booking?",
    answer:
      "Cancellations made at least 48 hours before scheduled pickup receive a 100% refund without penalty. You can also modify your vehicle selection or dates directly from the 'My Reservations' screen in the app.",
  },
];

export const CmsPage = () => {
  const [activeTab, setActiveTab] = useState<CmsTab>("faq");

  // FAQ State
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs);
  const [expandedFaq, setExpandedFaq] = useState<string | null>("faq-1");
  const [isAddingFaq, setIsAddingFaq] = useState(false);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  // Content Editors State
  const [aboutContent, setAboutContent] = useState(
    `Cura Explore is the premier digital contactless car rental platform in Curaçao. Founded with a vision to eliminate rental counter queues, paper contracts, and stressful deposit disputes, we deliver a 100% digital experience from airport touchdown to vehicle return.\n\nOur modern fleet features premium electric and luxury combustion vehicles outfitted with cutting-edge Convadis IoT keyless access hardware. Experience Curaçao's beaches, heritage, and scenic drives on your own terms.`
  );

  const [privacyContent, setPrivacyContent] = useState(
    `1. Information We Collect\nCura Explore collects user account credentials, government-issued driver's license scans for identity verification, geolocation telemetry during active rentals for roadside safety, and encrypted payment tokens processed via Stripe.\n\n2. How We Protect Your Data\nAll biometric and document data transmitted during pre-check-in is encrypted in transit using TLS 1.3 and stored at rest under strict AES-256 standards. We never sell your personal information to third parties.\n\n3. Vehicle Telematics\nOur onboard IoT devices capture speed, fuel/battery level, and impact shock telemetry exclusively to ensure passenger safety and assist in emergency response.`
  );

  const [termsContent, setTermsContent] = useState(
    `1. Rental Eligibility\nRenters must be at least 21 years of age and hold an unrestricted valid driver's license. All secondary drivers must complete the digital verification process.\n\n2. Security Deposit & Damage Policy\nA $400 USD hold is placed upon reservation. Renters are responsible for returning the vehicle in clean condition. Any damage noted during return inspection is cross-referenced with pre-trip photos before deduction.\n\n3. Prohibited Use\nVehicles may not be driven off-road, submerged in seawater, operated under the influence of alcohol, or used for commercial ridesharing without authorization.`
  );

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) {
      toast.error("Please fill in both question and answer");
      return;
    }
    const newFaq: FaqItem = {
      id: `faq-${Date.now()}`,
      question: newQuestion.trim(),
      answer: newAnswer.trim(),
    };
    setFaqs([newFaq, ...faqs]);
    setNewQuestion("");
    setNewAnswer("");
    setIsAddingFaq(false);
    toast.success("New FAQ entry published successfully!");
  };

  const handleDeleteFaq = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFaqs(faqs.filter((f) => f.id !== id));
    toast.success("FAQ item deleted");
  };

  const handlePublish = (pageName: string) => {
    toast.success(`${pageName} updated and published live to Cura Explore app!`);
  };

  const handlePreview = (pageName: string) => {
    toast.info(`Opening mobile preview for ${pageName}...`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Page Title */}
      <div>
        <h2 className="text-3xl font-extrabold text-[#0284C7] tracking-tight">
          Content Management
        </h2>
        <p className="text-xs text-[#64748B] mt-1 font-medium">
          Edit and publish customer-facing content
        </p>
      </div>

      {/* Top 4 Tabs Pill Bar matching Figma nodes 12:14641 - 12:15660 */}
      <div className="flex items-center p-1 bg-[#F1F5F9] rounded-xl border border-[#E2E8F0] shadow-2xs w-fit">
        <button
          type="button"
          onClick={() => setActiveTab("faq")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "faq"
              ? "bg-white text-[#0F172A] shadow-xs"
              : "text-[#64748B] hover:text-[#0F172A]"
          }`}
        >
          <HelpCircle className="w-4 h-4 text-[#0284C7]" />
          <span>FAQ</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("about")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "about"
              ? "bg-white text-[#0F172A] shadow-xs"
              : "text-[#64748B] hover:text-[#0F172A]"
          }`}
        >
          <Clock className="w-4 h-4 text-[#0284C7]" />
          <span>About</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("privacy")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "privacy"
              ? "bg-white text-[#0F172A] shadow-xs"
              : "text-[#64748B] hover:text-[#0F172A]"
          }`}
        >
          <Shield className="w-4 h-4 text-[#0284C7]" />
          <span>Privacy Policy</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("terms")}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
            activeTab === "terms"
              ? "bg-white text-[#0F172A] shadow-xs"
              : "text-[#64748B] hover:text-[#0F172A]"
          }`}
        >
          <FileText className="w-4 h-4 text-[#0284C7]" />
          <span>Terms of Service</span>
        </button>
      </div>

      {/* ==================== TAB 1: FAQ ==================== */}
      {activeTab === "faq" && (
        <div className="bg-white rounded-3xl border border-[#E2E8F0] p-7 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#F1F5F9]">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A]">
                Frequently Asked Questions
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                {faqs.length} questions published
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsAddingFaq(!isAddingFaq)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold transition-all shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>{isAddingFaq ? "Close Form" : "Add FAQ"}</span>
            </button>
          </div>

          {/* Add FAQ Form Box matching Figma */}
          {isAddingFaq && (
            <form
              onSubmit={handleSaveFaq}
              className="p-5 rounded-2xl bg-sky-50/50 border border-sky-200/80 space-y-3.5 animate-in fade-in duration-200"
            >
              <div>
                <input
                  type="text"
                  required
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                  placeholder="Question..."
                  className="w-full h-10 px-3.5 rounded-xl border border-[#CBD5E1] bg-white text-xs text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20"
                />
              </div>
              <div>
                <textarea
                  rows={3}
                  required
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  placeholder="Answer..."
                  className="w-full p-3.5 rounded-xl border border-[#CBD5E1] bg-white text-xs text-[#0F172A] focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 leading-relaxed"
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-xs transition-all"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsAddingFaq(false)}
                  className="px-4 py-2 rounded-xl border border-[#CBD5E1] bg-white text-xs font-semibold text-[#64748B] hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {/* FAQ Accordion List */}
          <div className="space-y-3">
            {faqs.map((faq) => {
              const isExpanded = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-[#E2E8F0] overflow-hidden bg-white hover:border-[#CBD5E1] transition-all"
                >
                  <div
                    onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                    className="p-4.5 flex items-center justify-between gap-4 cursor-pointer select-none bg-white hover:bg-[#F8FAFC]/60 transition-colors"
                  >
                    <span className="font-bold text-sm text-[#0F172A]">
                      {faq.question}
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={(e) => handleDeleteFaq(faq.id, e)}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-colors"
                      >
                        Delete
                      </button>
                      <span className="text-[#94A3B8]">
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </span>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#64748B] leading-relaxed border-t border-[#F1F5F9] bg-[#F8FAFC]/40">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ==================== TAB 2, 3, 4: ABOUT, PRIVACY, TERMS ==================== */}
      {activeTab !== "faq" && (
        <div className="space-y-6">
          {/* Main Editor Card matching Figma */}
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-7 shadow-xs space-y-5">
            {/* Header with Title and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">
                  {activeTab === "about" && "About Us"}
                  {activeTab === "privacy" && "Privacy Policy"}
                  {activeTab === "terms" && "Terms of Service"}
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5 font-medium">
                  {activeTab === "about" && "Company overview and mission"}
                  {activeTab === "privacy" && "Data collection and usage disclosures"}
                  {activeTab === "terms" && "User agreement and rental conditions"}
                </p>
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() =>
                    handlePreview(
                      activeTab === "about"
                        ? "About Us"
                        : activeTab === "privacy"
                        ? "Privacy Policy"
                        : "Terms of Service"
                    )
                  }
                  className="px-4 py-2 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A] transition-colors"
                >
                  Preview
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handlePublish(
                      activeTab === "about"
                        ? "About Us"
                        : activeTab === "privacy"
                        ? "Privacy Policy"
                        : "Terms of Service"
                    )
                  }
                  className="px-4 py-2 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-xs transition-all"
                >
                  Publish Changes
                </button>
              </div>
            </div>

            {/* WYSIWYG Toolbar matching Figma */}
            <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] text-xs font-bold text-[#0F172A] hover:bg-slate-100 flex items-center justify-center shadow-2xs"
              >
                B
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] text-xs font-serif italic text-[#0F172A] hover:bg-slate-100 flex items-center justify-center shadow-2xs"
              >
                I
              </button>
              <button
                type="button"
                className="w-8 h-8 rounded-lg bg-white border border-[#E2E8F0] text-xs underline text-[#0F172A] hover:bg-slate-100 flex items-center justify-center shadow-2xs"
              >
                U
              </button>
              <div className="w-[1px] h-5 bg-[#CBD5E1] mx-1" />
              <button
                type="button"
                className="px-2.5 h-8 rounded-lg bg-white border border-[#E2E8F0] text-xs font-bold text-[#0F172A] hover:bg-slate-100 flex items-center justify-center shadow-2xs"
              >
                H1
              </button>
              <button
                type="button"
                className="px-2.5 h-8 rounded-lg bg-white border border-[#E2E8F0] text-xs font-bold text-[#0F172A] hover:bg-slate-100 flex items-center justify-center shadow-2xs"
              >
                H2
              </button>
              <button
                type="button"
                className="px-2.5 h-8 rounded-lg bg-white border border-[#E2E8F0] text-xs font-bold text-[#0F172A] hover:bg-slate-100 flex items-center justify-center shadow-2xs"
              >
                —
              </button>
              <div className="w-[1px] h-5 bg-[#CBD5E1] mx-1" />
              <button
                type="button"
                className="px-2.5 h-8 rounded-lg bg-white border border-[#E2E8F0] text-xs font-medium text-[#0F172A] hover:bg-slate-100 flex items-center justify-center gap-1 shadow-2xs"
              >
                <span>•</span> List
              </button>
              <button
                type="button"
                className="px-2.5 h-8 rounded-lg bg-white border border-[#E2E8F0] text-xs font-medium text-[#0F172A] hover:bg-slate-100 flex items-center justify-center gap-1 shadow-2xs"
              >
                <span>1.</span> List
              </button>
              <div className="w-[1px] h-5 bg-[#CBD5E1] mx-1" />
              <button
                type="button"
                className="px-2.5 h-8 rounded-lg bg-white border border-[#E2E8F0] text-xs font-medium text-[#0F172A] hover:bg-slate-100 flex items-center justify-center gap-1 shadow-2xs"
              >
                <Link2 className="w-3.5 h-3.5 text-[#64748B]" />
                Link
              </button>
              <button
                type="button"
                className="px-2.5 h-8 rounded-lg bg-white border border-[#E2E8F0] text-xs font-medium text-[#0F172A] hover:bg-slate-100 flex items-center justify-center gap-1 shadow-2xs"
              >
                <ImageIcon className="w-3.5 h-3.5 text-[#64748B]" />
                Image
              </button>
            </div>

            {/* Rich Text Area */}
            <div>
              <textarea
                rows={10}
                value={
                  activeTab === "about"
                    ? aboutContent
                    : activeTab === "privacy"
                    ? privacyContent
                    : termsContent
                }
                onChange={(e) => {
                  if (activeTab === "about") setAboutContent(e.target.value);
                  else if (activeTab === "privacy") setPrivacyContent(e.target.value);
                  else setTermsContent(e.target.value);
                }}
                className="w-full p-4.5 rounded-2xl border border-[#CBD5E1] bg-white text-xs text-[#0F172A] leading-relaxed focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 font-sans"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
