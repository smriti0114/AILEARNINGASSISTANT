import React, { useState, useEffect } from "react";
import { User, Mail, Calendar, Key, LogOut, FileText, BookOpen, BrainCircuit, Activity, Edit2, Check, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";
import moment from "moment";

import { useAuth } from "../../context/AuthContext";
import authService from "../../services/authService";
import progressService from "../../services/progressService";
import Button from "../../components/common/Button";
import Spinner from "../../components/common/Spinner";
import PageHeader from "../../components/common/PageHeader";

const ProfilePage = () => {
  const { user, logout, updateUser } = useAuth();

  const [profileData, setProfileData] = useState(null);
  
  // Profile Edit State
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
  });
  const [savingProfile, setSavingProfile] = useState(false);

  // Password State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [savingPassword, setSavingPassword] = useState(false);

  // Stats State
  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, profileRes] = await Promise.all([
          progressService.getDashboardData(),
          authService.getProfile()
        ]);
        
        setStats(statsRes.data.overview);
        setProfileData(profileRes.data);
        
        // Ensure form has latest data if user refreshed
        setProfileForm({
          username: profileRes.data.username,
          email: profileRes.data.email,
        });
      } catch (err) {
        console.error("Failed to load profile data", err);
        toast.error("Failed to load profile information.");
      } finally {
        setLoadingStats(false);
      }
    };
    fetchData();
  }, []);

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    try {
      const res = await authService.updateProfile({
        username: profileForm.username,
        email: profileForm.email,
      });
      updateUser(res.data);
      setProfileData({ ...profileData, ...res.data });
      toast.success("Profile updated successfully!");
      setIsEditingProfile(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(error.error || error.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    setSavingPassword(true);
    try {
      await authService.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success("Password updated successfully!");
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (error) {
      console.error("Password update error:", error);
      toast.error(error.error || error.message || "Failed to update password.");
    } finally {
      setSavingPassword(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] });
  };

  if (!user || loadingStats) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    );
  }

  const currentUser = profileData || user;

  return (
    <div className="min-h-screen pb-12">

      <div className="relative max-w-5xl mx-auto">
        <PageHeader title="My Profile" subtitle="Manage your account and personal information" />

        {/* Header */}
        <div className="flex items-center gap-6 mb-10 bg-surface/80 backdrop-blur-xl p-8 rounded-3xl border border-border-subtle/60 shadow-xl shadow-border-subtle/50">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-surface text-3xl font-bold shadow-sm shadow-primary/25 shrink-0">
            {currentUser.username?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-navy tracking-tight mb-1">
              {currentUser.username}
            </h1>
            <p className="text-muted text-sm flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {currentUser.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-2xl border border-border-subtle/60 shadow-xl shadow-border-subtle/50 overflow-hidden">
              <div className="px-6 py-5 border-b border-page flex items-center justify-between">
                <h2 className="text-lg font-semibold text-navy flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </h2>
                {!isEditingProfile && (
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className="p-2 text-muted hover:text-primary-hover hover:bg-primary-subtle rounded-lg transition-colors"
                    title="Edit Profile"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <div className="p-6">
                {isEditingProfile ? (
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-body">Username</label>
                      <input
                        type="text"
                        name="username"
                        value={profileForm.username}
                        onChange={handleProfileChange}
                        className="w-full h-11 px-4 border-2 border-border-subtle rounded-xl bg-page/50 text-navy text-sm focus:outline-none focus:border-primary focus:bg-surface transition-colors"
                        required
                        minLength={3}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-semibold text-body">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        className="w-full h-11 px-4 border-2 border-border-subtle rounded-xl bg-page/50 text-navy text-sm focus:outline-none focus:border-primary focus:bg-surface transition-colors"
                        required
                      />
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Button type="button" variant="secondary" onClick={() => {
                        setIsEditingProfile(false);
                        setProfileForm({
                          username: currentUser.username,
                          email: currentUser.email,
                        });
                      }} disabled={savingProfile}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={savingProfile}>
                        {savingProfile ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-medium text-muted mb-1">Username</p>
                      <p className="text-base font-semibold text-navy">{currentUser.username}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted mb-1">Email Address</p>
                      <p className="text-base font-semibold text-navy">{currentUser.email}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Security / Password */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-2xl border border-border-subtle/60 shadow-xl shadow-border-subtle/50 overflow-hidden">
              <div className="px-6 py-5 border-b border-page">
                <h2 className="text-lg font-semibold text-navy flex items-center gap-2">
                  <Key className="w-5 h-5 text-primary" />
                  Security
                </h2>
              </div>
              <div className="p-6">
                <form onSubmit={handleSavePassword} className="space-y-4">
                  {['current', 'new', 'confirm'].map((type) => (
                    <div key={type} className="space-y-1.5 relative">
                      <label className="text-sm font-semibold text-body">
                        {type === 'current' ? 'Current Password' : type === 'new' ? 'New Password' : 'Confirm New Password'}
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword[type] ? "text" : "password"}
                          name={type === 'current' ? 'currentPassword' : type === 'new' ? 'newPassword' : 'confirmPassword'}
                          value={type === 'current' ? passwordForm.currentPassword : type === 'new' ? passwordForm.newPassword : passwordForm.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full h-11 px-4 border-2 border-border-subtle rounded-xl bg-page/50 text-navy text-sm focus:outline-none focus:border-primary focus:bg-surface transition-colors pr-10"
                          required
                          minLength={6}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-muted"
                          onClick={() => togglePasswordVisibility(type)}
                        >
                          {showPassword[type] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4">
                    <Button type="submit" disabled={savingPassword}>
                      {savingPassword ? "Updating Password..." : "Update Password"}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8">
            {/* Account Information */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-2xl border border-border-subtle/60 shadow-xl shadow-border-subtle/50 overflow-hidden">
              <div className="px-6 py-5 border-b border-page">
                <h2 className="text-lg font-semibold text-navy flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  Account Details
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary-subtle flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4 text-primary-hover" />
                  </div>
                  <div>
                    <p className="font-medium text-muted">Status</p>
                    <p className="font-semibold text-navy">Active</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-muted">Joined</p>
                    <p className="font-semibold text-navy">
                      {currentUser.createdAt ? moment(currentUser.createdAt).format("MMMM D, YYYY") : "Recently"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Statistics */}
            <div className="bg-surface/80 backdrop-blur-xl rounded-2xl border border-border-subtle/60 shadow-xl shadow-border-subtle/50 overflow-hidden">
              <div className="px-6 py-5 border-b border-page">
                <h2 className="text-lg font-semibold text-navy flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-primary" />
                  Learning Stats
                </h2>
              </div>
              <div className="p-6">
                {stats ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-page">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-muted" />
                        <span className="text-sm font-medium text-body">Documents</span>
                      </div>
                      <span className="font-semibold text-navy">{stats.totalDocuments || 0}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-page">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-4 h-4 text-muted" />
                        <span className="text-sm font-medium text-body">Flashcard Sets</span>
                      </div>
                      <span className="font-semibold text-navy">{stats.totalFlashcardSets || 0}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-page">
                      <div className="flex items-center gap-3">
                        <BrainCircuit className="w-4 h-4 text-muted" />
                        <span className="text-sm font-medium text-body">Quizzes Taken</span>
                      </div>
                      <span className="font-semibold text-navy">{stats.completedQuizzes || 0}</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted text-center">No stats available</p>
                )}
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 h-12 bg-rose-50 hover:bg-rose-100 text-rose-600 font-semibold rounded-2xl transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;