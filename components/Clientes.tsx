
import React, { useState } from 'react';
import { Search, UserPlus, MessageCircle, Calendar, Filter, MoreVertical, Star } from 'lucide-react';

const Clientes = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const initialClients = [
        { id: 1, name: 'Mariana Silva', phone: '(11) 98765-4321', lastService: 'Box Braids', date: '12 Out 2026', totalSpent: 850, avatar: '/images/client_mariana.png', rating: 5 },
        { id: 2, name: 'Ana Paula', phone: '(11) 97766-5544', lastService: 'Nagô Geométrica', date: '05 Out 2026', totalSpent: 420, avatar: '/images/client_ana.png', rating: 4 },
        { id: 3, name: 'Juliana Guedes', phone: '(11) 96655-4433', lastService: 'Knotless', date: '28 Set 2026', totalSpent: 1200, avatar: '/images/client_juliana.png', rating: 5 },
        { id: 4, name: 'Priscila Costa', phone: '(11) 95544-3322', lastService: 'Fulani Braids', date: '15 Set 2026', totalSpent: 350, avatar: '/images/client_priscila.png', rating: 4 },
        { id: 5, name: 'Beatriz Santos', phone: '(11) 94433-2211', lastService: 'Gypsy Braids', date: '10 Set 2026', totalSpent: 900, avatar: '/images/client_beatriz.png', rating: 5 },
    ];

    const filteredClients = initialClients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.lastService.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6 lg:space-y-8 animate-fade-in pb-24 lg:pb-8">
            <header className="flex items-center justify-between pt-4 lg:pt-0">
                <div>
                    <h1 className="text-2xl font-bold text-white tracking-tight">Suas Clientes</h1>
                    <p className="text-xs text-stone-500 uppercase tracking-widest font-bold">{initialClients.length} contatos ativos</p>
                </div>
                <button className="w-12 h-12 bg-gold-500 text-stone-950 rounded-2xl flex items-center justify-center shadow-lg shadow-gold-500/20 active:scale-90 transition-transform hover:bg-gold-400">
                    <UserPlus size={24} />
                </button>
            </header>

            {/* Search and Filter */}
            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search size={18} className="absolute left-4 top-4 text-stone-500" />
                    <input
                        type="text"
                        placeholder="Pesquisar por nome ou serviço..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 text-white p-4 pl-12 rounded-2xl focus:border-gold-500 outline-none transition-all placeholder:text-stone-600 hover:border-stone-700"
                    />
                </div>
                <button className="w-14 h-14 bg-stone-900 border border-stone-800 rounded-2xl flex items-center justify-center text-stone-500 active:text-gold-500 hover:text-white transition-colors hover:border-stone-700">
                    <Filter size={20} />
                </button>
            </div>

            {/* Client List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredClients.map(client => (
                    <div key={client.id} className="bg-stone-900/60 border border-stone-800 p-4 rounded-[2rem] flex items-center justify-between group active:scale-[0.98] lg:hover:scale-[1.01] transition-all hover:bg-stone-900 hover:border-stone-700/50">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-gold-500/10 relative shadow-md">
                                <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <h4 className="font-bold text-white tracking-tight text-lg">{client.name}</h4>
                                    <div className="flex items-center gap-0.5">
                                        <Star size={10} className="text-gold-500 fill-gold-500" />
                                        <span className="text-[10px] text-gold-500 font-bold">{client.rating}.0</span>
                                    </div>
                                </div>
                                <p className="text-[10px] text-stone-500 uppercase tracking-widest font-bold">{client.lastService} • {client.date}</p>
                                <p className="text-xs text-emerald-500 font-bold">Total Investido: R$ {client.totalSpent.toFixed(0)}</p>
                            </div>
                        </div>

                        <div className="flex gap-2 flex-col sm:flex-row">
                            <button className="w-10 h-10 bg-stone-800/50 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:bg-gold-500 hover:text-stone-900 border border-stone-700/50 transition-colors">
                                <MessageCircle size={18} />
                            </button>
                            <button className="w-10 h-10 bg-stone-800/50 rounded-full flex items-center justify-center text-stone-400 hover:text-white hover:bg-gold-500 hover:text-stone-900 border border-stone-700/50 transition-colors">
                                <Calendar size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredClients.length === 0 && (
                <div className="text-center py-20 flex flex-col items-center gap-4 opacity-50">
                    <div className="w-16 h-16 rounded-full bg-stone-900 flex items-center justify-center">
                        <Search className="text-stone-600" size={24} />
                    </div>
                    <p className="text-stone-500 font-medium">Nenhuma cliente encontrada com esses termos.</p>
                </div>
            )}
        </div>
    );
};

export default Clientes;
