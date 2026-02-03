
import React, { useState, useEffect, useMemo } from 'react';
import { DEFAULT_BRAID_CATALOG } from '../types';
import { DollarSign, Clock, Save, Share2, ChevronDown, Sparkles } from 'lucide-react';

const PricingCalculator = () => {
  const [selectedService, setSelectedService] = useState('');
  const [time, setTime] = useState(4.5);
  const [materialCost, setMaterialCost] = useState(50);
  const [profitMargin, setProfitMargin] = useState(30);
  const [results, setResults] = useState<any>(null);

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.value;
    setSelectedService(name);
    const service = DEFAULT_BRAID_CATALOG.find(s => s.name === name);
    if (service) {
      setTime(service.avgTime);
      setMaterialCost(30); // Base estimate
    }
  };

  const calculate = () => {
    const HOURLY_RATE_GOAL = 60; // Desired hourly rate
    const laborCost = time * HOURLY_RATE_GOAL;
    const baseTotal = laborCost + materialCost;
    const finalPrice = baseTotal * (1 + profitMargin / 100);
    const grossProfit = finalPrice - materialCost;
    const hourlyRateResult = finalPrice / time;

    setResults({
      total: finalPrice,
      hourlyRate: hourlyRateResult,
      grossProfit: grossProfit
    });
  };

  return (
    <div className="space-y-8 animate-fade-in pb-24">
      <header className="pt-4 lg:pt-0">
        <h1 className="text-xl font-bold text-center text-white tracking-tight">Calculadora de Preços</h1>
      </header>

      <div id="tour-pricing-form" className="bg-stone-900 border border-stone-800 p-6 rounded-[2.5rem] space-y-6 shadow-xl">
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-2 block">Tipo de Serviço</label>
            <div className="relative">
              <select
                value={selectedService}
                onChange={handleServiceChange}
                className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-4 rounded-2xl appearance-none focus:border-gold-500 outline-none transition-all"
              >
                <option value="">Tipo de Serviço</option>
                {DEFAULT_BRAID_CATALOG.map(t => <option key={t.name} value={t.name}>{t.name}</option>)}
              </select>
              <ChevronDown size={20} className="absolute right-4 top-4 text-stone-600 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-2 block">Custo de Materiais</label>
            <div className="relative">
              <span className="absolute left-4 top-4 text-stone-600">R$</span>
              <input
                type="number"
                value={materialCost}
                onChange={e => setMaterialCost(Number(e.target.value))}
                className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-4 pl-12 rounded-2xl focus:border-gold-500 outline-none transition-all"
                placeholder="0,00"
              />
            </div>
          </div>

          <div>
            <label className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-2 block">Tempo Gasto</label>
            <div className="relative">
              <input
                type="text"
                value={`${time}h 30min`}
                readOnly
                className="w-full bg-stone-950 border border-stone-800 text-stone-200 p-4 rounded-2xl outline-none"
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold text-gold-500 uppercase tracking-widest block">Margem de Lucro Desejada</label>
              <span className="text-white font-bold">{profitMargin}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={profitMargin}
              onChange={e => setProfitMargin(Number(e.target.value))}
              className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-500"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="w-full py-5 bg-gold-500 text-stone-950 font-black rounded-2xl shadow-lg shadow-gold-500/10 active:scale-[0.98] transition-all uppercase tracking-widest text-xs"
        >
          Calcular Preço
        </button>
      </div>

      {/* Results Section */}
      {results && (
        <div className="space-y-6 animate-fade-in">
          <div className="px-1">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-bold text-white tracking-tight">Total Sugerido:</h3>
              <div className="flex items-center gap-1 bg-gold-500/10 text-gold-500 px-3 py-1 rounded-full text-[10px] font-bold border border-gold-500/20">
                <Sparkles size={10} /> Otimizado por IA
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-black text-white tracking-tighter">R$ {results.total.toFixed(0)},00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1">Valor/Hora:</span>
              <span className="text-xl font-bold text-white tracking-tight leading-none">R$ {results.hourlyRate.toFixed(2)}</span>
            </div>
            <div className="bg-stone-900 border border-stone-800 p-6 rounded-3xl">
              <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest block mb-1">Lucro Bruto:</span>
              <span className="text-xl font-bold text-white tracking-tight leading-none">R$ {results.grossProfit.toFixed(0)},00</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="py-4 bg-transparent border border-gold-500 text-gold-500 font-bold rounded-2xl text-[10px] uppercase tracking-widest active:scale-95 transition-all">
              Salvar Orçamento
            </button>
            <button className="py-4 bg-transparent border border-gold-500 text-gold-500 font-bold rounded-2xl text-[10px] uppercase tracking-widest active:scale-95 transition-all">
              Compartilhar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingCalculator;