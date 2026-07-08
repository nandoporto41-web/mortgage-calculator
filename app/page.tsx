"use client";
import React, { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('mortgage');

  // Estados da Calculadora de Hipoteca
  const [homeValue, setHomeValue] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);
  const [loanTerm, setLoanTerm] = useState(30);
  const [interestRate, setInterestRate] = useState(6.5);

  // Estados da Calculadora de Acessibilidade (Affordability)
  const [annualIncome, setAnnualIncome] = useState(90000);
  const [monthlyDebts, setMonthlyDebts] = useState(5000);

  // Cálculos da Hipoteca
  const loanAmount = homeValue - downPayment;
  const monthlyRate = (interestRate / 100) / 12;
  const numberOfPayments = loanTerm * 12;
  
  const monthlyPrincipalAndInterest = monthlyRate > 0 
    ? (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
    : loanAmount / numberOfPayments;

  const propertyTaxMonthly = (homeValue * 0.011) / 12; // Média americana de 1.1%
  const homeInsuranceMonthly = 130; // Média estimada padrão nos EUA
  const totalMonthlyPayment = monthlyPrincipalAndInterest + propertyTaxMonthly + homeInsuranceMonthly;

  // Cálculos de Acessibilidade (Regra americana dos 28/36% de endividamento)
  const maxMonthlyBudget = (annualIncome / 12) * 0.28;
  const affordableHomePrice = maxMonthlyBudget * 160; 

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      
      {/* HEADER / NAVIGATION */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-lg">US</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">MortgageSuite</span>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
            <a href="#tools" className="hover:text-blue-600 transition">Financial Tools</a>
            <a href="#about" className="hover:text-blue-600 transition">Guides</a>
            <a href="#disclaimer" className="hover:text-blue-600 transition">Legal Disclaimer</a>
          </nav>
          <div>
            <button className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-lg transition">
              US Market Live Rates
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CONTAINER */}
      <main className="max-w-4xl mx-auto px-4 py-8 w-full flex-grow" id="tools">
        
        {/* PLATFORM TITLE & MULTI-TAB CONTROLLER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
            Professional US Real Estate Toolset
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Accurate simulators built strictly adhering to US banking guidelines and property standards.
          </p>
          
          {/* TABS BUTTONS */}
          <div className="mt-6 inline-flex p-1 bg-slate-200/80 rounded-xl">
            <button 
              onClick={() => setActiveTab('mortgage')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${activeTab === 'mortgage' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-950'}`}
            >
              Mortgage Payment
            </button>
            <button 
              onClick={() => setActiveTab('affordability')}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all ${activeTab === 'affordability' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-950'}`}
            >
              Home Affordability
            </button>
          </div>
        </div>

        {/* TOOL 1: ADVANCED MORTGAGE CALCULATOR */}
        {activeTab === 'mortgage' && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* INPUTS COLUMN */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm md:col-span-3 space-y-5">
              <h3 className="font-bold text-slate-900 text-base border-b pb-2">Loan Parameters</h3>
              
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Home Value ($)</span>
                  <span className="font-bold text-slate-900">${homeValue.toLocaleString()}</span>
                </div>
                <input type="range" min="50000" max="1500000" step="5000" value={homeValue} onChange={(e) => setHomeValue(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Down Payment ($)</span>
                  <span className="font-bold text-slate-900">${downPayment.toLocaleString()}</span>
                </div>
                <input type="range" min="0" max={homeValue} step="2000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Loan Term</label>
                  <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))} className="w-full text-xs p-2.5 bg-slate-50 border border-slate-200 rounded-lg font-medium focus:outline-none focus:border-blue-500">
                    <option value={30}>30-Year Fixed</option>
                    <option value={15}>15-Year Fixed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Interest Rate (%)</label>
                  <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} className="w-full text-xs p-2 bg-slate-50 border border-slate-200 rounded-lg font-bold focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            </div>

            {/* BREAKDOWN / OUTPUTS COLUMN */}
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md md:col-span-2 flex flex-col justify-between">
              <div>
                <h3 className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">Estimated Monthly Payment</h3>
                <div className="text-3xl font-black mt-1 text-emerald-400">${totalMonthlyPayment.toLocaleString('en-US', {maximumFractionDigits: 2})}</div>
                
                <div className="mt-6 space-y-3 border-t border-slate-800 pt-4 text-xs">
                  <div className="flex justify-between text-slate-300">
                    <span>Principal & Interest</span>
                    <span className="font-semibold text-white">${monthlyPrincipalAndInterest.toLocaleString('en-US', {maximumFractionDigits: 2})}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Property Tax (Estimated)</span>
                    <span className="font-semibold text-white">${propertyTaxMonthly.toLocaleString('en-US', {maximumFractionDigits: 2})}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Home Insurance</span>
                    <span className="font-semibold text-white">${homeInsuranceMonthly}</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition shadow-sm">
                Download Detailed Breakdowns
              </button>
            </div>
          </div>
        )}

        {/* TOOL 2: HOME AFFORDABILITY SIMULATOR */}
        {activeTab === 'affordability' && (
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm md:col-span-3 space-y-5">
              <h3 className="font-bold text-slate-900 text-base border-b pb-2">Income & Obligations</h3>
              
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Annual Household Income ($)</span>
                  <span className="font-bold text-slate-900">${annualIncome.toLocaleString()}</span>
                </div>
                <input type="range" min="20000" max="300000" step="5000" value={annualIncome} onChange={(e) => setAnnualIncome(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-600 mb-1">
                  <span>Monthly Debt Payments ($)</span>
                  <span className="font-bold text-slate-900">${monthlyDebts.toLocaleString()}</span>
                </div>
                <input type="range" min="0" max="15000" step="200" value={monthlyDebts} onChange={(e) => setMonthlyDebts(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              </div>
              <p className="text-[11px] text-slate-400 italic">Debt payments include credit cards, car loans, and student debt.</p>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-md md:col-span-2 flex flex-col justify-between">
              <div>
                <h3 className="text-slate-400 uppercase tracking-wider text-[10px] font-bold">Your Purchasing Power</h3>
                <div className="text-2xl font-black mt-1 text-blue-400">${affordableHomePrice.toLocaleString()}</div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  Calculated using standard DTI ratios. Banks advise keeping target mortgage payments under 28% of gross monthly income.
                </p>
              </div>
              <button className="w-full mt-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold py-2.5 px-4 rounded-xl transition shadow-sm">
                Verify Debt-to-Income Fit
              </button>
            </div>
          </div>
        )}

        {/* EXPLANATORY CONTENT SECTION */}
        <section id="about" className="mt-12 border-t border-slate-200 pt-8 text-slate-600 space-y-4 text-xs leading-relaxed">
          <h2 className="text-slate-900 font-bold text-base">Understanding US Real Estate Costs</h2>
          <p>
            When acquiring a property inside the United States, your real obligation spans past the simple list price. Lenders evaluate requests utilizing the <strong>PITI</strong> formula (Principal, Interest, Taxes, and Insurance). 
          </p>
          <p>
            Property taxes fluctuate deeply contextually across states (ranging from 0.3% in Hawaii up to over 2% in New Jersey). Maintaining valid, localized calculations helps prevent standard budgeting shortfalls during escrow.
          </p>
        </section>
      </main>

      {/* FOOTER & DISCLAIMER */}
      <footer id="disclaimer" className="bg-white border-t border-slate-200 py-6 text-[11px] text-slate-400">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-2">
          <p>© 2026 MortgageSuite Platform. All rights reserved.</p>
          <p className="max-w-2xl mx-auto">
            Disclaimer: Content and outputs rendered across this platform are purely for illustrative simulation parameters. They do not constitute formal mortgage underwriting or binding credit approval indicators.
          </p>
        </div>
      </footer>
    </div>
  );
}
