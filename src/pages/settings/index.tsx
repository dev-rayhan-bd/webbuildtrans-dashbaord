import { useState, useRef, type ChangeEvent } from "react";
import { Pencil, Camera, Trash2 } from "lucide-react";
import { toast } from "sonner";

export const SettingsPage = () => {
  // Saved values in state (could be loaded from localStorage or API)
  const [savedFirstName, setSavedFirstName] = useState(() => {
    return localStorage.getItem("cura_admin_first_name") || "Admin";
  });
  const [savedLastName, setSavedLastName] = useState(() => {
    return localStorage.getItem("cura_admin_last_name") || "User";
  });
  const [savedPhotoUrl, setSavedPhotoUrl] = useState<string | null>(() => {
    return localStorage.getItem("cura_admin_photo") || null;
  });

  // Current editing state
  const [firstName, setFirstName] = useState(savedFirstName);
  const [lastName, setLastName] = useState(savedLastName);
  const [photoUrl, setPhotoUrl] = useState<string | null>(savedPhotoUrl);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file");
      return;
    }

    // Read image as Data URL so it persists
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event.target?.result === "string") {
        setPhotoUrl(event.target.result);
        toast.success("Photo selected. Click 'Save Changes' to apply.");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Photo removed. Initials will be used.");
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName.trim()) {
      toast.error("First name cannot be empty");
      return;
    }

    setSavedFirstName(firstName);
    setSavedLastName(lastName);
    setSavedPhotoUrl(photoUrl);

    localStorage.setItem("cura_admin_first_name", firstName);
    localStorage.setItem("cura_admin_last_name", lastName);
    if (photoUrl) {
      localStorage.setItem("cura_admin_photo", photoUrl);
    } else {
      localStorage.removeItem("cura_admin_photo");
    }

    toast.success("Profile information updated successfully!");
  };

  const handleDiscard = () => {
    setFirstName(savedFirstName);
    setLastName(savedLastName);
    setPhotoUrl(savedPhotoUrl);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("Changes reverted to saved values");
  };

  const initials = `${firstName.charAt(0) || "A"}${lastName.charAt(0) || ""}`.toUpperCase();

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      {/* Page Title */}
      <div>
        <h2 className="text-3xl font-extrabold text-[#0284C7] tracking-tight">
          Settings
        </h2>
        <p className="text-xs text-[#64748B] mt-1 font-medium">
          Manage your account profile details and avatar photo
        </p>
      </div>

      {/* Main Settings Card */}
      <div className="bg-white rounded-3xl border border-[#E2E8F0] p-7 sm:p-8 shadow-xs space-y-8">
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handlePhotoSelect}
          accept="image/*"
          className="hidden"
        />

        {/* Avatar & Photo Change Section */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-5 pb-7 border-b border-[#F1F5F9]">
          <div className="relative shrink-0">
            {photoUrl ? (
              <img
                src={photoUrl}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md shadow-[#0284C7]/20 ring-2 ring-[#0284C7]"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-[#0284C7] text-white flex items-center justify-center text-2xl font-bold shadow-md shadow-[#0284C7]/25">
                {initials || "A"}
              </div>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-center text-[#64748B] hover:text-[#0284C7] hover:border-[#0284C7] transition-colors cursor-pointer"
              title="Change photo"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-[#0F172A]">
              {firstName || "Admin"} {lastName || "User"}
            </h3>
            <p className="text-xs text-[#64748B]">
              Role: <span className="font-semibold text-[#0284C7]">Super Admin</span>
            </p>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded-xl border border-[#E2E8F0] bg-white hover:bg-[#F8FAFC] text-xs font-bold text-[#0284C7] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              >
                <Camera className="w-3.5 h-3.5" />
                Change Photo
              </button>

              {photoUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className="px-3 py-1.5 rounded-xl border border-[#FECDD3] bg-white hover:bg-[#FFF1F2] text-xs font-bold text-[#EF4444] flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Remove Photo
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Name Fields Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <h4 className="text-sm font-bold text-[#0F172A] mb-4">
              Personal Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
                  First Name
                </label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Enter first name"
                  className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] text-xs text-[#0F172A] bg-white focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold text-[#64748B] tracking-wider uppercase">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Enter last name"
                  className="w-full h-11 px-4 rounded-xl border border-[#CBD5E1] text-xs text-[#0F172A] bg-white focus:outline-hidden focus:border-[#0284C7] focus:ring-2 focus:ring-[#0284C7]/20 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#F1F5F9]">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleDiscard}
              className="px-6 py-2.5 rounded-xl border border-[#CBD5E1] bg-white text-xs font-semibold text-[#64748B] hover:bg-slate-50 transition-all cursor-pointer"
            >
              Discard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
