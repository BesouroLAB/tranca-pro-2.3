
import React, { useState } from 'react';
import { Sparkles, ChevronLeft, Settings, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MaterialsCalculator = () => {
  const navigate = useNavigate();
  const [style, setStyle] = useState('Box Braids');
  const [length, setLength] = useState('Cintura');
  const [density, setDensity] = useState(50);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ packs: number; time: number; pomade: number } | null>(null);

  const styles = [
    { name: 'Box Braids', img: '/images/box_braids.png' },
    { name: 'Fulani', img: '/images/fulani_braids.png' },
    { name: 'Knotless', img: '/images/knotless_braids.png' },
  ];

  // Calculation Logic
  const calculateMaterials = () => {
    setIsLoading(true);
    setResult(null);

    // Simulate AI processing time
    setTimeout(() => {
      let basePacks = 4;
      let time = 4;

      // Style Adjustments
      if (style === 'Box Braids') { basePacks = 4; time = 5; }
      if (style === 'Fulani') { basePacks = 3; time = 4.5; }
      if (style === 'Knotless') { basePacks = 4; time = 6; }

      // Length Adjustments
      if (length === 'Quadril') { basePacks += 1; time += 1; }
      if (length === 'Joelho') { basePacks += 2; time += 2; }

      // Density Adjustments
      if (density > 75) { basePacks += 1; time += 1; }
      if (density < 25) { basePacks = Math.max(2, basePacks - 1); time -= 1; }

      setResult({ packs: basePacks, time: time, pomade: density > 75 ? 2 : 1 });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-24">
      <header className="flex items-center justify-between pt-4 lg:pt-0">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gold-500/20 bg-stone-800 flex items-center justify-center">
            <span className="text-xl">👩🏾‍🦱</span>
          </div>
          <div>
            <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">Estoque & Custos</p>
            <h1 className="text-xl font-bold text-white tracking-tight">Calculadora</h1>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 bg-stone-800/50 rounded-full flex items-center justify-center text-stone-300 border border-stone-700/50 shadow-sm active:scale-90 transition-transform">
            <Globe size={18} />
          </button>
          <button onClick={() => navigate('/configuracoes')} className="w-10 h-10 bg-stone-800/50 rounded-full flex items-center justify-center text-stone-300 border border-stone-700/50 shadow-sm active:scale-90 transition-transform">
            <Settings size={18} />
          </button>
        </div>
      </header>

      <div className="px-1">
        <h2 className="text-2xl font-bold text-white tracking-tight">Estimativa de Materiais</h2>
        <p className="text-stone-500 text-sm">A IA calcula a quantidade exata de jumbo e tempo.</p>
      </div>

      <div id="tour-materials-form" className="space-y-6">
        {/* Style Selection */}
        <div>
          <h3 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-4 block">Selecione o Estilo</h3>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {styles.map((s, i) => (
              <button
                key={i}
                onClick={() => { setStyle(s.name); setResult(null); }}
                className="flex flex-col items-center gap-3 shrink-0 group"
              >
                <div className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${style === s.name ? 'border-gold-500 scale-105 shadow-gold-500/20 shadow-lg' : 'border-stone-800 opacity-60'}`}>
                  <img src={s.img} alt={s.name} className="w-full h-full object-cover" />
                </div>
                <span className={`text-[11px] font-bold ${style === s.name ? 'text-gold-500' : 'text-stone-500'}`}>{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Length Selection */}
        <div>
          <h3 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest mb-4 block">Comprimento</h3>
          <div className="grid grid-cols-3 gap-3">
            {['Cintura', 'Quadril', 'Joelho'].map(l => (
              <button
                key={l}
                onClick={() => { setLength(l); setResult(null); }}
                className={`py-4 rounded-xl text-xs font-bold transition-all border ${length === l ? 'bg-stone-900 border-gold-500 text-white shadow-lg' : 'bg-stone-950 border-stone-800 text-stone-500'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Density Slider */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-bold text-gold-500 uppercase tracking-widest block">Densidade (Volume)</h3>
          <div className="px-1">
            <input
              type="range"
              min="0"
              max="100"
              value={density}
              onChange={e => { setDensity(Number(e.target.value)); setResult(null); }}
              className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-gold-500 mb-2"
            />
            <div className="flex justify-between text-[10px] font-bold text-stone-500 uppercase tracking-tighter uppercase tracking-widest">
              <span>Leve</span>
              <span>Média</span>
              <span>Cheia</span>
            </div>
          </div>
        </div>

        {/* Calculate Button */}
        {!result && !isLoading && (
          <button
            onClick={calculateMaterials}
            className="w-full py-5 bg-gold-500 hover:bg-gold-400 text-stone-950 font-black rounded-2xl shadow-xl shadow-gold-500/20 active:scale-[0.98] transition-all uppercase tracking-widest text-sm flex items-center justify-center gap-2"
          >
            <Sparkles size={18} /> Calcular Estimativa
          </button>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="bg-stone-900 border border-stone-800 rounded-[2rem] p-12 flex flex-col items-center justify-center animate-pulse">
            <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-stone-400 font-bold text-sm tracking-widest uppercase">Analisando estilo...</p>
          </div>
        )}

        {/* Results Card */}
        {result && (
          <div className="bg-stone-900 border border-stone-800 rounded-[2rem] overflow-hidden animate-fade-in shadow-2xl shadow-black/50">
            <div className="bg-gold-500 text-stone-900 py-3 text-center text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
              <Sparkles size={12} /> Estimativa Final
            </div>
            <div className="p-8 text-center space-y-6">
              <h4 className="text-2xl font-bold text-white tracking-tight leading-tight">
                {result.packs} Pacotes de Jumbo (60cm)<br />
                {result.pomade} Pomada{result.pomade > 1 ? 's' : ''} Modeladora
              </h4>
              <div className="inline-block bg-stone-800 px-4 py-2 rounded-xl text-stone-300 font-bold text-xs border border-stone-700">
                Tempo Estimado: {result.time} horas
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-800">
                <button onClick={() => { setStyle('Box Braids'); setResult(null); }} className="py-3 bg-stone-800 text-stone-400 font-bold rounded-xl text-xs hover:text-white transition-colors">
                  Recalcular
                </button>
                <button className="py-3 bg-white text-stone-900 font-bold rounded-xl text-xs hover:bg-stone-200 transition-colors">
                  Salvar Nota
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MaterialsCalculator;