import Link from "next/link";

export default function DonateCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-grey dark:bg-darkmode px-4">
      <div className="max-w-md w-full text-center bg-white dark:bg-dark_card rounded-2xl shadow-xl p-10">
        <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#f59e0b" opacity="0.2"/>
            <path d="M12 8v4M12 16h.01" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-midnight_text dark:text-white mb-3">
          Payment Cancelled
        </h1>
        <p className="text-muted dark:text-white/60 mb-8">
          No worries — your payment was cancelled and you have not been charged. You can try again whenever you&apos;re ready.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="bg-primary text-white font-semibold px-8 py-3 rounded-lg hover:opacity-90 transition"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="border border-border dark:border-dark_border text-midnight_text dark:text-white font-semibold px-8 py-3 rounded-lg hover:border-primary hover:text-primary transition"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
