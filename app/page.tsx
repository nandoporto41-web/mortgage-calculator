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

      <head>
        <meta name="google-adsense-account" content="ca-pub-1156108807705161" />
      </head>

      {/* ADSENSE SCRIPT */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1156108807705161"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* MONETAG 11262714 (Vignette) - Inserida dinamicamente para garantir execução correta */}
      <Script id="monetag-vignette" strategy="afterInteractive">
        {`
          (function(s){
            s.dataset.zone='11262714';
            s.src='https://n6wxm.com/vignette.min.js';
          })([document.documentElement, document.body].filter(Boolean).pop().appendChild(document.createElement('script')));
        `}
      </Script>

      {/* MONETAG 11262716 */}
      <Script
        src="https://5gvci.com/act/files/tag.min.js?z=11262716"
        strategy="afterInteractive"
        data-cfasync="false"
        async
      />

      {/* MONETAG 11262722 */}
      <Script
        src="https://5gvci.com/act/files/tag.min.js?z=11262722"
        strategy="afterInteractive"
        data-cfasync="false"
        async
      />

      {/* SCRIPTS ANTERIORES CASO QUEIRA MANTER ATIVOS EM PARALELO */}
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
                <p className="text-sm text-slate-600">
                  This forms the core foundation of your financing commitment. The principal directly pays down your net loan balance, while the interest covers the lending institution's premium service fees.
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
