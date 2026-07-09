"use client";

import { useMemo, useState } from "react";
import Script from "next/script";

const money = (v: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);

function mortgage(
  principal: number,
  rate: number,
  years: number
) {
  const r = rate / 100 / 12;
  const n = years * 12;

  if (r === 0) return principal / n;

  return (
    principal *
    ((r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1))
  );
}

export default function Home() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanYears, setLoanYears] = useState(30);
  const [propertyTax, setPropertyTax] = useState(4200);
  const [insurance, setInsurance] = useState(1500);
  const [hoa, setHoa] = useState(0);
  const [pmi, setPmi] = useState(120);

  // Estados para controlar a abertura dos modais institucionais
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const loanAmount = Math.max(
    homePrice - downPayment,
    0
  );

  const principalInterest = useMemo(
    () =>
      mortgage(
        loanAmount,
        interestRate,
        loanYears
      ),
    [loanAmount, interestRate, loanYears]
  );

  const monthlyTax = propertyTax / 12;
  const monthlyInsurance = insurance / 12;

  const total =
    principalInterest +
    monthlyTax +
    monthlyInsurance +
    hoa +
    pmi;

  const downPercent = Math.min(
    (downPayment / homePrice) * 100,
    100
  );

  return (
    <div className="min-h-screen bg-slate-100">

      {/* SCRIPT CORRIGIDO DE VERIFICAÇÃO DO GOOGLE ADSENSE */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1156108807705161"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      <Script
        src="https://5gvci.com/act/files/tag.min.js?z=11258998"
        strategy="afterInteractive"
      />

      <Script
        src="https://omg10.com/4/11259367"
        strategy="lazyOnload"
      />

      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

        <div className="max-w-6xl mx-auto px-6 py-14">

          <h1 className="text-5xl font-black">
            US Mortgage Calculator
          </h1>

          <p className="mt-4 text-lg text-blue-100 max-w-2xl">
            Calculate your monthly mortgage payment,
            taxes, insurance, HOA and PMI in seconds.
          </p>

          <button
            className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
            onClick={() =>
              window.scrollTo({
                top: 450,
                behavior: "smooth",
              })
            }
          >
            Calculate Now
          </button>

        </div>

      </section>

      <main className="max-w-6xl mx-auto p-6 -mt-10">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="grid lg:grid-cols-2 gap-8">

            <div>

              <h2 className="text-2xl font-bold mb-6">
                Loan Information
              </h2>

              <label className="font-semibold">
                Home Price
              </label>

              <input
                type="range"
                min={50000}
                max={2000000}
                step={5000}
                value={homePrice}
                onChange={(e) =>
                  setHomePrice(Number(e.target.value))
                }
                className="w-full mt-2"
              />

              <input
                type="number"
                value={homePrice}
                onChange={(e)=>
                  setHomePrice(Number(e.target.value))
                }
                className="w-full border rounded-xl p-3 mt-2 mb-6"
              />
              <label className="font-semibold">
                Down Payment
              </label>

              <input
                type="range"
                min={0}
                max={homePrice}
                step={1000}
                value={downPayment}
                onChange={(e) =>
                  setDownPayment(Number(e.target.value))
                }
                className="w-full mt-2"
              />

              <input
                type="number"
                value={downPayment}
                onChange={(e) =>
                  setDownPayment(
                    Math.min(Number(e.target.value), homePrice)
                  )
                }
                className="w-full border rounded-xl p-3 mt-2 mb-6"
              />

              <div className="mb-6">

                <div className="flex justify-between text-sm mb-2">
                  <span>Down Payment</span>
                  <span>{downPercent.toFixed(1)}%</span>
                </div>

                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${downPercent}%` }}
                  />
                </div>

              </div>

              <label className="font-semibold">
                Interest Rate (%)
              </label>

              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) =>
                  setInterestRate(Number(e.target.value))
                }
                className="w-full border rounded-xl p-3 mt-2 mb-6"
              />

              <label className="font-semibold">
                Loan Term
              </label>

              <select
                value={loanYears}
                onChange={(e) =>
                  setLoanYears(Number(e.target.value))
                }
                className="w-full border rounded-xl p-3 mt-2 mb-6"
              >
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={30}>30 Years</option>
              </select>

              <label className="font-semibold">
                Property Tax (Yearly)
              </label>

              <input
                type="number"
                value={propertyTax}
                onChange={(e) =>
                  setPropertyTax(Number(e.target.value))
                }
                className="w-full border rounded-xl p-3 mt-2 mb-6"
              />

              <label className="font-semibold">
                Home Insurance (Yearly)
              </label>

              <input
                type="number"
                value={insurance}
                onChange={(e) =>
                  setInsurance(Number(e.target.value))
                }
                className="w-full border rounded-xl p-3 mt-2 mb-6"
              />

              <label className="font-semibold">
                HOA (Monthly)
              </label>

              <input
                type="number"
                value={hoa}
                onChange={(e) =>
                  setHoa(Number(e.target.value))
                }
                className="w-full border rounded-xl p-3 mt-2 mb-6"
              />

              <label className="font-semibold">
                PMI (Monthly)
              </label>

              <input
                type="number"
                value={pmi}
                onChange={(e) =>
                  setPmi(Number(e.target.value))
                }
                className="w-full border rounded-xl p-3 mt-2"
              />

            </div>

            <div>

              <div className="bg-slate-900 rounded-3xl p-8 text-white">

                <h2 className="text-2xl font-bold mb-6">
                  Monthly Payment
                </h2>

                <div className="text-5xl font-black text-emerald-400">
                  {money(total)}
                </div>

                <div className="mt-8 space-y-4">

                  <div className="flex justify-between">
                    <span>Loan Amount</span>
                    <strong>{money(loanAmount)}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Principal & Interest</span>
                    <strong>{money(principalInterest)}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Property Tax</span>
                    <strong>{money(monthlyTax)}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>Insurance</span>
                    <strong>{money(monthlyInsurance)}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>HOA</span>
                    <strong>{money(hoa)}</strong>
                  </div>

                  <div className="flex justify-between">
                    <span>PMI</span>
                    <strong>{money(pmi)}</strong>
                  </div>

                </div>

                <div className="grid grid-cols-2 gap-3 mt-8">

                  <button
                    className="bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-bold"
                  >
                    Calculate
                  </button>

                  <button
                    onClick={() => {
                      setHomePrice(400000);
                      setDownPayment(80000);
                      setInterestRate(6.5);
                      setLoanYears(30);
                      setPropertyTax(4200);
                      setInsurance(1500);
                      setHoa(0);
                      setPmi(120);
                    }}
                    className="bg-slate-700 hover:bg-slate-600 rounded-xl py-3 font-bold"
                  >
                    Reset
                  </button>

                </div>

              </div>
            </div>

          </div>

          {/* Ad Space */}
          <div className="my-10 rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center bg-slate-50">
            <p className="text-slate-500 font-semibold">
              Advertisement
            </p>
            <div id="ad-container" className="mt-4 min-h-[120px]" />
          </div>

          {/* FAQ */}

          <section className="mt-12">

            <h2 className="text-3xl font-bold mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">

              <div className="border rounded-2xl p-5">
                <h3 className="font-bold text-lg">
                  How is my mortgage payment calculated?
                </h3>

                <p className="text-slate-600 mt-2 leading-7">
                  We use the standard mortgage amortization formula used
                  by banks across the United States.
                </p>
              </div>

              <div className="border rounded-2xl p-5">
                <h3 className="font-bold text-lg">
                  Does this include taxes?
                </h3>

                <p className="text-slate-600 mt-2 leading-7">
                  Yes. Property taxes, insurance, HOA fees and PMI are
                  included in the estimated monthly payment.
                </p>
              </div>

              <div className="border rounded-2xl p-5">
                <h3 className="font-bold text-lg">
                  Is this calculator accurate?
                </h3>

                <p className="text-slate-600 mt-2 leading-7">
                  Results are estimates based on your inputs and the
                  standard mortgage formula. Your lender may provide
                  slightly different numbers.
                </p>
              </div>

            </div>

          </section>

          {/* Bottom CTA */}

          <section className="mt-14 rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-10 text-center">

            <h2 className="text-3xl font-black">
              Ready to Buy Your Dream Home?
            </h2>

            <p className="mt-4 text-blue-100 max-w-2xl mx-auto">
              Estimate your monthly payment instantly and plan your
              finances with confidence.
            </p>

            <button
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                })
              }
              className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
            >
              Calculate Again
            </button>

          </section>

          <footer className="mt-14 border-t pt-8 text-center">

            <p className="text-slate-500">
              © {new Date().getFullYear()} US Mortgage Calculator
            </p>

            <p className="text-slate-400 text-sm mt-2">
              Built for home buyers across the United States.
            </p>

            {/* Links Institucionais exigidos pelo Google AdSense */}
            <div className="mt-4 flex justify-center gap-6 text-sm font-semibold text-blue-600">
              <button onClick={() => setShowAbout(true)} className="hover:underline">
                About Us
              </button>
              <span className="text-slate-300">|</span>
              <button onClick={() => setShowPrivacy(true)} className="hover:underline">
                Privacy Policy
              </button>
            </div>

          </footer>

        </div>

      </main>

      {/* Modal - About Us */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <h3 className="text-2xl font-bold mb-4 text-slate-900">About Us</h3>
            <div className="text-slate-600 leading-relaxed space-y-4 text-sm">
              <p>
                Welcome to US Mortgage Calculator. Our mission is to provide home buyers, real estate professionals, and financial planners across the United States with a clean, fast, and accurate tool to estimate monthly housing costs.
              </p>
              <p>
                Unlike other complex platforms, our calculator delivers instant results including critical variables such as Property Taxes, Home Insurance, HOA fees, and Private Mortgage Insurance (PMI)—completely registration-free. We believe in financial transparency and empowering you to make smart real estate decisions.
              </p>
            </div>
            <button 
              onClick={() => setShowAbout(false)}
              className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal - Privacy Policy */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl my-8 relative">
            <h3 className="text-2xl font-bold mb-4 text-slate-900">Privacy Policy</h3>
            <div className="text-slate-600 leading-relaxed space-y-4 text-xs max-h-[60vh] overflow-y-auto pr-2">
              <p>
                At US Mortgage Calculator, accessible from your domain, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by US Mortgage Calculator and how we use it.
              </p>
              <h4 className="font-bold text-slate-800 text-sm mt-2">Log Files & Cookies</h4>
              <p>
                Like many other websites, we use log files and standard cookies to improve user experience. These cookies do not collect personal identifiable information.
              </p>
              <h4 className="font-bold text-slate-800 text-sm mt-2">Google DoubleClick DART Cookie</h4>
              <p>
                Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our website and other sites on the internet.
              </p>
              <h4 className="font-bold text-slate-800 text-sm mt-2">Third-Party Privacy Policies</h4>
              <p>
                US Mortgage Calculator's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.
              </p>
            </div>
            <button 
              onClick={() => setShowPrivacy(false)}
              className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-xl transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>

  );

}
