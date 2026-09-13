// // "use client";

// // import {
// //   ChangeEvent,
// //   useCallback,
// //   useEffect,
// //   useMemo,
// //   useRef,
// //   useState,
// // } from "react";
// // import { useRouter } from "next/navigation";
// // import { motion, type Variants } from "framer-motion";
// // import {
// //   AlertTriangle,
// //   Bell,
// //   BookOpen,
// //   Calendar,
// //   Camera,
// //   CheckCircle2,
// //   Clock3,
// //   Edit2,
// //   Flame,
// //   Globe2,
// //   Loader2,
// //   LogOut,
// //   Mail,
// //   Save,
// //   Shield,
// //   Star,
// //   Target,
// //   Trash2,
// //   Trophy,
// //   User,
// //   X,
// // } from "lucide-react";
// // import toast from "react-hot-toast";

// // import { createClient } from "@/lib/supabase/client";

// // type JsonRecord = Record<string, unknown>;

// // type ProfileState = {
// //   userId: string;
// //   fullName: string;
// //   email: string;
// //   avatarPath: string | null;
// //   avatarUrl: string | null;
// //   emailNotifications: boolean;
// //   timezone: string;
// //   joinedAt: string | null;
// //   lastSignInAt: string | null;
// //   emailVerified: boolean;

// //   totalXp: number;
// //   currentStreak: number;
// //   longestStreak: number;
// //   completedLessons: number;
// //   totalLessons: number;
// //   progressPercent: number;
// //   dailyGoalMinutes: number;
// //   studiedTodaySeconds: number;
// //   studiedAllTimeSeconds: number;
// //   currentLevelTitle: string;
// // };

// // const containerVariants: Variants = {
// //   hidden: { opacity: 0 },
// //   visible: {
// //     opacity: 1,
// //     transition: { staggerChildren: 0.08 },
// //   },
// // };

// // const itemVariants: Variants = {
// //   hidden: { y: 18, opacity: 0 },
// //   visible: {
// //     y: 0,
// //     opacity: 1,
// //     transition: {
// //       type: "spring" as const,
// //       stiffness: 100,
// //     },
// //   },
// // };

// // function asRecord(value: unknown): JsonRecord {
// //   if (
// //     value &&
// //     typeof value === "object" &&
// //     !Array.isArray(value)
// //   ) {
// //     return value as JsonRecord;
// //   }

// //   return {};
// // }

// // function textFrom(
// //   record: JsonRecord,
// //   ...keys: string[]
// // ): string {
// //   for (const key of keys) {
// //     const value = record[key];

// //     if (typeof value === "string" && value.trim()) {
// //       return value.trim();
// //     }
// //   }

// //   return "";
// // }

// // function numberFrom(
// //   record: JsonRecord,
// //   ...keys: string[]
// // ): number {
// //   for (const key of keys) {
// //     const value = record[key];

// //     if (typeof value === "number" && Number.isFinite(value)) {
// //       return value;
// //     }

// //     if (
// //       typeof value === "string" &&
// //       value.trim() !== "" &&
// //       Number.isFinite(Number(value))
// //     ) {
// //       return Number(value);
// //     }
// //   }

// //   return 0;
// // }

// // function formatDate(value: string | null): string {
// //   if (!value) return "Not available";

// //   const date = new Date(value);
// //   if (Number.isNaN(date.getTime())) return "Not available";

// //   return date.toLocaleDateString(undefined, {
// //     year: "numeric",
// //     month: "long",
// //     day: "numeric",
// //   });
// // }

// // function formatDuration(totalSeconds: number): string {
// //   const seconds = Math.max(0, Math.floor(totalSeconds));

// //   if (seconds < 60) {
// //     return `${seconds}s`;
// //   }

// //   const minutes = Math.floor(seconds / 60);

// //   if (minutes < 60) {
// //     return `${minutes}m`;
// //   }

// //   const hours = Math.floor(minutes / 60);
// //   const remainingMinutes = minutes % 60;

// //   return remainingMinutes > 0
// //     ? `${hours}h ${remainingMinutes}m`
// //     : `${hours}h`;
// // }

// // function initials(name: string, email: string): string {
// //   const source = name.trim() || email.trim();

// //   if (!source) return "U";

// //   const words = source.split(/\s+/).filter(Boolean);

// //   if (words.length >= 2) {
// //     return `${words[0][0]}${words[1][0]}`.toUpperCase();
// //   }

// //   return source.slice(0, 2).toUpperCase();
// // }

// // function clampPercent(value: number): number {
// //   return Math.min(100, Math.max(0, value));
// // }

// // export default function ProfilePage() {
// //   const router = useRouter();
// //   const fileInputRef = useRef<HTMLInputElement | null>(null);

// //   const supabase = useMemo(() => createClient(), []);

// //   const [profile, setProfile] = useState<ProfileState | null>(null);
// //   const [displayName, setDisplayName] = useState("");

// //   const [loading, setLoading] = useState(true);
// //   const [savingProfile, setSavingProfile] = useState(false);
// //   const [uploadingAvatar, setUploadingAvatar] = useState(false);
// //   const [sendingReset, setSendingReset] = useState(false);
// //   const [updatingNotifications, setUpdatingNotifications] = useState(false);
// //   const [syncingTimezone, setSyncingTimezone] = useState(false);
// //   const [deletingAccount, setDeletingAccount] = useState(false);
// //   const [isEditing, setIsEditing] = useState(false);

// //   const loadProfile = useCallback(async () => {
// //     setLoading(true);

// //     try {
// //       const {
// //         data: { user },
// //         error: userError,
// //       } = await supabase.auth.getUser();

// //       if (userError) throw userError;

// //       if (!user) {
// //         router.replace("/login");
// //         return;
// //       }

// //       const { data: profileRow, error: profileError } = await supabase
// //         .from("profiles")
// //         .select(
// //           "full_name, avatar_path, email_notifications, timezone",
// //         )
// //         .eq("id", user.id)
// //         .single();

// //       if (profileError) throw profileError;

// //       const { data: dashboardResponse, error: dashboardError } =
// //         await supabase.rpc("get_user_dashboard");

// //       if (dashboardError) throw dashboardError;

// //       const dbProfile = asRecord(profileRow);
// //       const dashboard = asRecord(dashboardResponse);

// //       const nestedLevel = asRecord(
// //         dashboard.current_level ??
// //           dashboard.level ??
// //           dashboard.currentLevel,
// //       );

// //       const fullName =
// //         textFrom(dbProfile, "full_name") ||
// //         (typeof user.user_metadata?.full_name === "string"
// //           ? user.user_metadata.full_name
// //           : "");

// //       const avatarPath =
// //         textFrom(dbProfile, "avatar_path") || null;

// //       let avatarUrl: string | null = null;

// //       if (avatarPath) {
// //         const { data: signedData, error: signedError } =
// //           await supabase.storage
// //             .from("avatars")
// //             .createSignedUrl(avatarPath, 60 * 60);

// //         if (!signedError) {
// //           avatarUrl = signedData.signedUrl;
// //         }
// //       }

// //       const completedLessons = numberFrom(
// //         dashboard,
// //         "completed_lessons",
// //         "lessons_completed",
// //         "completed_lesson_count",
// //       );

// //       const totalLessons = numberFrom(
// //         dashboard,
// //         "total_lessons",
// //         "published_lessons",
// //         "lesson_count",
// //       );

// //       const progressPercent =
// //         numberFrom(
// //           dashboard,
// //           "overall_progress_percent",
// //           "overall_progress_percentage",
// //           "course_progress_percent",
// //         ) ||
// //         (totalLessons > 0
// //           ? (completedLessons / totalLessons) * 100
// //           : 0);

// //       const dailyGoalMinutes =
// //         numberFrom(dashboard, "daily_goal_minutes") || 30;

// //       const timezone =
// //         textFrom(dbProfile, "timezone") || "UTC";

// //       setProfile({
// //         userId: user.id,
// //         fullName,
// //         email: user.email ?? "",
// //         avatarPath,
// //         avatarUrl,
// //         emailNotifications:
// //           typeof dbProfile.email_notifications === "boolean"
// //             ? dbProfile.email_notifications
// //             : true,
// //         timezone,
// //         joinedAt: user.created_at ?? null,
// //         lastSignInAt: user.last_sign_in_at ?? null,
// //         emailVerified: Boolean(user.email_confirmed_at),

// //         totalXp: numberFrom(dashboard, "total_xp"),
// //         currentStreak: numberFrom(
// //           dashboard,
// //           "current_streak",
// //           "streak",
// //         ),
// //         longestStreak: numberFrom(
// //           dashboard,
// //           "longest_streak",
// //           "best_streak",
// //         ),
// //         completedLessons,
// //         totalLessons,
// //         progressPercent: clampPercent(progressPercent),
// //         dailyGoalMinutes,
// //         studiedTodaySeconds: numberFrom(
// //           dashboard,
// //           "time_studied_today_seconds",
// //           "studied_today_seconds",
// //           "today_study_seconds",
// //         ),
// //         studiedAllTimeSeconds: numberFrom(
// //           dashboard,
// //           "time_studied_all_time_seconds",
// //           "total_time_studied_seconds",
// //           "all_time_study_seconds",
// //         ),
// //         currentLevelTitle:
// //           textFrom(
// //             dashboard,
// //             "current_level_title",
// //             "level_title",
// //           ) ||
// //           textFrom(nestedLevel, "title", "name") ||
// //           "Getting Started",
// //       });

// //       setDisplayName(fullName);
// //     } catch (error) {
// //       console.error("Failed to load profile:", error);
// //       toast.error("Could not load your profile.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [router, supabase]);

// //   useEffect(() => {
// //     void loadProfile();
// //   }, [loadProfile]);

// //   const handleSaveProfile = async () => {
// //     if (!profile) return;

// //     const cleanName = displayName.trim();

// //     if (cleanName.length < 2) {
// //       toast.error("Please enter a valid name.");
// //       return;
// //     }

// //     setSavingProfile(true);

// //     try {
// //       const { error: profileError } = await supabase
// //         .from("profiles")
// //         .update({ full_name: cleanName })
// //         .eq("id", profile.userId);

// //       if (profileError) throw profileError;

// //       const { error: authError } = await supabase.auth.updateUser({
// //         data: { full_name: cleanName },
// //       });

// //       if (authError) throw authError;

// //       setProfile((current) =>
// //         current
// //           ? { ...current, fullName: cleanName }
// //           : current,
// //       );

// //       setIsEditing(false);
// //       toast.success("Profile updated.");
// //     } catch (error) {
// //       console.error("Failed to save profile:", error);
// //       toast.error("Could not update your profile.");
// //     } finally {
// //       setSavingProfile(false);
// //     }
// //   };

// //   const handleAvatarChange = async (
// //     event: ChangeEvent<HTMLInputElement>,
// //   ) => {
// //     const file = event.target.files?.[0];

// //     // Allow selecting the same file again later.
// //     event.target.value = "";

// //     if (!file || !profile) return;

// //     if (
// //       !["image/jpeg", "image/png", "image/webp"].includes(
// //         file.type,
// //       )
// //     ) {
// //       toast.error("Use a JPG, PNG, or WebP image.");
// //       return;
// //     }

// //     if (file.size > 5 * 1024 * 1024) {
// //       toast.error("Profile pictures must be 5 MB or smaller.");
// //       return;
// //     }

// //     setUploadingAvatar(true);

// //     try {
// //       // Deliberately use one stable object path so replacing an avatar
// //       // does not leave old profile-image files behind.
// //       const objectPath = `${profile.userId}/avatar`;

// //       const { error: uploadError } = await supabase.storage
// //         .from("avatars")
// //         .upload(objectPath, file, {
// //           upsert: true,
// //           contentType: file.type,
// //           cacheControl: "3600",
// //         });

// //       if (uploadError) throw uploadError;

// //       const { error: updateError } = await supabase
// //         .from("profiles")
// //         .update({ avatar_path: objectPath })
// //         .eq("id", profile.userId);

// //       if (updateError) throw updateError;

// //       const { data: signedData, error: signedError } =
// //         await supabase.storage
// //           .from("avatars")
// //           .createSignedUrl(objectPath, 60 * 60);

// //       if (signedError) throw signedError;

// //       setProfile((current) =>
// //         current
// //           ? {
// //               ...current,
// //               avatarPath: objectPath,
// //               avatarUrl: signedData.signedUrl,
// //             }
// //           : current,
// //       );

// //       toast.success("Profile picture updated.");
// //     } catch (error) {
// //       console.error("Avatar upload failed:", error);
// //       toast.error("Could not upload your profile picture.");
// //     } finally {
// //       setUploadingAvatar(false);
// //     }
// //   };

// //   const handleRemoveAvatar = async () => {
// //     if (!profile?.avatarPath) return;

// //     setUploadingAvatar(true);

// //     try {
// //       const { error: storageError } = await supabase.storage
// //         .from("avatars")
// //         .remove([profile.avatarPath]);

// //       if (storageError) throw storageError;

// //       const { error: profileError } = await supabase
// //         .from("profiles")
// //         .update({ avatar_path: null })
// //         .eq("id", profile.userId);

// //       if (profileError) throw profileError;

// //       setProfile((current) =>
// //         current
// //           ? { ...current, avatarPath: null, avatarUrl: null }
// //           : current,
// //       );

// //       toast.success("Profile picture removed.");
// //     } catch (error) {
// //       console.error("Failed to remove avatar:", error);
// //       toast.error("Could not remove your profile picture.");
// //     } finally {
// //       setUploadingAvatar(false);
// //     }
// //   };

// //   const handleToggleNotifications = async () => {
// //     if (!profile || updatingNotifications) return;

// //     const nextValue = !profile.emailNotifications;
// //     setUpdatingNotifications(true);

// //     try {
// //       const { error } = await supabase
// //         .from("profiles")
// //         .update({ email_notifications: nextValue })
// //         .eq("id", profile.userId);

// //       if (error) throw error;

// //       setProfile((current) =>
// //         current
// //           ? { ...current, emailNotifications: nextValue }
// //           : current,
// //       );

// //       toast.success(
// //         nextValue
// //           ? "Email reminder preference enabled."
// //           : "Email reminder preference disabled.",
// //       );
// //     } catch (error) {
// //       console.error("Notification preference failed:", error);
// //       toast.error("Could not update the preference.");
// //     } finally {
// //       setUpdatingNotifications(false);
// //     }
// //   };

// //   const handleSyncTimezone = async () => {
// //     if (!profile) return;

// //     const deviceTimezone =
// //       Intl.DateTimeFormat().resolvedOptions().timeZone;

// //     if (!deviceTimezone) {
// //       toast.error("Could not detect this device's timezone.");
// //       return;
// //     }

// //     setSyncingTimezone(true);

// //     try {
// //       const { error } = await supabase
// //         .from("profiles")
// //         .update({ timezone: deviceTimezone })
// //         .eq("id", profile.userId);

// //       if (error) throw error;

// //       setProfile((current) =>
// //         current
// //           ? { ...current, timezone: deviceTimezone }
// //           : current,
// //       );

// //       toast.success(`Timezone set to ${deviceTimezone}.`);
// //     } catch (error) {
// //       console.error("Timezone update failed:", error);
// //       toast.error("Could not update your timezone.");
// //     } finally {
// //       setSyncingTimezone(false);
// //     }
// //   };

// //   const handlePasswordReset = async () => {
// //     if (!profile?.email || sendingReset) return;

// //     setSendingReset(true);

// //     try {
// //       const { error } = await supabase.auth.resetPasswordForEmail(
// //         profile.email,
// //         {
// //           redirectTo: `${window.location.origin}/reset-password`,
// //         },
// //       );

// //       if (error) throw error;

// //       toast.success(
// //         "Password reset email sent. Check your inbox.",
// //       );
// //     } catch (error) {
// //       console.error("Password reset failed:", error);
// //       toast.error("Could not send the password reset email.");
// //     } finally {
// //       setSendingReset(false);
// //     }
// //   };

// //   const handleLogout = async () => {
// //     const { error } = await supabase.auth.signOut();

// //     if (error) {
// //       toast.error("Could not log out.");
// //       return;
// //     }

// //     router.replace("/login");
// //     router.refresh();
// //   };

// //   const handleDeleteAccount = async () => {
// //     if (!profile || deletingAccount) return;

// //     const confirmation = window.prompt(
// //       'This permanently deletes your account and learning history. Type DELETE to continue.',
// //     );

// //     if (confirmation !== "DELETE") {
// //       if (confirmation !== null) {
// //         toast.error("Account deletion cancelled.");
// //       }
// //       return;
// //     }

// //     setDeletingAccount(true);

// //     try {
// //       if (profile.avatarPath) {
// //         const { error: avatarDeleteError } = await supabase.storage
// //           .from("avatars")
// //           .remove([profile.avatarPath]);

// //         if (avatarDeleteError) {
// //           throw avatarDeleteError;
// //         }
// //       }

// //       const { error } = await supabase.rpc("delete_my_account");

// //       if (error) throw error;

// //       await supabase.auth.signOut();

// //       toast.success("Your account has been deleted.");
// //       router.replace("/");
// //       router.refresh();
// //     } catch (error) {
// //       console.error("Account deletion failed:", error);
// //       toast.error("Could not delete your account.");
// //     } finally {
// //       setDeletingAccount(false);
// //     }
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex min-h-[60vh] items-center justify-center">
// //         <Loader2 className="h-9 w-9 animate-spin text-amber-400" />
// //       </div>
// //     );
// //   }

// //   if (!profile) {
// //     return (
// //       <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-6 text-red-100">
// //         Your profile could not be loaded.
// //       </div>
// //     );
// //   }

// //   const todayGoalPercent = clampPercent(
// //     profile.dailyGoalMinutes > 0
// //       ? (profile.studiedTodaySeconds /
// //           (profile.dailyGoalMinutes * 60)) *
// //           100
// //       : 0,
// //   );

// //   const remainingLessons = Math.max(
// //     0,
// //     profile.totalLessons - profile.completedLessons,
// //   );

// //   const stats = [
// //     {
// //       label: "Current Streak",
// //       value: profile.currentStreak,
// //       suffix: " days",
// //       icon: Flame,
// //       color: "text-orange-400",
// //     },
// //     {
// //       label: "Total XP",
// //       value: profile.totalXp,
// //       suffix: "",
// //       icon: Star,
// //       color: "text-amber-400",
// //     },
// //     {
// //       label: "Completed",
// //       value: `${profile.completedLessons}/${profile.totalLessons}`,
// //       suffix: " lessons",
// //       icon: BookOpen,
// //       color: "text-emerald-400",
// //     },
// //     {
// //       label: "Best Streak",
// //       value: profile.longestStreak,
// //       suffix: " days",
// //       icon: Trophy,
// //       color: "text-amber-400",
// //     },
// //   ];

// //   return (
// //     <motion.div
// //       variants={containerVariants}
// //       initial="hidden"
// //       animate="visible"
// //       className="mx-auto max-w-5xl space-y-6 pb-12"
// //     >
// //       <motion.div variants={itemVariants}>
// //         <h1 className="text-2xl font-bold text-white lg:text-3xl">
// //           Your Profile
// //         </h1>
// //         <p className="mt-1 text-amber-200/70">
// //           Manage your account, privacy, and learning preferences.
// //         </p>
// //       </motion.div>

// //       {/* Profile identity */}
// //       <motion.div
// //         variants={itemVariants}
// //         className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm"
// //       >
// //         <div className="h-24 bg-gradient-to-r from-emerald-600 to-amber-600 lg:h-32" />

// //         <div className="relative px-6 pb-6">
// //           <div className="absolute -top-12 left-6">
// //             <div className="group relative h-24 w-24">
// //               <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white/20 bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl">
// //                 {profile.avatarUrl ? (
// //                   <img
// //                     src={profile.avatarUrl}
// //                     alt={`${profile.fullName || "User"} profile`}
// //                     className="h-full w-full object-cover"
// //                   />
// //                 ) : (
// //                   <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
// //                     {initials(profile.fullName, profile.email)}
// //                   </div>
// //                 )}
// //               </div>

// //               <button
// //                 type="button"
// //                 disabled={uploadingAvatar}
// //                 onClick={() => fileInputRef.current?.click()}
// //                 className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-emerald-700 text-white shadow-lg transition hover:bg-emerald-600 disabled:opacity-50"
// //                 aria-label="Upload profile picture"
// //               >
// //                 {uploadingAvatar ? (
// //                   <Loader2 className="h-4 w-4 animate-spin" />
// //                 ) : (
// //                   <Camera className="h-4 w-4" />
// //                 )}
// //               </button>

// //               <input
// //                 ref={fileInputRef}
// //                 type="file"
// //                 accept="image/jpeg,image/png,image/webp"
// //                 onChange={handleAvatarChange}
// //                 className="hidden"
// //               />
// //             </div>
// //           </div>

// //           <div className="flex min-h-14 justify-end gap-2 pt-3">
// //             {profile.avatarPath && (
// //               <button
// //                 type="button"
// //                 disabled={uploadingAvatar}
// //                 onClick={handleRemoveAvatar}
// //                 className="rounded-lg bg-white/10 px-3 py-2 text-xs text-white/60 transition hover:bg-white/15 hover:text-white"
// //               >
// //                 Remove photo
// //               </button>
// //             )}

// //             {!isEditing ? (
// //               <button
// //                 type="button"
// //                 onClick={() => setIsEditing(true)}
// //                 className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-amber-300 transition hover:bg-white/20"
// //               >
// //                 <Edit2 className="h-4 w-4" />
// //                 Edit Profile
// //               </button>
// //             ) : (
// //               <>
// //                 <button
// //                   type="button"
// //                   onClick={() => {
// //                     setDisplayName(profile.fullName);
// //                     setIsEditing(false);
// //                   }}
// //                   className="rounded-lg bg-white/10 p-2 text-white/60 transition hover:bg-white/20"
// //                   aria-label="Cancel editing"
// //                 >
// //                   <X className="h-4 w-4" />
// //                 </button>

// //                 <button
// //                   type="button"
// //                   disabled={savingProfile}
// //                   onClick={handleSaveProfile}
// //                   className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-500 disabled:opacity-60"
// //                 >
// //                   {savingProfile ? (
// //                     <Loader2 className="h-4 w-4 animate-spin" />
// //                   ) : (
// //                     <Save className="h-4 w-4" />
// //                   )}
// //                   Save Changes
// //                 </button>
// //               </>
// //             )}
// //           </div>

// //           <div className="mt-10 space-y-3">
// //             {isEditing ? (
// //               <div className="max-w-xl">
// //                 <label className="mb-1 block text-sm font-medium text-amber-300">
// //                   Full name
// //                 </label>
// //                 <input
// //                   value={displayName}
// //                   onChange={(event) =>
// //                     setDisplayName(event.target.value)
// //                   }
// //                   className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-amber-400/50"
// //                 />

// //                 <p className="mt-2 text-xs text-white/40">
// //                   Your email is managed through your secure login account.
// //                 </p>
// //               </div>
// //             ) : (
// //               <>
// //                 <div className="flex flex-wrap items-center gap-2">
// //                   <h2 className="text-2xl font-bold text-white">
// //                     {profile.fullName || "Learner"}
// //                   </h2>

// //                   {profile.emailVerified && (
// //                     <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-1 text-[11px] text-emerald-300">
// //                       <CheckCircle2 className="h-3 w-3" />
// //                       Email verified
// //                     </span>
// //                   )}
// //                 </div>

// //                 <div className="flex items-center gap-2 text-amber-200/70">
// //                   <Mail className="h-4 w-4" />
// //                   <span className="text-sm">{profile.email}</span>
// //                 </div>

// //                 <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-amber-200/50">
// //                   <span className="inline-flex items-center gap-2">
// //                     <Calendar className="h-4 w-4" />
// //                     Joined {formatDate(profile.joinedAt)}
// //                   </span>

// //                   <span className="hidden sm:inline">•</span>

// //                   <span>{profile.currentLevelTitle}</span>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </motion.div>

// //       {/* Backend learning statistics */}
// //       <motion.div
// //         variants={itemVariants}
// //         className="grid grid-cols-2 gap-4 lg:grid-cols-4"
// //       >
// //         {stats.map((stat) => {
// //           const Icon = stat.icon;

// //           return (
// //             <div
// //               key={stat.label}
// //               className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-sm"
// //             >
// //               <Icon className={`mx-auto mb-2 h-6 w-6 ${stat.color}`} />
// //               <p className="text-2xl font-bold text-white">
// //                 {stat.value}
// //               </p>
// //               <p className="text-xs text-amber-200/60">
// //                 {stat.label}
// //                 {stat.suffix &&
// //                   typeof stat.value === "number" &&
// //                   stat.value > 0
// //                   ? stat.suffix
// //                   : ""}
// //               </p>
// //             </div>
// //           );
// //         })}
// //       </motion.div>

// //       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
// //         {/* Learning summary */}
// //         <motion.div
// //           variants={itemVariants}
// //           className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
// //         >
// //           <div className="mb-5 flex items-center gap-2">
// //             <Target className="h-5 w-5 text-amber-400" />
// //             <h3 className="text-lg font-semibold text-white">
// //               Learning Summary
// //             </h3>
// //           </div>

// //           <div className="space-y-5">
// //             <div>
// //               <div className="mb-2 flex items-center justify-between text-sm">
// //                 <span className="text-white/70">Course progress</span>
// //                 <span className="font-semibold text-white">
// //                   {profile.progressPercent.toFixed(0)}%
// //                 </span>
// //               </div>

// //               <div className="h-2 overflow-hidden rounded-full bg-white/10">
// //                 <div
// //                   className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400"
// //                   style={{
// //                     width: `${profile.progressPercent}%`,
// //                   }}
// //                 />
// //               </div>

// //               <p className="mt-2 text-xs text-white/40">
// //                 {remainingLessons} published lesson
// //                 {remainingLessons === 1 ? "" : "s"} remaining.
// //               </p>
// //             </div>

// //             <div>
// //               <div className="mb-2 flex items-center justify-between text-sm">
// //                 <span className="text-white/70">
// //                   Today&apos;s {profile.dailyGoalMinutes}-minute goal
// //                 </span>
// //                 <span className="font-semibold text-white">
// //                   {todayGoalPercent.toFixed(0)}%
// //                 </span>
// //               </div>

// //               <div className="h-2 overflow-hidden rounded-full bg-white/10">
// //                 <div
// //                   className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
// //                   style={{ width: `${todayGoalPercent}%` }}
// //                 />
// //               </div>
// //             </div>

// //             <div className="grid grid-cols-2 gap-3">
// //               <div className="rounded-xl bg-white/5 p-4">
// //                 <Clock3 className="mb-2 h-5 w-5 text-amber-400" />
// //                 <p className="text-lg font-bold text-white">
// //                   {formatDuration(profile.studiedTodaySeconds)}
// //                 </p>
// //                 <p className="text-xs text-white/45">
// //                   Studied today
// //                 </p>
// //               </div>

// //               <div className="rounded-xl bg-white/5 p-4">
// //                 <BookOpen className="mb-2 h-5 w-5 text-emerald-400" />
// //                 <p className="text-lg font-bold text-white">
// //                   {formatDuration(profile.studiedAllTimeSeconds)}
// //                 </p>
// //                 <p className="text-xs text-white/45">
// //                   Total study time
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </motion.div>

// //         {/* Preferences */}
// //         <motion.div
// //           variants={itemVariants}
// //           className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
// //         >
// //           <div className="mb-5 flex items-center gap-2">
// //             <User className="h-5 w-5 text-amber-400" />
// //             <h3 className="text-lg font-semibold text-white">
// //               Preferences
// //             </h3>
// //           </div>

// //           <div className="divide-y divide-white/10">
// //             <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
// //               <div className="flex items-start gap-3">
// //                 <Bell className="mt-0.5 h-5 w-5 text-amber-400" />
// //                 <div>
// //                   <p className="text-sm font-medium text-white">
// //                     Email learning reminders
// //                   </p>
// //                   <p className="mt-1 text-xs text-white/45">
// //                     Stores your notification preference in your account.
// //                   </p>
// //                 </div>
// //               </div>

// //               <button
// //                 type="button"
// //                 disabled={updatingNotifications}
// //                 onClick={handleToggleNotifications}
// //                 className={`relative h-7 w-12 shrink-0 rounded-full transition ${
// //                   profile.emailNotifications
// //                     ? "bg-emerald-500"
// //                     : "bg-white/15"
// //                 }`}
// //                 aria-label="Toggle email notifications"
// //               >
// //                 <span
// //                   className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
// //                     profile.emailNotifications
// //                       ? "left-6"
// //                       : "left-1"
// //                   }`}
// //                 />
// //               </button>
// //             </div>

// //             <div className="flex items-center justify-between gap-4 py-4">
// //               <div className="flex items-start gap-3">
// //                 <Globe2 className="mt-0.5 h-5 w-5 text-amber-400" />
// //                 <div>
// //                   <p className="text-sm font-medium text-white">
// //                     Learning timezone
// //                   </p>
// //                   <p className="mt-1 text-xs text-white/45">
// //                     {profile.timezone}
// //                   </p>
// //                   <p className="mt-1 text-xs text-white/35">
// //                     Used by the backend when calculating calendar-day streaks.
// //                   </p>
// //                 </div>
// //               </div>

// //               <button
// //                 type="button"
// //                 disabled={syncingTimezone}
// //                 onClick={handleSyncTimezone}
// //                 className="shrink-0 rounded-lg bg-white/10 px-3 py-2 text-xs text-amber-300 transition hover:bg-white/15 disabled:opacity-50"
// //               >
// //                 {syncingTimezone ? "Syncing..." : "Use device"}
// //               </button>
// //             </div>
// //           </div>
// //         </motion.div>
// //       </div>

// //       {/* Privacy & Security */}
// //       <motion.div
// //         variants={itemVariants}
// //         className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
// //       >
// //         <div className="mb-5 flex items-center gap-2">
// //           <Shield className="h-5 w-5 text-amber-400" />
// //           <h3 className="text-lg font-semibold text-white">
// //             Privacy & Security
// //           </h3>
// //         </div>

// //         <div className="grid gap-4 md:grid-cols-2">
// //           <div className="rounded-xl border border-white/10 bg-white/5 p-4">
// //             <div className="mb-2 flex items-center gap-2">
// //               <Mail className="h-4 w-4 text-emerald-400" />
// //               <p className="text-sm font-medium text-white">
// //                 Email status
// //               </p>
// //             </div>

// //             <p className="text-sm text-white/60">
// //               {profile.emailVerified
// //                 ? "Your email address is verified."
// //                 : "Your email address is not verified yet."}
// //             </p>
// //           </div>

// //           <div className="rounded-xl border border-white/10 bg-white/5 p-4">
// //             <div className="mb-2 flex items-center gap-2">
// //               <Clock3 className="h-4 w-4 text-amber-400" />
// //               <p className="text-sm font-medium text-white">
// //                 Last sign in
// //               </p>
// //             </div>

// //             <p className="text-sm text-white/60">
// //               {formatDate(profile.lastSignInAt)}
// //             </p>
// //           </div>

// //           <button
// //             type="button"
// //             disabled={sendingReset}
// //             onClick={handlePasswordReset}
// //             className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10 disabled:opacity-60 md:col-span-2"
// //           >
// //             <div className="flex items-center gap-3">
// //               <Shield className="h-5 w-5 text-amber-400" />
// //               <div>
// //                 <p className="text-sm font-medium text-white">
// //                   Reset password
// //                 </p>
// //                 <p className="mt-1 text-xs text-white/45">
// //                   We&apos;ll send a secure password-reset link to {profile.email}.
// //                 </p>
// //               </div>
// //             </div>

// //             {sendingReset && (
// //               <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
// //             )}
// //           </button>
// //         </div>
// //       </motion.div>

// //       {/* Account actions */}
// //       <motion.div variants={itemVariants} className="space-y-3">
// //         <button
// //           type="button"
// //           onClick={handleLogout}
// //           className="flex w-full items-center justify-between rounded-2xl border border-white/20 bg-white/10 p-4 transition hover:bg-white/15"
// //         >
// //           <div className="flex items-center gap-3">
// //             <LogOut className="h-5 w-5 text-amber-400" />
// //             <div className="text-left">
// //               <p className="text-white">Log out</p>
// //               <p className="text-xs text-white/40">
// //                 End this session on this device.
// //               </p>
// //             </div>
// //           </div>
// //         </button>

// //         <div className="rounded-2xl border border-red-400/20 bg-red-500/5 p-4">
// //           <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
// //             <div className="flex items-start gap-3">
// //               <AlertTriangle className="mt-0.5 h-5 w-5 text-red-400" />
// //               <div>
// //                 <p className="font-medium text-red-300">
// //                   Delete account
// //                 </p>
// //                 <p className="mt-1 text-xs text-white/40">
// //                   Permanently removes your account and learning history.
// //                   This cannot be undone.
// //                 </p>
// //               </div>
// //             </div>

// //             <button
// //               type="button"
// //               disabled={deletingAccount}
// //               onClick={handleDeleteAccount}
// //               className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
// //             >
// //               {deletingAccount ? (
// //                 <Loader2 className="h-4 w-4 animate-spin" />
// //               ) : (
// //                 <Trash2 className="h-4 w-4" />
// //               )}
// //               Delete
// //             </button>
// //           </div>
// //         </div>
// //       </motion.div>
// //     </motion.div>
// //   );
// // }


// "use client";

// import {
//   ChangeEvent,
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { useRouter } from "next/navigation";
// import { motion, type Variants } from "framer-motion";
// import {
//   AlertTriangle,
//   Bell,
//   BookOpen,
//   Calendar,
//   Camera,
//   CheckCircle2,
//   Clock3,
//   Edit2,
//   Flame,
//   Globe2,
//   Loader2,
//   LogOut,
//   Mail,
//   Save,
//   Shield,
//   Star,
//   Target,
//   Trash2,
//   Trophy,
//   User,
//   X,
// } from "lucide-react";
// import toast from "react-hot-toast";

// import { createClient } from "@/lib/supabase/client";

// type JsonRecord = Record<string, unknown>;

// type ProfileState = {
//   userId: string;
//   fullName: string;
//   email: string;
//   avatarPath: string | null;
//   avatarUrl: string | null;
//   emailNotifications: boolean;
//   timezone: string;
//   joinedAt: string | null;
//   lastSignInAt: string | null;
//   emailVerified: boolean;

//   totalXp: number;
//   currentStreak: number;
//   longestStreak: number;
//   completedLessons: number;
//   totalLessons: number;
//   progressPercent: number;
//   dailyGoalMinutes: number;
//   studiedTodaySeconds: number;
//   studiedAllTimeSeconds: number;
//   currentLevelTitle: string;
// };

// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: { staggerChildren: 0.08 },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { y: 18, opacity: 0 },
//   visible: {
//     y: 0,
//     opacity: 1,
//     transition: {
//       type: "spring" as const,
//       stiffness: 100,
//     },
//   },
// };

// function asRecord(value: unknown): JsonRecord {
//   if (
//     value &&
//     typeof value === "object" &&
//     !Array.isArray(value)
//   ) {
//     return value as JsonRecord;
//   }

//   return {};
// }

// function textFrom(
//   record: JsonRecord,
//   ...keys: string[]
// ): string {
//   for (const key of keys) {
//     const value = record[key];

//     if (typeof value === "string" && value.trim()) {
//       return value.trim();
//     }
//   }

//   return "";
// }

// function numberFrom(
//   record: JsonRecord,
//   ...keys: string[]
// ): number {
//   for (const key of keys) {
//     const value = record[key];

//     if (typeof value === "number" && Number.isFinite(value)) {
//       return value;
//     }

//     if (
//       typeof value === "string" &&
//       value.trim() !== "" &&
//       Number.isFinite(Number(value))
//     ) {
//       return Number(value);
//     }
//   }

//   return 0;
// }

// function formatDate(value: string | null): string {
//   if (!value) return "Not available";

//   const date = new Date(value);
//   if (Number.isNaN(date.getTime())) return "Not available";

//   return date.toLocaleDateString(undefined, {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// }

// function formatDuration(totalSeconds: number): string {
//   const seconds = Math.max(0, Math.floor(totalSeconds));

//   if (seconds < 60) {
//     return `${seconds}s`;
//   }

//   const minutes = Math.floor(seconds / 60);

//   if (minutes < 60) {
//     return `${minutes}m`;
//   }

//   const hours = Math.floor(minutes / 60);
//   const remainingMinutes = minutes % 60;

//   return remainingMinutes > 0
//     ? `${hours}h ${remainingMinutes}m`
//     : `${hours}h`;
// }

// function initials(name: string, email: string): string {
//   const source = name.trim() || email.trim();

//   if (!source) return "U";

//   const words = source.split(/\s+/).filter(Boolean);

//   if (words.length >= 2) {
//     return `${words[0][0]}${words[1][0]}`.toUpperCase();
//   }

//   return source.slice(0, 2).toUpperCase();
// }

// function clampPercent(value: number): number {
//   return Math.min(100, Math.max(0, value));
// }

// export default function ProfilePage() {
//   const router = useRouter();
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const supabase = useMemo(() => createClient(), []);

//   const [profile, setProfile] = useState<ProfileState | null>(null);
//   const [displayName, setDisplayName] = useState("");

//   const [loading, setLoading] = useState(true);
//   const [savingProfile, setSavingProfile] = useState(false);
//   const [uploadingAvatar, setUploadingAvatar] = useState(false);
//   const [sendingReset, setSendingReset] = useState(false);
//   const [passwordResetCooldown, setPasswordResetCooldown] = useState(0);
//   const [updatingNotifications, setUpdatingNotifications] = useState(false);
//   const [syncingTimezone, setSyncingTimezone] = useState(false);
//   const [deletingAccount, setDeletingAccount] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   const loadProfile = useCallback(async () => {
//     setLoading(true);

//     try {
//       const {
//         data: { user },
//         error: userError,
//       } = await supabase.auth.getUser();

//       if (userError) throw userError;

//       if (!user) {
//         router.replace("/login");
//         return;
//       }

//       const { data: profileRow, error: profileError } = await supabase
//         .from("profiles")
//         .select(
//           "full_name, avatar_path, email_notifications, timezone",
//         )
//         .eq("id", user.id)
//         .single();

//       if (profileError) throw profileError;

//       const { data: dashboardResponse, error: dashboardError } =
//         await supabase.rpc("get_user_dashboard");

//       if (dashboardError) throw dashboardError;

//       const dbProfile = asRecord(profileRow);
//       const dashboard = asRecord(dashboardResponse);

//       const nestedLevel = asRecord(
//         dashboard.current_level ??
//           dashboard.level ??
//           dashboard.currentLevel,
//       );

//       const fullName =
//         textFrom(dbProfile, "full_name") ||
//         (typeof user.user_metadata?.full_name === "string"
//           ? user.user_metadata.full_name
//           : "");

//       const avatarPath =
//         textFrom(dbProfile, "avatar_path") || null;

//       let avatarUrl: string | null = null;

//       if (avatarPath) {
//         const { data: signedData, error: signedError } =
//           await supabase.storage
//             .from("avatars")
//             .createSignedUrl(avatarPath, 60 * 60);

//         if (!signedError) {
//           avatarUrl = signedData.signedUrl;
//         }
//       }

//       const completedLessons = numberFrom(
//         dashboard,
//         "completed_lessons",
//         "lessons_completed",
//         "completed_lesson_count",
//       );

//       const totalLessons = numberFrom(
//         dashboard,
//         "total_lessons",
//         "published_lessons",
//         "lesson_count",
//       );

//       const progressPercent =
//         numberFrom(
//           dashboard,
//           "overall_progress_percent",
//           "overall_progress_percentage",
//           "course_progress_percent",
//         ) ||
//         (totalLessons > 0
//           ? (completedLessons / totalLessons) * 100
//           : 0);

//       const dailyGoalMinutes =
//         numberFrom(dashboard, "daily_goal_minutes") || 30;

//       const timezone =
//         textFrom(dbProfile, "timezone") || "UTC";

//       setProfile({
//         userId: user.id,
//         fullName,
//         email: user.email ?? "",
//         avatarPath,
//         avatarUrl,
//         emailNotifications:
//           typeof dbProfile.email_notifications === "boolean"
//             ? dbProfile.email_notifications
//             : true,
//         timezone,
//         joinedAt: user.created_at ?? null,
//         lastSignInAt: user.last_sign_in_at ?? null,
//         emailVerified: Boolean(user.email_confirmed_at),

//         totalXp: numberFrom(dashboard, "total_xp"),
//         currentStreak: numberFrom(
//           dashboard,
//           "current_streak",
//           "streak",
//         ),
//         longestStreak: numberFrom(
//           dashboard,
//           "longest_streak",
//           "best_streak",
//         ),
//         completedLessons,
//         totalLessons,
//         progressPercent: clampPercent(progressPercent),
//         dailyGoalMinutes,
//         studiedTodaySeconds: numberFrom(
//           dashboard,
//           "time_studied_today_seconds",
//           "studied_today_seconds",
//           "today_study_seconds",
//         ),
//         studiedAllTimeSeconds: numberFrom(
//           dashboard,
//           "time_studied_all_time_seconds",
//           "total_time_studied_seconds",
//           "all_time_study_seconds",
//         ),
//         currentLevelTitle:
//           textFrom(
//             dashboard,
//             "current_level_title",
//             "level_title",
//           ) ||
//           textFrom(nestedLevel, "title", "name") ||
//           "Getting Started",
//       });

//       setDisplayName(fullName);
//     } catch (error) {
//       console.error("Failed to load profile:", error);
//       toast.error("Could not load your profile.");
//     } finally {
//       setLoading(false);
//     }
//   }, [router, supabase]);

//   useEffect(() => {
//     void loadProfile();
//   }, [loadProfile]);

//   useEffect(() => {
//     if (passwordResetCooldown <= 0) return;

//     const timer = window.setInterval(() => {
//       setPasswordResetCooldown((seconds) =>
//         seconds <= 1 ? 0 : seconds - 1,
//       );
//     }, 1000);

//     return () => window.clearInterval(timer);
//   }, [passwordResetCooldown]);

//   const handleSaveProfile = async () => {
//     if (!profile) return;

//     const cleanName = displayName.trim();

//     if (cleanName.length < 2) {
//       toast.error("Please enter a valid name.");
//       return;
//     }

//     setSavingProfile(true);

//     try {
//       const { error: profileError } = await supabase
//         .from("profiles")
//         .update({ full_name: cleanName })
//         .eq("id", profile.userId);

//       if (profileError) throw profileError;

//       const { error: authError } = await supabase.auth.updateUser({
//         data: { full_name: cleanName },
//       });

//       if (authError) throw authError;

//       setProfile((current) =>
//         current
//           ? { ...current, fullName: cleanName }
//           : current,
//       );

//       setIsEditing(false);
//       toast.success("Profile updated.");
//     } catch (error) {
//       console.error("Failed to save profile:", error);
//       toast.error("Could not update your profile.");
//     } finally {
//       setSavingProfile(false);
//     }
//   };

//   const handleAvatarChange = async (
//     event: ChangeEvent<HTMLInputElement>,
//   ) => {
//     const file = event.target.files?.[0];

//     // Allow selecting the same file again later.
//     event.target.value = "";

//     if (!file || !profile) return;

//     if (
//       !["image/jpeg", "image/png", "image/webp"].includes(
//         file.type,
//       )
//     ) {
//       toast.error("Use a JPG, PNG, or WebP image.");
//       return;
//     }

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("Profile pictures must be 5 MB or smaller.");
//       return;
//     }

//     setUploadingAvatar(true);

//     try {
//       // Deliberately use one stable object path so replacing an avatar
//       // does not leave old profile-image files behind.
//       const objectPath = `${profile.userId}/avatar`;

//       const { error: uploadError } = await supabase.storage
//         .from("avatars")
//         .upload(objectPath, file, {
//           upsert: true,
//           contentType: file.type,
//           cacheControl: "3600",
//         });

//       if (uploadError) throw uploadError;

//       const { error: updateError } = await supabase
//         .from("profiles")
//         .update({ avatar_path: objectPath })
//         .eq("id", profile.userId);

//       if (updateError) throw updateError;

//       const { data: signedData, error: signedError } =
//         await supabase.storage
//           .from("avatars")
//           .createSignedUrl(objectPath, 60 * 60);

//       if (signedError) throw signedError;

//       setProfile((current) =>
//         current
//           ? {
//               ...current,
//               avatarPath: objectPath,
//               avatarUrl: signedData.signedUrl,
//             }
//           : current,
//       );

//       toast.success("Profile picture updated.");
//     } catch (error) {
//       console.error("Avatar upload failed:", error);
//       toast.error("Could not upload your profile picture.");
//     } finally {
//       setUploadingAvatar(false);
//     }
//   };

//   const handleRemoveAvatar = async () => {
//     if (!profile?.avatarPath) return;

//     setUploadingAvatar(true);

//     try {
//       const { error: storageError } = await supabase.storage
//         .from("avatars")
//         .remove([profile.avatarPath]);

//       if (storageError) throw storageError;

//       const { error: profileError } = await supabase
//         .from("profiles")
//         .update({ avatar_path: null })
//         .eq("id", profile.userId);

//       if (profileError) throw profileError;

//       setProfile((current) =>
//         current
//           ? { ...current, avatarPath: null, avatarUrl: null }
//           : current,
//       );

//       toast.success("Profile picture removed.");
//     } catch (error) {
//       console.error("Failed to remove avatar:", error);
//       toast.error("Could not remove your profile picture.");
//     } finally {
//       setUploadingAvatar(false);
//     }
//   };

//   const handleToggleNotifications = async () => {
//     if (!profile || updatingNotifications) return;

//     const nextValue = !profile.emailNotifications;
//     setUpdatingNotifications(true);

//     try {
//       const { error } = await supabase
//         .from("profiles")
//         .update({ email_notifications: nextValue })
//         .eq("id", profile.userId);

//       if (error) throw error;

//       setProfile((current) =>
//         current
//           ? { ...current, emailNotifications: nextValue }
//           : current,
//       );

//       toast.success(
//         nextValue
//           ? "Email reminder preference enabled."
//           : "Email reminder preference disabled.",
//       );
//     } catch (error) {
//       console.error("Notification preference failed:", error);
//       toast.error("Could not update the preference.");
//     } finally {
//       setUpdatingNotifications(false);
//     }
//   };

//   const handleSyncTimezone = async () => {
//     if (!profile) return;

//     const deviceTimezone =
//       Intl.DateTimeFormat().resolvedOptions().timeZone;

//     if (!deviceTimezone) {
//       toast.error("Could not detect this device's timezone.");
//       return;
//     }

//     setSyncingTimezone(true);

//     try {
//       const { error } = await supabase
//         .from("profiles")
//         .update({ timezone: deviceTimezone })
//         .eq("id", profile.userId);

//       if (error) throw error;

//       setProfile((current) =>
//         current
//           ? { ...current, timezone: deviceTimezone }
//           : current,
//       );

//       toast.success(`Timezone set to ${deviceTimezone}.`);
//     } catch (error) {
//       console.error("Timezone update failed:", error);
//       toast.error("Could not update your timezone.");
//     } finally {
//       setSyncingTimezone(false);
//     }
//   };

//   const handlePasswordReset = async () => {
//     if (!profile?.email || sendingReset || passwordResetCooldown > 0) {
//       return;
//     }

//     setSendingReset(true);

//     try {
//       const { error } = await supabase.auth.resetPasswordForEmail(
//         profile.email,
//         {
//           redirectTo: `${window.location.origin}/reset-password`,
//         },
//       );

//       if (error) {
//         const cooldownMatch = error.message.match(
//           /after\s+(\d+)\s+seconds?/i,
//         );

//         if (cooldownMatch) {
//           const seconds = Math.max(
//             1,
//             Number.parseInt(cooldownMatch[1], 10),
//           );

//           setPasswordResetCooldown(seconds);

//           toast.error(
//             `For security, please wait ${seconds} seconds before requesting another reset email.`,
//           );

//           return;
//         }

//         throw error;
//       }

//       setPasswordResetCooldown(60);

//       toast.success(
//         "Password reset email sent. Check your inbox.",
//       );
//     } catch (error) {
//       console.error("Password reset failed:", error);
//       toast.error("Could not send the password reset email.");
//     } finally {
//       setSendingReset(false);
//     }
//   };

//   const handleLogout = async () => {
//     const { error } = await supabase.auth.signOut();

//     if (error) {
//       toast.error("Could not log out.");
//       return;
//     }

//     router.replace("/login");
//     router.refresh();
//   };

//   const handleDeleteAccount = async () => {
//     if (!profile || deletingAccount) return;

//     const confirmation = window.prompt(
//       'This permanently deletes your account and learning history. Type DELETE to continue.',
//     );

//     if (confirmation !== "DELETE") {
//       if (confirmation !== null) {
//         toast.error("Account deletion cancelled.");
//       }
//       return;
//     }

//     setDeletingAccount(true);

//     try {
//       if (profile.avatarPath) {
//         const { error: avatarDeleteError } = await supabase.storage
//           .from("avatars")
//           .remove([profile.avatarPath]);

//         if (avatarDeleteError) {
//           throw avatarDeleteError;
//         }
//       }

//       const { error } = await supabase.rpc("delete_my_account");

//       if (error) throw error;

//       await supabase.auth.signOut();

//       toast.success("Your account has been deleted.");
//       router.replace("/");
//       router.refresh();
//     } catch (error) {
//       console.error("Account deletion failed:", error);
//       toast.error("Could not delete your account.");
//     } finally {
//       setDeletingAccount(false);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex min-h-[60vh] items-center justify-center">
//         <Loader2 className="h-9 w-9 animate-spin text-amber-400" />
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-6 text-red-100">
//         Your profile could not be loaded.
//       </div>
//     );
//   }

//   const todayGoalPercent = clampPercent(
//     profile.dailyGoalMinutes > 0
//       ? (profile.studiedTodaySeconds /
//           (profile.dailyGoalMinutes * 60)) *
//           100
//       : 0,
//   );

//   const remainingLessons = Math.max(
//     0,
//     profile.totalLessons - profile.completedLessons,
//   );

//   const stats = [
//     {
//       label: "Current Streak",
//       value: profile.currentStreak,
//       suffix: " days",
//       icon: Flame,
//       color: "text-orange-400",
//     },
//     {
//       label: "Total XP",
//       value: profile.totalXp,
//       suffix: "",
//       icon: Star,
//       color: "text-amber-400",
//     },
//     {
//       label: "Completed",
//       value: `${profile.completedLessons}/${profile.totalLessons}`,
//       suffix: " lessons",
//       icon: BookOpen,
//       color: "text-emerald-400",
//     },
//     {
//       label: "Best Streak",
//       value: profile.longestStreak,
//       suffix: " days",
//       icon: Trophy,
//       color: "text-amber-400",
//     },
//   ];

//   return (
//     <motion.div
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//       className="mx-auto max-w-5xl space-y-6 pb-12"
//     >
//       <motion.div variants={itemVariants}>
//         <h1 className="text-2xl font-bold text-white lg:text-3xl">
//           Your Profile
//         </h1>
//         <p className="mt-1 text-amber-200/70">
//           Manage your account, privacy, and learning preferences.
//         </p>
//       </motion.div>

//       {/* Profile identity */}
//       <motion.div
//         variants={itemVariants}
//         className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm"
//       >
//         <div className="h-24 bg-gradient-to-r from-emerald-600 to-amber-600 lg:h-32" />

//         <div className="relative px-6 pb-6">
//           <div className="absolute -top-12 left-6">
//             <div className="group relative h-24 w-24">
//               <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white/20 bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl">
//                 {profile.avatarUrl ? (
//                   <img
//                     src={profile.avatarUrl}
//                     alt={`${profile.fullName || "User"} profile`}
//                     className="h-full w-full object-cover"
//                   />
//                 ) : (
//                   <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
//                     {initials(profile.fullName, profile.email)}
//                   </div>
//                 )}
//               </div>

//               <button
//                 type="button"
//                 disabled={uploadingAvatar}
//                 onClick={() => fileInputRef.current?.click()}
//                 className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-emerald-700 text-white shadow-lg transition hover:bg-emerald-600 disabled:opacity-50"
//                 aria-label="Upload profile picture"
//               >
//                 {uploadingAvatar ? (
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                 ) : (
//                   <Camera className="h-4 w-4" />
//                 )}
//               </button>

//               <input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/jpeg,image/png,image/webp"
//                 onChange={handleAvatarChange}
//                 className="hidden"
//               />
//             </div>
//           </div>

//           <div className="flex min-h-14 justify-end gap-2 pt-3">
//             {profile.avatarPath && (
//               <button
//                 type="button"
//                 disabled={uploadingAvatar}
//                 onClick={handleRemoveAvatar}
//                 className="rounded-lg bg-white/10 px-3 py-2 text-xs text-white/60 transition hover:bg-white/15 hover:text-white"
//               >
//                 Remove photo
//               </button>
//             )}

//             {!isEditing ? (
//               <button
//                 type="button"
//                 onClick={() => setIsEditing(true)}
//                 className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-amber-300 transition hover:bg-white/20"
//               >
//                 <Edit2 className="h-4 w-4" />
//                 Edit Profile
//               </button>
//             ) : (
//               <>
//                 <button
//                   type="button"
//                   onClick={() => {
//                     setDisplayName(profile.fullName);
//                     setIsEditing(false);
//                   }}
//                   className="rounded-lg bg-white/10 p-2 text-white/60 transition hover:bg-white/20"
//                   aria-label="Cancel editing"
//                 >
//                   <X className="h-4 w-4" />
//                 </button>

//                 <button
//                   type="button"
//                   disabled={savingProfile}
//                   onClick={handleSaveProfile}
//                   className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-500 disabled:opacity-60"
//                 >
//                   {savingProfile ? (
//                     <Loader2 className="h-4 w-4 animate-spin" />
//                   ) : (
//                     <Save className="h-4 w-4" />
//                   )}
//                   Save Changes
//                 </button>
//               </>
//             )}
//           </div>

//           <div className="mt-10 space-y-3">
//             {isEditing ? (
//               <div className="max-w-xl">
//                 <label className="mb-1 block text-sm font-medium text-amber-300">
//                   Full name
//                 </label>
//                 <input
//                   value={displayName}
//                   onChange={(event) =>
//                     setDisplayName(event.target.value)
//                   }
//                   className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-amber-400/50"
//                 />

//                 <p className="mt-2 text-xs text-white/40">
//                   Your email is managed through your secure login account.
//                 </p>
//               </div>
//             ) : (
//               <>
//                 <div className="flex flex-wrap items-center gap-2">
//                   <h2 className="text-2xl font-bold text-white">
//                     {profile.fullName || "Learner"}
//                   </h2>

//                   {profile.emailVerified && (
//                     <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-1 text-[11px] text-emerald-300">
//                       <CheckCircle2 className="h-3 w-3" />
//                       Email verified
//                     </span>
//                   )}
//                 </div>

//                 <div className="flex items-center gap-2 text-amber-200/70">
//                   <Mail className="h-4 w-4" />
//                   <span className="text-sm">{profile.email}</span>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-amber-200/50">
//                   <span className="inline-flex items-center gap-2">
//                     <Calendar className="h-4 w-4" />
//                     Joined {formatDate(profile.joinedAt)}
//                   </span>

//                   <span className="hidden sm:inline">•</span>

//                   <span>{profile.currentLevelTitle}</span>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </motion.div>

//       {/* Backend learning statistics */}
//       <motion.div
//         variants={itemVariants}
//         className="grid grid-cols-2 gap-4 lg:grid-cols-4"
//       >
//         {stats.map((stat) => {
//           const Icon = stat.icon;

//           return (
//             <div
//               key={stat.label}
//               className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-sm"
//             >
//               <Icon className={`mx-auto mb-2 h-6 w-6 ${stat.color}`} />
//               <p className="text-2xl font-bold text-white">
//                 {stat.value}
//               </p>
//               <p className="text-xs text-amber-200/60">
//                 {stat.label}
//                 {stat.suffix &&
//                   typeof stat.value === "number" &&
//                   stat.value > 0
//                   ? stat.suffix
//                   : ""}
//               </p>
//             </div>
//           );
//         })}
//       </motion.div>

//       <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
//         {/* Learning summary */}
//         <motion.div
//           variants={itemVariants}
//           className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
//         >
//           <div className="mb-5 flex items-center gap-2">
//             <Target className="h-5 w-5 text-amber-400" />
//             <h3 className="text-lg font-semibold text-white">
//               Learning Summary
//             </h3>
//           </div>

//           <div className="space-y-5">
//             <div>
//               <div className="mb-2 flex items-center justify-between text-sm">
//                 <span className="text-white/70">Course progress</span>
//                 <span className="font-semibold text-white">
//                   {profile.progressPercent.toFixed(0)}%
//                 </span>
//               </div>

//               <div className="h-2 overflow-hidden rounded-full bg-white/10">
//                 <div
//                   className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400"
//                   style={{
//                     width: `${profile.progressPercent}%`,
//                   }}
//                 />
//               </div>

//               <p className="mt-2 text-xs text-white/40">
//                 {remainingLessons} published lesson
//                 {remainingLessons === 1 ? "" : "s"} remaining.
//               </p>
//             </div>

//             <div>
//               <div className="mb-2 flex items-center justify-between text-sm">
//                 <span className="text-white/70">
//                   Today&apos;s {profile.dailyGoalMinutes}-minute goal
//                 </span>
//                 <span className="font-semibold text-white">
//                   {todayGoalPercent.toFixed(0)}%
//                 </span>
//               </div>

//               <div className="h-2 overflow-hidden rounded-full bg-white/10">
//                 <div
//                   className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
//                   style={{ width: `${todayGoalPercent}%` }}
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               <div className="rounded-xl bg-white/5 p-4">
//                 <Clock3 className="mb-2 h-5 w-5 text-amber-400" />
//                 <p className="text-lg font-bold text-white">
//                   {formatDuration(profile.studiedTodaySeconds)}
//                 </p>
//                 <p className="text-xs text-white/45">
//                   Studied today
//                 </p>
//               </div>

//               <div className="rounded-xl bg-white/5 p-4">
//                 <BookOpen className="mb-2 h-5 w-5 text-emerald-400" />
//                 <p className="text-lg font-bold text-white">
//                   {formatDuration(profile.studiedAllTimeSeconds)}
//                 </p>
//                 <p className="text-xs text-white/45">
//                   Total study time
//                 </p>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* Preferences */}
//         <motion.div
//           variants={itemVariants}
//           className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
//         >
//           <div className="mb-5 flex items-center gap-2">
//             <User className="h-5 w-5 text-amber-400" />
//             <h3 className="text-lg font-semibold text-white">
//               Preferences
//             </h3>
//           </div>

//           <div className="divide-y divide-white/10">
//             <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
//               <div className="flex items-start gap-3">
//                 <Bell className="mt-0.5 h-5 w-5 text-amber-400" />
//                 <div>
//                   <p className="text-sm font-medium text-white">
//                     Email learning reminders
//                   </p>
//                   <p className="mt-1 text-xs text-white/45">
//                     Stores your notification preference in your account.
//                   </p>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 disabled={updatingNotifications}
//                 onClick={handleToggleNotifications}
//                 className={`relative h-7 w-12 shrink-0 rounded-full transition ${
//                   profile.emailNotifications
//                     ? "bg-emerald-500"
//                     : "bg-white/15"
//                 }`}
//                 aria-label="Toggle email notifications"
//               >
//                 <span
//                   className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
//                     profile.emailNotifications
//                       ? "left-6"
//                       : "left-1"
//                   }`}
//                 />
//               </button>
//             </div>

//             <div className="flex items-center justify-between gap-4 py-4">
//               <div className="flex items-start gap-3">
//                 <Globe2 className="mt-0.5 h-5 w-5 text-amber-400" />
//                 <div>
//                   <p className="text-sm font-medium text-white">
//                     Learning timezone
//                   </p>
//                   <p className="mt-1 text-xs text-white/45">
//                     {profile.timezone}
//                   </p>
//                   <p className="mt-1 text-xs text-white/35">
//                     Used by the backend when calculating calendar-day streaks.
//                   </p>
//                 </div>
//               </div>

//               <button
//                 type="button"
//                 disabled={syncingTimezone}
//                 onClick={handleSyncTimezone}
//                 className="shrink-0 rounded-lg bg-white/10 px-3 py-2 text-xs text-amber-300 transition hover:bg-white/15 disabled:opacity-50"
//               >
//                 {syncingTimezone ? "Syncing..." : "Use device"}
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Privacy & Security */}
//       <motion.div
//         variants={itemVariants}
//         className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
//       >
//         <div className="mb-5 flex items-center gap-2">
//           <Shield className="h-5 w-5 text-amber-400" />
//           <h3 className="text-lg font-semibold text-white">
//             Privacy & Security
//           </h3>
//         </div>

//         <div className="grid gap-4 md:grid-cols-2">
//           <div className="rounded-xl border border-white/10 bg-white/5 p-4">
//             <div className="mb-2 flex items-center gap-2">
//               <Mail className="h-4 w-4 text-emerald-400" />
//               <p className="text-sm font-medium text-white">
//                 Email status
//               </p>
//             </div>

//             <p className="text-sm text-white/60">
//               {profile.emailVerified
//                 ? "Your email address is verified."
//                 : "Your email address is not verified yet."}
//             </p>
//           </div>

//           <div className="rounded-xl border border-white/10 bg-white/5 p-4">
//             <div className="mb-2 flex items-center gap-2">
//               <Clock3 className="h-4 w-4 text-amber-400" />
//               <p className="text-sm font-medium text-white">
//                 Last sign in
//               </p>
//             </div>

//             <p className="text-sm text-white/60">
//               {formatDate(profile.lastSignInAt)}
//             </p>
//           </div>

//           <button
//             type="button"
//             disabled={sendingReset || passwordResetCooldown > 0}
//             onClick={handlePasswordReset}
//             className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
//           >
//             <div className="flex items-center gap-3">
//               <Shield className="h-5 w-5 text-amber-400" />
//               <div>
//                 <p className="text-sm font-medium text-white">
//                   Reset password
//                 </p>
//                 <p className="mt-1 text-xs text-white/45">
//                   {passwordResetCooldown > 0
//                     ? `You can request another reset email in ${passwordResetCooldown}s.`
//                     : `We'll send a secure password-reset link to ${profile.email}.`}
//                 </p>
//               </div>
//             </div>

//             {sendingReset ? (
//               <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
//             ) : passwordResetCooldown > 0 ? (
//               <span className="text-xs font-semibold text-amber-300">
//                 {passwordResetCooldown}s
//               </span>
//             ) : null}
//           </button>
//         </div>
//       </motion.div>

//       {/* Account actions */}
//       <motion.div variants={itemVariants} className="space-y-3">
//         <button
//           type="button"
//           onClick={handleLogout}
//           className="flex w-full items-center justify-between rounded-2xl border border-white/20 bg-white/10 p-4 transition hover:bg-white/15"
//         >
//           <div className="flex items-center gap-3">
//             <LogOut className="h-5 w-5 text-amber-400" />
//             <div className="text-left">
//               <p className="text-white">Log out</p>
//               <p className="text-xs text-white/40">
//                 End this session on this device.
//               </p>
//             </div>
//           </div>
//         </button>

//         <div className="rounded-2xl border border-red-400/20 bg-red-500/5 p-4">
//           <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//             <div className="flex items-start gap-3">
//               <AlertTriangle className="mt-0.5 h-5 w-5 text-red-400" />
//               <div>
//                 <p className="font-medium text-red-300">
//                   Delete account
//                 </p>
//                 <p className="mt-1 text-xs text-white/40">
//                   Permanently removes your account and learning history.
//                   This cannot be undone.
//                 </p>
//               </div>
//             </div>

//             <button
//               type="button"
//               disabled={deletingAccount}
//               onClick={handleDeleteAccount}
//               className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
//             >
//               {deletingAccount ? (
//                 <Loader2 className="h-4 w-4 animate-spin" />
//               ) : (
//                 <Trash2 className="h-4 w-4" />
//               )}
//               Delete
//             </button>
//           </div>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }




"use client";

import {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { motion, type Variants } from "framer-motion";
import {
  AlertTriangle,
  Bell,
  BookOpen,
  Calendar,
  Camera,
  CheckCircle2,
  Clock3,
  Edit2,
  Flame,
  Globe2,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  Save,
  Shield,
  Star,
  Target,
  Trash2,
  Trophy,
  User,
  X,
} from "lucide-react";
import toast from "react-hot-toast";

import { createClient } from "@/lib/supabase/client";

type JsonRecord = Record<string, unknown>;

type ProfileState = {
  userId: string;
  fullName: string;
  email: string;
  avatarPath: string | null;
  avatarUrl: string | null;
  emailNotifications: boolean;
  timezone: string;
  communityLocation: string;
  joinedAt: string | null;
  lastSignInAt: string | null;
  emailVerified: boolean;

  totalXp: number;
  currentStreak: number;
  longestStreak: number;
  completedLessons: number;
  totalLessons: number;
  progressPercent: number;
  dailyGoalMinutes: number;
  studiedTodaySeconds: number;
  studiedAllTimeSeconds: number;
  currentLevelTitle: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
    },
  },
};

function asRecord(value: unknown): JsonRecord {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value as JsonRecord;
  }

  return {};
}

function textFrom(
  record: JsonRecord,
  ...keys: string[]
): string {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }

  return "";
}

function numberFrom(
  record: JsonRecord,
  ...keys: string[]
): number {
  for (const key of keys) {
    const value = record[key];

    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }

    if (
      typeof value === "string" &&
      value.trim() !== "" &&
      Number.isFinite(Number(value))
    ) {
      return Number(value);
    }
  }

  return 0;
}

function formatDate(value: string | null): string {
  if (!value) return "Not available";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDuration(totalSeconds: number): string {
  const seconds = Math.max(0, Math.floor(totalSeconds));

  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);

  if (minutes < 60) {
    return `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return remainingMinutes > 0
    ? `${hours}h ${remainingMinutes}m`
    : `${hours}h`;
}

function initials(name: string, email: string): string {
  const source = name.trim() || email.trim();

  if (!source) return "U";

  const words = source.split(/\s+/).filter(Boolean);

  if (words.length >= 2) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }

  return source.slice(0, 2).toUpperCase();
}

function clampPercent(value: number): number {
  return Math.min(100, Math.max(0, value));
}

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const supabase = useMemo(() => createClient(), []);

  const [profile, setProfile] = useState<ProfileState | null>(null);
  const [displayName, setDisplayName] = useState("");
  const [communityLocation, setCommunityLocation] = useState("");

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);
  const [passwordResetCooldown, setPasswordResetCooldown] = useState(0);
  const [updatingNotifications, setUpdatingNotifications] = useState(false);
  const [syncingTimezone, setSyncingTimezone] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const loadProfile = useCallback(async () => {
    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;

      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profileRow, error: profileError } = await supabase
        .from("profiles")
        .select(
          "full_name, avatar_path, email_notifications, timezone, community_location",
        )
        .eq("id", user.id)
        .single();

      if (profileError) throw profileError;

      const { data: dashboardResponse, error: dashboardError } =
        await supabase.rpc("get_user_dashboard");

      if (dashboardError) throw dashboardError;

      const dbProfile = asRecord(profileRow);
      const dashboard = asRecord(dashboardResponse);

      const nestedLevel = asRecord(
        dashboard.current_level ??
          dashboard.level ??
          dashboard.currentLevel,
      );

      const fullName =
        textFrom(dbProfile, "full_name") ||
        (typeof user.user_metadata?.full_name === "string"
          ? user.user_metadata.full_name
          : "");

      const avatarPath =
        textFrom(dbProfile, "avatar_path") || null;

      let avatarUrl: string | null = null;

      if (avatarPath) {
        const { data: signedData, error: signedError } =
          await supabase.storage
            .from("avatars")
            .createSignedUrl(avatarPath, 60 * 60);

        if (!signedError) {
          avatarUrl = signedData.signedUrl;
        }
      }

      const completedLessons = numberFrom(
        dashboard,
        "completed_lessons",
        "lessons_completed",
        "completed_lesson_count",
      );

      const totalLessons = numberFrom(
        dashboard,
        "total_lessons",
        "published_lessons",
        "lesson_count",
      );

      const progressPercent =
        numberFrom(
          dashboard,
          "overall_progress_percent",
          "overall_progress_percentage",
          "course_progress_percent",
        ) ||
        (totalLessons > 0
          ? (completedLessons / totalLessons) * 100
          : 0);

      const dailyGoalMinutes =
        numberFrom(dashboard, "daily_goal_minutes") || 30;

      const timezone =
        textFrom(dbProfile, "timezone") || "UTC";

      const savedCommunityLocation =
        textFrom(dbProfile, "community_location");

      setProfile({
        userId: user.id,
        fullName,
        email: user.email ?? "",
        avatarPath,
        avatarUrl,
        emailNotifications:
          typeof dbProfile.email_notifications === "boolean"
            ? dbProfile.email_notifications
            : true,
        timezone,
        communityLocation: savedCommunityLocation,
        joinedAt: user.created_at ?? null,
        lastSignInAt: user.last_sign_in_at ?? null,
        emailVerified: Boolean(user.email_confirmed_at),

        totalXp: numberFrom(dashboard, "total_xp"),
        currentStreak: numberFrom(
          dashboard,
          "current_streak",
          "streak",
        ),
        longestStreak: numberFrom(
          dashboard,
          "longest_streak",
          "best_streak",
        ),
        completedLessons,
        totalLessons,
        progressPercent: clampPercent(progressPercent),
        dailyGoalMinutes,
        studiedTodaySeconds: numberFrom(
          dashboard,
          "time_studied_today_seconds",
          "studied_today_seconds",
          "today_study_seconds",
        ),
        studiedAllTimeSeconds: numberFrom(
          dashboard,
          "time_studied_all_time_seconds",
          "total_time_studied_seconds",
          "all_time_study_seconds",
        ),
        currentLevelTitle:
          textFrom(
            dashboard,
            "current_level_title",
            "level_title",
          ) ||
          textFrom(nestedLevel, "title", "name") ||
          "Getting Started",
      });

      setDisplayName(fullName);
      setCommunityLocation(savedCommunityLocation);
    } catch (error) {
      console.error("Failed to load profile:", error);
      toast.error("Could not load your profile.");
    } finally {
      setLoading(false);
    }
  }, [router, supabase]);

  useEffect(() => {
    void loadProfile();
  }, [loadProfile]);

  useEffect(() => {
    if (passwordResetCooldown <= 0) return;

    const timer = window.setInterval(() => {
      setPasswordResetCooldown((seconds) =>
        seconds <= 1 ? 0 : seconds - 1,
      );
    }, 1000);

    return () => window.clearInterval(timer);
  }, [passwordResetCooldown]);

  const handleSaveProfile = async () => {
    if (!profile) return;

    const cleanName = displayName.trim();

    if (cleanName.length < 2) {
      toast.error("Please enter a valid name.");
      return;
    }

    const cleanCommunityLocation = communityLocation.trim();

    if (cleanCommunityLocation.length > 80) {
      toast.error("Community location must be 80 characters or fewer.");
      return;
    }

    setSavingProfile(true);

    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          full_name: cleanName,
          community_location: cleanCommunityLocation || null,
        })
        .eq("id", profile.userId);

      if (profileError) throw profileError;

      const { error: authError } = await supabase.auth.updateUser({
        data: { full_name: cleanName },
      });

      if (authError) throw authError;

      setProfile((current) =>
        current
          ? {
              ...current,
              fullName: cleanName,
              communityLocation: cleanCommunityLocation,
            }
          : current,
      );

      setIsEditing(false);
      toast.success("Profile updated.");
    } catch (error) {
      console.error("Failed to save profile:", error);
      toast.error("Could not update your profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleAvatarChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    // Allow selecting the same file again later.
    event.target.value = "";

    if (!file || !profile) return;

    if (
      !["image/jpeg", "image/png", "image/webp"].includes(
        file.type,
      )
    ) {
      toast.error("Use a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Profile pictures must be 5 MB or smaller.");
      return;
    }

    setUploadingAvatar(true);

    try {
      // Deliberately use one stable object path so replacing an avatar
      // does not leave old profile-image files behind.
      const objectPath = `${profile.userId}/avatar`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(objectPath, file, {
          upsert: true,
          contentType: file.type,
          cacheControl: "3600",
        });

      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_path: objectPath })
        .eq("id", profile.userId);

      if (updateError) throw updateError;

      const { data: signedData, error: signedError } =
        await supabase.storage
          .from("avatars")
          .createSignedUrl(objectPath, 60 * 60);

      if (signedError) throw signedError;

      setProfile((current) =>
        current
          ? {
              ...current,
              avatarPath: objectPath,
              avatarUrl: signedData.signedUrl,
            }
          : current,
      );

      toast.success("Profile picture updated.");
    } catch (error) {
      console.error("Avatar upload failed:", error);
      toast.error("Could not upload your profile picture.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleRemoveAvatar = async () => {
    if (!profile?.avatarPath) return;

    setUploadingAvatar(true);

    try {
      const { error: storageError } = await supabase.storage
        .from("avatars")
        .remove([profile.avatarPath]);

      if (storageError) throw storageError;

      const { error: profileError } = await supabase
        .from("profiles")
        .update({ avatar_path: null })
        .eq("id", profile.userId);

      if (profileError) throw profileError;

      setProfile((current) =>
        current
          ? { ...current, avatarPath: null, avatarUrl: null }
          : current,
      );

      toast.success("Profile picture removed.");
    } catch (error) {
      console.error("Failed to remove avatar:", error);
      toast.error("Could not remove your profile picture.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleToggleNotifications = async () => {
    if (!profile || updatingNotifications) return;

    const nextValue = !profile.emailNotifications;
    setUpdatingNotifications(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ email_notifications: nextValue })
        .eq("id", profile.userId);

      if (error) throw error;

      setProfile((current) =>
        current
          ? { ...current, emailNotifications: nextValue }
          : current,
      );

      toast.success(
        nextValue
          ? "Email reminder preference enabled."
          : "Email reminder preference disabled.",
      );
    } catch (error) {
      console.error("Notification preference failed:", error);
      toast.error("Could not update the preference.");
    } finally {
      setUpdatingNotifications(false);
    }
  };

  const handleSyncTimezone = async () => {
    if (!profile) return;

    const deviceTimezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (!deviceTimezone) {
      toast.error("Could not detect this device's timezone.");
      return;
    }

    setSyncingTimezone(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ timezone: deviceTimezone })
        .eq("id", profile.userId);

      if (error) throw error;

      setProfile((current) =>
        current
          ? { ...current, timezone: deviceTimezone }
          : current,
      );

      toast.success(`Timezone set to ${deviceTimezone}.`);
    } catch (error) {
      console.error("Timezone update failed:", error);
      toast.error("Could not update your timezone.");
    } finally {
      setSyncingTimezone(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!profile?.email || sendingReset || passwordResetCooldown > 0) {
      return;
    }

    setSendingReset(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        profile.email,
        {
          redirectTo: `${window.location.origin}/reset-password`,
        },
      );

      if (error) {
        const cooldownMatch = error.message.match(
          /after\s+(\d+)\s+seconds?/i,
        );

        if (cooldownMatch) {
          const seconds = Math.max(
            1,
            Number.parseInt(cooldownMatch[1], 10),
          );

          setPasswordResetCooldown(seconds);

          toast.error(
            `For security, please wait ${seconds} seconds before requesting another reset email.`,
          );

          return;
        }

        throw error;
      }

      setPasswordResetCooldown(60);

      toast.success(
        "Password reset email sent. Check your inbox.",
      );
    } catch (error) {
      console.error("Password reset failed:", error);
      toast.error("Could not send the password reset email.");
    } finally {
      setSendingReset(false);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Could not log out.");
      return;
    }

    router.replace("/login");
    router.refresh();
  };

  const handleDeleteAccount = async () => {
    if (!profile || deletingAccount) return;

    const confirmation = window.prompt(
      'This permanently deletes your account and learning history. Type DELETE to continue.',
    );

    if (confirmation !== "DELETE") {
      if (confirmation !== null) {
        toast.error("Account deletion cancelled.");
      }
      return;
    }

    setDeletingAccount(true);

    try {
      if (profile.avatarPath) {
        const { error: avatarDeleteError } = await supabase.storage
          .from("avatars")
          .remove([profile.avatarPath]);

        if (avatarDeleteError) {
          throw avatarDeleteError;
        }
      }

      const { error } = await supabase.rpc("delete_my_account");

      if (error) throw error;

      await supabase.auth.signOut();

      toast.success("Your account has been deleted.");
      router.replace("/");
      router.refresh();
    } catch (error) {
      console.error("Account deletion failed:", error);
      toast.error("Could not delete your account.");
    } finally {
      setDeletingAccount(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-9 w-9 animate-spin text-amber-400" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-6 text-red-100">
        Your profile could not be loaded.
      </div>
    );
  }

  const todayGoalPercent = clampPercent(
    profile.dailyGoalMinutes > 0
      ? (profile.studiedTodaySeconds /
          (profile.dailyGoalMinutes * 60)) *
          100
      : 0,
  );

  const remainingLessons = Math.max(
    0,
    profile.totalLessons - profile.completedLessons,
  );

  const stats = [
    {
      label: "Current Streak",
      value: profile.currentStreak,
      suffix: " days",
      icon: Flame,
      color: "text-orange-400",
    },
    {
      label: "Total XP",
      value: profile.totalXp,
      suffix: "",
      icon: Star,
      color: "text-amber-400",
    },
    {
      label: "Completed",
      value: `${profile.completedLessons}/${profile.totalLessons}`,
      suffix: " lessons",
      icon: BookOpen,
      color: "text-emerald-400",
    },
    {
      label: "Best Streak",
      value: profile.longestStreak,
      suffix: " days",
      icon: Trophy,
      color: "text-amber-400",
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto max-w-5xl space-y-6 pb-12"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold text-white lg:text-3xl">
          Your Profile
        </h1>
        <p className="mt-1 text-amber-200/70">
          Manage your account, privacy, and learning preferences.
        </p>
      </motion.div>

      {/* Profile identity */}
      <motion.div
        variants={itemVariants}
        className="overflow-hidden rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm"
      >
        <div className="h-24 bg-gradient-to-r from-emerald-600 to-amber-600 lg:h-32" />

        <div className="relative px-6 pb-6">
          <div className="absolute -top-12 left-6">
            <div className="group relative h-24 w-24">
              <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white/20 bg-gradient-to-br from-amber-400 to-orange-500 shadow-xl">
                {profile.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={`${profile.fullName || "User"} profile`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-white">
                    {initials(profile.fullName, profile.email)}
                  </div>
                )}
              </div>

              <button
                type="button"
                disabled={uploadingAvatar}
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-emerald-700 text-white shadow-lg transition hover:bg-emerald-600 disabled:opacity-50"
                aria-label="Upload profile picture"
              >
                {uploadingAvatar ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Camera className="h-4 w-4" />
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>
          </div>

          <div className="flex min-h-14 justify-end gap-2 pt-3">
            {profile.avatarPath && (
              <button
                type="button"
                disabled={uploadingAvatar}
                onClick={handleRemoveAvatar}
                className="rounded-lg bg-white/10 px-3 py-2 text-xs text-white/60 transition hover:bg-white/15 hover:text-white"
              >
                Remove photo
              </button>
            )}

            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-amber-300 transition hover:bg-white/20"
              >
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    setDisplayName(profile.fullName);
                    setCommunityLocation(profile.communityLocation);
                    setIsEditing(false);
                  }}
                  className="rounded-lg bg-white/10 p-2 text-white/60 transition hover:bg-white/20"
                  aria-label="Cancel editing"
                >
                  <X className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  disabled={savingProfile}
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-white transition hover:bg-emerald-500 disabled:opacity-60"
                >
                  {savingProfile ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  Save Changes
                </button>
              </>
            )}
          </div>

          <div className="mt-10 space-y-3">
            {isEditing ? (
              <div className="max-w-xl space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-amber-300">
                    Full name
                  </label>
                  <input
                    value={displayName}
                    onChange={(event) =>
                      setDisplayName(event.target.value)
                    }
                    className="w-full rounded-lg border border-white/20 bg-white/10 px-4 py-2 text-white outline-none placeholder:text-white/40 focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-amber-300">
                    Community location
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-300/70" />
                    <input
                      value={communityLocation}
                      onChange={(event) =>
                        setCommunityLocation(event.target.value)
                      }
                      maxLength={80}
                      placeholder="e.g. Kano, Nigeria"
                      className="w-full rounded-lg border border-white/20 bg-white/10 py-2 pl-10 pr-4 text-white outline-none placeholder:text-white/30 focus:ring-2 focus:ring-emerald-400/40"
                    />
                  </div>
                  <div className="mt-1.5 flex items-start justify-between gap-3">
                    <p className="text-xs leading-5 text-white/40">
                      Optional. Share only a broad city, region, or country.
                      This appears beside your name in the Community.
                    </p>
                    <span className="shrink-0 text-[11px] text-white/30">
                      {communityLocation.length}/80
                    </span>
                  </div>
                </div>

                <p className="text-xs text-white/40">
                  Your email is managed through your secure login account.
                </p>
              </div>
            ) : (
              <>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold text-white">
                    {profile.fullName || "Learner"}
                  </h2>

                  {profile.emailVerified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-400/15 px-2 py-1 text-[11px] text-emerald-300">
                      <CheckCircle2 className="h-3 w-3" />
                      Email verified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-amber-200/70">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{profile.email}</span>
                </div>

                {profile.communityLocation && (
                  <div className="flex items-center gap-2 text-emerald-200/70">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">
                      {profile.communityLocation}
                    </span>
                    <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-300/70">
                      Community
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-amber-200/50">
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Joined {formatDate(profile.joinedAt)}
                  </span>

                  <span className="hidden sm:inline">•</span>

                  <span>{profile.currentLevelTitle}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Backend learning statistics */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 gap-4 lg:grid-cols-4"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-sm"
            >
              <Icon className={`mx-auto mb-2 h-6 w-6 ${stat.color}`} />
              <p className="text-2xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-xs text-amber-200/60">
                {stat.label}
                {stat.suffix &&
                  typeof stat.value === "number" &&
                  stat.value > 0
                  ? stat.suffix
                  : ""}
              </p>
            </div>
          );
        })}
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Learning summary */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
        >
          <div className="mb-5 flex items-center gap-2">
            <Target className="h-5 w-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">
              Learning Summary
            </h3>
          </div>

          <div className="space-y-5">
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-white/70">Course progress</span>
                <span className="font-semibold text-white">
                  {profile.progressPercent.toFixed(0)}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-amber-400"
                  style={{
                    width: `${profile.progressPercent}%`,
                  }}
                />
              </div>

              <p className="mt-2 text-xs text-white/40">
                {remainingLessons} published lesson
                {remainingLessons === 1 ? "" : "s"} remaining.
              </p>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="text-white/70">
                  Today&apos;s {profile.dailyGoalMinutes}-minute goal
                </span>
                <span className="font-semibold text-white">
                  {todayGoalPercent.toFixed(0)}%
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                  style={{ width: `${todayGoalPercent}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/5 p-4">
                <Clock3 className="mb-2 h-5 w-5 text-amber-400" />
                <p className="text-lg font-bold text-white">
                  {formatDuration(profile.studiedTodaySeconds)}
                </p>
                <p className="text-xs text-white/45">
                  Studied today
                </p>
              </div>

              <div className="rounded-xl bg-white/5 p-4">
                <BookOpen className="mb-2 h-5 w-5 text-emerald-400" />
                <p className="text-lg font-bold text-white">
                  {formatDuration(profile.studiedAllTimeSeconds)}
                </p>
                <p className="text-xs text-white/45">
                  Total study time
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
        >
          <div className="mb-5 flex items-center gap-2">
            <User className="h-5 w-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-white">
              Preferences
            </h3>
          </div>

          <div className="divide-y divide-white/10">
            <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
              <div className="flex items-start gap-3">
                <Bell className="mt-0.5 h-5 w-5 text-amber-400" />
                <div>
                  <p className="text-sm font-medium text-white">
                    Email learning reminders
                  </p>
                  <p className="mt-1 text-xs text-white/45">
                    Stores your notification preference in your account.
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={updatingNotifications}
                onClick={handleToggleNotifications}
                className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                  profile.emailNotifications
                    ? "bg-emerald-500"
                    : "bg-white/15"
                }`}
                aria-label="Toggle email notifications"
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    profile.emailNotifications
                      ? "left-6"
                      : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between gap-4 py-4">
              <div className="flex items-start gap-3">
                <Globe2 className="mt-0.5 h-5 w-5 text-amber-400" />
                <div>
                  <p className="text-sm font-medium text-white">
                    Learning timezone
                  </p>
                  <p className="mt-1 text-xs text-white/45">
                    {profile.timezone}
                  </p>
                  <p className="mt-1 text-xs text-white/35">
                    Used by the backend when calculating calendar-day streaks.
                  </p>
                </div>
              </div>

              <button
                type="button"
                disabled={syncingTimezone}
                onClick={handleSyncTimezone}
                className="shrink-0 rounded-lg bg-white/10 px-3 py-2 text-xs text-amber-300 transition hover:bg-white/15 disabled:opacity-50"
              >
                {syncingTimezone ? "Syncing..." : "Use device"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Privacy & Security */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-sm"
      >
        <div className="mb-5 flex items-center gap-2">
          <Shield className="h-5 w-5 text-amber-400" />
          <h3 className="text-lg font-semibold text-white">
            Privacy & Security
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4 text-emerald-400" />
              <p className="text-sm font-medium text-white">
                Email status
              </p>
            </div>

            <p className="text-sm text-white/60">
              {profile.emailVerified
                ? "Your email address is verified."
                : "Your email address is not verified yet."}
            </p>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-amber-400" />
              <p className="text-sm font-medium text-white">
                Last sign in
              </p>
            </div>

            <p className="text-sm text-white/60">
              {formatDate(profile.lastSignInAt)}
            </p>
          </div>

          <button
            type="button"
            disabled={sendingReset || passwordResetCooldown > 0}
            onClick={handlePasswordReset}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 text-left transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
          >
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-amber-400" />
              <div>
                <p className="text-sm font-medium text-white">
                  Reset password
                </p>
                <p className="mt-1 text-xs text-white/45">
                  {passwordResetCooldown > 0
                    ? `You can request another reset email in ${passwordResetCooldown}s.`
                    : `We'll send a secure password-reset link to ${profile.email}.`}
                </p>
              </div>
            </div>

            {sendingReset ? (
              <Loader2 className="h-4 w-4 animate-spin text-amber-400" />
            ) : passwordResetCooldown > 0 ? (
              <span className="text-xs font-semibold text-amber-300">
                {passwordResetCooldown}s
              </span>
            ) : null}
          </button>
        </div>
      </motion.div>

      {/* Account actions */}
      <motion.div variants={itemVariants} className="space-y-3">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-between rounded-2xl border border-white/20 bg-white/10 p-4 transition hover:bg-white/15"
        >
          <div className="flex items-center gap-3">
            <LogOut className="h-5 w-5 text-amber-400" />
            <div className="text-left">
              <p className="text-white">Log out</p>
              <p className="text-xs text-white/40">
                End this session on this device.
              </p>
            </div>
          </div>
        </button>

        <div className="rounded-2xl border border-red-400/20 bg-red-500/5 p-4">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-red-400" />
              <div>
                <p className="font-medium text-red-300">
                  Delete account
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Permanently removes your account and learning history.
                  This cannot be undone.
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={deletingAccount}
              onClick={handleDeleteAccount}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
            >
              {deletingAccount ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
