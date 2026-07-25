export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-4xl overflow-hidden text-white">
      <div>
        <div className="flex flex-col flex-wrap justify-center gap-10 px-4 py-10 text-center sm:flex-row sm:px-6 sm:text-left">
          <div>
            <h1 className="text-lg font-semibold">MY Movie APP</h1>
            <p className="mt-2 text-sm text-slate-300">Nairobi, Kenya</p>
            <p className="text-sm text-slate-300">Contact: info@moviapp.com</p>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Legal</h1>
            <p className="mt-2 text-sm text-slate-300">Privacy Policy</p>
            <p className="text-sm text-slate-300">Terms of Service</p>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Follow Us</h1>
            <p className="mt-2 text-sm text-slate-300">Facebook</p>
            <p className="text-sm text-slate-300">Twitter</p>
            <p className="text-sm text-slate-300">Instagram</p>
          </div>
          <div>
            <h1 className="text-lg font-semibold">Newsletter</h1>
            <p className="mt-2 text-sm text-slate-300">
              Subscribe to our newsletter for the latest updates.
            </p>
            <div className="mt-3 flex flex-col justify-center gap-2 sm:flex-row sm:justify-start">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border border-white/10 bg-black/40 px-3 py-2 text-sm text-white placeholder:text-slate-400 outline-none sm:w-auto focus:border-white/30"
              />
              <button className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-4xl border-t border-white/10 px-4 pb-8 pt-6 text-center sm:px-6">
          <p className="text-sm text-slate-400">
            &copy; {new Date().getFullYear()} Movie App. All rights reserved.
          </p>
          <button className="mt-2 text-sm text-slate-300 underline underline-offset-4 hover:text-white">
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
}
