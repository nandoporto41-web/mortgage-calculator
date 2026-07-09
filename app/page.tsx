// ===============================
// app/page.tsx
// PARTE 1/5
// ===============================

"use client";

import { useMemo, useState } from "react";
import Script from "next/script";

function currency(v: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(v);
}

function mortgagePayment(
  principal: number,
  annualRate: number,
  years: number
) {
  const monthlyRate = annualRate / 100 / 12;
  const totalPayments = years * 12;

  if (monthlyRate === 0) {
    return principal / totalPayments;
  }

  return (
    principal *
    ((monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1))
  );
}

export default function Home() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanYears, setLoanYears] = useState(30);
  const [propertyTax, setPropertyTax] = useState(4200);
  const [insurance, setInsurance] = useState(1800);
  const [hoa, setHoa] = useState(0);
  const [pmi, setPmi] = useState(120);

  const loanAmount = Math.max(homePrice - downPayment, 0);

  const principalInterest = useMemo(() => {
    return mortgagePayment(
      loanAmount,
      interestRate,
      loanYears
    );
  }, [loanAmount, interestRate, loanYears]);

  const monthlyTax = propertyTax / 12;
  const monthlyInsurance = insurance / 12;

  const totalMonthly =
    principalInterest +
    monthlyTax +
    monthlyInsurance +
    hoa +
    pmi;

  const totalInterest =
    principalInterest * loanYears * 12 - loanAmount;

  const totalPaid =
    totalMonthly * loanYears * 12;

  const downPercent =
    (downPayment / homePrice) * 100;

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">

      {/* Monetag Social Bar */}

      <Script id="monetag-social">
        {`
(function(s){
s.dataset.zone='11259483';
s.src='https://nap5k.com/tag.min.js';
document.body.appendChild(s);
})(document.createElement('script'));
`}
      </Script>

      {/* Monetag Vignette */}

      <Script id="monetag-vignette">
        {`
(function(s){
s.dataset.zone='11259478';
s.src='https://n6wxm.com/vignette.min.js';
document.body.appendChild(s);
})(document.createElement('script'));
`}
      </Script>

      <section className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white">

        <div className="max-w-7xl mx-auto px-6 py-20">

          <h1 className="text-5xl font-black leading-tight">
            US Mortgage Calculator
          </h1>

          <p className="mt-5 text-xl text-blue-100 max-w-2xl">
            Calculate mortgage payments,
            taxes, insurance,
            HOA fees and PMI instantly.
          </p>

          <div className="flex gap-4 mt-8">

            <button
              onClick={() =>
                window.scrollTo({
                  top: 520,
                  behavior: "smooth",
                })
              }
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-bold"
            >
              Calculate Now
            </button>

            <button
              className="border border-white px-8 py-4 rounded-xl"
            >
              Learn More
            </button>

          </div>

        </div>

      </section>

      <main className="max-w-7xl mx-auto px-6 -mt-12 pb-20">

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="grid lg:grid-cols-2 gap-10">

            <div>

              <h2 className="text-3xl font-bold mb-8">
                Loan Details
              </h2>
              <label className="block font-semibold mb-2">
                Home Price
              </label>

              <input
                type="range"
                min={50000}
                max={2000000}
                step={5000}
                value={homePrice}
                onChange={(e)=>setHomePrice(Number(e.target.value))}
                className="w-full accent-blue-600"
              />

              <input
                type="number"
                value={homePrice}
                onChange={(e)=>setHomePrice(Number(e.target.value))}
                className="w-full border rounded-xl p-3 mt-3 mb-6"
              />

              <label className="block font-semibold mb-2">
                Down Payment
              </label>

              <input
                type="range"
                min={0}
                max={homePrice}
                step={1000}
                value={downPayment}
                onChange={(e)=>setDownPayment(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />

              <input
                type="number"
                value={downPayment}
                onChange={(e)=>
                  setDownPayment(
                    Math.min(Number(e.target.value),homePrice)
                  )
                }
                className="w-full border rounded-xl p-3 mt-3 mb-5"
              />

              <div className="mb-8">

                <div className="flex justify-between mb-2 text-sm">
                  <span>Down Payment</span>
                  <span>{downPercent.toFixed(1)}%</span>
                </div>

                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-emerald-500"
                    style={{
                      width:`${downPercent}%`
                    }}
                  />

                </div>

              </div>

              <label className="block font-semibold mb-2">
                Interest Rate (%)
              </label>

              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e)=>setInterestRate(Number(e.target.value))}
                className="w-full border rounded-xl p-3 mb-6"
              />

              <label className="block font-semibold mb-2">
                Loan Term
              </label>

              <select
                value={loanYears}
                onChange={(e)=>setLoanYears(Number(e.target.value))}
                className="w-full border rounded-xl p-3 mb-6"
              >
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={30}>30 Years</option>
              </select>

              <label className="block font-semibold mb-2">
                Property Tax (Yearly)
              </label>

              <input
                type="number"
                value={propertyTax}
                onChange={(e)=>setPropertyTax(Number(e.target.value))}
                className="w-full border rounded-xl p-3 mb-6"
              />

              <label className="block font-semibold mb-2">
                Home Insurance (Yearly)
              </label>

              <input
                type="number"
                value={insurance}
                onChange={(e)=>setInsurance(Number(e.target.value))}
                className="w-full border rounded-xl p-3 mb-6"
              />

              <label className="block font-semibold mb-2">
                HOA (Monthly)
              </label>

              <input
                type="number"
                value={hoa}
                onChange={(e)=>setHoa(Number(e.target.value))}
                className="w-full border rounded-xl p-3 mb-6"
              />

              <label className="block font-semibold mb-2">
                PMI (Monthly)
              </label>

              <input
                type="number"
                value={pmi}
                onChange={(e)=>setPmi(Number(e.target.value))}
                className="w-full border rounded-xl p-3"
              />

            </div>

            <div>

              <div className="bg-slate-900 rounded-3xl text-white p-8">

                <h2 className="text-3xl font-bold">
                  Monthly Payment
                </h2>

                <div className="text-6xl font-black text-emerald-400 mt-6">
                  {currency(totalMonthly)}
                </div>
                <div className="mt-10 space-y-5">

                  <div className="flex justify-between border-b border-slate-700 pb-3">
                    <span>Loan Amount</span>
                    <strong>{currency(loanAmount)}</strong>
                  </div>

                  <div className="flex justify-between border-b border-slate-700 pb-3">
                    <span>Principal & Interest</span>
                    <strong>{currency(principalInterest)}</strong>
                  </div>

                  <div className="flex justify-between border-b border-slate-700 pb-3">
                    <span>Property Tax</span>
                    <strong>{currency(monthlyTax)}</strong>
                  </div>

                  <div className="flex justify-between border-b border-slate-700 pb-3">
                    <span>Insurance</span>
                    <strong>{currency(monthlyInsurance)}</strong>
                  </div>

                  <div className="flex justify-between border-b border-slate-700 pb-3">
                    <span>HOA</span>
                    <strong>{currency(hoa)}</strong>
                  </div>

                  <div className="flex justify-between border-b border-slate-700 pb-3">
                    <span>PMI</span>
                    <strong>{currency(pmi)}</strong>
                  </div>

                  <div className="flex justify-between text-emerald-400 text-xl font-bold pt-4">
                    <span>Total Monthly</span>
                    <span>{currency(totalMonthly)}</span>
                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4 mt-10">

                  <button
                    className="bg-blue-600 hover:bg-blue-700 transition rounded-xl py-4 font-bold"
                  >
                    Calculate
                  </button>

                  <button
                    onClick={()=>{
                      setHomePrice(400000);
                      setDownPayment(80000);
                      setInterestRate(6.5);
                      setLoanYears(30);
                      setPropertyTax(4200);
                      setInsurance(1800);
                      setHoa(0);
                      setPmi(120);
                    }}
                    className="bg-slate-700 hover:bg-slate-600 transition rounded-xl py-4 font-bold"
                  >
                    Reset
                  </button>

                </div>

              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="bg-white rounded-2xl border p-5 shadow-sm">
                  <p className="text-slate-500 text-sm">
                    Total Interest
                  </p>

                  <h3 className="text-2xl font-bold mt-2">
                    {currency(totalInterest)}
                  </h3>
                </div>

                <div className="bg-white rounded-2xl border p-5 shadow-sm">
                  <p className="text-slate-500 text-sm">
                    Total Paid
                  </p>

                  <h3 className="text-2xl font-bold mt-2">
                    {currency(totalPaid)}
                  </h3>
                </div>

              </div>

              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 mt-6">

                <h3 className="text-xl font-bold">
                  Buying Power
                </h3>

                <p className="mt-3 text-blue-100">
                  This estimate includes mortgage,
                  taxes, insurance, HOA and PMI,
                  giving a realistic monthly payment.
                </p>

              </div>

            </div>

          </div>

          <div className="my-10 rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center">

            <h3 className="font-bold text-xl">
              Advertisement
            </h3>

            <p className="text-slate-500 mt-2">
              Sponsored content will appear here.
            </p>

          </div>
          <section className="mt-14">

            <h2 className="text-3xl font-bold mb-8">
              Frequently Asked Questions
            </h2>

            <div className="space-y-5">

              <div className="border rounded-2xl p-6">
                <h3 className="font-bold text-lg">
                  How is my monthly payment calculated?
                </h3>

                <p className="text-slate-600 mt-3 leading-7">
                  The calculator uses the standard U.S. mortgage
                  amortization formula and includes principal,
                  interest, property taxes, homeowners insurance,
                  HOA fees and PMI.
                </p>
              </div>

              <div className="border rounded-2xl p-6">
                <h3 className="font-bold text-lg">
                  Are these results accurate?
                </h3>

                <p className="text-slate-600 mt-3 leading-7">
                  Results are estimates based on the values entered.
                  Your lender may quote different numbers depending
                  on taxes, insurance, loan program and credit score.
                </p>
              </div>

              <div className="border rounded-2xl p-6">
                <h3 className="font-bold text-lg">
                  Can I use this calculator for refinancing?
                </h3>

                <p className="text-slate-600 mt-3 leading-7">
                  Yes. Simply enter your remaining loan balance,
                  interest rate and new loan term to estimate your
                  refinance payment.
                </p>
              </div>

              <div className="border rounded-2xl p-6">
                <h3 className="font-bold text-lg">
                  Does this calculator include PMI?
                </h3>

                <p className="text-slate-600 mt-3 leading-7">
                  Yes. PMI can be entered as a monthly amount and is
                  added to your estimated monthly payment.
                </p>
              </div>

            </div>

          </section>

          <section className="mt-16 rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-10">

            <div className="max-w-3xl">

              <h2 className="text-4xl font-black">
                Plan Your Home Purchase With Confidence
              </h2>

              <p className="mt-5 text-blue-100 leading-8">
                Compare different loan amounts, interest rates and
                down payments to discover the mortgage that best fits
                your budget before talking to a lender.
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
                Start Another Calculation
              </button>

            </div>

          </section>
          <footer className="mt-16 border-t pt-10">

            <div className="grid md:grid-cols-3 gap-8">

              <div>

                <h3 className="font-bold text-lg">
                  US Mortgage Calculator
                </h3>

                <p className="text-slate-500 mt-3 leading-7">
                  Free mortgage payment calculator for home buyers
                  across the United States.
                </p>

              </div>

              <div>

                <h3 className="font-bold text-lg">
                  Popular Tools
                </h3>

                <ul className="mt-3 space-y-2 text-slate-500">

                  <li>Mortgage Calculator</li>
                  <li>Refinance Calculator</li>
                  <li>Affordability Calculator</li>
                  <li>Rent vs Buy Calculator</li>

                </ul>

              </div>

              <div>

                <h3 className="font-bold text-lg">
                  Disclaimer
                </h3>

                <p className="text-slate-500 mt-3 leading-7">
                  Estimates are provided for educational purposes only
                  and should not be considered financial advice.
                </p>

              </div>

            </div>

            <div className="border-t mt-10 pt-6 text-center text-slate-500">

              © {new Date().getFullYear()} US Mortgage Calculator.
              All rights reserved.

            </div>

          </footer>

        </div>

      </main>

    </div>
  );
}
