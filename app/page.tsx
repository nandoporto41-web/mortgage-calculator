'use client';
import { useState, useEffect } from 'react';
import Script from 'next/script';

export default function MortgageCalculator() {
  // Inputs da calculadora americana
  const [homeValue, setHomeValue] = useState<number>(400000);
  const [downPayment, setDownPayment] = useState<number>(80000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTerm, setLoanTerm] = useState<number>(30);
  
  // Resultados reais calculados
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [propertyTax, setPropertyTax] = useState<number>(0);
  const [homeInsurance, setHomeInsurance] = useState<number>(0);
  const [totalMonthly, setTotalMonthly] = useState<number>(0);

  // Insira seu ID real do AdSense aqui para o Script global
  const ADSENSE_PUB_ID = "ca-pub-XXXXXXXXXXXXXXXX"; 

  // Lógica financeira americana exata (PITI)
  useEffect(() => {
    const loanAmount = homeValue - downPayment;
    const monthlyRate = (interestRate / 100) / 12;
    const numberOfPayments = loanTerm * 12;

    let principalAndInterest = 0;
    if (loanAmount > 0) {
      if (monthlyRate === 0) {
        principalAndInterest = loanAmount / numberOfPayments;
      } else {
        principalAndInterest = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
          (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
      }
    }

    const annualTax = homeValue * 0.011;
    const annualInsurance = homeValue * 0.005;

    const calculatedTax = annualTax / 12;
    const calculatedInsurance = annualInsurance / 12;

    setPropertyTax(Number(calculatedTax.toFixed(2)));
    setHomeInsurance(Number(calculatedInsurance.toFixed(2)));
    setMonthlyPayment(Number(principalAndInterest.toFixed(2)));
    setTotalMonthly(Number((principalAndInterest + calculatedTax + calculatedInsurance).toFixed(2)));
  }, [homeValue, downPayment, interestRate, loanTerm]);

  // Inicializa os anúncios com segurança APENAS quando o componente monta na tela
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // Garante que o array global do google existe e inicializa cada bloco inserido no HTML
        const adsbygoogle = (window as any).adsbygoogle || [];
        // Executa o push para cada bloco 'ins' presente na tela
        const numBlocks = document.querySelectorAll('.adsbygoogle').length;
        for (let i = 0; i < numBlocks; i++) {
          adsbygoogle.push({});
        }
      } catch (e) {
        console.error("Erro ao carregar blocos do AdSense:", e);
      }
    }
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 pb-12 font-sans">
      {/* SCRIPT OFICIAL DO ADSENSE ATUALIZADO */}
      <Script 
        async 
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />

      {/* 1. TOP AD BANNER (Leaderboard 728x90) */}
      <div className="w-full bg-white border-b border-slate-200 py-4 flex flex-col items-center justify-center">
        <span className="text-[10px] text-slate-400 font-bold tracking-widest mb-1">ADVERTISEMENT</span>
        <div className="w-full max-w-[728px] min-h-[90px] bg-slate-100 flex items-center justify-center">
          <ins className="adsbygoogle"
               style={{ display: 'inline-block', width: '728px', height: '90px' }}
               data-ad-client={ADSENSE_PUB_ID}
               data-ad-slot="1111111111"></ins>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUNA DA FERRAMENTA */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-xl shadow-slate-100 border border-slate-100">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">US Mortgage Calculator</h1>
          <p className="text-slate-500 mb-8 font-medium">Estimate your total monthly house payment including taxes and insurance.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Home Value ($)</label>
              <input 
                type="number" 
                value={homeValue} 
                onChange={(e) => setHomeValue(Number(e.target.value))}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-lg focus:border-blue-600 focus:bg-white outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Down Payment ($)</label>
              <input 
                type="number" 
                value={downPayment} 
                onChange={(e) => setDownPayment(Number(e.target.value))}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-lg focus:border-blue-600 focus:bg-white outline-none transition"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Loan Term</label>
              <select 
                value={loanTerm} 
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-lg focus:border-blue-600 focus:bg-white outline-none transition"
              >
                <option value={30}>30-Year Fixed</option>
                <option value={15}>15-Year Fixed</option>
                <option value={20}>20-Year Fixed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Interest Rate (%)</label>
              <input 
                type="number" 
                step="0.01"
                value={interestRate} 
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-lg focus:border-blue-600 focus:bg-white outline-none transition"
              />
            </div>
          </div>

          {/* PAINEL DE RESULTADOS REAIS */}
          <div className="mt-8 bg-blue-900 text-white p-8 rounded-3xl text-center shadow-lg shadow-blue-900/20">
            <span className="block text-xs font-extrabold text-blue-200 uppercase tracking-widest mb-1">Total Monthly Payment</span>
            <span className="text-5xl font-black">${totalMonthly.toLocaleString('en-US')}</span>
            
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-blue-800 text-sm font-medium text-blue-100">
              <div>
                <span className="block text-xs text-blue-300">Principal & Int.</span>
                <span className="font-bold text-base text-white">${monthlyPayment.toLocaleString('en-US')}</span>
              </div>
              <div>
                <span className="block text-xs text-blue-300">Property Tax</span>
                <span className="font-bold text-base text-white">${propertyTax.toLocaleString('en-US')}</span>
              </div>
              <div>
                <span className="block text-xs text-blue-300">Home Insurance</span>
                <span className="font-bold text-base text-white">${homeInsurance.toLocaleString('en-US')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* COLUNA LATERAL - ZONA DE ALTO CPC */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 bg-white p-6 rounded-3xl shadow-xl shadow-slate-100 border border-slate-100 text-center flex flex-col items-center">
            <span className="text-[10px] text-slate-400 font-bold tracking-widest mb-2">SPONSORED LINKS</span>
            
            {/* 2. LATERAL AD BANNER (Skyscraper 300x600) */}
            <div className="w-[300px] min-h-[600px] bg-slate-100 flex items-center justify-center">
              <ins className="adsbygoogle"
                   style={{ display: 'inline-block', width: '300px', height: '600px' }}
                   data-ad-client={ADSENSE_PUB_ID}
                   data-ad-slot="2222222222"></ins>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}
