"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  Bell,
  Camera,
  Loader2,
  Lock,
  MapPin,
  Plus,
  Save,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/app/store/authStore";
import { securityService } from "@/app/lib/apiClient";

type AddressType = "Home" | "Office" | "Other";

type ProfileAddress = {
  id: string;
  type: AddressType;
  label: string;
  fullName: string;
  phone: string;
  addressLine: string;
  city: string;
  area: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
};

type NotificationPreferences = {
  emailOrders: boolean;
  emailPromotions: boolean;
  smsAlerts: boolean;
  pushAlerts: boolean;
};

const createAddress = (): ProfileAddress => ({
  id:
    typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  type: "Home",
  label: "",
  fullName: "",
  phone: "",
  addressLine: "",
  city: "",
  area: "",
  postalCode: "",
  country: "Bangladesh",
  isDefault: false,
});

const normalizeDefaultAddress = (list: ProfileAddress[]) => {
  if (!list.length) return list;
  const hasDefault = list.some((item) => item.isDefault);
  if (hasDefault) return list.map((item, index) => ({ ...item, isDefault: item.isDefault && index === list.findIndex((a) => a.isDefault) }));
  return list.map((item, index) => ({ ...item, isDefault: index === 0 }));
};

export default function ProfileSettingsContent({ embedded = false }: { embedded?: boolean }) {
  const { user, updateProfile, uploadAvatar, changePassword, loading } = useAuth();

  const [profileForm, setProfileForm] = useState({
    name: "",
    phone: "",
    profileImage: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [addresses, setAddresses] = useState<ProfileAddress[]>([]);
  const [notificationPreferences, setNotificationPreferences] =
    useState<NotificationPreferences>({
      emailOrders: true,
      emailPromotions: true,
      smsAlerts: false,
      pushAlerts: true,
    });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const [saving, setSaving] = useState(false);
  const [avatarSaving, setAvatarSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setProfileForm({
      name: user?.name || "",
      phone: user?.phone || "",
      profileImage: user?.profileImage || "",
    });

    const apiAddresses = Array.isArray(user?.addresses) ? user.addresses : [];
    setAddresses(
      normalizeDefaultAddress(
        apiAddresses.map((address) => ({
          id: String(address.id || ""),
          type: (address.type || "Home") as AddressType,
          label: address.label || "",
          fullName: address.fullName || user?.name || "",
          phone: address.phone || user?.phone || "",
          addressLine: address.addressLine || "",
          city: address.city || "",
          area: address.area || "",
          postalCode: address.postalCode || "",
          country: address.country || "Bangladesh",
          isDefault: Boolean(address.isDefault),
        }))
      )
    );

    setNotificationPreferences({
      emailOrders: Boolean(user?.notificationPreferences?.emailOrders ?? true),
      emailPromotions: Boolean(user?.notificationPreferences?.emailPromotions ?? true),
      smsAlerts: Boolean(user?.notificationPreferences?.smsAlerts ?? false),
      pushAlerts: Boolean(user?.notificationPreferences?.pushAlerts ?? true),
    });
  }, [user]);

  useEffect(() => {
    let active = true;

    const load2FA = async () => {
      try {
        const response = await securityService.get2FA();
        if (!active) return;
        setTwoFactorEnabled(Boolean(response?.twoFactor?.enabled));
      } catch {
        if (!active) return;
        setTwoFactorEnabled(false);
      }
    };

    load2FA();
    return () => {
      active = false;
    };
  }, []);

  const validAddresses = useMemo(
    () =>
      addresses.filter(
        (address) =>
          address.label.trim() &&
          address.fullName.trim() &&
          address.phone.trim() &&
          address.addressLine.trim() &&
          address.city.trim()
      ),
    [addresses]
  );

  const saveAllSettings = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setSaveMessage("");
    setSaving(true);

    const payload = {
      name: profileForm.name.trim(),
      phone: profileForm.phone.trim(),
      profileImage: profileForm.profileImage.trim(),
      addresses: normalizeDefaultAddress(validAddresses),
      notificationPreferences,
    };

    const result = await updateProfile(payload);
    if (!result.success) {
      setError(result.message || "Failed to save settings");
      setSaving(false);
      return;
    }

    setSaveMessage(result.message || "Settings saved successfully");
    setSaving(false);
  };

  const uploadProfileImage = async (file?: File | null) => {
    if (!file) return;
    setError("");
    setSaveMessage("");
    setAvatarSaving(true);

    const formData = new FormData();
    formData.append("avatar", file);

    const result = await uploadAvatar(formData);
    setAvatarSaving(false);

    if (!result.success) {
      setError(result.message || "Failed to upload profile picture");
      return;
    }

    setSaveMessage(result.message || "Profile picture updated");
  };

  const savePassword = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setPasswordMessage("");

    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      setError("Current and new password are required.");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError("Confirm password does not match.");
      return;
    }

    setPasswordSaving(true);
    const result = await changePassword(passwordForm.currentPassword, passwordForm.newPassword);
    if (!result.success) {
      setError(result.message || "Failed to change password");
      setPasswordSaving(false);
      return;
    }

    setPasswordMessage(result.message || "Password changed successfully");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setPasswordSaving(false);
  };

  const setAddressField = <K extends keyof ProfileAddress>(
    id: string,
    key: K,
    value: ProfileAddress[K]
  ) => {
    setAddresses((prev) =>
      prev.map((address) => (address.id === id ? { ...address, [key]: value } : address))
    );
  };

  const addAddress = () => {
    setAddresses((prev) => normalizeDefaultAddress([...prev, createAddress()]));
  };

  const removeAddress = (id: string) => {
    setAddresses((prev) => normalizeDefaultAddress(prev.filter((address) => address.id !== id)));
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) =>
      prev.map((address) => ({ ...address, isDefault: address.id === id }))
    );
  };

  const toggle2FA = async () => {
    const next = !twoFactorEnabled;
    setTwoFactorEnabled(next);
    try {
      await securityService.toggle2FA(next);
    } catch {
      setTwoFactorEnabled(!next);
      setError("Failed to update 2FA preference.");
    }
  };

  return (
    <form onSubmit={saveAllSettings} className="space-y-6">
      <Card className="border border-border/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserRound size={18} className="text-indigo-500" />
            Personal Information
          </CardTitle>
          <CardDescription>Update your profile details shown across the store.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={profileForm.name}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, name: event.target.value }))
                }
                placeholder="Your full name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={profileForm.phone}
                onChange={(event) =>
                  setProfileForm((prev) => ({ ...prev, phone: event.target.value }))
                }
                placeholder="+8801..."
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="profileImage">Profile Image URL</Label>
            <Input
              id="profileImage"
              value={profileForm.profileImage}
              onChange={(event) =>
                setProfileForm((prev) => ({ ...prev, profileImage: event.target.value }))
              }
              placeholder="https://..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profileImageFile">Upload Profile Picture</Label>
            <Input
              id="profileImageFile"
              type="file"
              accept="image/*"
              onChange={(event) => uploadProfileImage(event.target.files?.[0])}
            />
          </div>
          {profileForm.profileImage ? (
            <div className="relative h-20 w-20 overflow-hidden rounded-xl border border-border/70">
              <img
                src={profileForm.profileImage}
                alt="Profile preview"
                className="h-full w-full object-cover"
              />
              {avatarSaving ? (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Loader2 size={14} className="animate-spin text-white" />
                </div>
              ) : null}
            </div>
          ) : null}
          {avatarSaving ? (
            <p className="text-xs font-medium text-indigo-500 flex items-center gap-2">
              <Camera size={12} />
              Uploading profile picture...
            </p>
          ) : null}
        </CardContent>
      </Card>

      <Card className="border border-border/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-indigo-500" />
            Security
          </CardTitle>
          <CardDescription>Change password and manage 2FA.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border border-border/70 p-3">
            <div>
              <p className="text-sm font-medium">Two Factor Authentication</p>
              <p className="text-xs text-muted-foreground">
                {twoFactorEnabled ? "Enabled" : "Disabled"}
              </p>
            </div>
            <Button
              type="button"
              variant={twoFactorEnabled ? "outline" : "default"}
              onClick={toggle2FA}
            >
              {twoFactorEnabled ? "Disable" : "Enable"}
            </Button>
          </div>

          <div className="rounded-lg border border-border/70 p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium">
              <Lock size={16} className="text-indigo-500" />
              Change Password
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <Input
                type="password"
                value={passwordForm.currentPassword}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    currentPassword: event.target.value,
                  }))
                }
                placeholder="Current password"
              />
              <Input
                type="password"
                value={passwordForm.newPassword}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    newPassword: event.target.value,
                  }))
                }
                placeholder="New password"
              />
              <Input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(event) =>
                  setPasswordForm((prev) => ({
                    ...prev,
                    confirmPassword: event.target.value,
                  }))
                }
                placeholder="Confirm password"
              />
            </div>
            <div className="mt-3">
              <Button type="button" onClick={savePassword} disabled={passwordSaving || loading}>
                {passwordSaving ? <Loader2 size={16} className="animate-spin" /> : null}
                Update Password
              </Button>
            </div>
            {passwordMessage ? (
              <p className="mt-3 text-xs font-medium text-emerald-500">{passwordMessage}</p>
            ) : null}
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin size={18} className="text-indigo-500" />
            Addresses
          </CardTitle>
          <CardDescription>Manage saved delivery addresses.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="rounded-lg border border-border/70 p-4">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <select
                    value={address.type}
                    onChange={(event) =>
                      setAddressField(address.id, "type", event.target.value as AddressType)
                    }
                    className="h-8 rounded-md border border-input bg-background px-2 text-xs"
                  >
                    <option value="Home">Home</option>
                    <option value="Office">Office</option>
                    <option value="Other">Other</option>
                  </select>
                  {address.isDefault ? (
                    <span className="rounded-full bg-indigo-500/15 px-2 py-1 text-[11px] font-medium text-indigo-500">
                      Default
                    </span>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setDefaultAddress(address.id)}
                    >
                      Set Default
                    </Button>
                  )}
                </div>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => removeAddress(address.id)}
                >
                  <Trash2 size={14} />
                  Remove
                </Button>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <Input
                  value={address.label}
                  onChange={(event) => setAddressField(address.id, "label", event.target.value)}
                  placeholder="Address label (Home, Office)"
                />
                <Input
                  value={address.fullName}
                  onChange={(event) =>
                    setAddressField(address.id, "fullName", event.target.value)
                  }
                  placeholder="Receiver name"
                />
                <Input
                  value={address.phone}
                  onChange={(event) => setAddressField(address.id, "phone", event.target.value)}
                  placeholder="Phone"
                />
                <Input
                  value={address.city}
                  onChange={(event) => setAddressField(address.id, "city", event.target.value)}
                  placeholder="City"
                />
                <Input
                  value={address.area}
                  onChange={(event) => setAddressField(address.id, "area", event.target.value)}
                  placeholder="Area"
                />
                <Input
                  value={address.postalCode}
                  onChange={(event) =>
                    setAddressField(address.id, "postalCode", event.target.value)
                  }
                  placeholder="Postal code"
                />
                <Input
                  className="md:col-span-2"
                  value={address.country}
                  onChange={(event) =>
                    setAddressField(address.id, "country", event.target.value)
                  }
                  placeholder="Country"
                />
                <Textarea
                  className="md:col-span-2"
                  value={address.addressLine}
                  onChange={(event) =>
                    setAddressField(address.id, "addressLine", event.target.value)
                  }
                  placeholder="Full address line"
                />
              </div>
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addAddress}>
            <Plus size={16} />
            Add Address
          </Button>
        </CardContent>
      </Card>

      <Card className="border border-border/70">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell size={18} className="text-indigo-500" />
            Notifications
          </CardTitle>
          <CardDescription>Choose how you receive store updates.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2">
          {(
            [
              ["emailOrders", "Email: Order updates"],
              ["emailPromotions", "Email: Promotions"],
              ["smsAlerts", "SMS alerts"],
              ["pushAlerts", "Push notifications"],
            ] as const
          ).map(([key, label]) => (
            <label
              key={key}
              className="flex items-center justify-between rounded-lg border border-border/70 px-3 py-2"
            >
              <span className="text-sm">{label}</span>
              <input
                type="checkbox"
                checked={notificationPreferences[key]}
                onChange={(event) =>
                  setNotificationPreferences((prev) => ({
                    ...prev,
                    [key]: event.target.checked,
                  }))
                }
                className="h-4 w-4 accent-indigo-600"
              />
            </label>
          ))}
        </CardContent>
      </Card>

      <div className={`flex flex-wrap items-center gap-3 ${embedded ? "" : "pb-8"}`}>
        <Button type="submit" disabled={saving || loading}>
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save All Settings
        </Button>
        {saveMessage ? (
          <p className="text-xs font-medium text-emerald-500">{saveMessage}</p>
        ) : null}
        {error ? <p className="text-xs font-medium text-rose-500">{error}</p> : null}
      </div>
    </form>
  );
}
