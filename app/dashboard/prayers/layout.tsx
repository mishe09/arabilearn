// app/dashboard/prayers/layout.tsx

export default function PrayersLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {children}
    </div>
  );
}
