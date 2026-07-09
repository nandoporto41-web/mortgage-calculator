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
      
      // Regra americana: PMI se cancela quando o saldo cai abaixo de 78% do preço de compra original
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

  // Cálculo de Porcentagens para o Gráfico de Barras Empilhadas
  const pctPrincipalInterest = (principalInterest / total) * 100;
  const pctTax = (monthlyTax / total) * 100;
  const pctInsurance = (monthlyInsurance / total) * 100;
  const pctHoa = (hoa / total) * 100;
  const pctPmi = (pmi / total) * 100;

  return (
    <div className="min-h-screen bg-slate-100">

      {/* MELHORIA: METATAG DE VERIFICAÇÃO EXIGIDA PELO ADSENSE */}
      <head>
        <meta name="google-adsense-account" content="ca-pub-1156108807705161" />
      </head>

      {/* SCRIPT OFICIAL DO ADSENSE (ID CORRIGIDO COM BASE NA SUA IMAGEM) */}
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

              <div className="bg-slate-900 rounded-3xl p-8 text-white sticky top-6">

                <h2 className="text-2xl font-bold mb-6">
                  Monthly Payment
                </h2>

                <div className="text-5xl font-black text-emerald-400">
                  {money(total)}
                </div>

                {/* GRÁFICO VISUAL DE DISTRIBUIÇÃO DA PARCELA - CORRIGIDO */}
                <div className="mt-6">
                  <p className="text-xs text-slate-400 mb-2 font-semibold tracking-wider uppercase">Payment Breakdown</p>
                  <div className="h-5 w-full rounded-md overflow-hidden flex bg-slate-800">
                    <div style={{ width: `${pctPrincipalInterest}%` }} className="bg-blue-500 h-full transition-all" title="P&I" />
                    <div style={{ width: `${pctTax}%` }} className="bg-amber-500 h-full transition-all" title="Taxes" />
                    <div style={{ width: `${pctInsurance}%` }} className="bg-rose-500 h-full transition-all" title="Insurance" />
                    {hoa > 0 && <div style={{ width: `${pctHoa}%` }} className="bg-purple-500 h-full transition-all" title="HOA" />}
                    {pmi > 0 && <div style={{ width: `${pctPmi}%` }} className="bg-teal-500 h-full transition-all" title="PMI" />}
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

                  <button
                    className="bg-blue-600 hover:bg-blue-700 rounded-xl py-3 font-bold transition"
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
                    className="bg-slate-700 hover:bg-slate-600 rounded-xl py-3 font-bold transition"
                  >
                    Reset
                  </button>

                </div>

              </div>
            </div>

          </div>

          {/* COMPONENTE PROFISSIONAL - AMORTIZATION SCHEDULE TABELA - TOTALMENTE REVISADO */}
          <section className="mt-16 border-t pt-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-slate-900">Amortization Schedule</h2>
                <p className="text-slate-500 text-sm mt-1">
                  See how your principal balance decreases over the lifetime of your loan. Click a year to view monthly data breakdown.
                </p>
              </div>
            </div>

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
                          {/* Linha Macro do Ano */}
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

                          {/* Renderização Detalhada dos Meses daquele Ano */}
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

          {/* NOVO CONTEÚDO EXTRA DE SEO 1: COMO ESTIMAR O PAGAMENTO MENSAL (PITI) */}
          <section className="mt-16 border-t pt-12 text-slate-800">
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

          {/* NOVO CONTEÚDO EXTRA DE SEO 2: DICAS INTERATIVAS PARA REDUZIR A PARCELA */}
          <section className="mt-16 bg-gradient-to-br from-slate-900 to-blue-950 text-white p-8 rounded-3xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-emerald-400">Pro Strategies to Lower Your Monthly Payments</h2>
            <p className="text-sm text-slate-300 mb-6 leading-6">
              If your current calculation results look slightly higher than your optimal household cash flow budget, consider applying these adjustments within the mortgage metrics above:
            </p>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-lg">✓</span>
                <div>
                  <strong>Increase Your Down Payment to 20%:</strong> This completely removes the mandatory monthly <strong>PMI fee</strong> from your amortization timeline, saving you thousands of dollars over the lifetime of the loan.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-lg">✓</span>
                <div>
                  <strong>Boost Your Credit Score:</strong> Institutional banks assign premium interest rates to borrowers with excellent credit ratings. Dropping your rate by even 0.5% drastically reduces long-term debt.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 font-bold text-lg">✓</span>
                <div>
                  <strong>Shop Around for Insurance:</strong> You are not locked into the default insurance estimates. Get custom quotes from competing home insurance companies to find a lower annual premium.
                </div>
              </li>
            </ul>
          </section>

          {/* NOVO CONTEÚDO EXTRA DE SEO 3: GLOSSÁRIO DE TERMOS AMERICANOS */}
          <section className="mt-16 border-t pt-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Real Estate Terms Glossary</h2>
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold">
                    <th className="p-4 w-1/4">Term</th>
                    <th className="p-4">Official Financial Definition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-600">
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Amortization</td>
                    <td className="p-4">The structural method of paying off a home loan balance using regular monthly payments over a set timeline, where portions shift gradually from interest toward principal.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">HOA Fees</td>
                    <td className="p-4">Homeowners Association assessments charged monthly by specific suburban neighborhoods or condo complexes to manage local landscape, building maintenance, and community amenities.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Down Payment</td>
                    <td className="p-4">The initial upfront cash payment made at closing towards the total cost of a property purchase, expressed as a percent of the primary value.</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-semibold text-slate-900">Loan Term</td>
                    <td className="p-4">The contracted timeframe allocated to fully repay the borrowed funds. Standard intervals in the US financing market are fixed 15-year or 30-year structures.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Ad Space */}
          <div className="my-10 rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center bg-slate-50">
            <p className="text-slate-500 font-semibold">
              Advertisement
            </p>
            <div id="ad-container-2" className="mt-4 min-h-[120px]" />
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
                  Yes. Property taxes, insurance, HOA fees and PMI are included in the estimated monthly payment breakdown visualization.
                </p>
              </div>

              <div className="border rounded-2xl p-5">
                <h3 className="font-bold text-lg">
                  Is this calculator accurate?
                </h3>
                <p className="text-slate-600 mt-2 leading-7">
                  Results are estimates based on your inputs and the standard mortgage formula. Your specific commercial underwriter or bank lender may provide slightly different final numbers based on credit status.
                </p>
              </div>

              <div className="border rounded-2xl p-5">
                <h3 className="font-bold text-lg">
                  When does Private Mortgage Insurance (PMI) automatically cancel?
                </h3>
                <p className="text-slate-600 mt-2 leading-7">
                  In the United States, under the Homeowners Protection Act, lenders must automatically terminate conventional PMI when your principal loan balance reaches 78% of the original purchase price of your home, provided you are current on payments. Our advanced breakdown matrix adjusts this value automatically.
                </p>
              </div>

            </div>

          </section>

          {/* Call to Action CTA Block */}
          <section className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-10 text-center shadow-md">
            <h2 className="text-3xl font-black mb-2">Ready to Buy Your Dream Home?</h2>
            <p className="text-blue-100 max-w-xl mx-auto mb-6 text-sm">
              Estimate your monthly payment instantly and plan your long-term personal household finances with confidence.
            </p>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-white text-blue-700 px-8 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition"
            >
              Calculate Again
            </button>
          </section>

          {/* Institutional Footer Layout */}
          <footer className="mt-16 pt-8 border-t text-center text-xs text-slate-400">
            <p>© 2026 US Mortgage Calculator</p>
            <p className="mt-1 text-slate-400">Built for home buyers across the United States.</p>
            <div className="mt-4 flex justify-center gap-4 text-blue-500 font-semibold">
              <button onClick={() => setShowAbout(true)} className="hover:underline">About Us</button>
              <span>|</span>
              <button onClick={() => setShowPrivacy(true)} className="hover:underline">Privacy Policy</button>
            </div>
          </footer>

        </div>

      </main>

      {/* ABOUT US MODAL COMPONENT */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative max-h-[85vh] overflow-y-auto shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="text-sm text-slate-600 leading-6 mb-4">
              Welcome to <strong>US Mortgage Calculator</strong>. We provide premium, high-fidelity real estate calculation engines engineered to support homebuyers across the United States.
            </p>
            <p className="text-sm text-slate-600 leading-6 mb-4">
              Our open-source calculations give users access to payment amortization metrics, automatic PMI cancellation data, escrow projections, and comprehensive tax tracking tools without requiring registration.
            </p>
            <button 
              onClick={() => setShowAbout(false)}
              className="w-full mt-4 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* PRIVACY POLICY MODAL COMPONENT */}
      {showPrivacy && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative max-h-[85vh] overflow-y-auto shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
            <p className="text-xs text-slate-400 mb-4">Effective Date: July 2026</p>
            <div className="space-y-4 text-xs text-slate-600 leading-5">
              <p>
                At <strong>US Mortgage Calculator</strong>, accessible via our Vercel web domain, the privacy of our visitors is an absolute priority. This document outlines the distinct types of information collected and how we utilize it.
              </p>
              <h3 className="font-bold text-sm text-slate-900 mt-2">Log Files & Cookies</h3>
              <p>
                We follow standard analytical procedures using system log files. These logs map internal IP addresses, internet service providers (ISPs), browser categories, entrance/exit timestamps, and click counts. This data is entirely anonymous and never paired with identifiable personnel records.
              </p>
              <h3 className="font-bold text-sm text-slate-900 mt-2">Google AdSense Third-Party Advertising</h3>
              <p>
                Google, as a third-party marketplace vendor, implements tracking cookies to serve tailored promotions across our pages based on prior web activity. Users can opt-out of DART cookies by visiting the official Google Ad Network Privacy guidelines.
              </p>
              <p>
                Our server platforms do not possess authority or configure administrative access over tracking cookies utilized by these independent third-party marketing services.
              </p>
            </div>
            <button 
              onClick={() => setShowPrivacy(false)}
              className="w-full mt-6 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition"
            >
              Understand & Accept
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
