"use client";

import React, { useMemo, useState } from "react";
import Script from "next/script";

function formatCurrency(value: number) {
  // Tratamento de segurança caso o valor final não seja um número válido
  const safeValue = isNaN(value) || !isFinite(value) ? 0 : value;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(safeValue);
}

function calculateMortgage(
  loanAmount: number,
  annualRate: number,
  years: number
) {
  // Evita quebra caso anos ou taxa sejam apagados ou fiquem zerados
  const safeYears = years || 30;
  const monthlyRate = (annualRate || 0) / 100 / 12;
  const payments = safeYears * 12;

  if (monthlyRate === 0) {
    return loanAmount / payments;
  }

  const payment = 
    (loanAmount *
      (monthlyRate * Math.pow(1 + monthlyRate, payments))) /
    (Math.pow(1 + monthlyRate, payments) - 1);

  return isNaN(payment) || !isFinite(payment) ? 0 : payment;
}

export default function Home() {
  const [homePrice, setHomePrice] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanYears, setLoanYears] = useState(30);

  const [propertyTax, setPropertyTax] = useState(4800);
  const [insurance, setInsurance] = useState(1800);
  const [hoa, setHoa] = useState(0);
  const [pmi, setPmi] = useState(120);

  const loanAmount = Math.max(homePrice - downPayment, 0);

  const principalInterest = useMemo(() => {
    return calculateMortgage(
      loanAmount,
      interestRate,
      loanYears
    );
  }, [loanAmount, interestRate, loanYears]);

  const monthlyTax = (propertyTax || 0) / 12;
  const monthlyInsurance = (insurance || 0) / 12;

  const totalMonthly =
    principalInterest +
    monthlyTax +
    monthlyInsurance +
    (hoa || 0) +
    (pmi || 0);

  return (
    <div className="min-h-screen bg-slate-100">

      <Script
        src="https://5gvci.com/act/files/tag.min.js?z=11258998"
        strategy="afterInteractive"
      />

      <div className="max-w-4xl mx-auto p-6">

        <div className="bg-white rounded-3xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-center">
            US Mortgage Calculator
          </h1>

          <p className="text-center text-slate-500 mt-2">
            Calculate your estimated monthly mortgage payment.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div>

              <label className="font-semibold">
                Home Price
              </label>

              <input
                type="number"
                className="w-full border rounded-xl p-3 mt-2"
                value={homePrice}
                onChange={(e) =>
                  setHomePrice(Number(e.target.value))
                }
              />

            </div>

            <div>

              <label className="font-semibold">
                Down Payment
              </label>

              <input
                type="number"
                className="w-full border rounded-xl p-3 mt-2"
                value={downPayment}
                onChange={(e) =>
                  setDownPayment(Number(e.target.value))
                }
              />

            </div>

            <div>

              <label className="font-semibold">
                Interest Rate %
              </label>

              <input
                type="number"
                step="0.01"
                className="w-full border rounded-xl p-3 mt-2"
                value={interestRate}
                onChange={(e) =>
                  setInterestRate(Number(e.target.value))
                }
              />

            </div>

            <div>

              <label className="font-semibold">
                Loan Term
              </label>

              <select
                className="w-full border rounded-xl p-3 mt-2"
                value={loanYears}
                onChange={(e) =>
                  setLoanYears(Number(e.target.value))
                }
              >
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={30}>30 Years</option>
              </select>

            </div>
            <div>

              <label className="font-semibold">
                Property Tax (Yearly)
              </label>

              <input
                type="number"
                className="w-full border rounded-xl p-3 mt-2"
                value={propertyTax}
                onChange={(e) =>
                  setPropertyTax(Number(e.target.value))
                }
              />

            </div>

            <div>

              <label className="font-semibold">
                Home Insurance (Yearly)
              </label>

              <input
                type="number"
                className="w-full border rounded-xl p-3 mt-2"
                value={insurance}
                onChange={(e) =>
                  setInsurance(Number(e.target.value))
                }
              />

            </div>

            <div>

              <label className="font-semibold">
                HOA (Monthly)
              </label>

              <input
                type="number"
                className="w-full border rounded-xl p-3 mt-2"
                value={hoa}
                onChange={(e) =>
                  setHoa(Number(e.target.value))
                }
              />

            </div>

            <div>

              <label className="font-semibold">
                PMI (Monthly)
              </label>

              <input
                type="number"
                className="w-full border rounded-xl p-3 mt-2"
                value={pmi}
                onChange={(e) =>
                  setPmi(Number(e.target.value))
                }
              />

            </div>

          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-6">

            <div className="bg-slate-900 text-white rounded-2xl p-6">

              <h2 className="text-lg font-bold mb-6">
                Monthly Payment Breakdown
              </h2>

              <div className="flex justify-between py-2 border-b border-slate-700">
                <span>Loan Amount</span>
                <strong>{formatCurrency(loanAmount)}</strong>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-700">
                <span>Principal & Interest</span>
                <strong>{formatCurrency(principalInterest)}</strong>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-700">
                <span>Property Tax</span>
                <strong>{formatCurrency(monthlyTax)}</strong>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-700">
                <span>Insurance</span>
                <strong>{formatCurrency(monthlyInsurance)}</strong>
              </div>

              <div className="flex justify-between py-2 border-b border-slate-700">
                <span>HOA</span>
                <strong>{formatCurrency(hoa)}</strong>
              </div>

              <div className="flex justify-between py-2">
                <span>PMI</span>
                <strong>{formatCurrency(pmi)}</strong>
              </div>

            </div>

            <div className="bg-emerald-600 rounded-2xl text-white flex flex-col justify-center items-center p-8">

              <p className="uppercase tracking-widest text-sm opacity-80">
                Estimated Monthly Payment
              </p>

              <h2 className="text-5xl font-extrabold mt-4">
                {formatCurrency(totalMonthly)}
              </h2>

              <p className="mt-4 text-center opacity-90">
                Includes principal, interest, taxes, insurance,
                HOA and PMI.
              </p>

            </div>

          </div>
          <div className="mt-10 grid md:grid-cols-4 gap-4">

            <div className="bg-white border rounded-2xl p-5 text-center shadow-sm">
              <p className="text-slate-500 text-sm">Home Price</p>
              <h3 className="text-xl font-bold mt-2">
                {formatCurrency(homePrice)}
              </h3>
            </div>

            <div className="bg-white border rounded-2xl p-5 text-center shadow-sm">
              <p className="text-slate-500 text-sm">Down Payment</p>
              <h3 className="text-xl font-bold mt-2">
                {formatCurrency(downPayment)}
              </h3>
            </div>

            <div className="bg-white border rounded-2xl p-5 text-center shadow-sm">
              <p className="text-slate-500 text-sm">Interest Rate</p>
              <h3 className="text-xl font-bold mt-2">
                {(interestRate || 0).toFixed(2)}%
              </h3>
            </div>

            <div className="bg-white border rounded-2xl p-5 text-center shadow-sm">
              <p className="text-slate-500 text-sm">Loan Term</p>
              <h3 className="text-xl font-bold mt-2">
                {loanYears} Years
              </h3>
            </div>

          </div>

          <div className="mt-12 border-t pt-8">

            <h2 className="text-2xl font-bold mb-4">
              About this Mortgage Calculator
            </h2>

            <p className="text-slate-600 leading-7">
              This mortgage calculator estimates your monthly home loan payment
              using the standard amortization formula. It includes principal,
              interest, property taxes, homeowners insurance, HOA fees and PMI,
              helping you better understand the true monthly cost of buying a
              home in the United States.
            </p>

            <p className="text-slate-600 leading-7 mt-4">
              Results are estimates only and should not replace quotes provided
              by lenders. Actual payments may vary based on your loan program,
              credit score, taxes and insurance premiums.
            </p>

          </div>

          <footer className="mt-12 text-center text-slate-500 text-sm">
            © {new Date().getFullYear()} US Mortgage Calculator
          </footer>

        </div>

      </div>

    </div>
  );
}
