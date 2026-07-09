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

  // Estado para controlar os anos expandidos na tabela de amortização
  const [expandedYears, setExpandedYears] = useState<Record<number, boolean>>({});

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

  // Geração da Tabela de Amortização Detalhada
  const amortizationSchedule = useMemo(() => {
    let balance = loanAmount;
    const r = interestRate / 100 / 12;
    const totalMonths = loanYears * 12;
    const schedule = [];

    let totalInterestYear = 0;
    let totalPrincipalYear = 0;
    let monthsArray = [];

    for (let m = 1; m <= totalMonths; m++) {
      const interestM = balance * r;
      const principalM = Math.max(principalInterest - interestM, 0);
      
      const currentPmi = balance > homePrice * 0.78 ? pmi : 0;
      const totalM = principalInterest + monthlyTax + monthlyInsurance + hoa + currentPmi;
      
      balance = Math.max(balance - principalM, 0);

      totalInterestYear += interestM;
      totalPrincipalYear += principalM;

      monthsArray.push({
        month: m,
        principalPaid: principalM,
        interestPaid: interestM,
        pmiPaid: currentPmi,
        totalPayment: totalM,
        remainingBalance: balance,
      });

      if (m % 12 === 0 || m === totalMonths) {
        const yearNumber = Math.ceil(m / 12);
        schedule.push({
          year: yearNumber,
          interestPaid: totalInterestYear,
          principalPaid: totalPrincipalYear,
          remainingBalance: balance,
          months: monthsArray,
        });
        totalInterestYear = 0;
        totalPrincipalYear = 0;
        monthsArray = [];
      }
    }
    return schedule;
  }, [loanAmount, interestRate, loanYears, principalInterest, homePrice, pmi, monthlyTax, monthlyInsurance, hoa]);

  const toggleYear = (year: number) => {
    setExpandedYears((prev) => ({ ...prev, [year]: !prev[year] }));
  };

  const pctPrincipalInterest = (principalInterest / total) * 100;
  const pctTax = (monthlyTax / total) * 100;
  const pctInsurance = (monthlyInsurance / total) * 100;
  const pctHoa = (hoa / total) * 100;
  const pctPmi = (pmi / total) * 100;

  return (
    <div className="min-h-screen bg-slate-100">

      <head>
        <meta name="google-adsense-account" content="ca-pub-1156108807705161" />
      </head>

      {/* ADSENSE */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1156108807705161"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* SCRIPTS MONETAG EXISTENTES */}
      <Script
        src="https://5gvci.com/act/files/tag.min.js?z=11258998"
        strategy="afterInteractive"
      />

      <Script
        src="https://omg10.com/4/11259367"
        strategy="lazyOnload"
      />

      {/* NOVOS SCRIPTS MONETAG SOLICITADOS */}
      <Script id="monetag-vignette" strategy="afterInteractive">
        {`
          (function(s){
            s.dataset.zone='11262714';
            s.src='https://n6wxm.com/vignette.min.js';
          })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));
        `}
      </Script>

      <Script
        src="https://5gvci.com/act/files/tag.min.js?z=11262716"
        strategy="afterInteractive"
        data-cfasync="false"
      />

      <Script
        src="https://5gvci.com/act/files/tag.min.js?z=11262722"
        strategy="afterInteractive"
        data-cfasync="false"
      />

      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <h1 className="text-5xl font-black">US Mortgage Calculator</h1>
          <p className="mt-4 text-lg text-blue-100 max-w-2xl">
            Calculate your monthly mortgage payment, taxes, insurance, HOA and PMI in seconds.
          </p>
          <button
            className="mt-8 bg-white text-blue-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition"
            onClick={() => window.scrollTo({ top: 450, behavior: "smooth" })}
          >
            Calculate Now
          </button>
        </div>
      </section>

      <main className="max-w-6xl mx-auto p-6 -mt-10">
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Loan Information</h2>
              <label className="font-semibold">Home Price</label>
              <input
                type="range"
                min={50000}
                max={2000000}
                step={5000}
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full mt-2"
              />
              <input
                type="number"
                value={homePrice}
                onChange={(e) => setHomePrice(Number(e.target.value))}
                className="w-full border rounded-xl p-3 mt-2 mb-6"
              />

              <label className="font-semibold">Down Payment</label>
              <input
                type="range"
                min={0}
                max={homePrice}
                step={1000}
                value={downPayment}
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full mt-2"
              />
              <input
                type="number"
                value={downPayment}
                onChange={(e) => setDownPayment(Math.min(Number(e.target.value), homePrice))}
                className="w-full border rounded-xl p-3 mt-2 mb-6"
              />

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Down Payment</span>
                  <span>{downPercent.toFixed(1)}%</span>
                </div>
                <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${downPercent}%` }} />
                </div>
              </div>

              <label className="font-semibold">Interest Rate (%)</label>
              <input
                type="number"
                step="0.01"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full border rounded-xl p-3 mt-2 mb-6"
              />

              <label className="font-semibold">Loan Term</label>
              <select
                value={loanYears}
                onChange={(e) => setLoanYears(Number(e.target.value))}
                className="w-full border rounded-xl p-3 mt-2 mb-6"
              >
                <option value={15}>15 Years</option>
                <option value={20}>20 Years</option>
                <option value={30}>30 Years</option>
              </select>

              <label className="font-semibold">Property Tax (Yearly)</label>
              <input
                type="number"
                value={propertyTax}
                onChange={(e) => setPropertyTax(Number(e.target.value))}
                className="w-full border rounded-xl p-3 mt-2 mb-6"
              />

              <label className="font-semibold">Home Insurance (Yearly)</label>
              <input
                type="number"
                value={insurance}
                onChange={(e) => setInsurance(Number(e.target.value))}
                className="w-full border rounded-xl p-3 mt-2 mb-6"
              />

              <label className="font-semibold">HOA (Monthly)</label>
              <input
                type="number"
                value={hoa}
                onChange={(e) => setHoa(Number(e.target.value))}
                className="w-full border rounded-xl p-3 mt-2 mb-6"
              />

              <label className="font-semibold">PMI (Monthly)</label>
              <input
                type="number"
                value={pmi}
                onChange={(e) => setPmi(Number(e.target.value))}
                className="w-full border rounded-xl p-3 mt-2"
              />
            </div>

            <div>
              <div className="bg-slate-900 rounded-3xl p-8 text-white sticky top-6">
                <h2 className="text-2xl font-bold mb-6">Monthly Payment</h2>
                <div className="text-5xl font-black text-emerald-400">{money(total)}</div>

                <div className="mt-6">
                  <p className="text-xs text-slate-400 mb-2 font-semibold tracking-wider uppercase">Payment Breakdown</p>
                  <div className="h-5 w-full rounded-md overflow-hidden flex bg-slate-800">
                    <div style={{ width: `${pctPrincipalInterest}%` }} className="bg-blue-500 h-full transition-all" />
                    <div style={{ width: `${pctTax}%` }} className="bg-amber-500 h-full transition-all" />
                    <div style={{ width: `${pctInsurance}%` }} className="bg-rose-500 h-full transition-all" />
                    {hoa > 0 && <div style={{ width: `${pctHoa}%` }} className="bg-purple-500 h-full transition-all" />}
                    {pmi > 0 && <div style={{ width: `${pctPmi}%` }} className="bg-teal-500 h-full transition-all" />}
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-blue-500 rounded-sm inline-block" />
                      <span>Principal & Interest</span>
                    </div>
                    <strong>{money(principalInterest)}</strong>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-amber-500 rounded-sm inline-block" />
                      <span>Property Tax</span>
                    </div>
                    <strong>{money(monthlyTax)}</strong>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-rose-500 rounded-sm inline-block" />
                      <span>Insurance</span>
                    </div>
                    <strong>{money(monthlyInsurance)}</strong>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-purple-500 rounded-sm inline-block" />
                      <span>HOA Fees</span>
                    </div>
                    <strong>{money(hoa)}</strong>
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 bg-teal-500 rounded-sm inline-block" />
                      <span>PMI</span>
                    </div>
                    <strong>{money(pmi)}</strong>
                  </div>

                  <hr className="border-slate-800 my-2" />
                  <div className="flex justify-between text-slate-400 text-xs">
                    <span>Total Loan Amount</span>
                    <span>{money(loanAmount)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-8">
                  <button className="bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-bold transition">Calculate</button>
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
                    className="bg-slate-700 hover:bg-slate-600 rounded-xl py-3 font-bold transition"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* AMORTIZATION SCHEDULE */}
          <section className="mt-16 border-t pt-12">
            <h2 className="text-3xl font-bold text-slate-900">Amortization Schedule</h2>
            <p className="text-slate-500 text-sm mt-1 mb-6">
              See how your principal balance decreases over the lifetime of your loan. Click a year to view monthly data breakdown.
            </p>

            <div className="overflow-hidden border border-slate-200 rounded-2xl bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-700 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                      <th className="py-4 px-6">Year / Month</th>
                      <th className="py-4 px-4">Principal Paid</th>
                      <th className="py-4 px-4">Interest Paid</th>
                      <th className="py-4 px-4">Total Tax/Ins/HOA/PMI</th>
                      <th className="py-4 px-6 text-right">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                    {amortizationSchedule.map((item) => {
                      const isExpanded = !!expandedYears[item.year];
                      const totalEscrowYear = (monthlyTax + monthlyInsurance + hoa) * 12 + item.months.reduce((acc, curr) => acc + curr.pmiPaid, 0);

                      return (
                        <span className="contents" key={`year-group-${item.year}`}>
                          <tr 
                            onClick={() => toggleYear(item.year)}
                            className="hover:bg-slate-50/80 cursor-pointer font-semibold text-slate-900 bg-white transition"
                          >
                            <td className="py-4 px-6 flex items-center gap-2 text-blue-600">
                              <span className="text-xs transform transition-transform inline-block">
                                {isExpanded ? "▼" : "▶"}
                              </span>
                              Year {item.year}
                            </td>
                            <td className="py-4 px-4">{money(item.principalPaid)}</td>
                            <td className="py-4 px-4">{money(item.interestPaid)}</td>
                            <td className="py-4 px-4">{money(totalEscrowYear)}</td>
                            <td className="py-4 px-6 text-right font-bold text-slate-800">{money(item.remainingBalance)}</td>
                          </tr>

                          {isExpanded && item.months.map((mObj) => (
                            <tr key={`month-${mObj.month}`} className="bg-slate-50/40 border-l-4 border-blue-500 text-xs text-slate-600">
                              <td className="py-2.5 px-10 text-slate-500">Month {mObj.month}</td>
                              <td className="py-2.5 px-4">{money(mObj.principalPaid)}</td>
                              <td className="py-2.5 px-4">{money(mObj.interestPaid)}</td>
                              <td className="py-2.5 px-4">
                                {money(monthlyTax + monthlyInsurance + hoa + mObj.pmiPaid)} 
                                {mObj.pmiPaid === 0 && pmi > 0 && <span className="text-[10px] text-emerald-600 font-bold ml-1">(PMI Dropped)</span>}
                              </td>
                              <td className="py-2.5 px-6 text-right font-mono text-slate-700">{money(mObj.remainingBalance)}</td>
                            </tr>
                          ))}
                        </span>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* ADVERTISEMENT BLOCK 1 */}
          <div className="my-8 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center text-xs text-slate-400 tracking-wide uppercase">
            Advertisement
            <div className="h-28 flex items-center justify-center">[Monetag Banner Zone]</div>
          </div>

          {/* HOW TO ESTIMATE SECTION */}
          <section className="mt-12 text-slate-800">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">How to Estimate Your Monthly Mortgage Payment</h2>
            <p className="text-slate-600 leading-7 mb-6">
              When buying a house in the United States, your mortgage cost consists of more than just the home loan principal and the interest rate. Real estate professionals use the acronym <strong>PITI</strong> to describe the total comprehensive monthly budget structure. Our interactive engine estimates each item automatically:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-lg text-blue-700 mb-2">Principal & Interest (P&I)</h3>
                <p className="text-sm text-slate-600 leading-6">
                  The primary core of your debt. The principal directly reduces your outstanding balance, while interest represents the bank fee for borrowing money. At the beginning of the amortization cycle, interest forms the largest part of your monthly bill.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-lg text-amber-700 mb-2">Property Taxes (T)</h3>
                <p className="text-sm text-slate-600 leading-6">
                  Assessed annually by local municipal governments or counties to fund regional public infrastructure, schools, and roads. Usually distributed evenly into 12 distinct escrow installments throughout the fiscal year.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-lg text-rose-700 mb-2">Homeowners Insurance (I)</h3>
                <p className="text-sm text-slate-600 leading-6">
                  A mandatory private coverage policy required by institutional underwriters to fully safeguard the architectural structure from environmental disasters, accidental fires, hazards, or structural damage.
                </p>
              </div>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <h3 className="font-bold text-lg text-teal-700 mb-2">Private Mortgage Insurance (PMI)</h3>
                <p className="text-sm text-slate-600 leading-6">
                  An insurance policy that protects the lender if you default on your loan. It is typically required if your down payment is less than 20% of the home purchase price. It can be cancelled once you reach 22% equity.
                </p>
              </div>
            </div>
          </section>

          {/* PRO STRATEGIES SECTION */}
          <section className="mt-12 bg-slate-900 rounded-3xl p-8 text-white">
            <h3 className="text-xl font-bold text-emerald-400 mb-4">Pro Strategies to Lower Your Monthly Payments</h3>
            <p className="text-sm text-slate-300 mb-6">
              If your current calculation results look slightly higher than your optimal household cash flow budget, consider applying these adjustments within the mortgage metrics above:
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">✓</span>
                <p><strong className="text-white">Increase Your Down Payment to 20%:</strong> This completely removes the mandatory monthly PMI fee from your amortization timeline, saving you thousands of dollars over the lifetime of the loan.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">✓</span>
                <p><strong className="text-white">Boost Your Credit Score:</strong> Institutional banks assign premium interest rates to borrowers with excellent credit ratings. Dropping your rate by even 0.5% drastically reduces long-term debt.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold">✓</span>
                <p><strong className="text-white">Shop Around for Insurance:</strong> You are not locked into the default insurance estimates. Get custom quotes from competing home insurance companies to find a lower annual premium.</p>
              </li>
            </ul>
          </section>

          {/* GLOSSARY SECTION */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Real Estate Terms Glossary</h2>
            <div className="overflow-x-auto border border-slate-200 rounded-2xl">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold uppercase text-slate-700">
                    <th className="py-4 px-6 w-1/4">Term</th>
                    <th className="py-4 px-6">Official Financial Definition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-900">Amortization</td>
                    <td className="py-4 px-6">The structural method of paying off a home loan balance using regular monthly payments over a set timeline, where portions shift gradually from interest toward principal.</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-900">HOA Fees</td>
                    <td className="py-4 px-6">Homeowners Association assessments charged monthly by specific suburban neighborhoods or condo complexes to manage local landscape, building maintenance, and community amenities.</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-900">Down Payment</td>
                    <td className="py-4 px-6">The initial upfront cash payment made at closing towards the total cost of a property purchase, expressed as a percent of the primary value.</td>
                  </tr>
                  <tr>
                    <td className="py-4 px-6 font-semibold text-slate-900">Loan Term</td>
                    <td className="py-4 px-6">The contracted timeframe allocated to fully repay the borrowed funds. Standard intervals in the US financing market are fixed 15-year or 30-year structures.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* ADVERTISEMENT BLOCK 2 */}
          <div className="my-8 p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center text-xs text-slate-400 tracking-wide uppercase">
            Advertisement
            <div className="h-28 flex items-center justify-center">[Monetag Native Banner]</div>
          </div>

          {/* FREQUENTLY ASKED QUESTIONS */}
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border border-slate-200 rounded-xl p-5">
                <h4 className="font-semibold text-slate-900 mb-2">How is my mortgage payment calculated?</h4>
                <p className="text-sm text-slate-600">We use the standard mortgage amortization formula used by banks across the United States.</p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <h4 className="font-semibold text-slate-900 mb-2">Does this include taxes?</h4>
                <p className="text-sm text-slate-600">Yes. Property taxes, insurance, HOA fees and PMI are included in the estimated monthly payment.</p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <h4 className="font-semibold text-slate-900 mb-2">Is this calculator accurate?</h4>
                <p className="text-sm text-slate-600">Results are estimates based on your inputs and the standard mortgage formula. Your lender may provide slightly different numbers.</p>
              </div>
              <div className="border border-slate-200 rounded-xl p-5">
                <h4 className="font-semibold text-slate-900 mb-2">When does Private Mortgage Insurance (PMI) automatically cancel?</h4>
                <p className="text-sm text-slate-600">
                  In the United States, under the Homeowners Protection Act, lenders must automatically terminate conventional PMI when your principal loan balance reaches 78% of the original purchase price of your home, provided you are current on payments. Our advanced breakdown matrix adjusts this value automatically.
                </p>
              </div>
            </div>
          </section>

          {/* BLUE BANNER: READY TO BUY YOUR DREAM HOME */}
          <section className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-black mb-2">Ready to Buy Your Dream Home?</h3>
            <p className="text-sm text-blue-100 mb-6">Estimate your monthly payment instantly and plan your finances with confidence.</p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition"
            >
              Calculate Again
            </button>
          </section>

        </div>
      </main>

      <footer className="bg-slate-900 text-slate-400 text-sm mt-20 border-t border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p>© 2026 US Mortgage Calculator</p>
            <p className="text-xs text-slate-500 mt-1">Built for home buyers across the United States.</p>
          </div>
          <div className="flex gap-6 font-medium">
            <button onClick={() => setShowAbout(true)} className="hover:text-white transition">About Us</button>
            <button onClick={() => setShowPrivacy(true)} className="hover:text-white transition">Privacy Policy</button>
          </div>
        </div>
      </footer>

      {/* MODAL: ABOUT US */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white text-slate-800 rounded-3xl max-w-lg w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">About Our Tool</h3>
            <p className="text-slate-600 leading-relaxed text-sm mb-6">
              Our US Mortgage Calculator is a high-precision digital tool designed to deliver clear financial layouts for prospective homebuyers, micro-entrepreneurs, and real estate professionals. By analyzing real-time breakdowns of escrow variables, interest amortization, and active PMI status transitions, we empower users with accurate insight into long-term wealth investments.
            </p>
            <button onClick={() => setShowAbout(false)} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition">
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* MODAL: PRIVACY POLICY */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white text-slate-800 rounded-3xl max-w-xl w-full p-8 shadow-2xl relative max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Privacy Policy & Terms</h3>
            <div className="space-y-4 text-slate-600 text-sm leading-relaxed mb-6">
              <p>
                Your privacy is fundamentally secure. This platform operates entirely on client-side state machine mechanics, which means your calculations, home valuation inputs, asset estimates, or interest projections are never processed, logged, or collected on external corporate databases.
              </p>
              <p>
                <strong>Third-Party Advertising Systems:</strong> We integrate verified networks including Google AdSense and Monetag to distribute localized contextual ads. These enterprise services may track safe data variables using standard browser cookies to personalize media impressions based on non-sensitive navigational behaviors.
              </p>
              <p>
                By interacting with our metrics panel and calculating your financial schedules, you explicitly consent to our automated operational frameworks.
              </p>
            </div>
            <button onClick={() => setShowPrivacy(false)} className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition sticky bottom-0 shadow-lg">
              I Understand
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
