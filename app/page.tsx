"use client";
import React, { useState } from 'react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('mortgage');
  const [homeValue, setHomeValue] = useState(400000);
  const [downPayment, setDownPayment] = useState(80000);

  const totalMonthlyPayment = ((homeValue - downPayment) * 0.005) + 300;
  const affordableHomePrice = (90000 / 12) * 0.28 * 160;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mt-10">
        <h1 className="text-xl font-bold text-center text-slate-900 mb-6">US MortgageSuite</h1>
        
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button 
            onClick={() => setActiveTab('mortgage')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${activeTab === 'mortgage' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >
            Mortgage Payment
          </button>
          <button 
            onClick={() => setActiveTab('affordability')}
            className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${activeTab === 'affordability' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >
            Home Affordability
          </button>
        </div>

        {activeTab === 'mortgage' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Home Value: ${homeValue.toLocaleString()}</label>
              <input type="range" min="50000" max="1000000" step="10000" value={homeValue} onChange={(e) => setHomeValue(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Down Payment: ${downPayment.toLocaleString()}</label>
              <input type="range" min="0" max={homeValue} step="5000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="w-full accent-blue-600" />
            </div>
            <div className="bg-slate-900 text-white p-4 rounded-xl text-center">
              <span className="block text-[10px] uppercase text-slate-400">Est. Monthly Payment</span>
              <span className="text-2xl font-bold text-emerald-400">${totalMonthlyPayment.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-slate-900 text-white p-4 rounded-xl text-center">
              <span className="block text-[10px] uppercase text-slate-400">Your Purchasing Power</span>
              <span className="text-2xl font-bold text-blue-400">${affordableHomePrice.toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
