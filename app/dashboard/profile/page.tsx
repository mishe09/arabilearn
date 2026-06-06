'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useProgress } from '@/contexts/ProgressContext';
import { ALL_LESSONS } from '@/data/lessons';
import {
  User,
  Mail,
  Crown,
  Flame,
  Star,
  Calendar,
  Settings,
  Bell,
  Shield,
  LogOut,
  ChevronRight,
  Edit2,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Trophy,
  BookOpen,
  Target,
} from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 100 },
  },
};

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { xp, streak, completedLessons } = useProgress();
  
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [dailyGoal, setDailyGoal] = useState(50);
  
  // Statistics
  const totalLessons = Object.keys(ALL_LESSONS).length;
  const completedCount = completedLessons.length;
  const currentLevel = Math.floor((xp || 0) / 100) + 1;
  const completionPercentage = (completedCount / totalLessons) * 100;
  
  // Join date (mock - would come from database)
  const joinDate = new Date('2024-01-15');
  const daysSinceJoin = Math.floor((new Date().getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24));
  
  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
      setEmail(user.email || '');
    }
  }, [user]);
  
  const handleSaveProfile = () => {
    // In production, this would call an API
    localStorage.setItem('user_displayName', displayName);
    toast.success('Profile updated successfully!');
    setIsEditing(false);
  };
  
  const handlePasswordReset = () => {
    toast.success('Password reset link sent to your email!');
  };
  
  const handleDeleteAccount = () => {
    if (confirm('Are you sure? This action cannot be undone.')) {
      toast.error('Account deletion would happen here');
    }
  };
  
  const menuItems = [
    {
      icon: Bell,
      label: 'Notifications',
      description: 'Manage your notification preferences',
      action: () => setNotificationsEnabled(!notificationsEnabled),
      rightElement: (
        <div className="flex items-center gap-2">
          <span className={`text-sm ${notificationsEnabled ? 'text-emerald-400' : 'text-amber-300/50'}`}>
            {notificationsEnabled ? 'On' : 'Off'}
          </span>
          <ChevronRight className="h-4 w-4 text-white/30" />
        </div>
      ),
    },
    {
      icon: Target,
      label: 'Daily Goal',
      description: 'Set your daily XP target',
      action: () => {
        const newGoal = prompt('Enter your daily XP goal (10-200):', dailyGoal.toString());
        if (newGoal && !isNaN(parseInt(newGoal))) {
          setDailyGoal(Math.min(200, Math.max(10, parseInt(newGoal))));
          localStorage.setItem('daily_goal', dailyGoal.toString());
          toast.success(`Daily goal set to ${dailyGoal} XP`);
        }
      },
      rightElement: (
        <div className="flex items-center gap-2">
          <span className="text-sm text-amber-300">{dailyGoal} XP</span>
          <ChevronRight className="h-4 w-4 text-white/30" />
        </div>
      ),
    },
    {
      icon: Shield,
      label: 'Privacy & Security',
      description: 'Manage your account security',
      action: () => {},
      rightElement: <ChevronRight className="h-4 w-4 text-white/30" />,
    },
  ];
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl lg:text-3xl font-bold text-white">Your Profile</h1>
        <p className="text-amber-200/70 mt-1">
          Manage your account and track your learning journey
        </p>
      </motion.div>
      
      {/* Profile Card */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden"
      >
        {/* Cover Image Area */}
        <div className="h-24 lg:h-32 bg-gradient-to-r from-emerald-600 to-amber-600" />
        
        {/* Profile Info */}
        <div className="relative px-6 pb-6">
          {/* Avatar */}
          <div className="absolute -top-12 left-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 border-4 border-white/20 flex items-center justify-center shadow-xl">
              <span className="text-3xl font-bold text-white">
                {displayName?.[0]?.toUpperCase() || 'M'}
              </span>
            </div>
          </div>
          
          {/* Edit Button */}
          <div className="flex justify-end pt-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-amber-300 hover:bg-white/20 transition"
              >
                <Edit2 className="h-4 w-4" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="p-2 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 transition"
                >
                  <X className="h-4 w-4" />
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </div>
            )}
          </div>
          
          {/* User Details */}
          <div className="mt-14 space-y-3">
            {!isEditing ? (
              <>
                <h2 className="text-2xl font-bold text-white">{displayName || 'Musa Abdullahi'}</h2>
                <div className="flex items-center gap-2 text-amber-200/70">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">{email || 'musa@example.com'}</span>
                </div>
                <div className="flex items-center gap-2 text-amber-200/50 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {joinDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>{daysSinceJoin} days ago</span>
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-amber-300 mb-1">Display Name</label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-amber-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-amber-400/50"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
      
      {/* Stats Row */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { label: 'Level', value: currentLevel, icon: Trophy, color: 'text-amber-400' },
          { label: 'Total XP', value: xp || 0, icon: Star, color: 'text-amber-400' },
          { label: 'Day Streak', value: streak || 0, icon: Flame, color: 'text-orange-400', suffix: ' days' },
          { label: 'Completed', value: `${completedCount}/${totalLessons}`, icon: BookOpen, color: 'text-emerald-400', suffix: ' lessons' },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-center"
            >
              <Icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-amber-200/60">{stat.label}</p>
            </div>
          );
        })}
      </motion.div>
      
      {/* Premium Status Card */}
      <motion.div variants={itemVariants}>
        {user?.hasPremium ? (
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 backdrop-blur-sm border border-emerald-400/30 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-emerald-400/20 flex items-center justify-center">
                <Crown className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Premium Member</h3>
                <p className="text-sm text-emerald-300/70">You have full access to all content</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs">
                <CheckCircle className="h-3 w-3" />
                All Units Unlocked
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-300 text-xs">
                <Sparkles className="h-3 w-3" />
                Premium Support
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-400/30 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-amber-400/20 flex items-center justify-center">
                  <Crown className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Upgrade to Premium</h3>
                  <p className="text-sm text-amber-300/70">Unlock all units and premium features</p>
                </div>
              </div>
              <Link
                href="/dashboard/subscription"
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold rounded-xl hover:shadow-lg transition"
              >
                <Sparkles className="h-4 w-4" />
                Upgrade Now
              </Link>
            </div>
          </div>
        )}
      </motion.div>
      
      {/* Settings Menu */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden">
          <div className="p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Settings className="h-5 w-5 text-amber-400" />
              Settings
            </h3>
          </div>
          
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition border-b border-white/10 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-white">{item.label}</p>
                    <p className="text-xs text-amber-300/50">{item.description}</p>
                  </div>
                </div>
                {item.rightElement}
              </button>
            );
          })}
        </div>
      </motion.div>
      
      {/* Account Actions */}
      <motion.div variants={itemVariants} className="space-y-3">
        <button
          onClick={handlePasswordReset}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition"
        >
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-amber-400" />
            <span className="text-white">Reset Password</span>
          </div>
          <ChevronRight className="h-4 w-4 text-white/30" />
        </button>
        
        <button
          onClick={logout}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-red-500/10 backdrop-blur-sm border border-red-400/30 hover:bg-red-500/20 transition"
        >
          <div className="flex items-center gap-3">
            <LogOut className="h-5 w-5 text-red-400" />
            <span className="text-red-400">Log Out</span>
          </div>
          <ChevronRight className="h-4 w-4 text-red-400/50" />
        </button>
        
        <button
          onClick={handleDeleteAccount}
          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-red-500/10 transition"
        >
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-white/40" />
            <span className="text-white/40">Delete Account</span>
          </div>
        </button>
      </motion.div>
      
      {/* Stats Card */}
      <motion.div variants={itemVariants}>
        <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-4 py-2 mb-4">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <span className="text-sm text-amber-300">Learning Streak</span>
          </div>
          <div className="text-4xl font-bold text-white mb-2">{completionPercentage.toFixed(0)}%</div>
          <p className="text-amber-200/70 text-sm">
            of curriculum completed • {totalLessons - completedCount} lessons remaining
          </p>
          <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden mt-4">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-amber-400 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}