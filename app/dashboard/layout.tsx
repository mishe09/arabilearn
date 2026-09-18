// // // // // 'use client';

// // // // // import { useState, useEffect } from 'react';
// // // // // import Link from 'next/link';
// // // // // import { usePathname } from 'next/navigation';
// // // // // import { useAuth } from '@/context/AuthContext';
// // // // // import {
// // // // //   Menu,
// // // // //   X,
// // // // //   Home,
// // // // //   BookOpen,
// // // // //   Trophy,
// // // // //   User,
// // // // //   Crown,
// // // // //   LogOut,
// // // // //   ChevronRight,
// // // // //   ChevronLeft,
// // // // //   Flame,
// // // // //   Sparkles,
// // // // //   Radio,
// // // // //   Languages,
// // // // //   MoonStar,
// // // // // } from 'lucide-react';

// // // // // const navItems = [
// // // // //   { href: '/dashboard', label: 'Dashboard', icon: Home },
// // // // //   { href: '/dashboard/lessons', label: 'Lessons', icon: BookOpen },
// // // // //   { href: '/dashboard/progress', label: 'Progress', icon: Trophy },
// // // // //   { href: '/dashboard/profile', label: 'Profile', icon: User },
// // // // //   { href: '/dashboard/prayers', label: 'Prayers', icon: MoonStar },
// // // // //   { href: 'https://zeno.fm/radio/hausaarabia-radio/', label: 'Radio', icon: Radio },
// // // // //   { href: '/dashboard/translator', label: 'translator', icon: Languages },
// // // // // ];

// // // // // export default function DashboardLayout({
// // // // //   children,
// // // // // }: {
// // // // //   children: React.ReactNode;
// // // // // }) {
// // // // //   const [sidebarOpen, setSidebarOpen] = useState(false);
// // // // //   const [isHovered, setIsHovered] = useState(false);
// // // // //   const [mounted, setMounted] = useState(false);
// // // // //   const pathname = usePathname();
// // // // //   const { user, logout } = useAuth();

// // // // //   console.log("DashboardLayout", {
// // // // //     pathname,
// // // // //     user,
// // // // //   });

// // // // //   useEffect(() => {
// // // // //     setMounted(true);
// // // // //   }, []);

// // // // //   // Sidebar is collapsed by default on desktop (width: 80px)
// // // // //   // When hovered or open state is true, it expands to 280px
// // // // //   const isExpanded = sidebarOpen || isHovered;

// // // // //   if (!mounted) {
// // // // //     return (
// // // // //       <div className="min-h-screen flex items-center justify-center bg-emerald-900">
// // // // //         <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
// // // // //       </div>
// // // // //     );
// // // // //   }

// // // // //   return (
// // // // //     <div className="relative min-h-screen overflow-hidden">

// // // // //       {/* GOLD GRID BACKGROUND */}
// // // // //       <div
// // // // //         className="fixed inset-0 z-0"
// // // // //         style={{
// // // // //           backgroundColor: '#064E3B',
// // // // //           backgroundImage: `
// // // // //             linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px),
// // // // //             linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)
// // // // //           `,
// // // // //           backgroundSize: '44px 44px',
// // // // //         }}
// // // // //       />

// // // // //       {/* Decorative glow */}
// // // // //       <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
// // // // //         <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
// // // // //         <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-yellow-500 blur-3xl" />
// // // // //       </div>

// // // // //       {/* Mobile sidebar overlay */}
// // // // //       {sidebarOpen && (
// // // // //         <div
// // // // //           className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
// // // // //           onClick={() => setSidebarOpen(false)}
// // // // //         />
// // // // //       )}

// // // // //       {/* Sidebar - Collapsible on desktop */}
// // // // //       <aside
// // // // //         onMouseEnter={() => setIsHovered(true)}
// // // // //         onMouseLeave={() => setIsHovered(false)}
// // // // //         className={`
// // // // //           fixed left-0 top-0 z-50 h-full 
// // // // //           bg-white/10 backdrop-blur-xl 
// // // // //           border-r border-white/20 shadow-2xl 
// // // // //           transition-all duration-300 ease-in-out
// // // // //           ${sidebarOpen ? 'w-72' : isExpanded ? 'w-72' : 'w-20'}
// // // // //           lg:block
// // // // //           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
// // // // //         `}
// // // // //       >
// // // // //         <div className="flex h-full flex-col">
// // // // //           {/* Sidebar Header - Logo Area */}
// // // // //           <div className="flex items-center justify-between p-4 border-b border-white/20">
// // // // //             {(sidebarOpen || isExpanded) ? (
// // // // //               <>
// // // // //                 <Link href="/dashboard" className="flex items-center gap-2">
// // // // //                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // // // //                     <img
// // // // //                       src="/logo.png"
// // // // //                       alt="HausArabia Logo"
// // // // //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// // // // //                     />
// // // // //                   </div>
// // // // //                   <span className="text-xl font-bold" style={{ color: "#158a6a" }}>
// // // // //                     HAUSA<span className="text-amber-400 text-xl font-bold">ARABIA</span>
// // // // //                   </span>
// // // // //                 </Link>
// // // // //                 <button
// // // // //                   onClick={() => setSidebarOpen(false)}
// // // // //                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
// // // // //                 >
// // // // //                   <ChevronLeft className="h-5 w-5" />
// // // // //                 </button>
// // // // //               </>
// // // // //             ) : (
// // // // //               <>
// // // // //                 <Link href="/dashboard" className="flex items-center justify-center w-full">
// // // // //                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // // // //                     <img
// // // // //                       src="/logo.png"
// // // // //                       alt="HausArabia Logo"
// // // // //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// // // // //                     />
// // // // //                     </div>
// // // // //                 </Link>
// // // // //                 <button
// // // // //                   onClick={() => setSidebarOpen(true)}
// // // // //                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
// // // // //                 >
// // // // //                 </button>
// // // // //               </>
// // // // //             )}
// // // // //             {/* Mobile close button */}
// // // // //             <button
// // // // //               onClick={() => setSidebarOpen(false)}
// // // // //               className="rounded-lg p-1 text-white/60 hover:text-white lg:hidden"
// // // // //             >
// // // // //               <X className="h-6 w-6" />
// // // // //             </button>
// // // // //           </div>

// // // // //           {/* User Info - Condensed when collapsed */}
// // // // //           <div className="border-b border-white/20 p-4">
// // // // //             <div className={`flex items-center gap-3 ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}`}>
// // // // //               <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
// // // // //                 <span className="text-lg font-bold text-amber-300">
// // // // //                   {user?.displayName?.[0] || 'M'}
// // // // //                 </span>
// // // // //               </div>
// // // // //               {(sidebarOpen || isExpanded) && (
// // // // //                 <div className="overflow-hidden">
// // // // //                   <p className="font-medium text-white truncate">{user?.displayName || 'Musa'}</p>
// // // // //                   <p className="text-xs text-amber-300/70 flex items-center gap-1">
// // // // //                     <Flame className="h-3 w-3" />
// // // // //                     5 day streak
// // // // //                   </p>
// // // // //                 </div>
// // // // //               )}
// // // // //             </div>
// // // // //           </div>

// // // // //           {/* Navigation */}
// // // // //           <nav className="flex-1 space-y-1 p-3">
// // // // //             {navItems.map((item) => {
// // // // //               const Icon = item.icon;
// // // // //               const isActive = pathname === item.href;
// // // // //               return (
// // // // //                 <Link
// // // // //                   key={item.href}
// // // // //                   href={item.href}
// // // // //                   className={`
// // // // //                     flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all
// // // // //                     ${isActive
// // // // //                       ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
// // // // //                       : 'text-white/70 hover:bg-white/10 hover:text-white'
// // // // //                     }
// // // // //                     ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // // // //                   `}
// // // // //                   title={!(sidebarOpen || isExpanded) ? item.label : ''}
// // // // //                 >
// // // // //                   <Icon className="h-5 w-5 flex-shrink-0" />
// // // // //                   {(sidebarOpen || isExpanded) && (
// // // // //                     <span className="overflow-hidden whitespace-nowrap">{item.label}</span>
// // // // //                   )}
// // // // //                   {isActive && (sidebarOpen || isExpanded) && <ChevronRight className="ml-auto h-4 w-4" />}
// // // // //                 </Link>
// // // // //               );
// // // // //             })}
// // // // //           </nav>

// // // // //           {/* Upgrade Button - Condensed when collapsed */}
// // // // //           {!user?.hasPremium && (
// // // // //             <div className="border-t border-white/20 p-3">
// // // // //               <Link
// // // // //                 href="/dashboard/subscription"
// // // // //                 className={`
// // // // //                   flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg
// // // // //                   ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // // // //                 `}
// // // // //                 title={!(sidebarOpen || isExpanded) ? 'Upgrade to Premium' : ''}
// // // // //               >
// // // // //                 <Sparkles className="h-4 w-4 flex-shrink-0" />
// // // // //                 {(sidebarOpen || isExpanded) && (
// // // // //                   <span className="overflow-hidden whitespace-nowrap">Upgrade to Premium</span>
// // // // //                 )}
// // // // //                 {(sidebarOpen || isExpanded) && <ChevronRight className="ml-auto h-4 w-4" />}
// // // // //               </Link>
// // // // //             </div>
// // // // //           )}

// // // // //           {/* Logout Button - Condensed when collapsed */}
// // // // //           <div className="border-t border-white/20 p-3">
// // // // //             <button
// // // // //               onClick={logout}
// // // // //               className={`
// // // // //                 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/60 transition-all hover:bg-white/10 hover:text-red-300
// // // // //                 ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // // // //               `}
// // // // //               title={!(sidebarOpen || isExpanded) ? 'Logout' : ''}
// // // // //             >
// // // // //               <LogOut className="h-5 w-5 flex-shrink-0" />
// // // // //               {(sidebarOpen || isExpanded) && (
// // // // //                 <span className="overflow-hidden whitespace-nowrap">Logout</span>
// // // // //               )}
// // // // //               {(sidebarOpen || isExpanded) && <ChevronRight className="ml-auto h-4 w-4" />}
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </aside>

// // // // //       {/* Main Content */}
// // // // //       <div className={`transition-all duration-300 ${sidebarOpen || isHovered ? 'lg:pl-72' : 'lg:pl-20'}`}>
// // // // //         {/* Top Navbar */}
// // // // //         <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-md border-b border-white/10">
// // // // //           <div className="flex h-16 items-center justify-between px-4 lg:px-8">
// // // // //             <div className="flex items-center gap-3">
// // // // //               {/* Mobile menu button */}
// // // // //               <button
// // // // //                 onClick={() => setSidebarOpen(true)}
// // // // //                 className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
// // // // //               >
// // // // //                 <Menu className="h-6 w-6" />
// // // // //               </button>

// // // // //               {/* Logo on navbar when sidebar is collapsed on desktop */}
// // // // //               <div className="hidden lg:flex items-center gap-2">
// // // // //                 <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // // // //                     <img
// // // // //                       src="/logo.png"
// // // // //                       alt="HausArabia Logo"
// // // // //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// // // // //                     />
// // // // //                   </div>
// // // // //                 {(sidebarOpen || isHovered) ? null : (
// // // // //                   <span className="text-lg font-bold" style={{ color: "#158a6a" }}>
// // // // //                     HAUSA<span className="text-amber-400">ARABIA</span>
// // // // //                   </span>
// // // // //                 )}
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="flex items-center gap-4">
// // // // //               {!user?.hasPremium && (
// // // // //                 <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-xs text-amber-300 border border-amber-400/30">
// // // // //                   <Crown className="h-3 w-3" />
// // // // //                   Free Trial
// // // // //                 </span>
// // // // //               )}
// // // // //               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
// // // // //                 <span className="text-sm font-bold text-amber-300">
// // // // //                   {user?.displayName?.[0] || 'M'}
// // // // //                 </span>
// // // // //               </div>
// // // // //             </div>
// // // // //           </div>
// // // // //         </header>

// // // // //         <main className="relative z-10 px-4 py-6 lg:px-8 lg:py-8 max-w-7xl mx-auto w-full">
// // // // //           {children}
// // // // //         </main>
// // // // //       </div>
// // // // //     </div>
// // // // //   );
// // // // // }
// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import Link from 'next/link';
// // // // import { usePathname } from 'next/navigation';
// // // // import { useAuth } from '@/context/AuthContext';
// // // // import {
// // // //   Menu,
// // // //   X,
// // // //   Home,
// // // //   BookOpen,
// // // //   Trophy,
// // // //   User,
// // // //   Crown,
// // // //   LogOut,
// // // //   ChevronRight,
// // // //   ChevronLeft,
// // // //   Flame,
// // // //   Sparkles,
// // // //   Radio,
// // // //   Languages,
// // // //   MoonStar,
// // // //   Heart,
// // // //   Users,
// // // // } from 'lucide-react';

// // // // const navItems = [
// // // //   { href: '/dashboard', label: 'Dashboard', icon: Home },
// // // //   { href: '/dashboard/lessons', label: 'Lessons', icon: BookOpen },
// // // //   { href: '/dashboard/progress', label: 'Progress', icon: Trophy },
// // // //   { href: '/dashboard/profile', label: 'Profile', icon: User },
// // // //   { href: '/dashboard/prayers', label: 'Prayers', icon: MoonStar },
// // // //   { href: 'https://zeno.fm/radio/hausaarabia-radio/', label: 'Radio', icon: Radio },
// // // //   { href: '/dashboard/translator', label: 'Translator', icon: Languages },
// // // //   { href: '/dashboard/community', label: 'Community', icon: Users },
// // // // ];

// // // // export default function DashboardLayout({
// // // //   children,
// // // // }: {
// // // //   children: React.ReactNode;
// // // // }) {
// // // //   const [sidebarOpen, setSidebarOpen] = useState(false);
// // // //   const [isHovered, setIsHovered] = useState(false);
// // // //   const [mounted, setMounted] = useState(false);
// // // //   const pathname = usePathname();
// // // //   const { user, logout } = useAuth();

// // // //   console.log("DashboardLayout", {
// // // //     pathname,
// // // //     user,
// // // //   });

// // // //   useEffect(() => {
// // // //     setMounted(true);
// // // //   }, []);

// // // //   // Sidebar is collapsed by default on desktop (width: 80px)
// // // //   // When hovered or open state is true, it expands to 280px
// // // //   const isExpanded = sidebarOpen || isHovered;

// // // //   if (!mounted) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center bg-emerald-900">
// // // //         <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="relative min-h-screen overflow-hidden">

// // // //       {/* GOLD GRID BACKGROUND */}
// // // //       <div
// // // //         className="fixed inset-0 z-0"
// // // //         style={{
// // // //           backgroundColor: '#064E3B',
// // // //           backgroundImage: `
// // // //             linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px),
// // // //             linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)
// // // //           `,
// // // //           backgroundSize: '44px 44px',
// // // //         }}
// // // //       />

// // // //       {/* Decorative glow */}
// // // //       <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
// // // //         <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
// // // //         <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-yellow-500 blur-3xl" />
// // // //       </div>

// // // //       {/* Mobile sidebar overlay */}
// // // //       {sidebarOpen && (
// // // //         <div
// // // //           className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
// // // //           onClick={() => setSidebarOpen(false)}
// // // //         />
// // // //       )}

// // // //       {/* Sidebar - Collapsible on desktop */}
// // // //       <aside
// // // //         onMouseEnter={() => setIsHovered(true)}
// // // //         onMouseLeave={() => setIsHovered(false)}
// // // //         className={`
// // // //           fixed left-0 top-0 z-50 h-dvh overflow-hidden 
// // // //           bg-white/10 backdrop-blur-xl 
// // // //           border-r border-white/20 shadow-2xl 
// // // //           transition-all duration-300 ease-in-out
// // // //           ${sidebarOpen ? 'w-72' : isExpanded ? 'w-72' : 'w-20'}
// // // //           lg:block
// // // //           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
// // // //         `}
// // // //       >
// // // //         <div className="flex h-full min-h-0 flex-col">
// // // //           {/* Sidebar Header - Logo Area */}
// // // //           <div className="flex items-center justify-between p-4 border-b border-white/20">
// // // //             {(sidebarOpen || isExpanded) ? (
// // // //               <>
// // // //                 <Link href="/dashboard" className="flex items-center gap-2">
// // // //                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // // //                     <img
// // // //                       src="/logo.png"
// // // //                       alt="HausArabia Logo"
// // // //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// // // //                     />
// // // //                   </div>
// // // //                   <span className="text-xl font-bold" style={{ color: "#158a6a" }}>
// // // //                     HAUSA<span className="text-amber-400 text-xl font-bold">ARABIA</span>
// // // //                   </span>
// // // //                 </Link>
// // // //                 <button
// // // //                   onClick={() => setSidebarOpen(false)}
// // // //                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
// // // //                 >
// // // //                   <ChevronLeft className="h-5 w-5" />
// // // //                 </button>
// // // //               </>
// // // //             ) : (
// // // //               <>
// // // //                 <Link href="/dashboard" className="flex items-center justify-center w-full">
// // // //                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // // //                     <img
// // // //                       src="/logo.png"
// // // //                       alt="HausArabia Logo"
// // // //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// // // //                     />
// // // //                     </div>
// // // //                 </Link>
// // // //                 <button
// // // //                   onClick={() => setSidebarOpen(true)}
// // // //                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
// // // //                 >
// // // //                 </button>
// // // //               </>
// // // //             )}
// // // //             {/* Mobile close button */}
// // // //             <button
// // // //               onClick={() => setSidebarOpen(false)}
// // // //               className="rounded-lg p-1 text-white/60 hover:text-white lg:hidden"
// // // //             >
// // // //               <X className="h-6 w-6" />
// // // //             </button>
// // // //           </div>

// // // //           {/* User Info - Condensed when collapsed */}
// // // //           <div className="border-b border-white/20 p-4">
// // // //             <div className={`flex items-center gap-3 ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}`}>
// // // //               <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
// // // //                 <span className="text-lg font-bold text-amber-300">
// // // //                   {user?.displayName?.[0] || 'M'}
// // // //                 </span>
// // // //               </div>
// // // //               {(sidebarOpen || isExpanded) && (
// // // //                 <div className="overflow-hidden">
// // // //                   <p className="font-medium text-white truncate">{user?.displayName || 'Musa'}</p>
// // // //                   <p className="text-xs text-amber-300/70 flex items-center gap-1">
// // // //                     <Flame className="h-3 w-3" />
// // // //                     5 day streak
// // // //                   </p>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* Scrollable navigation area
// // // //               On short/mobile screens this section scrolls so every link remains reachable. */}
// // // //           <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-y-visible">
// // // //             <nav className="space-y-1">
// // // //               {navItems.map((item) => {
// // // //                 const Icon = item.icon;
// // // //                 const isActive = pathname === item.href;
// // // //                 return (
// // // //                   <Link
// // // //                     key={item.href}
// // // //                     href={item.href}
// // // //                     onClick={() => setSidebarOpen(false)}
// // // //                     className={`
// // // //                       flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all
// // // //                       ${isActive
// // // //                         ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
// // // //                         : 'text-white/70 hover:bg-white/10 hover:text-white'
// // // //                       }
// // // //                       ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // // //                     `}
// // // //                     title={!(sidebarOpen || isExpanded) ? item.label : ''}
// // // //                   >
// // // //                     <Icon className="h-5 w-5 flex-shrink-0" />
// // // //                     {(sidebarOpen || isExpanded) && (
// // // //                       <span className="overflow-hidden whitespace-nowrap">{item.label}</span>
// // // //                     )}
// // // //                     {isActive && (sidebarOpen || isExpanded) && (
// // // //                       <ChevronRight className="ml-auto h-4 w-4" />
// // // //                     )}
// // // //                   </Link>
// // // //                 );
// // // //               })}
// // // //             </nav>

// // // //             {/* Support Us */}
// // // //             <div className="mt-3 border-t border-white/20 pt-3">
// // // //               <Link
// // // //                 href="/dashboard/donate"
// // // //                 onClick={() => setSidebarOpen(false)}
// // // //                 className={`
// // // //                   flex items-center gap-3 rounded-xl border border-rose-300/15
// // // //                   bg-rose-400/10 px-3 py-3 text-sm font-semibold text-rose-100
// // // //                   transition-all hover:bg-rose-400/15 hover:text-white
// // // //                   ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // // //                 `}
// // // //                 title={!(sidebarOpen || isExpanded) ? 'Support Us' : ''}
// // // //               >
// // // //                 <Heart className="h-5 w-5 flex-shrink-0 text-rose-300" />
// // // //                 {(sidebarOpen || isExpanded) && (
// // // //                   <span className="overflow-hidden whitespace-nowrap">Support Us</span>
// // // //                 )}
// // // //                 {(sidebarOpen || isExpanded) && (
// // // //                   <ChevronRight className="ml-auto h-4 w-4 text-rose-200/60" />
// // // //                 )}
// // // //               </Link>
// // // //             </div>

// // // //             {/* Premium */}
// // // //             {!user?.hasPremium && (
// // // //               <div className="mt-3 border-t border-white/20 pt-3">
// // // //                 <Link
// // // //                   href="/dashboard/subscription"
// // // //                   onClick={() => setSidebarOpen(false)}
// // // //                   className={`
// // // //                     flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg
// // // //                     ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // // //                   `}
// // // //                   title={!(sidebarOpen || isExpanded) ? 'Upgrade to Premium' : ''}
// // // //                 >
// // // //                   <Sparkles className="h-4 w-4 flex-shrink-0" />
// // // //                   {(sidebarOpen || isExpanded) && (
// // // //                     <span className="overflow-hidden whitespace-nowrap">Upgrade to Premium</span>
// // // //                   )}
// // // //                   {(sidebarOpen || isExpanded) && (
// // // //                     <ChevronRight className="ml-auto h-4 w-4" />
// // // //                   )}
// // // //                 </Link>
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           {/* Logout Button - Condensed when collapsed */}
// // // //           <div className="shrink-0 border-t border-white/20 bg-emerald-950/20 p-3 backdrop-blur-sm">
// // // //             <button
// // // //               onClick={logout}
// // // //               className={`
// // // //                 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/60 transition-all hover:bg-white/10 hover:text-red-300
// // // //                 ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // // //               `}
// // // //               title={!(sidebarOpen || isExpanded) ? 'Logout' : ''}
// // // //             >
// // // //               <LogOut className="h-5 w-5 flex-shrink-0" />
// // // //               {(sidebarOpen || isExpanded) && (
// // // //                 <span className="overflow-hidden whitespace-nowrap">Logout</span>
// // // //               )}
// // // //               {(sidebarOpen || isExpanded) && <ChevronRight className="ml-auto h-4 w-4" />}
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </aside>

// // // //       {/* Main Content */}
// // // //       <div className={`transition-all duration-300 ${sidebarOpen || isHovered ? 'lg:pl-72' : 'lg:pl-20'}`}>
// // // //         {/* Top Navbar */}
// // // //         <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-md border-b border-white/10">
// // // //           <div className="flex h-16 items-center justify-between px-4 lg:px-8">
// // // //             <div className="flex items-center gap-3">
// // // //               {/* Mobile menu button */}
// // // //               <button
// // // //                 onClick={() => setSidebarOpen(true)}
// // // //                 className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
// // // //               >
// // // //                 <Menu className="h-6 w-6" />
// // // //               </button>

// // // //               {/* Logo on navbar when sidebar is collapsed on desktop */}
// // // //               <div className="hidden lg:flex items-center gap-2">
// // // //                 <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // // //                     <img
// // // //                       src="/logo.png"
// // // //                       alt="HausArabia Logo"
// // // //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// // // //                     />
// // // //                   </div>
// // // //                 {(sidebarOpen || isHovered) ? null : (
// // // //                   <span className="text-lg font-bold" style={{ color: "#158a6a" }}>
// // // //                     HAUSA<span className="text-amber-400">ARABIA</span>
// // // //                   </span>
// // // //                 )}
// // // //               </div>
// // // //             </div>

// // // //             <div className="flex items-center gap-4">
// // // //               {!user?.hasPremium && (
// // // //                 <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-xs text-amber-300 border border-amber-400/30">
// // // //                   <Crown className="h-3 w-3" />
// // // //                   Free Trial
// // // //                 </span>
// // // //               )}
// // // //               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
// // // //                 <span className="text-sm font-bold text-amber-300">
// // // //                   {user?.displayName?.[0] || 'M'}
// // // //                 </span>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </header>

// // // //         <main className="relative z-10 px-4 py-6 lg:px-8 lg:py-8 max-w-7xl mx-auto w-full">
// // // //           {children}
// // // //         </main>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }

// // // 'use client';

// // // import { useState, useEffect, useRef } from 'react';
// // // import Link from 'next/link';
// // // import { usePathname } from 'next/navigation';
// // // import { useAuth } from '@/context/AuthContext';
// // // import {
// // //   Menu,
// // //   X,
// // //   Home,
// // //   BookOpen,
// // //   Trophy,
// // //   User,
// // //   LogOut,
// // //   ChevronRight,
// // //   ChevronLeft,
// // //   Flame,
// // //   Sparkles,
// // //   Radio,
// // //   Languages,
// // //   MoonStar,
// // //   Heart,
// // //   Users,
// // // } from 'lucide-react';

// // // const navItems = [
// // //   { href: '/dashboard', label: 'Dashboard', icon: Home },
// // //   { href: '/dashboard/lessons', label: 'Lessons', icon: BookOpen },
// // //   { href: '/dashboard/progress', label: 'Progress', icon: Trophy },
// // //   { href: '/dashboard/profile', label: 'Profile', icon: User },
// // //   { href: '/dashboard/translator', label: 'Translator', icon: Languages },
// // //   { href: '/dashboard/community', label: 'Community', icon: Users },
// // // ];

// // // export default function DashboardLayout({
// // //   children,
// // // }: {
// // //   children: React.ReactNode;
// // // }) {
// // //   const [sidebarOpen, setSidebarOpen] = useState(false);
// // //   const [isHovered, setIsHovered] = useState(false);
// // //   const [mounted, setMounted] = useState(false);
// // //   const [accountMenuOpen, setAccountMenuOpen] = useState(false);
// // //   const accountMenuRef = useRef<HTMLDivElement>(null);
// // //   const pathname = usePathname();
// // //   const { user, logout } = useAuth();

// // //   console.log("DashboardLayout", {
// // //     pathname,
// // //     user,
// // //   });

// // //   useEffect(() => {
// // //     setMounted(true);
// // //   }, []);

// // //   useEffect(() => {
// // //     if (!accountMenuOpen) return;

// // //     const handlePointerDown = (event: MouseEvent | TouchEvent) => {
// // //       const target = event.target as Node;

// // //       if (
// // //         accountMenuRef.current &&
// // //         !accountMenuRef.current.contains(target)
// // //       ) {
// // //         setAccountMenuOpen(false);
// // //       }
// // //     };

// // //     const handleKeyDown = (event: KeyboardEvent) => {
// // //       if (event.key === 'Escape') {
// // //         setAccountMenuOpen(false);
// // //       }
// // //     };

// // //     document.addEventListener('mousedown', handlePointerDown);
// // //     document.addEventListener('touchstart', handlePointerDown);
// // //     document.addEventListener('keydown', handleKeyDown);

// // //     return () => {
// // //       document.removeEventListener('mousedown', handlePointerDown);
// // //       document.removeEventListener('touchstart', handlePointerDown);
// // //       document.removeEventListener('keydown', handleKeyDown);
// // //     };
// // //   }, [accountMenuOpen]);

// // //   useEffect(() => {
// // //     setAccountMenuOpen(false);
// // //   }, [pathname]);

// // //   // Sidebar is collapsed by default on desktop (width: 80px)
// // //   // When hovered or open state is true, it expands to 280px
// // //   const isExpanded = sidebarOpen || isHovered;

// // //   if (!mounted) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-emerald-900">
// // //         <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="relative min-h-screen overflow-hidden">

// // //       {/* GOLD GRID BACKGROUND */}
// // //       <div
// // //         className="fixed inset-0 z-0"
// // //         style={{
// // //           backgroundColor: '#064E3B',
// // //           backgroundImage: `
// // //             linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px),
// // //             linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)
// // //           `,
// // //           backgroundSize: '44px 44px',
// // //         }}
// // //       />

// // //       {/* Decorative glow */}
// // //       <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
// // //         <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
// // //         <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-yellow-500 blur-3xl" />
// // //       </div>

// // //       {/* Mobile sidebar overlay */}
// // //       {sidebarOpen && (
// // //         <div
// // //           className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
// // //           onClick={() => setSidebarOpen(false)}
// // //         />
// // //       )}

// // //       {/* Sidebar - Collapsible on desktop */}
// // //       <aside
// // //         onMouseEnter={() => setIsHovered(true)}
// // //         onMouseLeave={() => setIsHovered(false)}
// // //         className={`
// // //           fixed left-0 top-0 z-50 h-dvh overflow-hidden 
// // //           bg-white/10 backdrop-blur-xl 
// // //           border-r border-white/20 shadow-2xl 
// // //           transition-all duration-300 ease-in-out
// // //           ${sidebarOpen ? 'w-72' : isExpanded ? 'w-72' : 'w-20'}
// // //           lg:block
// // //           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
// // //         `}
// // //       >
// // //         <div className="flex h-full min-h-0 flex-col">
// // //           {/* Sidebar Header - Logo Area */}
// // //           <div className="flex items-center justify-between p-4 border-b border-white/20">
// // //             {(sidebarOpen || isExpanded) ? (
// // //               <>
// // //                 <Link href="/dashboard" className="flex items-center gap-2">
// // //                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // //                     <img
// // //                       src="/logo.png"
// // //                       alt="HausArabia Logo"
// // //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// // //                     />
// // //                   </div>
// // //                   <span className="text-xl font-bold" style={{ color: "#158a6a" }}>
// // //                     HAUSA<span className="text-amber-400 text-xl font-bold">ARABIA</span>
// // //                   </span>
// // //                 </Link>
// // //                 <button
// // //                   onClick={() => setSidebarOpen(false)}
// // //                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
// // //                 >
// // //                   <ChevronLeft className="h-5 w-5" />
// // //                 </button>
// // //               </>
// // //             ) : (
// // //               <>
// // //                 <Link href="/dashboard" className="flex items-center justify-center w-full">
// // //                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // //                     <img
// // //                       src="/logo.png"
// // //                       alt="HausArabia Logo"
// // //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// // //                     />
// // //                     </div>
// // //                 </Link>
// // //                 <button
// // //                   onClick={() => setSidebarOpen(true)}
// // //                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
// // //                 >
// // //                 </button>
// // //               </>
// // //             )}
// // //             {/* Mobile close button */}
// // //             <button
// // //               onClick={() => setSidebarOpen(false)}
// // //               className="rounded-lg p-1 text-white/60 hover:text-white lg:hidden"
// // //             >
// // //               <X className="h-6 w-6" />
// // //             </button>
// // //           </div>

// // //           {/* User Info - Condensed when collapsed */}
// // //           <div className="border-b border-white/20 p-4">
// // //             <div className={`flex items-center gap-3 ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}`}>
// // //               <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
// // //                 <span className="text-lg font-bold text-amber-300">
// // //                   {user?.displayName?.[0] || 'M'}
// // //                 </span>
// // //               </div>
// // //               {(sidebarOpen || isExpanded) && (
// // //                 <div className="overflow-hidden">
// // //                   <p className="font-medium text-white truncate">{user?.displayName || 'Musa'}</p>
// // //                   <p className="text-xs text-amber-300/70 flex items-center gap-1">
// // //                     <Flame className="h-3 w-3" />
// // //                     5 day streak
// // //                   </p>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* Scrollable navigation area
// // //               On short/mobile screens this section scrolls so every link remains reachable. */}
// // //           <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-y-visible">
// // //             <nav className="space-y-1">
// // //               {navItems.map((item) => {
// // //                 const Icon = item.icon;
// // //                 const isActive = pathname === item.href;
// // //                 return (
// // //                   <Link
// // //                     key={item.href}
// // //                     href={item.href}
// // //                     onClick={() => setSidebarOpen(false)}
// // //                     className={`
// // //                       flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all
// // //                       ${isActive
// // //                         ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
// // //                         : 'text-white/70 hover:bg-white/10 hover:text-white'
// // //                       }
// // //                       ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // //                     `}
// // //                     title={!(sidebarOpen || isExpanded) ? item.label : ''}
// // //                   >
// // //                     <Icon className="h-5 w-5 flex-shrink-0" />
// // //                     {(sidebarOpen || isExpanded) && (
// // //                       <span className="overflow-hidden whitespace-nowrap">{item.label}</span>
// // //                     )}
// // //                     {isActive && (sidebarOpen || isExpanded) && (
// // //                       <ChevronRight className="ml-auto h-4 w-4" />
// // //                     )}
// // //                   </Link>
// // //                 );
// // //               })}
// // //             </nav>

// // //             {/* Support Us */}
// // //             <div className="mt-3 border-t border-white/20 pt-3">
// // //               <Link
// // //                 href="/dashboard/donate"
// // //                 onClick={() => setSidebarOpen(false)}
// // //                 className={`
// // //                   flex items-center gap-3 rounded-xl border border-rose-300/15
// // //                   bg-rose-400/10 px-3 py-3 text-sm font-semibold text-rose-100
// // //                   transition-all hover:bg-rose-400/15 hover:text-white
// // //                   ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // //                 `}
// // //                 title={!(sidebarOpen || isExpanded) ? 'Support Us' : ''}
// // //               >
// // //                 <Heart className="h-5 w-5 flex-shrink-0 text-rose-300" />
// // //                 {(sidebarOpen || isExpanded) && (
// // //                   <span className="overflow-hidden whitespace-nowrap">Support Us</span>
// // //                 )}
// // //                 {(sidebarOpen || isExpanded) && (
// // //                   <ChevronRight className="ml-auto h-4 w-4 text-rose-200/60" />
// // //                 )}
// // //               </Link>
// // //             </div>

// // //             {/* Premium */}
// // //             {!user?.hasPremium && (
// // //               <div className="mt-3 border-t border-white/20 pt-3">
// // //                 <Link
// // //                   href="/dashboard/subscription"
// // //                   onClick={() => setSidebarOpen(false)}
// // //                   className={`
// // //                     flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg
// // //                     ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // //                   `}
// // //                   title={!(sidebarOpen || isExpanded) ? 'Upgrade to Premium' : ''}
// // //                 >
// // //                   <Sparkles className="h-4 w-4 flex-shrink-0" />
// // //                   {(sidebarOpen || isExpanded) && (
// // //                     <span className="overflow-hidden whitespace-nowrap">Upgrade to Premium</span>
// // //                   )}
// // //                   {(sidebarOpen || isExpanded) && (
// // //                     <ChevronRight className="ml-auto h-4 w-4" />
// // //                   )}
// // //                 </Link>
// // //               </div>
// // //             )}
// // //           </div>

// // //         </div>
// // //       </aside>

// // //       {/* Main Content */}
// // //       <div className={`transition-all duration-300 ${sidebarOpen || isHovered ? 'lg:pl-72' : 'lg:pl-20'}`}>
// // //         {/* Top Navbar */}
// // //         <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-md border-b border-white/10">
// // //           <div className="flex h-16 items-center justify-between px-4 lg:px-8">
// // //             <div className="flex items-center gap-3">
// // //               {/* Mobile menu button */}
// // //               <button
// // //                 onClick={() => setSidebarOpen(true)}
// // //                 className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
// // //               >
// // //                 <Menu className="h-6 w-6" />
// // //               </button>

// // //               {/* Logo on navbar when sidebar is collapsed on desktop */}
// // //               <div className="hidden lg:flex items-center gap-2">
// // //                 <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // //                     <img
// // //                       src="/logo.png"
// // //                       alt="HausArabia Logo"
// // //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// // //                     />
// // //                   </div>
// // //                 {(sidebarOpen || isHovered) ? null : (
// // //                   <span className="text-lg font-bold" style={{ color: "#158a6a" }}>
// // //                     HAUSA<span className="text-amber-400">ARABIA</span>
// // //                   </span>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             <div className="flex items-center gap-1 sm:gap-2">
// // //               {/* Prayers */}
// // //               <Link
// // //                 href="/dashboard/prayers"
// // //                 aria-label="Prayers"
// // //                 title="Prayers"
// // //                 className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
// // //                   pathname === '/dashboard/prayers'
// // //                     ? 'border-amber-400/60 bg-amber-400/15 text-amber-300 shadow-sm shadow-amber-500/10'
// // //                     : 'border-amber-300/25 bg-amber-400/[0.06] text-amber-300 hover:-translate-y-0.5 hover:border-amber-300/55 hover:bg-amber-400/15 hover:text-amber-200'
// // //                 }`}
// // //               >
// // //                 <MoonStar className="h-5 w-5" />
// // //               </Link>

// // //               {/* Radio */}
// // //               <a
// // //                 href="https://zeno.fm/radio/hausaarabia-radio/"
// // //                 target="_blank"
// // //                 rel="noreferrer"
// // //                 aria-label="HausaArabia Radio"
// // //                 title="Radio"
// // //                 className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-400/[0.06] text-emerald-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300/55 hover:bg-emerald-400/15 hover:text-emerald-200"
// // //               >
// // //                 <Radio className="h-5 w-5" />
// // //               </a>

// // //               {/* Account menu */}
// // //               <div ref={accountMenuRef} className="relative">
// // //                 <button
// // //                   type="button"
// // //                   onClick={() => setAccountMenuOpen((open) => !open)}
// // //                   aria-label="Account menu"
// // //                   aria-expanded={accountMenuOpen}
// // //                   title="Account"
// // //                   className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
// // //                     accountMenuOpen
// // //                       ? 'border-sky-300/60 bg-sky-400/15 text-sky-200 shadow-sm shadow-sky-500/10'
// // //                       : 'border-sky-300/25 bg-sky-400/[0.06] text-sky-300 hover:-translate-y-0.5 hover:border-sky-300/55 hover:bg-sky-400/15 hover:text-sky-200'
// // //                   }`}
// // //                 >
// // //                   <User className="h-5 w-5" />
// // //                 </button>

// // //                 {accountMenuOpen && (
// // //                   <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl bg-emerald-950/95 p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
// // //                     <div className="px-3 py-2">
// // //                       <p className="truncate text-sm font-semibold text-white">
// // //                         {user?.displayName || 'Account'}
// // //                       </p>
// // //                       <p className="mt-0.5 text-xs text-white/40">Signed in</p>
// // //                     </div>

// // //                     <div className="my-1 h-px bg-white/10" />

// // //                     <Link
// // //                       href="/dashboard/profile"
// // //                       onClick={() => setAccountMenuOpen(false)}
// // //                       className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
// // //                     >
// // //                       <User className="h-4 w-4" />
// // //                       Profile
// // //                     </Link>

// // //                     <button
// // //                       type="button"
// // //                       onClick={() => {
// // //                         setAccountMenuOpen(false);
// // //                         logout();
// // //                       }}
// // //                       className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-red-400/10 hover:text-red-300"
// // //                     >
// // //                       <LogOut className="h-4 w-4" />
// // //                       Log out
// // //                     </button>
// // //                   </div>
// // //                 )}
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </header>

// // //         <main className="relative z-10 px-4 py-6 lg:px-8 lg:py-8 max-w-7xl mx-auto w-full">
// // //           {children}
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation';
// // import { useAuth } from '@/context/AuthContext';
// // import { createClient } from '@/lib/supabase/client';
// // import {
// //   Menu,
// //   X,
// //   Home,
// //   BookOpen,
// //   Trophy,
// //   User,
// //   LogOut,
// //   ChevronRight,
// //   ChevronLeft,
// //   Flame,
// //   Sparkles,
// //   Languages,
// //   Heart,
// //   Users,
// // } from 'lucide-react';

// // const navItems = [
// //   { href: '/dashboard', label: 'Dashboard', icon: Home },
// //   { href: '/dashboard/lessons', label: 'Lessons', icon: BookOpen },
// //   { href: '/dashboard/progress', label: 'Progress', icon: Trophy },
// //   { href: '/dashboard/profile', label: 'Profile', icon: User },
// //   { href: '/dashboard/translator', label: 'Translator', icon: Languages },
// //   { href: '/dashboard/community', label: 'Community', icon: Users },
// // ];

// // export default function DashboardLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [isHovered, setIsHovered] = useState(false);
// //   const [mounted, setMounted] = useState(false);
// //   const [accountMenuOpen, setAccountMenuOpen] = useState(false);
// //   const [profileFullName, setProfileFullName] = useState('');
// //   const accountMenuRef = useRef<HTMLDivElement>(null);
// //   const pathname = usePathname();
// //   const { user, logout } = useAuth();

// //   useEffect(() => {
// //     setMounted(true);
// //   }, []);

// //   useEffect(() => {
// //     let cancelled = false;

// //     async function loadProfileName() {
// //       const supabase = createClient();

// //       const {
// //         data: { user: authUser },
// //       } = await supabase.auth.getUser();

// //       if (!authUser) {
// //         if (!cancelled) {
// //           setProfileFullName(user?.displayName?.trim() || '');
// //         }
// //         return;
// //       }

// //       const { data: profile } = await supabase
// //         .from('profiles')
// //         .select('full_name')
// //         .eq('id', authUser.id)
// //         .maybeSingle();

// //       const name =
// //         profile?.full_name?.trim() ||
// //         authUser.user_metadata?.full_name?.trim() ||
// //         user?.displayName?.trim() ||
// //         '';

// //       if (!cancelled) {
// //         setProfileFullName(name);
// //       }
// //     }

// //     void loadProfileName();

// //     return () => {
// //       cancelled = true;
// //     };
// //   }, [user?.displayName]);

// //   const resolvedFullName =
// //     profileFullName ||
// //     user?.displayName?.trim() ||
// //     user?.email?.split('@')[0] ||
// //     'User';

// //   const nameParts = resolvedFullName
// //     .split(/\s+/)
// //     .map((part) => part.trim())
// //     .filter(Boolean);

// //   const firstName = nameParts[0] || 'User';
// //   const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

// //   const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';

// //   useEffect(() => {
// //     if (!accountMenuOpen) return;

// //     const handlePointerDown = (event: MouseEvent | TouchEvent) => {
// //       const target = event.target as Node;

// //       if (
// //         accountMenuRef.current &&
// //         !accountMenuRef.current.contains(target)
// //       ) {
// //         setAccountMenuOpen(false);
// //       }
// //     };

// //     const handleKeyDown = (event: KeyboardEvent) => {
// //       if (event.key === 'Escape') {
// //         setAccountMenuOpen(false);
// //       }
// //     };

// //     document.addEventListener('mousedown', handlePointerDown);
// //     document.addEventListener('touchstart', handlePointerDown);
// //     document.addEventListener('keydown', handleKeyDown);

// //     return () => {
// //       document.removeEventListener('mousedown', handlePointerDown);
// //       document.removeEventListener('touchstart', handlePointerDown);
// //       document.removeEventListener('keydown', handleKeyDown);
// //     };
// //   }, [accountMenuOpen]);

// //   useEffect(() => {
// //     setAccountMenuOpen(false);
// //   }, [pathname]);

// //   // Sidebar is collapsed by default on desktop (width: 80px)
// //   // When hovered or open state is true, it expands to 280px
// //   const isExpanded = sidebarOpen || isHovered;

// //   if (!mounted) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-emerald-900">
// //         <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="relative min-h-screen overflow-hidden">

// //       {/* GOLD GRID BACKGROUND */}
// //       <div
// //         className="fixed inset-0 z-0"
// //         style={{
// //           backgroundColor: '#064E3B',
// //           backgroundImage: `
// //             linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px),
// //             linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)
// //           `,
// //           backgroundSize: '44px 44px',
// //         }}
// //       />

// //       {/* Decorative glow */}
// //       <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
// //         <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
// //         <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-yellow-500 blur-3xl" />
// //       </div>

// //       {/* Mobile sidebar overlay */}
// //       {sidebarOpen && (
// //         <div
// //           className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
// //           onClick={() => setSidebarOpen(false)}
// //         />
// //       )}

// //       {/* Sidebar - Collapsible on desktop */}
// //       <aside
// //         onMouseEnter={() => setIsHovered(true)}
// //         onMouseLeave={() => setIsHovered(false)}
// //         className={`
// //           fixed left-0 top-0 z-50 h-dvh overflow-hidden 
// //           bg-white/10 backdrop-blur-xl 
// //           border-r border-white/20 shadow-2xl 
// //           transition-all duration-300 ease-in-out
// //           ${sidebarOpen ? 'w-72' : isExpanded ? 'w-72' : 'w-20'}
// //           lg:block
// //           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
// //         `}
// //       >
// //         <div className="flex h-full min-h-0 flex-col">
// //           {/* Sidebar Header - Logo Area */}
// //           <div className="flex items-center justify-between p-4 border-b border-white/20">
// //             {(sidebarOpen || isExpanded) ? (
// //               <>
// //                 <Link href="/dashboard" className="flex items-center gap-2">
// //                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
// //                     <img
// //                       src="/logo.png"
// //                       alt="HausArabia Logo"
// //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// //                     />
// //                   </div>
// //                   <span className="text-xl font-bold" style={{ color: "#158a6a" }}>
// //                     HAUSA<span className="text-amber-400 text-xl font-bold">ARABIA</span>
// //                   </span>
// //                 </Link>
// //                 <button
// //                   onClick={() => setSidebarOpen(false)}
// //                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
// //                 >
// //                   <ChevronLeft className="h-5 w-5" />
// //                 </button>
// //               </>
// //             ) : (
// //               <>
// //                 <Link href="/dashboard" className="flex items-center justify-center w-full">
// //                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
// //                     <img
// //                       src="/logo.png"
// //                       alt="HausArabia Logo"
// //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// //                     />
// //                     </div>
// //                 </Link>
// //                 <button
// //                   onClick={() => setSidebarOpen(true)}
// //                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
// //                 >
// //                 </button>
// //               </>
// //             )}
// //             {/* Mobile close button */}
// //             <button
// //               onClick={() => setSidebarOpen(false)}
// //               className="rounded-lg p-1 text-white/60 hover:text-white lg:hidden"
// //             >
// //               <X className="h-6 w-6" />
// //             </button>
// //           </div>

// //           {/* User Info - Condensed when collapsed */}
// //           <div className="border-b border-white/20 p-4">
// //             <div className={`flex items-center gap-3 ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}`}>
// //               <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
// //                 <span className="text-lg font-bold text-amber-300">
// //                   {initials}
// //                 </span>
// //               </div>
// //               {(sidebarOpen || isExpanded) && (
// //                 <div className="overflow-hidden">
// //                   <p className="font-medium text-white truncate">{firstName}</p>
// //                   <p className="text-xs text-amber-300/70 flex items-center gap-1">
// //                     <Flame className="h-3 w-3" />
// //                     5 day streak
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Scrollable navigation area
// //               On short/mobile screens this section scrolls so every link remains reachable. */}
// //           <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-y-visible">
// //             <nav className="space-y-1">
// //               {navItems.map((item) => {
// //                 const Icon = item.icon;
// //                 const isActive = pathname === item.href;
// //                 return (
// //                   <Link
// //                     key={item.href}
// //                     href={item.href}
// //                     onClick={() => setSidebarOpen(false)}
// //                     className={`
// //                       flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all
// //                       ${isActive
// //                         ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
// //                         : 'text-white/70 hover:bg-white/10 hover:text-white'
// //                       }
// //                       ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// //                     `}
// //                     title={!(sidebarOpen || isExpanded) ? item.label : ''}
// //                   >
// //                     <Icon className="h-5 w-5 flex-shrink-0" />
// //                     {(sidebarOpen || isExpanded) && (
// //                       <span className="overflow-hidden whitespace-nowrap">{item.label}</span>
// //                     )}
// //                     {isActive && (sidebarOpen || isExpanded) && (
// //                       <ChevronRight className="ml-auto h-4 w-4" />
// //                     )}
// //                   </Link>
// //                 );
// //               })}
// //             </nav>

// //             {/* Support Us */}
// //             <div className="mt-3 border-t border-white/20 pt-3">
// //               <Link
// //                 href="/dashboard/donate"
// //                 onClick={() => setSidebarOpen(false)}
// //                 className={`
// //                   flex items-center gap-3 rounded-xl border border-rose-300/15
// //                   bg-rose-400/10 px-3 py-3 text-sm font-semibold text-rose-100
// //                   transition-all hover:bg-rose-400/15 hover:text-white
// //                   ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// //                 `}
// //                 title={!(sidebarOpen || isExpanded) ? 'Support Us' : ''}
// //               >
// //                 <Heart className="h-5 w-5 flex-shrink-0 text-rose-300" />
// //                 {(sidebarOpen || isExpanded) && (
// //                   <span className="overflow-hidden whitespace-nowrap">Support Us</span>
// //                 )}
// //                 {(sidebarOpen || isExpanded) && (
// //                   <ChevronRight className="ml-auto h-4 w-4 text-rose-200/60" />
// //                 )}
// //               </Link>
// //             </div>

// //             {/* Premium */}
// //             {!user?.hasPremium && (
// //               <div className="mt-3 border-t border-white/20 pt-3">
// //                 <Link
// //                   href="/dashboard/subscription"
// //                   onClick={() => setSidebarOpen(false)}
// //                   className={`
// //                     flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg
// //                     ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// //                   `}
// //                   title={!(sidebarOpen || isExpanded) ? 'Upgrade to Premium' : ''}
// //                 >
// //                   <Sparkles className="h-4 w-4 flex-shrink-0" />
// //                   {(sidebarOpen || isExpanded) && (
// //                     <span className="overflow-hidden whitespace-nowrap">Upgrade to Premium</span>
// //                   )}
// //                   {(sidebarOpen || isExpanded) && (
// //                     <ChevronRight className="ml-auto h-4 w-4" />
// //                   )}
// //                 </Link>
// //               </div>
// //             )}
// //           </div>

// //         </div>
// //       </aside>

// //       {/* Main Content */}
// //       <div className={`transition-all duration-300 ${sidebarOpen || isHovered ? 'lg:pl-72' : 'lg:pl-20'}`}>
// //         {/* Top Navbar */}
// //         <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-md border-b border-white/10">
// //           <div className="flex h-16 items-center justify-between px-4 lg:px-8">
// //             <div className="flex items-center gap-3">
// //               {/* Mobile menu button */}
// //               <button
// //                 onClick={() => setSidebarOpen(true)}
// //                 className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
// //               >
// //                 <Menu className="h-6 w-6" />
// //               </button>

// //               {/* Logo on navbar when sidebar is collapsed on desktop */}
// //               <div className="hidden lg:flex items-center gap-2">
// //                 <div className="flex-shrink-0 overflow-hidden rounded-xl">
// //                     <img
// //                       src="/logo.png"
// //                       alt="HausArabia Logo"
// //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// //                     />
// //                   </div>
// //                 {(sidebarOpen || isHovered) ? null : (
// //                   <span className="text-lg font-bold" style={{ color: "#158a6a" }}>
// //                     HAUSA<span className="text-amber-400">ARABIA</span>
// //                   </span>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="flex items-center gap-1 sm:gap-2">
// //               {/* Prayers */}
// //               <Link
// //                 href="/dashboard/prayers"
// //                 aria-label="Prayers"
// //                 title="Prayers"
// //                 className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
// //                   pathname === '/dashboard/prayers'
// //                     ? 'border-amber-400/60 bg-amber-400/15 text-amber-300 shadow-sm shadow-amber-500/10'
// //                     : 'border-amber-300/25 bg-amber-400/[0.06] text-amber-300 hover:-translate-y-0.5 hover:border-amber-300/55 hover:bg-amber-400/15 hover:text-amber-200'
// //                 }`}
// //               >
// //                 <Heart className="h-5 w-5" />
// //               </Link>

// //               {/* Account menu */}
// //               <div ref={accountMenuRef} className="relative">
// //                 <button
// //                   type="button"
// //                   onClick={() => setAccountMenuOpen((open) => !open)}
// //                   aria-label="Account menu"
// //                   aria-expanded={accountMenuOpen}
// //                   title="Account"
// //                   className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
// //                     accountMenuOpen
// //                       ? 'border-sky-300/60 bg-sky-400/15 text-sky-200 shadow-sm shadow-sky-500/10'
// //                       : 'border-sky-300/25 bg-sky-400/[0.06] text-sky-300 hover:-translate-y-0.5 hover:border-sky-300/55 hover:bg-sky-400/15 hover:text-sky-200'
// //                   }`}
// //                 >
// //                   <span className="text-xs font-bold tracking-wide">{initials}</span>
// //                 </button>

// //                 {accountMenuOpen && (
// //                   <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl bg-emerald-950/95 p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
// //                     <div className="px-3 py-2">
// //                       <p className="truncate text-sm font-semibold text-white">
// //                         {firstName}
// //                       </p>
// //                       <p className="mt-0.5 text-xs text-white/40">Signed in</p>
// //                     </div>

// //                     <div className="my-1 h-px bg-white/10" />

// //                     <Link
// //                       href="/dashboard/profile"
// //                       onClick={() => setAccountMenuOpen(false)}
// //                       className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
// //                     >
// //                       <User className="h-4 w-4" />
// //                       Profile
// //                     </Link>

// //                     <button
// //                       type="button"
// //                       onClick={() => {
// //                         setAccountMenuOpen(false);
// //                         logout();
// //                       }}
// //                       className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-red-400/10 hover:text-red-300"
// //                     >
// //                       <LogOut className="h-4 w-4" />
// //                       Log out
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </header>

// //         <main className="relative z-10 px-4 py-6 lg:px-8 lg:py-8 max-w-7xl mx-auto w-full">
// //           {children}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }



// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';
// import { createClient } from '@/lib/supabase/client';
// import {
//   Menu,
//   X,
//   Home,
//   BookOpen,
//   GraduationCap,
//   Trophy,
//   User,
//   LogOut,
//   ChevronRight,
//   ChevronLeft,
//   Flame,
//   Sparkles,
//   Languages,
//   Heart,
//   Users,
// } from 'lucide-react';

// const navItems = [
//   { href: '/dashboard', label: 'Dashboard', icon: Home },
//   { href: '/dashboard/lessons', label: 'Lessons', icon: BookOpen },
//   { href: '/dashboard/learn', label: 'HausaArabia Learn', icon: GraduationCap },
//   { href: '/dashboard/progress', label: 'Progress', icon: Trophy },
//   { href: '/dashboard/profile', label: 'Profile', icon: User },
//   { href: '/dashboard/translator', label: 'Translator', icon: Languages },
//   { href: '/dashboard/community', label: 'Community', icon: Users },
// ];

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [accountMenuOpen, setAccountMenuOpen] = useState(false);
//   const [profileFullName, setProfileFullName] = useState('');
//   const accountMenuRef = useRef<HTMLDivElement>(null);
//   const pathname = usePathname();
//   const { user, logout } = useAuth();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     let cancelled = false;

//     async function loadProfileName() {
//       const supabase = createClient();

//       const {
//         data: { user: authUser },
//       } = await supabase.auth.getUser();

//       if (!authUser) {
//         if (!cancelled) {
//           setProfileFullName(user?.displayName?.trim() || '');
//         }
//         return;
//       }

//       const { data: profile } = await supabase
//         .from('profiles')
//         .select('full_name')
//         .eq('id', authUser.id)
//         .maybeSingle();

//       const name =
//         profile?.full_name?.trim() ||
//         authUser.user_metadata?.full_name?.trim() ||
//         user?.displayName?.trim() ||
//         '';

//       if (!cancelled) {
//         setProfileFullName(name);
//       }
//     }

//     void loadProfileName();

//     return () => {
//       cancelled = true;
//     };
//   }, [user?.displayName]);

//   const resolvedFullName =
//     profileFullName ||
//     user?.displayName?.trim() ||
//     user?.email?.split('@')[0] ||
//     'User';

//   const nameParts = resolvedFullName
//     .split(/\s+/)
//     .map((part) => part.trim())
//     .filter(Boolean);

//   const firstName = nameParts[0] || 'User';
//   const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

//   const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';

//   useEffect(() => {
//     if (!accountMenuOpen) return;

//     const handlePointerDown = (event: MouseEvent | TouchEvent) => {
//       const target = event.target as Node;

//       if (
//         accountMenuRef.current &&
//         !accountMenuRef.current.contains(target)
//       ) {
//         setAccountMenuOpen(false);
//       }
//     };

//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         setAccountMenuOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handlePointerDown);
//     document.addEventListener('touchstart', handlePointerDown);
//     document.addEventListener('keydown', handleKeyDown);

//     return () => {
//       document.removeEventListener('mousedown', handlePointerDown);
//       document.removeEventListener('touchstart', handlePointerDown);
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [accountMenuOpen]);

//   useEffect(() => {
//     setAccountMenuOpen(false);
//   }, [pathname]);

//   // Sidebar is collapsed by default on desktop (width: 80px)
//   // When hovered or open state is true, it expands to 280px
//   const isExpanded = sidebarOpen || isHovered;

//   if (!mounted) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-emerald-900">
//         <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen overflow-hidden">

//       {/* GOLD GRID BACKGROUND */}
//       <div
//         className="fixed inset-0 z-0"
//         style={{
//           backgroundColor: '#064E3B',
//           backgroundImage: `
//             linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)
//           `,
//           backgroundSize: '44px 44px',
//         }}
//       />

//       {/* Decorative glow */}
//       <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
//         <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
//         <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-yellow-500 blur-3xl" />
//       </div>

//       {/* Mobile sidebar overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar - Collapsible on desktop */}
//       <aside
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         className={`
//           fixed left-0 top-0 z-50 h-dvh overflow-hidden 
//           bg-white/10 backdrop-blur-xl 
//           border-r border-white/20 shadow-2xl 
//           transition-all duration-300 ease-in-out
//           ${sidebarOpen ? 'w-72' : isExpanded ? 'w-72' : 'w-20'}
//           lg:block
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//         `}
//       >
//         <div className="flex h-full min-h-0 flex-col">
//           {/* Sidebar Header - Logo Area */}
//           <div className="flex items-center justify-between p-4 border-b border-white/20">
//             {(sidebarOpen || isExpanded) ? (
//               <>
//                 <Link href="/dashboard" className="flex items-center gap-2">
//                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
//                     <img
//                       src="/logo.png"
//                       alt="HausArabia Logo"
//                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
//                     />
//                   </div>
//                   <span className="text-xl font-bold" style={{ color: "#158a6a" }}>
//                     HAUSA<span className="text-amber-400 text-xl font-bold">ARABIA</span>
//                   </span>
//                 </Link>
//                 <button
//                   onClick={() => setSidebarOpen(false)}
//                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link href="/dashboard" className="flex items-center justify-center w-full">
//                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
//                     <img
//                       src="/logo.png"
//                       alt="HausArabia Logo"
//                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
//                     />
//                     </div>
//                 </Link>
//                 <button
//                   onClick={() => setSidebarOpen(true)}
//                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
//                 >
//                 </button>
//               </>
//             )}
//             {/* Mobile close button */}
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="rounded-lg p-1 text-white/60 hover:text-white lg:hidden"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>

//           {/* User Info - Condensed when collapsed */}
//           <div className="border-b border-white/20 p-4">
//             <div className={`flex items-center gap-3 ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}`}>
//               <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
//                 <span className="text-lg font-bold text-amber-300">
//                   {initials}
//                 </span>
//               </div>
//               {(sidebarOpen || isExpanded) && (
//                 <div className="overflow-hidden">
//                   <p className="font-medium text-white truncate">{firstName}</p>
//                   <p className="text-xs text-amber-300/70 flex items-center gap-1">
//                     <Flame className="h-3 w-3" />
//                     5 day streak
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Scrollable navigation area
//               On short/mobile screens this section scrolls so every link remains reachable. */}
//           <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-y-visible">
//             <nav className="space-y-1">
//               {navItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = pathname === item.href;
//                 return (
//                   <Link
//                     key={item.href}
//                     href={item.href}
//                     onClick={() => setSidebarOpen(false)}
//                     className={`
//                       flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all
//                       ${isActive
//                         ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
//                         : 'text-white/70 hover:bg-white/10 hover:text-white'
//                       }
//                       ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
//                     `}
//                     title={!(sidebarOpen || isExpanded) ? item.label : ''}
//                   >
//                     <Icon className="h-5 w-5 flex-shrink-0" />
//                     {(sidebarOpen || isExpanded) && (
//                       <span className="overflow-hidden whitespace-nowrap">{item.label}</span>
//                     )}
//                     {isActive && (sidebarOpen || isExpanded) && (
//                       <ChevronRight className="ml-auto h-4 w-4" />
//                     )}
//                   </Link>
//                 );
//               })}
//             </nav>

//             {/* Support Us */}
//             <div className="mt-3 border-t border-white/20 pt-3">
//               <Link
//                 href="/dashboard/donate"
//                 onClick={() => setSidebarOpen(false)}
//                 className={`
//                   flex items-center gap-3 rounded-xl border border-rose-300/15
//                   bg-rose-400/10 px-3 py-3 text-sm font-semibold text-rose-100
//                   transition-all hover:bg-rose-400/15 hover:text-white
//                   ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
//                 `}
//                 title={!(sidebarOpen || isExpanded) ? 'Support Us' : ''}
//               >
//                 <Heart className="h-5 w-5 flex-shrink-0 text-rose-300" />
//                 {(sidebarOpen || isExpanded) && (
//                   <span className="overflow-hidden whitespace-nowrap">Support Us</span>
//                 )}
//                 {(sidebarOpen || isExpanded) && (
//                   <ChevronRight className="ml-auto h-4 w-4 text-rose-200/60" />
//                 )}
//               </Link>
//             </div>

//             {/* Premium */}
//             {!user?.hasPremium && (
//               <div className="mt-3 border-t border-white/20 pt-3">
//                 <Link
//                   href="/dashboard/subscription"
//                   onClick={() => setSidebarOpen(false)}
//                   className={`
//                     flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg
//                     ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
//                   `}
//                   title={!(sidebarOpen || isExpanded) ? 'Upgrade to Premium' : ''}
//                 >
//                   <Sparkles className="h-4 w-4 flex-shrink-0" />
//                   {(sidebarOpen || isExpanded) && (
//                     <span className="overflow-hidden whitespace-nowrap">Upgrade to Premium</span>
//                   )}
//                   {(sidebarOpen || isExpanded) && (
//                     <ChevronRight className="ml-auto h-4 w-4" />
//                   )}
//                 </Link>
//               </div>
//             )}
//           </div>

//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className={`transition-all duration-300 ${sidebarOpen || isHovered ? 'lg:pl-72' : 'lg:pl-20'}`}>
//         {/* Top Navbar */}
//         <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-md border-b border-white/10">
//           <div className="flex h-16 items-center justify-between px-4 lg:px-8">
//             <div className="flex items-center gap-3">
//               {/* Mobile menu button */}
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
//               >
//                 <Menu className="h-6 w-6" />
//               </button>

//               {/* Logo on navbar when sidebar is collapsed on desktop */}
//               <div className="hidden lg:flex items-center gap-2">
//                 <div className="flex-shrink-0 overflow-hidden rounded-xl">
//                     <img
//                       src="/logo.png"
//                       alt="HausArabia Logo"
//                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
//                     />
//                   </div>
//                 {(sidebarOpen || isHovered) ? null : (
//                   <span className="text-lg font-bold" style={{ color: "#158a6a" }}>
//                     HAUSA<span className="text-amber-400">ARABIA</span>
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center gap-1 sm:gap-2">
//               {/* Prayers */}
//               <Link
//                 href="/dashboard/prayers"
//                 aria-label="Prayers"
//                 title="Prayers"
//                 className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
//                   pathname === '/dashboard/prayers'
//                     ? 'border-amber-400/60 bg-amber-400/15 text-amber-300 shadow-sm shadow-amber-500/10'
//                     : 'border-amber-300/25 bg-amber-400/[0.06] text-amber-300 hover:-translate-y-0.5 hover:border-amber-300/55 hover:bg-amber-400/15 hover:text-amber-200'
//                 }`}
//               >
//                 <Heart className="h-5 w-5" />
//               </Link>

//               {/* Account menu */}
//               <div ref={accountMenuRef} className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setAccountMenuOpen((open) => !open)}
//                   aria-label="Account menu"
//                   aria-expanded={accountMenuOpen}
//                   title="Account"
//                   className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
//                     accountMenuOpen
//                       ? 'border-sky-300/60 bg-sky-400/15 text-sky-200 shadow-sm shadow-sky-500/10'
//                       : 'border-sky-300/25 bg-sky-400/[0.06] text-sky-300 hover:-translate-y-0.5 hover:border-sky-300/55 hover:bg-sky-400/15 hover:text-sky-200'
//                   }`}
//                 >
//                   <span className="text-xs font-bold tracking-wide">{initials}</span>
//                 </button>

//                 {accountMenuOpen && (
//                   <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl bg-emerald-950/95 p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
//                     <div className="px-3 py-2">
//                       <p className="truncate text-sm font-semibold text-white">
//                         {firstName}
//                       </p>
//                       <p className="mt-0.5 text-xs text-white/40">Signed in</p>
//                     </div>

//                     <div className="my-1 h-px bg-white/10" />

//                     <Link
//                       href="/dashboard/profile"
//                       onClick={() => setAccountMenuOpen(false)}
//                       className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
//                     >
//                       <User className="h-4 w-4" />
//                       Profile
//                     </Link>

//                     <button
//                       type="button"
//                       onClick={() => {
//                         setAccountMenuOpen(false);
//                         logout();
//                       }}
//                       className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-red-400/10 hover:text-red-300"
//                     >
//                       <LogOut className="h-4 w-4" />
//                       Log out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="relative z-10 px-4 py-6 lg:px-8 lg:py-8 max-w-7xl mx-auto w-full">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }

// // // // 'use client';

// // // // import { useState, useEffect } from 'react';
// // // // import Link from 'next/link';
// // // // import { usePathname } from 'next/navigation';
// // // // import { useAuth } from '@/context/AuthContext';
// // // // import {
// // // //   Menu,
// // // //   X,
// // // //   Home,
// // // //   BookOpen,
// // // //   Trophy,
// // // //   User,
// // // //   Crown,
// // // //   LogOut,
// // // //   ChevronRight,
// // // //   ChevronLeft,
// // // //   Flame,
// // // //   Sparkles,
// // // //   Radio,
// // // //   Languages,
// // // //   MoonStar,
// // // // } from 'lucide-react';

// // // // const navItems = [
// // // //   { href: '/dashboard', label: 'Dashboard', icon: Home },
// // // //   { href: '/dashboard/lessons', label: 'Lessons', icon: BookOpen },
// // // //   { href: '/dashboard/progress', label: 'Progress', icon: Trophy },
// // // //   { href: '/dashboard/profile', label: 'Profile', icon: User },
// // // //   { href: '/dashboard/prayers', label: 'Prayers', icon: MoonStar },
// // // //   { href: 'https://zeno.fm/radio/hausaarabia-radio/', label: 'Radio', icon: Radio },
// // // //   { href: '/dashboard/translator', label: 'translator', icon: Languages },
// // // // ];

// // // // export default function DashboardLayout({
// // // //   children,
// // // // }: {
// // // //   children: React.ReactNode;
// // // // }) {
// // // //   const [sidebarOpen, setSidebarOpen] = useState(false);
// // // //   const [isHovered, setIsHovered] = useState(false);
// // // //   const [mounted, setMounted] = useState(false);
// // // //   const pathname = usePathname();
// // // //   const { user, logout } = useAuth();

// // // //   console.log("DashboardLayout", {
// // // //     pathname,
// // // //     user,
// // // //   });

// // // //   useEffect(() => {
// // // //     setMounted(true);
// // // //   }, []);

// // // //   // Sidebar is collapsed by default on desktop (width: 80px)
// // // //   // When hovered or open state is true, it expands to 280px
// // // //   const isExpanded = sidebarOpen || isHovered;

// // // //   if (!mounted) {
// // // //     return (
// // // //       <div className="min-h-screen flex items-center justify-center bg-emerald-900">
// // // //         <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="relative min-h-screen overflow-hidden">

// // // //       {/* GOLD GRID BACKGROUND */}
// // // //       <div
// // // //         className="fixed inset-0 z-0"
// // // //         style={{
// // // //           backgroundColor: '#064E3B',
// // // //           backgroundImage: `
// // // //             linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px),
// // // //             linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)
// // // //           `,
// // // //           backgroundSize: '44px 44px',
// // // //         }}
// // // //       />

// // // //       {/* Decorative glow */}
// // // //       <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
// // // //         <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
// // // //         <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-yellow-500 blur-3xl" />
// // // //       </div>

// // // //       {/* Mobile sidebar overlay */}
// // // //       {sidebarOpen && (
// // // //         <div
// // // //           className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
// // // //           onClick={() => setSidebarOpen(false)}
// // // //         />
// // // //       )}

// // // //       {/* Sidebar - Collapsible on desktop */}
// // // //       <aside
// // // //         onMouseEnter={() => setIsHovered(true)}
// // // //         onMouseLeave={() => setIsHovered(false)}
// // // //         className={`
// // // //           fixed left-0 top-0 z-50 h-full 
// // // //           bg-white/10 backdrop-blur-xl 
// // // //           border-r border-white/20 shadow-2xl 
// // // //           transition-all duration-300 ease-in-out
// // // //           ${sidebarOpen ? 'w-72' : isExpanded ? 'w-72' : 'w-20'}
// // // //           lg:block
// // // //           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
// // // //         `}
// // // //       >
// // // //         <div className="flex h-full flex-col">
// // // //           {/* Sidebar Header - Logo Area */}
// // // //           <div className="flex items-center justify-between p-4 border-b border-white/20">
// // // //             {(sidebarOpen || isExpanded) ? (
// // // //               <>
// // // //                 <Link href="/dashboard" className="flex items-center gap-2">
// // // //                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // // //                     <img
// // // //                       src="/logo.png"
// // // //                       alt="HausArabia Logo"
// // // //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// // // //                     />
// // // //                   </div>
// // // //                   <span className="text-xl font-bold" style={{ color: "#158a6a" }}>
// // // //                     HAUSA<span className="text-amber-400 text-xl font-bold">ARABIA</span>
// // // //                   </span>
// // // //                 </Link>
// // // //                 <button
// // // //                   onClick={() => setSidebarOpen(false)}
// // // //                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
// // // //                 >
// // // //                   <ChevronLeft className="h-5 w-5" />
// // // //                 </button>
// // // //               </>
// // // //             ) : (
// // // //               <>
// // // //                 <Link href="/dashboard" className="flex items-center justify-center w-full">
// // // //                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // // //                     <img
// // // //                       src="/logo.png"
// // // //                       alt="HausArabia Logo"
// // // //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// // // //                     />
// // // //                     </div>
// // // //                 </Link>
// // // //                 <button
// // // //                   onClick={() => setSidebarOpen(true)}
// // // //                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
// // // //                 >
// // // //                 </button>
// // // //               </>
// // // //             )}
// // // //             {/* Mobile close button */}
// // // //             <button
// // // //               onClick={() => setSidebarOpen(false)}
// // // //               className="rounded-lg p-1 text-white/60 hover:text-white lg:hidden"
// // // //             >
// // // //               <X className="h-6 w-6" />
// // // //             </button>
// // // //           </div>

// // // //           {/* User Info - Condensed when collapsed */}
// // // //           <div className="border-b border-white/20 p-4">
// // // //             <div className={`flex items-center gap-3 ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}`}>
// // // //               <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
// // // //                 <span className="text-lg font-bold text-amber-300">
// // // //                   {user?.displayName?.[0] || 'M'}
// // // //                 </span>
// // // //               </div>
// // // //               {(sidebarOpen || isExpanded) && (
// // // //                 <div className="overflow-hidden">
// // // //                   <p className="font-medium text-white truncate">{user?.displayName || 'Musa'}</p>
// // // //                   <p className="text-xs text-amber-300/70 flex items-center gap-1">
// // // //                     <Flame className="h-3 w-3" />
// // // //                     5 day streak
// // // //                   </p>
// // // //                 </div>
// // // //               )}
// // // //             </div>
// // // //           </div>

// // // //           {/* Navigation */}
// // // //           <nav className="flex-1 space-y-1 p-3">
// // // //             {navItems.map((item) => {
// // // //               const Icon = item.icon;
// // // //               const isActive = pathname === item.href;
// // // //               return (
// // // //                 <Link
// // // //                   key={item.href}
// // // //                   href={item.href}
// // // //                   className={`
// // // //                     flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all
// // // //                     ${isActive
// // // //                       ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
// // // //                       : 'text-white/70 hover:bg-white/10 hover:text-white'
// // // //                     }
// // // //                     ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // // //                   `}
// // // //                   title={!(sidebarOpen || isExpanded) ? item.label : ''}
// // // //                 >
// // // //                   <Icon className="h-5 w-5 flex-shrink-0" />
// // // //                   {(sidebarOpen || isExpanded) && (
// // // //                     <span className="overflow-hidden whitespace-nowrap">{item.label}</span>
// // // //                   )}
// // // //                   {isActive && (sidebarOpen || isExpanded) && <ChevronRight className="ml-auto h-4 w-4" />}
// // // //                 </Link>
// // // //               );
// // // //             })}
// // // //           </nav>

// // // //           {/* Upgrade Button - Condensed when collapsed */}
// // // //           {!user?.hasPremium && (
// // // //             <div className="border-t border-white/20 p-3">
// // // //               <Link
// // // //                 href="/dashboard/subscription"
// // // //                 className={`
// // // //                   flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg
// // // //                   ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // // //                 `}
// // // //                 title={!(sidebarOpen || isExpanded) ? 'Upgrade to Premium' : ''}
// // // //               >
// // // //                 <Sparkles className="h-4 w-4 flex-shrink-0" />
// // // //                 {(sidebarOpen || isExpanded) && (
// // // //                   <span className="overflow-hidden whitespace-nowrap">Upgrade to Premium</span>
// // // //                 )}
// // // //                 {(sidebarOpen || isExpanded) && <ChevronRight className="ml-auto h-4 w-4" />}
// // // //               </Link>
// // // //             </div>
// // // //           )}

// // // //           {/* Logout Button - Condensed when collapsed */}
// // // //           <div className="border-t border-white/20 p-3">
// // // //             <button
// // // //               onClick={logout}
// // // //               className={`
// // // //                 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/60 transition-all hover:bg-white/10 hover:text-red-300
// // // //                 ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // // //               `}
// // // //               title={!(sidebarOpen || isExpanded) ? 'Logout' : ''}
// // // //             >
// // // //               <LogOut className="h-5 w-5 flex-shrink-0" />
// // // //               {(sidebarOpen || isExpanded) && (
// // // //                 <span className="overflow-hidden whitespace-nowrap">Logout</span>
// // // //               )}
// // // //               {(sidebarOpen || isExpanded) && <ChevronRight className="ml-auto h-4 w-4" />}
// // // //             </button>
// // // //           </div>
// // // //         </div>
// // // //       </aside>

// // // //       {/* Main Content */}
// // // //       <div className={`transition-all duration-300 ${sidebarOpen || isHovered ? 'lg:pl-72' : 'lg:pl-20'}`}>
// // // //         {/* Top Navbar */}
// // // //         <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-md border-b border-white/10">
// // // //           <div className="flex h-16 items-center justify-between px-4 lg:px-8">
// // // //             <div className="flex items-center gap-3">
// // // //               {/* Mobile menu button */}
// // // //               <button
// // // //                 onClick={() => setSidebarOpen(true)}
// // // //                 className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
// // // //               >
// // // //                 <Menu className="h-6 w-6" />
// // // //               </button>

// // // //               {/* Logo on navbar when sidebar is collapsed on desktop */}
// // // //               <div className="hidden lg:flex items-center gap-2">
// // // //                 <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // // //                     <img
// // // //                       src="/logo.png"
// // // //                       alt="HausArabia Logo"
// // // //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// // // //                     />
// // // //                   </div>
// // // //                 {(sidebarOpen || isHovered) ? null : (
// // // //                   <span className="text-lg font-bold" style={{ color: "#158a6a" }}>
// // // //                     HAUSA<span className="text-amber-400">ARABIA</span>
// // // //                   </span>
// // // //                 )}
// // // //               </div>
// // // //             </div>

// // // //             <div className="flex items-center gap-4">
// // // //               {!user?.hasPremium && (
// // // //                 <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-xs text-amber-300 border border-amber-400/30">
// // // //                   <Crown className="h-3 w-3" />
// // // //                   Free Trial
// // // //                 </span>
// // // //               )}
// // // //               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
// // // //                 <span className="text-sm font-bold text-amber-300">
// // // //                   {user?.displayName?.[0] || 'M'}
// // // //                 </span>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </header>

// // // //         <main className="relative z-10 px-4 py-6 lg:px-8 lg:py-8 max-w-7xl mx-auto w-full">
// // // //           {children}
// // // //         </main>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }
// // // 'use client';

// // // import { useState, useEffect } from 'react';
// // // import Link from 'next/link';
// // // import { usePathname } from 'next/navigation';
// // // import { useAuth } from '@/context/AuthContext';
// // // import {
// // //   Menu,
// // //   X,
// // //   Home,
// // //   BookOpen,
// // //   Trophy,
// // //   User,
// // //   Crown,
// // //   LogOut,
// // //   ChevronRight,
// // //   ChevronLeft,
// // //   Flame,
// // //   Sparkles,
// // //   Radio,
// // //   Languages,
// // //   MoonStar,
// // //   Heart,
// // //   Users,
// // // } from 'lucide-react';

// // // const navItems = [
// // //   { href: '/dashboard', label: 'Dashboard', icon: Home },
// // //   { href: '/dashboard/lessons', label: 'Lessons', icon: BookOpen },
// // //   { href: '/dashboard/progress', label: 'Progress', icon: Trophy },
// // //   { href: '/dashboard/profile', label: 'Profile', icon: User },
// // //   { href: '/dashboard/prayers', label: 'Prayers', icon: MoonStar },
// // //   { href: 'https://zeno.fm/radio/hausaarabia-radio/', label: 'Radio', icon: Radio },
// // //   { href: '/dashboard/translator', label: 'Translator', icon: Languages },
// // //   { href: '/dashboard/community', label: 'Community', icon: Users },
// // // ];

// // // export default function DashboardLayout({
// // //   children,
// // // }: {
// // //   children: React.ReactNode;
// // // }) {
// // //   const [sidebarOpen, setSidebarOpen] = useState(false);
// // //   const [isHovered, setIsHovered] = useState(false);
// // //   const [mounted, setMounted] = useState(false);
// // //   const pathname = usePathname();
// // //   const { user, logout } = useAuth();

// // //   console.log("DashboardLayout", {
// // //     pathname,
// // //     user,
// // //   });

// // //   useEffect(() => {
// // //     setMounted(true);
// // //   }, []);

// // //   // Sidebar is collapsed by default on desktop (width: 80px)
// // //   // When hovered or open state is true, it expands to 280px
// // //   const isExpanded = sidebarOpen || isHovered;

// // //   if (!mounted) {
// // //     return (
// // //       <div className="min-h-screen flex items-center justify-center bg-emerald-900">
// // //         <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="relative min-h-screen overflow-hidden">

// // //       {/* GOLD GRID BACKGROUND */}
// // //       <div
// // //         className="fixed inset-0 z-0"
// // //         style={{
// // //           backgroundColor: '#064E3B',
// // //           backgroundImage: `
// // //             linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px),
// // //             linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)
// // //           `,
// // //           backgroundSize: '44px 44px',
// // //         }}
// // //       />

// // //       {/* Decorative glow */}
// // //       <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
// // //         <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
// // //         <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-yellow-500 blur-3xl" />
// // //       </div>

// // //       {/* Mobile sidebar overlay */}
// // //       {sidebarOpen && (
// // //         <div
// // //           className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
// // //           onClick={() => setSidebarOpen(false)}
// // //         />
// // //       )}

// // //       {/* Sidebar - Collapsible on desktop */}
// // //       <aside
// // //         onMouseEnter={() => setIsHovered(true)}
// // //         onMouseLeave={() => setIsHovered(false)}
// // //         className={`
// // //           fixed left-0 top-0 z-50 h-dvh overflow-hidden 
// // //           bg-white/10 backdrop-blur-xl 
// // //           border-r border-white/20 shadow-2xl 
// // //           transition-all duration-300 ease-in-out
// // //           ${sidebarOpen ? 'w-72' : isExpanded ? 'w-72' : 'w-20'}
// // //           lg:block
// // //           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
// // //         `}
// // //       >
// // //         <div className="flex h-full min-h-0 flex-col">
// // //           {/* Sidebar Header - Logo Area */}
// // //           <div className="flex items-center justify-between p-4 border-b border-white/20">
// // //             {(sidebarOpen || isExpanded) ? (
// // //               <>
// // //                 <Link href="/dashboard" className="flex items-center gap-2">
// // //                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // //                     <img
// // //                       src="/logo.png"
// // //                       alt="HausArabia Logo"
// // //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// // //                     />
// // //                   </div>
// // //                   <span className="text-xl font-bold" style={{ color: "#158a6a" }}>
// // //                     HAUSA<span className="text-amber-400 text-xl font-bold">ARABIA</span>
// // //                   </span>
// // //                 </Link>
// // //                 <button
// // //                   onClick={() => setSidebarOpen(false)}
// // //                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
// // //                 >
// // //                   <ChevronLeft className="h-5 w-5" />
// // //                 </button>
// // //               </>
// // //             ) : (
// // //               <>
// // //                 <Link href="/dashboard" className="flex items-center justify-center w-full">
// // //                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // //                     <img
// // //                       src="/logo.png"
// // //                       alt="HausArabia Logo"
// // //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// // //                     />
// // //                     </div>
// // //                 </Link>
// // //                 <button
// // //                   onClick={() => setSidebarOpen(true)}
// // //                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
// // //                 >
// // //                 </button>
// // //               </>
// // //             )}
// // //             {/* Mobile close button */}
// // //             <button
// // //               onClick={() => setSidebarOpen(false)}
// // //               className="rounded-lg p-1 text-white/60 hover:text-white lg:hidden"
// // //             >
// // //               <X className="h-6 w-6" />
// // //             </button>
// // //           </div>

// // //           {/* User Info - Condensed when collapsed */}
// // //           <div className="border-b border-white/20 p-4">
// // //             <div className={`flex items-center gap-3 ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}`}>
// // //               <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
// // //                 <span className="text-lg font-bold text-amber-300">
// // //                   {user?.displayName?.[0] || 'M'}
// // //                 </span>
// // //               </div>
// // //               {(sidebarOpen || isExpanded) && (
// // //                 <div className="overflow-hidden">
// // //                   <p className="font-medium text-white truncate">{user?.displayName || 'Musa'}</p>
// // //                   <p className="text-xs text-amber-300/70 flex items-center gap-1">
// // //                     <Flame className="h-3 w-3" />
// // //                     5 day streak
// // //                   </p>
// // //                 </div>
// // //               )}
// // //             </div>
// // //           </div>

// // //           {/* Scrollable navigation area
// // //               On short/mobile screens this section scrolls so every link remains reachable. */}
// // //           <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-y-visible">
// // //             <nav className="space-y-1">
// // //               {navItems.map((item) => {
// // //                 const Icon = item.icon;
// // //                 const isActive = pathname === item.href;
// // //                 return (
// // //                   <Link
// // //                     key={item.href}
// // //                     href={item.href}
// // //                     onClick={() => setSidebarOpen(false)}
// // //                     className={`
// // //                       flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all
// // //                       ${isActive
// // //                         ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
// // //                         : 'text-white/70 hover:bg-white/10 hover:text-white'
// // //                       }
// // //                       ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // //                     `}
// // //                     title={!(sidebarOpen || isExpanded) ? item.label : ''}
// // //                   >
// // //                     <Icon className="h-5 w-5 flex-shrink-0" />
// // //                     {(sidebarOpen || isExpanded) && (
// // //                       <span className="overflow-hidden whitespace-nowrap">{item.label}</span>
// // //                     )}
// // //                     {isActive && (sidebarOpen || isExpanded) && (
// // //                       <ChevronRight className="ml-auto h-4 w-4" />
// // //                     )}
// // //                   </Link>
// // //                 );
// // //               })}
// // //             </nav>

// // //             {/* Support Us */}
// // //             <div className="mt-3 border-t border-white/20 pt-3">
// // //               <Link
// // //                 href="/dashboard/donate"
// // //                 onClick={() => setSidebarOpen(false)}
// // //                 className={`
// // //                   flex items-center gap-3 rounded-xl border border-rose-300/15
// // //                   bg-rose-400/10 px-3 py-3 text-sm font-semibold text-rose-100
// // //                   transition-all hover:bg-rose-400/15 hover:text-white
// // //                   ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // //                 `}
// // //                 title={!(sidebarOpen || isExpanded) ? 'Support Us' : ''}
// // //               >
// // //                 <Heart className="h-5 w-5 flex-shrink-0 text-rose-300" />
// // //                 {(sidebarOpen || isExpanded) && (
// // //                   <span className="overflow-hidden whitespace-nowrap">Support Us</span>
// // //                 )}
// // //                 {(sidebarOpen || isExpanded) && (
// // //                   <ChevronRight className="ml-auto h-4 w-4 text-rose-200/60" />
// // //                 )}
// // //               </Link>
// // //             </div>

// // //             {/* Premium */}
// // //             {!user?.hasPremium && (
// // //               <div className="mt-3 border-t border-white/20 pt-3">
// // //                 <Link
// // //                   href="/dashboard/subscription"
// // //                   onClick={() => setSidebarOpen(false)}
// // //                   className={`
// // //                     flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg
// // //                     ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // //                   `}
// // //                   title={!(sidebarOpen || isExpanded) ? 'Upgrade to Premium' : ''}
// // //                 >
// // //                   <Sparkles className="h-4 w-4 flex-shrink-0" />
// // //                   {(sidebarOpen || isExpanded) && (
// // //                     <span className="overflow-hidden whitespace-nowrap">Upgrade to Premium</span>
// // //                   )}
// // //                   {(sidebarOpen || isExpanded) && (
// // //                     <ChevronRight className="ml-auto h-4 w-4" />
// // //                   )}
// // //                 </Link>
// // //               </div>
// // //             )}
// // //           </div>

// // //           {/* Logout Button - Condensed when collapsed */}
// // //           <div className="shrink-0 border-t border-white/20 bg-emerald-950/20 p-3 backdrop-blur-sm">
// // //             <button
// // //               onClick={logout}
// // //               className={`
// // //                 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-white/60 transition-all hover:bg-white/10 hover:text-red-300
// // //                 ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// // //               `}
// // //               title={!(sidebarOpen || isExpanded) ? 'Logout' : ''}
// // //             >
// // //               <LogOut className="h-5 w-5 flex-shrink-0" />
// // //               {(sidebarOpen || isExpanded) && (
// // //                 <span className="overflow-hidden whitespace-nowrap">Logout</span>
// // //               )}
// // //               {(sidebarOpen || isExpanded) && <ChevronRight className="ml-auto h-4 w-4" />}
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </aside>

// // //       {/* Main Content */}
// // //       <div className={`transition-all duration-300 ${sidebarOpen || isHovered ? 'lg:pl-72' : 'lg:pl-20'}`}>
// // //         {/* Top Navbar */}
// // //         <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-md border-b border-white/10">
// // //           <div className="flex h-16 items-center justify-between px-4 lg:px-8">
// // //             <div className="flex items-center gap-3">
// // //               {/* Mobile menu button */}
// // //               <button
// // //                 onClick={() => setSidebarOpen(true)}
// // //                 className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
// // //               >
// // //                 <Menu className="h-6 w-6" />
// // //               </button>

// // //               {/* Logo on navbar when sidebar is collapsed on desktop */}
// // //               <div className="hidden lg:flex items-center gap-2">
// // //                 <div className="flex-shrink-0 overflow-hidden rounded-xl">
// // //                     <img
// // //                       src="/logo.png"
// // //                       alt="HausArabia Logo"
// // //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// // //                     />
// // //                   </div>
// // //                 {(sidebarOpen || isHovered) ? null : (
// // //                   <span className="text-lg font-bold" style={{ color: "#158a6a" }}>
// // //                     HAUSA<span className="text-amber-400">ARABIA</span>
// // //                   </span>
// // //                 )}
// // //               </div>
// // //             </div>

// // //             <div className="flex items-center gap-4">
// // //               {!user?.hasPremium && (
// // //                 <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-3 py-1 text-xs text-amber-300 border border-amber-400/30">
// // //                   <Crown className="h-3 w-3" />
// // //                   Free Trial
// // //                 </span>
// // //               )}
// // //               <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
// // //                 <span className="text-sm font-bold text-amber-300">
// // //                   {user?.displayName?.[0] || 'M'}
// // //                 </span>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         </header>

// // //         <main className="relative z-10 px-4 py-6 lg:px-8 lg:py-8 max-w-7xl mx-auto w-full">
// // //           {children}
// // //         </main>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // 'use client';

// // import { useState, useEffect, useRef } from 'react';
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation';
// // import { useAuth } from '@/context/AuthContext';
// // import {
// //   Menu,
// //   X,
// //   Home,
// //   BookOpen,
// //   Trophy,
// //   User,
// //   LogOut,
// //   ChevronRight,
// //   ChevronLeft,
// //   Flame,
// //   Sparkles,
// //   Radio,
// //   Languages,
// //   MoonStar,
// //   Heart,
// //   Users,
// // } from 'lucide-react';

// // const navItems = [
// //   { href: '/dashboard', label: 'Dashboard', icon: Home },
// //   { href: '/dashboard/lessons', label: 'Lessons', icon: BookOpen },
// //   { href: '/dashboard/progress', label: 'Progress', icon: Trophy },
// //   { href: '/dashboard/profile', label: 'Profile', icon: User },
// //   { href: '/dashboard/translator', label: 'Translator', icon: Languages },
// //   { href: '/dashboard/community', label: 'Community', icon: Users },
// // ];

// // export default function DashboardLayout({
// //   children,
// // }: {
// //   children: React.ReactNode;
// // }) {
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [isHovered, setIsHovered] = useState(false);
// //   const [mounted, setMounted] = useState(false);
// //   const [accountMenuOpen, setAccountMenuOpen] = useState(false);
// //   const accountMenuRef = useRef<HTMLDivElement>(null);
// //   const pathname = usePathname();
// //   const { user, logout } = useAuth();

// //   console.log("DashboardLayout", {
// //     pathname,
// //     user,
// //   });

// //   useEffect(() => {
// //     setMounted(true);
// //   }, []);

// //   useEffect(() => {
// //     if (!accountMenuOpen) return;

// //     const handlePointerDown = (event: MouseEvent | TouchEvent) => {
// //       const target = event.target as Node;

// //       if (
// //         accountMenuRef.current &&
// //         !accountMenuRef.current.contains(target)
// //       ) {
// //         setAccountMenuOpen(false);
// //       }
// //     };

// //     const handleKeyDown = (event: KeyboardEvent) => {
// //       if (event.key === 'Escape') {
// //         setAccountMenuOpen(false);
// //       }
// //     };

// //     document.addEventListener('mousedown', handlePointerDown);
// //     document.addEventListener('touchstart', handlePointerDown);
// //     document.addEventListener('keydown', handleKeyDown);

// //     return () => {
// //       document.removeEventListener('mousedown', handlePointerDown);
// //       document.removeEventListener('touchstart', handlePointerDown);
// //       document.removeEventListener('keydown', handleKeyDown);
// //     };
// //   }, [accountMenuOpen]);

// //   useEffect(() => {
// //     setAccountMenuOpen(false);
// //   }, [pathname]);

// //   // Sidebar is collapsed by default on desktop (width: 80px)
// //   // When hovered or open state is true, it expands to 280px
// //   const isExpanded = sidebarOpen || isHovered;

// //   if (!mounted) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-emerald-900">
// //         <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="relative min-h-screen overflow-hidden">

// //       {/* GOLD GRID BACKGROUND */}
// //       <div
// //         className="fixed inset-0 z-0"
// //         style={{
// //           backgroundColor: '#064E3B',
// //           backgroundImage: `
// //             linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px),
// //             linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)
// //           `,
// //           backgroundSize: '44px 44px',
// //         }}
// //       />

// //       {/* Decorative glow */}
// //       <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
// //         <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
// //         <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-yellow-500 blur-3xl" />
// //       </div>

// //       {/* Mobile sidebar overlay */}
// //       {sidebarOpen && (
// //         <div
// //           className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
// //           onClick={() => setSidebarOpen(false)}
// //         />
// //       )}

// //       {/* Sidebar - Collapsible on desktop */}
// //       <aside
// //         onMouseEnter={() => setIsHovered(true)}
// //         onMouseLeave={() => setIsHovered(false)}
// //         className={`
// //           fixed left-0 top-0 z-50 h-dvh overflow-hidden 
// //           bg-white/10 backdrop-blur-xl 
// //           border-r border-white/20 shadow-2xl 
// //           transition-all duration-300 ease-in-out
// //           ${sidebarOpen ? 'w-72' : isExpanded ? 'w-72' : 'w-20'}
// //           lg:block
// //           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
// //         `}
// //       >
// //         <div className="flex h-full min-h-0 flex-col">
// //           {/* Sidebar Header - Logo Area */}
// //           <div className="flex items-center justify-between p-4 border-b border-white/20">
// //             {(sidebarOpen || isExpanded) ? (
// //               <>
// //                 <Link href="/dashboard" className="flex items-center gap-2">
// //                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
// //                     <img
// //                       src="/logo.png"
// //                       alt="HausArabia Logo"
// //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// //                     />
// //                   </div>
// //                   <span className="text-xl font-bold" style={{ color: "#158a6a" }}>
// //                     HAUSA<span className="text-amber-400 text-xl font-bold">ARABIA</span>
// //                   </span>
// //                 </Link>
// //                 <button
// //                   onClick={() => setSidebarOpen(false)}
// //                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
// //                 >
// //                   <ChevronLeft className="h-5 w-5" />
// //                 </button>
// //               </>
// //             ) : (
// //               <>
// //                 <Link href="/dashboard" className="flex items-center justify-center w-full">
// //                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
// //                     <img
// //                       src="/logo.png"
// //                       alt="HausArabia Logo"
// //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// //                     />
// //                     </div>
// //                 </Link>
// //                 <button
// //                   onClick={() => setSidebarOpen(true)}
// //                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
// //                 >
// //                 </button>
// //               </>
// //             )}
// //             {/* Mobile close button */}
// //             <button
// //               onClick={() => setSidebarOpen(false)}
// //               className="rounded-lg p-1 text-white/60 hover:text-white lg:hidden"
// //             >
// //               <X className="h-6 w-6" />
// //             </button>
// //           </div>

// //           {/* User Info - Condensed when collapsed */}
// //           <div className="border-b border-white/20 p-4">
// //             <div className={`flex items-center gap-3 ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}`}>
// //               <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
// //                 <span className="text-lg font-bold text-amber-300">
// //                   {user?.displayName?.[0] || 'M'}
// //                 </span>
// //               </div>
// //               {(sidebarOpen || isExpanded) && (
// //                 <div className="overflow-hidden">
// //                   <p className="font-medium text-white truncate">{user?.displayName || 'Musa'}</p>
// //                   <p className="text-xs text-amber-300/70 flex items-center gap-1">
// //                     <Flame className="h-3 w-3" />
// //                     5 day streak
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //           {/* Scrollable navigation area
// //               On short/mobile screens this section scrolls so every link remains reachable. */}
// //           <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-y-visible">
// //             <nav className="space-y-1">
// //               {navItems.map((item) => {
// //                 const Icon = item.icon;
// //                 const isActive = pathname === item.href;
// //                 return (
// //                   <Link
// //                     key={item.href}
// //                     href={item.href}
// //                     onClick={() => setSidebarOpen(false)}
// //                     className={`
// //                       flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all
// //                       ${isActive
// //                         ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
// //                         : 'text-white/70 hover:bg-white/10 hover:text-white'
// //                       }
// //                       ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// //                     `}
// //                     title={!(sidebarOpen || isExpanded) ? item.label : ''}
// //                   >
// //                     <Icon className="h-5 w-5 flex-shrink-0" />
// //                     {(sidebarOpen || isExpanded) && (
// //                       <span className="overflow-hidden whitespace-nowrap">{item.label}</span>
// //                     )}
// //                     {isActive && (sidebarOpen || isExpanded) && (
// //                       <ChevronRight className="ml-auto h-4 w-4" />
// //                     )}
// //                   </Link>
// //                 );
// //               })}
// //             </nav>

// //             {/* Support Us */}
// //             <div className="mt-3 border-t border-white/20 pt-3">
// //               <Link
// //                 href="/dashboard/donate"
// //                 onClick={() => setSidebarOpen(false)}
// //                 className={`
// //                   flex items-center gap-3 rounded-xl border border-rose-300/15
// //                   bg-rose-400/10 px-3 py-3 text-sm font-semibold text-rose-100
// //                   transition-all hover:bg-rose-400/15 hover:text-white
// //                   ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// //                 `}
// //                 title={!(sidebarOpen || isExpanded) ? 'Support Us' : ''}
// //               >
// //                 <Heart className="h-5 w-5 flex-shrink-0 text-rose-300" />
// //                 {(sidebarOpen || isExpanded) && (
// //                   <span className="overflow-hidden whitespace-nowrap">Support Us</span>
// //                 )}
// //                 {(sidebarOpen || isExpanded) && (
// //                   <ChevronRight className="ml-auto h-4 w-4 text-rose-200/60" />
// //                 )}
// //               </Link>
// //             </div>

// //             {/* Premium */}
// //             {!user?.hasPremium && (
// //               <div className="mt-3 border-t border-white/20 pt-3">
// //                 <Link
// //                   href="/dashboard/subscription"
// //                   onClick={() => setSidebarOpen(false)}
// //                   className={`
// //                     flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg
// //                     ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
// //                   `}
// //                   title={!(sidebarOpen || isExpanded) ? 'Upgrade to Premium' : ''}
// //                 >
// //                   <Sparkles className="h-4 w-4 flex-shrink-0" />
// //                   {(sidebarOpen || isExpanded) && (
// //                     <span className="overflow-hidden whitespace-nowrap">Upgrade to Premium</span>
// //                   )}
// //                   {(sidebarOpen || isExpanded) && (
// //                     <ChevronRight className="ml-auto h-4 w-4" />
// //                   )}
// //                 </Link>
// //               </div>
// //             )}
// //           </div>

// //         </div>
// //       </aside>

// //       {/* Main Content */}
// //       <div className={`transition-all duration-300 ${sidebarOpen || isHovered ? 'lg:pl-72' : 'lg:pl-20'}`}>
// //         {/* Top Navbar */}
// //         <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-md border-b border-white/10">
// //           <div className="flex h-16 items-center justify-between px-4 lg:px-8">
// //             <div className="flex items-center gap-3">
// //               {/* Mobile menu button */}
// //               <button
// //                 onClick={() => setSidebarOpen(true)}
// //                 className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
// //               >
// //                 <Menu className="h-6 w-6" />
// //               </button>

// //               {/* Logo on navbar when sidebar is collapsed on desktop */}
// //               <div className="hidden lg:flex items-center gap-2">
// //                 <div className="flex-shrink-0 overflow-hidden rounded-xl">
// //                     <img
// //                       src="/logo.png"
// //                       alt="HausArabia Logo"
// //                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
// //                     />
// //                   </div>
// //                 {(sidebarOpen || isHovered) ? null : (
// //                   <span className="text-lg font-bold" style={{ color: "#158a6a" }}>
// //                     HAUSA<span className="text-amber-400">ARABIA</span>
// //                   </span>
// //                 )}
// //               </div>
// //             </div>

// //             <div className="flex items-center gap-1 sm:gap-2">
// //               {/* Prayers */}
// //               <Link
// //                 href="/dashboard/prayers"
// //                 aria-label="Prayers"
// //                 title="Prayers"
// //                 className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
// //                   pathname === '/dashboard/prayers'
// //                     ? 'border-amber-400/60 bg-amber-400/15 text-amber-300 shadow-sm shadow-amber-500/10'
// //                     : 'border-amber-300/25 bg-amber-400/[0.06] text-amber-300 hover:-translate-y-0.5 hover:border-amber-300/55 hover:bg-amber-400/15 hover:text-amber-200'
// //                 }`}
// //               >
// //                 <MoonStar className="h-5 w-5" />
// //               </Link>

// //               {/* Radio */}
// //               <a
// //                 href="https://zeno.fm/radio/hausaarabia-radio/"
// //                 target="_blank"
// //                 rel="noreferrer"
// //                 aria-label="HausaArabia Radio"
// //                 title="Radio"
// //                 className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-300/25 bg-emerald-400/[0.06] text-emerald-300 transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300/55 hover:bg-emerald-400/15 hover:text-emerald-200"
// //               >
// //                 <Radio className="h-5 w-5" />
// //               </a>

// //               {/* Account menu */}
// //               <div ref={accountMenuRef} className="relative">
// //                 <button
// //                   type="button"
// //                   onClick={() => setAccountMenuOpen((open) => !open)}
// //                   aria-label="Account menu"
// //                   aria-expanded={accountMenuOpen}
// //                   title="Account"
// //                   className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
// //                     accountMenuOpen
// //                       ? 'border-sky-300/60 bg-sky-400/15 text-sky-200 shadow-sm shadow-sky-500/10'
// //                       : 'border-sky-300/25 bg-sky-400/[0.06] text-sky-300 hover:-translate-y-0.5 hover:border-sky-300/55 hover:bg-sky-400/15 hover:text-sky-200'
// //                   }`}
// //                 >
// //                   <User className="h-5 w-5" />
// //                 </button>

// //                 {accountMenuOpen && (
// //                   <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl bg-emerald-950/95 p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
// //                     <div className="px-3 py-2">
// //                       <p className="truncate text-sm font-semibold text-white">
// //                         {user?.displayName || 'Account'}
// //                       </p>
// //                       <p className="mt-0.5 text-xs text-white/40">Signed in</p>
// //                     </div>

// //                     <div className="my-1 h-px bg-white/10" />

// //                     <Link
// //                       href="/dashboard/profile"
// //                       onClick={() => setAccountMenuOpen(false)}
// //                       className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
// //                     >
// //                       <User className="h-4 w-4" />
// //                       Profile
// //                     </Link>

// //                     <button
// //                       type="button"
// //                       onClick={() => {
// //                         setAccountMenuOpen(false);
// //                         logout();
// //                       }}
// //                       className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-red-400/10 hover:text-red-300"
// //                     >
// //                       <LogOut className="h-4 w-4" />
// //                       Log out
// //                     </button>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           </div>
// //         </header>

// //         <main className="relative z-10 px-4 py-6 lg:px-8 lg:py-8 max-w-7xl mx-auto w-full">
// //           {children}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // }



// 'use client';

// import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';
// import { createClient } from '@/lib/supabase/client';
// import {
//   Menu,
//   X,
//   Home,
//   BookOpen,
//   Trophy,
//   User,
//   LogOut,
//   ChevronRight,
//   ChevronLeft,
//   Flame,
//   Sparkles,
//   Languages,
//   Heart,
//   Users,
// } from 'lucide-react';

// const navItems = [
//   { href: '/dashboard', label: 'Dashboard', icon: Home },
//   { href: '/dashboard/lessons', label: 'Lessons', icon: BookOpen },
//   { href: '/dashboard/progress', label: 'Progress', icon: Trophy },
//   { href: '/dashboard/profile', label: 'Profile', icon: User },
//   { href: '/dashboard/translator', label: 'Translator', icon: Languages },
//   { href: '/dashboard/community', label: 'Community', icon: Users },
// ];

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [isHovered, setIsHovered] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   const [accountMenuOpen, setAccountMenuOpen] = useState(false);
//   const [profileFullName, setProfileFullName] = useState('');
//   const accountMenuRef = useRef<HTMLDivElement>(null);
//   const pathname = usePathname();
//   const { user, logout } = useAuth();

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     let cancelled = false;

//     async function loadProfileName() {
//       const supabase = createClient();

//       const {
//         data: { user: authUser },
//       } = await supabase.auth.getUser();

//       if (!authUser) {
//         if (!cancelled) {
//           setProfileFullName(user?.displayName?.trim() || '');
//         }
//         return;
//       }

//       const { data: profile } = await supabase
//         .from('profiles')
//         .select('full_name')
//         .eq('id', authUser.id)
//         .maybeSingle();

//       const name =
//         profile?.full_name?.trim() ||
//         authUser.user_metadata?.full_name?.trim() ||
//         user?.displayName?.trim() ||
//         '';

//       if (!cancelled) {
//         setProfileFullName(name);
//       }
//     }

//     void loadProfileName();

//     return () => {
//       cancelled = true;
//     };
//   }, [user?.displayName]);

//   const resolvedFullName =
//     profileFullName ||
//     user?.displayName?.trim() ||
//     user?.email?.split('@')[0] ||
//     'User';

//   const nameParts = resolvedFullName
//     .split(/\s+/)
//     .map((part) => part.trim())
//     .filter(Boolean);

//   const firstName = nameParts[0] || 'User';
//   const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

//   const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';

//   useEffect(() => {
//     if (!accountMenuOpen) return;

//     const handlePointerDown = (event: MouseEvent | TouchEvent) => {
//       const target = event.target as Node;

//       if (
//         accountMenuRef.current &&
//         !accountMenuRef.current.contains(target)
//       ) {
//         setAccountMenuOpen(false);
//       }
//     };

//     const handleKeyDown = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         setAccountMenuOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handlePointerDown);
//     document.addEventListener('touchstart', handlePointerDown);
//     document.addEventListener('keydown', handleKeyDown);

//     return () => {
//       document.removeEventListener('mousedown', handlePointerDown);
//       document.removeEventListener('touchstart', handlePointerDown);
//       document.removeEventListener('keydown', handleKeyDown);
//     };
//   }, [accountMenuOpen]);

//   useEffect(() => {
//     setAccountMenuOpen(false);
//   }, [pathname]);

//   // Sidebar is collapsed by default on desktop (width: 80px)
//   // When hovered or open state is true, it expands to 280px
//   const isExpanded = sidebarOpen || isHovered;

//   if (!mounted) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-emerald-900">
//         <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   return (
//     <div className="relative min-h-screen overflow-hidden">

//       {/* GOLD GRID BACKGROUND */}
//       <div
//         className="fixed inset-0 z-0"
//         style={{
//           backgroundColor: '#064E3B',
//           backgroundImage: `
//             linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)
//           `,
//           backgroundSize: '44px 44px',
//         }}
//       />

//       {/* Decorative glow */}
//       <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
//         <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
//         <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-yellow-500 blur-3xl" />
//       </div>

//       {/* Mobile sidebar overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar - Collapsible on desktop */}
//       <aside
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         className={`
//           fixed left-0 top-0 z-50 h-dvh overflow-hidden 
//           bg-white/10 backdrop-blur-xl 
//           border-r border-white/20 shadow-2xl 
//           transition-all duration-300 ease-in-out
//           ${sidebarOpen ? 'w-72' : isExpanded ? 'w-72' : 'w-20'}
//           lg:block
//           ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
//         `}
//       >
//         <div className="flex h-full min-h-0 flex-col">
//           {/* Sidebar Header - Logo Area */}
//           <div className="flex items-center justify-between p-4 border-b border-white/20">
//             {(sidebarOpen || isExpanded) ? (
//               <>
//                 <Link href="/dashboard" className="flex items-center gap-2">
//                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
//                     <img
//                       src="/logo.png"
//                       alt="HausArabia Logo"
//                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
//                     />
//                   </div>
//                   <span className="text-xl font-bold" style={{ color: "#158a6a" }}>
//                     HAUSA<span className="text-amber-400 text-xl font-bold">ARABIA</span>
//                   </span>
//                 </Link>
//                 <button
//                   onClick={() => setSidebarOpen(false)}
//                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </button>
//               </>
//             ) : (
//               <>
//                 <Link href="/dashboard" className="flex items-center justify-center w-full">
//                   <div className="flex-shrink-0 overflow-hidden rounded-xl">
//                     <img
//                       src="/logo.png"
//                       alt="HausArabia Logo"
//                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
//                     />
//                     </div>
//                 </Link>
//                 <button
//                   onClick={() => setSidebarOpen(true)}
//                   className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
//                 >
//                 </button>
//               </>
//             )}
//             {/* Mobile close button */}
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="rounded-lg p-1 text-white/60 hover:text-white lg:hidden"
//             >
//               <X className="h-6 w-6" />
//             </button>
//           </div>

//           {/* User Info - Condensed when collapsed */}
//           <div className="border-b border-white/20 p-4">
//             <div className={`flex items-center gap-3 ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}`}>
//               <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
//                 <span className="text-lg font-bold text-amber-300">
//                   {initials}
//                 </span>
//               </div>
//               {(sidebarOpen || isExpanded) && (
//                 <div className="overflow-hidden">
//                   <p className="font-medium text-white truncate">{firstName}</p>
//                   <p className="text-xs text-amber-300/70 flex items-center gap-1">
//                     <Flame className="h-3 w-3" />
//                     5 day streak
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Scrollable navigation area
//               On short/mobile screens this section scrolls so every link remains reachable. */}
//           <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-y-visible">
//             <nav className="space-y-1">
//               {navItems.map((item) => {
//                 const Icon = item.icon;
//                 const isActive = pathname === item.href;
//                 return (
//                   <Link
//                     key={item.href}
//                     href={item.href}
//                     onClick={() => setSidebarOpen(false)}
//                     className={`
//                       flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all
//                       ${isActive
//                         ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
//                         : 'text-white/70 hover:bg-white/10 hover:text-white'
//                       }
//                       ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
//                     `}
//                     title={!(sidebarOpen || isExpanded) ? item.label : ''}
//                   >
//                     <Icon className="h-5 w-5 flex-shrink-0" />
//                     {(sidebarOpen || isExpanded) && (
//                       <span className="overflow-hidden whitespace-nowrap">{item.label}</span>
//                     )}
//                     {isActive && (sidebarOpen || isExpanded) && (
//                       <ChevronRight className="ml-auto h-4 w-4" />
//                     )}
//                   </Link>
//                 );
//               })}
//             </nav>

//             {/* Support Us */}
//             <div className="mt-3 border-t border-white/20 pt-3">
//               <Link
//                 href="/dashboard/donate"
//                 onClick={() => setSidebarOpen(false)}
//                 className={`
//                   flex items-center gap-3 rounded-xl border border-rose-300/15
//                   bg-rose-400/10 px-3 py-3 text-sm font-semibold text-rose-100
//                   transition-all hover:bg-rose-400/15 hover:text-white
//                   ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
//                 `}
//                 title={!(sidebarOpen || isExpanded) ? 'Support Us' : ''}
//               >
//                 <Heart className="h-5 w-5 flex-shrink-0 text-rose-300" />
//                 {(sidebarOpen || isExpanded) && (
//                   <span className="overflow-hidden whitespace-nowrap">Support Us</span>
//                 )}
//                 {(sidebarOpen || isExpanded) && (
//                   <ChevronRight className="ml-auto h-4 w-4 text-rose-200/60" />
//                 )}
//               </Link>
//             </div>

//             {/* Premium */}
//             {!user?.hasPremium && (
//               <div className="mt-3 border-t border-white/20 pt-3">
//                 <Link
//                   href="/dashboard/subscription"
//                   onClick={() => setSidebarOpen(false)}
//                   className={`
//                     flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg
//                     ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
//                   `}
//                   title={!(sidebarOpen || isExpanded) ? 'Upgrade to Premium' : ''}
//                 >
//                   <Sparkles className="h-4 w-4 flex-shrink-0" />
//                   {(sidebarOpen || isExpanded) && (
//                     <span className="overflow-hidden whitespace-nowrap">Upgrade to Premium</span>
//                   )}
//                   {(sidebarOpen || isExpanded) && (
//                     <ChevronRight className="ml-auto h-4 w-4" />
//                   )}
//                 </Link>
//               </div>
//             )}
//           </div>

//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className={`transition-all duration-300 ${sidebarOpen || isHovered ? 'lg:pl-72' : 'lg:pl-20'}`}>
//         {/* Top Navbar */}
//         <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-md border-b border-white/10">
//           <div className="flex h-16 items-center justify-between px-4 lg:px-8">
//             <div className="flex items-center gap-3">
//               {/* Mobile menu button */}
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
//               >
//                 <Menu className="h-6 w-6" />
//               </button>

//               {/* Logo on navbar when sidebar is collapsed on desktop */}
//               <div className="hidden lg:flex items-center gap-2">
//                 <div className="flex-shrink-0 overflow-hidden rounded-xl">
//                     <img
//                       src="/logo.png"
//                       alt="HausArabia Logo"
//                       className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
//                     />
//                   </div>
//                 {(sidebarOpen || isHovered) ? null : (
//                   <span className="text-lg font-bold" style={{ color: "#158a6a" }}>
//                     HAUSA<span className="text-amber-400">ARABIA</span>
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div className="flex items-center gap-1 sm:gap-2">
//               {/* Prayers */}
//               <Link
//                 href="/dashboard/prayers"
//                 aria-label="Prayers"
//                 title="Prayers"
//                 className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
//                   pathname === '/dashboard/prayers'
//                     ? 'border-amber-400/60 bg-amber-400/15 text-amber-300 shadow-sm shadow-amber-500/10'
//                     : 'border-amber-300/25 bg-amber-400/[0.06] text-amber-300 hover:-translate-y-0.5 hover:border-amber-300/55 hover:bg-amber-400/15 hover:text-amber-200'
//                 }`}
//               >
//                 <Heart className="h-5 w-5" />
//               </Link>

//               {/* Account menu */}
//               <div ref={accountMenuRef} className="relative">
//                 <button
//                   type="button"
//                   onClick={() => setAccountMenuOpen((open) => !open)}
//                   aria-label="Account menu"
//                   aria-expanded={accountMenuOpen}
//                   title="Account"
//                   className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
//                     accountMenuOpen
//                       ? 'border-sky-300/60 bg-sky-400/15 text-sky-200 shadow-sm shadow-sky-500/10'
//                       : 'border-sky-300/25 bg-sky-400/[0.06] text-sky-300 hover:-translate-y-0.5 hover:border-sky-300/55 hover:bg-sky-400/15 hover:text-sky-200'
//                   }`}
//                 >
//                   <span className="text-xs font-bold tracking-wide">{initials}</span>
//                 </button>

//                 {accountMenuOpen && (
//                   <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl bg-emerald-950/95 p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
//                     <div className="px-3 py-2">
//                       <p className="truncate text-sm font-semibold text-white">
//                         {firstName}
//                       </p>
//                       <p className="mt-0.5 text-xs text-white/40">Signed in</p>
//                     </div>

//                     <div className="my-1 h-px bg-white/10" />

//                     <Link
//                       href="/dashboard/profile"
//                       onClick={() => setAccountMenuOpen(false)}
//                       className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
//                     >
//                       <User className="h-4 w-4" />
//                       Profile
//                     </Link>

//                     <button
//                       type="button"
//                       onClick={() => {
//                         setAccountMenuOpen(false);
//                         logout();
//                       }}
//                       className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-red-400/10 hover:text-red-300"
//                     >
//                       <LogOut className="h-4 w-4" />
//                       Log out
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </header>

//         <main className="relative z-10 px-4 py-6 lg:px-8 lg:py-8 max-w-7xl mx-auto w-full">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }



'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { createClient } from '@/lib/supabase/client';
import {
  Menu,
  X,
  Home,
  BookOpen,
  GraduationCap,
  Trophy,
  User,
  LogOut,
  ChevronRight,
  ChevronLeft,
  Flame,
  Sparkles,
  Languages,
  Heart,
  Users,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/lessons', label: 'Lessons', icon: BookOpen },
  { href: '/dashboard/learn', label: 'HausaArabia Learn', icon: GraduationCap },
  { href: '/dashboard/progress', label: 'Progress', icon: Trophy },
  { href: '/dashboard/translator', label: 'Translator', icon: Languages },
  { href: '/dashboard/community', label: 'Community', icon: Users },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [profileFullName, setProfileFullName] = useState('');
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadProfileName() {
      const supabase = createClient();

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        if (!cancelled) {
          setProfileFullName(user?.displayName?.trim() || '');
        }
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', authUser.id)
        .maybeSingle();

      const name =
        profile?.full_name?.trim() ||
        authUser.user_metadata?.full_name?.trim() ||
        user?.displayName?.trim() ||
        '';

      if (!cancelled) {
        setProfileFullName(name);
      }
    }

    void loadProfileName();

    return () => {
      cancelled = true;
    };
  }, [user?.displayName]);

  const resolvedFullName =
    profileFullName ||
    user?.displayName?.trim() ||
    user?.email?.split('@')[0] ||
    'User';

  const nameParts = resolvedFullName
    .split(/\s+/)
    .map((part) => part.trim())
    .filter(Boolean);

  const firstName = nameParts[0] || 'User';
  const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : '';

  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';

  useEffect(() => {
    if (!accountMenuOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;

      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(target)
      ) {
        setAccountMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [accountMenuOpen]);

  useEffect(() => {
    setAccountMenuOpen(false);
  }, [pathname]);

  // Sidebar is collapsed by default on desktop (width: 80px)
  // When hovered or open state is true, it expands to 280px
  const isExpanded = sidebarOpen || isHovered;

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-900">
        <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* GOLD GRID BACKGROUND */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundColor: '#064E3B',
          backgroundImage: `
            linear-gradient(rgba(212,175,55,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(212,175,55,0.12) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
        }}
      />

      {/* Decorative glow */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-amber-400 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-yellow-500 blur-3xl" />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Collapsible on desktop */}
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          fixed left-0 top-0 z-50 h-dvh overflow-hidden 
          bg-white/10 backdrop-blur-xl 
          border-r border-white/20 shadow-2xl 
          transition-all duration-300 ease-in-out
          ${sidebarOpen ? 'w-72' : isExpanded ? 'w-72' : 'w-20'}
          lg:block
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex h-full min-h-0 flex-col">
          {/* Sidebar Header - Logo Area */}
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            {(sidebarOpen || isExpanded) ? (
              <>
                <Link href="/dashboard" className="flex items-center gap-2">
                  <div className="flex-shrink-0 overflow-hidden rounded-xl">
                    <img
                      src="/logo.png"
                      alt="HausArabia Logo"
                      className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
                    />
                  </div>
                  <span className="text-xl font-bold" style={{ color: "#158a6a" }}>
                    HAUSA<span className="text-amber-400 text-xl font-bold">ARABIA</span>
                  </span>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              </>
            ) : (
              <>
                <Link href="/dashboard" className="flex items-center justify-center w-full">
                  <div className="flex-shrink-0 overflow-hidden rounded-xl">
                    <img
                      src="/logo.png"
                      alt="HausArabia Logo"
                      className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
                    />
                    </div>
                </Link>
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="rounded-lg p-1 text-white/60 hover:text-white hidden lg:block"
                >
                </button>
              </>
            )}
            {/* Mobile close button */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="rounded-lg p-1 text-white/60 hover:text-white lg:hidden"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* User Info - Condensed when collapsed */}
          <div className="border-b border-white/20 p-4">
            <div className={`flex items-center gap-3 ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}`}>
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-amber-400/20 border border-amber-400/50">
                <span className="text-lg font-bold text-amber-300">
                  {initials}
                </span>
              </div>
              {(sidebarOpen || isExpanded) && (
                <div className="overflow-hidden">
                  <p className="font-medium text-white truncate">{firstName}</p>
                  <p className="text-xs text-amber-300/70 flex items-center gap-1">
                    <Flame className="h-3 w-3" />
                    5 day streak
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Scrollable navigation area
              On short/mobile screens this section scrolls so every link remains reachable. */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-3 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:overflow-y-visible">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all
                      ${isActive
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                      }
                      ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
                    `}
                    title={!(sidebarOpen || isExpanded) ? item.label : ''}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {(sidebarOpen || isExpanded) && (
                      <span className="overflow-hidden whitespace-nowrap">{item.label}</span>
                    )}
                    {isActive && (sidebarOpen || isExpanded) && (
                      <ChevronRight className="ml-auto h-4 w-4" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Support Us */}
            <div className="mt-3 border-t border-white/20 pt-3">
              <Link
                href="/dashboard/donate"
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 rounded-xl border border-rose-300/15
                  bg-rose-400/10 px-3 py-3 text-sm font-semibold text-rose-100
                  transition-all hover:bg-rose-400/15 hover:text-white
                  ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
                `}
                title={!(sidebarOpen || isExpanded) ? 'Support Us' : ''}
              >
                <Heart className="h-5 w-5 flex-shrink-0 text-rose-300" />
                {(sidebarOpen || isExpanded) && (
                  <span className="overflow-hidden whitespace-nowrap">Support Us</span>
                )}
                {(sidebarOpen || isExpanded) && (
                  <ChevronRight className="ml-auto h-4 w-4 text-rose-200/60" />
                )}
              </Link>
            </div>

            {/* Premium */}
            {!user?.hasPremium && (
              <div className="mt-3 border-t border-white/20 pt-3">
                <Link
                  href="/dashboard/subscription"
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-3 text-sm font-semibold text-white transition-all hover:shadow-lg
                    ${!(sidebarOpen || isExpanded) ? 'justify-center' : ''}
                  `}
                  title={!(sidebarOpen || isExpanded) ? 'Upgrade to Premium' : ''}
                >
                  <Sparkles className="h-4 w-4 flex-shrink-0" />
                  {(sidebarOpen || isExpanded) && (
                    <span className="overflow-hidden whitespace-nowrap">Upgrade to Premium</span>
                  )}
                  {(sidebarOpen || isExpanded) && (
                    <ChevronRight className="ml-auto h-4 w-4" />
                  )}
                </Link>
              </div>
            )}
          </div>

        </div>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarOpen || isHovered ? 'lg:pl-72' : 'lg:pl-20'}`}>
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 bg-white/5 backdrop-blur-md border-b border-white/10">
          <div className="flex h-16 items-center justify-between px-4 lg:px-8">
            <div className="flex items-center gap-3">
              {/* Mobile menu button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="rounded-lg p-2 text-white/60 hover:bg-white/10 hover:text-white lg:hidden"
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* Logo on navbar when sidebar is collapsed on desktop */}
              <div className="hidden lg:flex items-center gap-2">
                <div className="flex-shrink-0 overflow-hidden rounded-xl">
                    <img
                      src="/logo.png"
                      alt="HausArabia Logo"
                      className="h-14 w-14 object-cover sm:h-10 sm:w-10 md:h-10 md:w-10"
                    />
                  </div>
                {(sidebarOpen || isHovered) ? null : (
                  <span className="text-lg font-bold" style={{ color: "#158a6a" }}>
                    HAUSA<span className="text-amber-400">ARABIA</span>
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              {/* Prayers */}
              <Link
                href="/dashboard/prayers"
                aria-label="Prayers"
                title="Prayers"
                className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
                  pathname === '/dashboard/prayers'
                    ? 'border-amber-400/60 bg-amber-400/15 text-amber-300 shadow-sm shadow-amber-500/10'
                    : 'border-amber-300/25 bg-amber-400/[0.06] text-amber-300 hover:-translate-y-0.5 hover:border-amber-300/55 hover:bg-amber-400/15 hover:text-amber-200'
                }`}
              >
                <span aria-hidden="true" className="text-xl leading-none">🙏</span>
              </Link>

              {/* Account menu */}
              <div ref={accountMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setAccountMenuOpen((open) => !open)}
                  aria-label="Account menu"
                  aria-expanded={accountMenuOpen}
                  title="Account"
                  className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${
                    accountMenuOpen
                      ? 'border-sky-300/60 bg-sky-400/15 text-sky-200 shadow-sm shadow-sky-500/10'
                      : 'border-sky-300/25 bg-sky-400/[0.06] text-sky-300 hover:-translate-y-0.5 hover:border-sky-300/55 hover:bg-sky-400/15 hover:text-sky-200'
                  }`}
                >
                  <span className="text-xs font-bold tracking-wide">{initials}</span>
                </button>

                {accountMenuOpen && (
                  <div className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl bg-emerald-950/95 p-2 shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
                    <div className="px-3 py-2">
                      <p className="truncate text-sm font-semibold text-white">
                        {firstName}
                      </p>
                      <p className="mt-0.5 text-xs text-white/40">Signed in</p>
                    </div>

                    <div className="my-1 h-px bg-white/10" />

                    <Link
                      href="/dashboard/profile"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        setAccountMenuOpen(false);
                        logout();
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/70 transition hover:bg-red-400/10 hover:text-red-300"
                    >
                      <LogOut className="h-4 w-4" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="relative z-10 px-4 py-6 lg:px-8 lg:py-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
