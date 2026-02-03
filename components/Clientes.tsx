
import React, { useState, useEffect } from 'react';
import {
    Search,
    UserPlus,
    MessageCircle,
    Calendar,
    Filter,
    MoreVertical,
    Star,
    Phone,
    MapPin,
    Tag,
    Clock,
    Scissors,
    ShieldAlert,
    DollarSign,
    ChevronRight,
    Package,
    X
} from 'lucide-react';

const Clientes = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newClient, setNewClient] = useState({ name: '', phone: '', hairType: '4C' });

    const [clients, setClients] = useState<any[]>([]);

    const CLIENTS_STORGE_KEY = 'tranca_pro_clients_v2';

    // Load clients
    useEffect(() => {
        const saved = localStorage.getItem(CLIENTS_STORGE_KEY);
        if (saved) {
            setClients(JSON.parse(saved));
        } else {
            const initial = [
                {
                    id: 1,
                    name: 'Mariana Silva',
                    phone: '(11) 98765-4321',
                    lastService: 'Box Braids Giga',
                    date: '12 Out 2026',
                    totalSpent: 1850,
                    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e16fd47?auto=format&fit=crop&q=80&w=200',
                    rating: 5,
                    hairType: '4C',
                    loyalty: 'VIP',
                    status: 'active'
                },
                {
                    id: 2,
                    name: 'Ana Paula',
                    phone: '(11) 97766-5544',
                    lastService: 'Nagô Geométrica',
                    date: '05 Out 2026',
                    totalSpent: 1420,
                    avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=200',
                    rating: 4,
                    hairType: '4B',
                    loyalty: 'Recorrente',
                    status: 'active'
                },
                {
                    id: 3,
                    name: 'Juliana Guedes',
                    phone: '(11) 96655-4433',
                    lastService: 'Knotless Boho',
                    date: '28 Set 2026',
                    totalSpent: 3200,
                    avatar: 'https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?q=80&w=1887&auto=format&fit=crop',
                    rating: 5,
                    hairType: '4A',
                    loyalty: 'Master VIP',
                    status: 'active'
                }
            ];
            setClients(initial);
            localStorage.setItem(CLIENTS_STORGE_KEY, JSON.stringify(initial));
        }
    }, []);

    const handleAddClient = (e: React.FormEvent) => {
        e.preventDefault();
        const clientToAdd = {
            id: Date.now(),
            ...newClient,
            lastService: 'Novo Cadastro',
            date: new Date().toLocaleDateString('pt-BR'),
            totalSpent: 0,
            avatar: `https://ui-avatars.com/api/?name=${newClient.name}&background=f59e0b&color=1c1917`,
            rating: 5,
            loyalty: 'Nova',
            status: 'active'
        };

        const updated = [clientToAdd, ...clients];
        setClients(updated);
        localStorage.setItem(CLIENTS_STORGE_KEY, JSON.stringify(updated));

        setIsModalOpen(false);
        setNewClient({ name: '', phone: '', hairType: '4C' });
    };

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.lastService.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-8 animate-fade-in pb-24 lg:pb-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 lg:pt-0">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-[2rem] bg-stone-900 border border-stone-800 flex items-center justify-center text-gold-500 shadow-xl">
                        <UserPlus size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Gestão de Clientes</h1>
                        <p className="text-[10px] text-stone-500 uppercase tracking-[0.3em] font-black">{clients.length} CONEXÕES ATIVAS</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="flex-1 md:flex-none px-6 py-3 bg-stone-800 border border-stone-700 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-stone-700 transition-all">
                        <Tag size={18} />
                        Segmentação
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex-1 md:flex-none px-6 py-3 bg-gold-500 text-stone-950 rounded-2xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-gold-500/20 active:scale-95 transition-all hover:bg-gold-400"
                    >
                        Novo Contato
                    </button>
                </div>
            </header>

            {/* Smart Search Bar */}
            <div className="flex gap-3">
                <div className="relative flex-1 group">
                    <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-gold-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Busca avançada (nome, serviço, tipo de cabelo...)"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 text-white p-4 pl-14 rounded-2xl focus:border-gold-500 outline-none transition-all placeholder:text-stone-600 hover:border-stone-700"
                    />
                </div>
                <button className="w-14 h-14 bg-stone-900 border border-stone-800 rounded-2xl flex items-center justify-center text-stone-500 hover:text-white transition-all hover:border-stone-700">
                    <Filter size={20} />
                </button>
            </div>

            {/* Client Intelligent Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                {filteredClients.map(client => (
                    <div key={client.id} className="bg-stone-950 border border-stone-800 p-6 rounded-[2.5rem] flex flex-col gap-6 group hover:border-stone-700 transition-all shadow-xl relative overflow-hidden">
                        {/* Status Notch */}
                        <div className={`absolute top-0 right-12 px-3 py-1 rounded-b-xl text-[9px] font-black uppercase tracking-widest ${client.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border border-t-0 border-emerald-500/20' : 'bg-stone-800 text-stone-500'
                            }`}>
                            {client.status === 'active' ? 'Atendimento Regular' : 'Afastada'}
                        </div>

                        <div className="flex items-start justify-between relative z-10">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden border-2 border-stone-800 group-hover:border-gold-500/30 transition-colors">
                                        <img src={client.avatar} alt={client.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-stone-900 border border-stone-800 p-1.5 rounded-lg shadow-lg">
                                        <Star size={12} className="text-gold-500 fill-gold-500" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-xl font-black text-white tracking-tight">{client.name}</h4>
                                        {client.loyalty.includes('VIP') && (
                                            <ShieldAlert size={14} className="text-gold-500" />
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Fibra {client.hairType}</span>
                                        <span className="w-1 h-1 rounded-full bg-stone-800"></span>
                                        <span className="text-[10px] font-black text-gold-500 uppercase tracking-widest">{client.loyalty}</span>
                                    </div>
                                </div>
                            </div>
                            <button className="text-stone-600 hover:text-white transition-colors">
                                <MoreVertical size={20} />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-stone-900/50 p-4 rounded-2xl border border-stone-800/50">
                                <div className="flex items-center gap-2 text-stone-500 mb-1">
                                    <Scissors size={12} />
                                    <span className="text-[9px] font-bold uppercase tracking-widest">Último Estilo</span>
                                </div>
                                <p className="text-xs font-bold text-white leading-tight">{client.lastService}</p>
                            </div>
                            <div className="bg-stone-900/50 p-4 rounded-2xl border border-stone-800/50">
                                <div className="flex items-center gap-2 text-stone-500 mb-1">
                                    <DollarSign size={12} />
                                    <span className="text-[9px] font-bold uppercase tracking-widest">LTV (Total)</span>
                                </div>
                                <p className="text-xs font-bold text-emerald-500">R$ {client.totalSpent.toLocaleString('pt-BR')}</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-stone-900">
                            <div className="flex items-center gap-2 text-stone-600">
                                <Clock size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-tighter">Visto em {client.date}</span>
                            </div>
                            <div className="flex gap-2">
                                <button className="w-10 h-10 bg-stone-900 text-stone-400 rounded-xl flex items-center justify-center hover:bg-gold-500 hover:text-stone-950 transition-all border border-stone-800 active:scale-95">
                                    <Phone size={18} />
                                </button>
                                <button className="w-10 h-10 bg-stone-900 text-stone-400 rounded-xl flex items-center justify-center hover:bg-emerald-500 hover:text-stone-950 transition-all border border-stone-800 active:scale-95">
                                    <MessageCircle size={18} />
                                </button>
                                <button className="px-4 h-10 bg-stone-800 text-white rounded-xl flex items-center justify-center text-[10px] font-black uppercase tracking-widest hover:bg-stone-700 transition-all active:scale-95">
                                    Agendar
                                </button>
                            </div>
                        </div>

                        {/* Visual Depth Decoration */}
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gold-500/5 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    </div>
                ))}
            </div>

            {filteredClients.length === 0 && (
                <div className="text-center py-20 flex flex-col items-center gap-4 opacity-30">
                    <Search size={48} className="text-stone-600" />
                    <p className="text-stone-500 font-black uppercase tracking-[0.2em] text-sm">Nenhum registro encontrado</p>
                </div>
            )}

            {/* Modal Novo Contato */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-fade-in">
                    <div className="w-full max-w-md bg-stone-900 border border-stone-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

                        <div className="flex justify-between items-center mb-6 relative z-10">
                            <h3 className="text-xl font-black text-white tracking-tight">Nova Cliente</h3>
                            <button onClick={() => setIsModalOpen(false)} className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-stone-500 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleAddClient} className="space-y-4 relative z-10">
                            <div>
                                <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2 block">Nome Completo</label>
                                <input
                                    required
                                    type="text"
                                    value={newClient.name}
                                    onChange={e => setNewClient({ ...newClient, name: e.target.value })}
                                    placeholder="Ex: Mariana Silva"
                                    className="w-full bg-stone-800 border border-stone-700 text-white p-4 rounded-xl focus:border-gold-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2 block">WhatsApp</label>
                                <input
                                    required
                                    type="text"
                                    value={newClient.phone}
                                    onChange={e => setNewClient({ ...newClient, phone: e.target.value })}
                                    placeholder="(11) 99999-9999"
                                    className="w-full bg-stone-800 border border-stone-700 text-white p-4 rounded-xl focus:border-gold-500 outline-none transition-all"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-2 block">Tipo de Cabelo (Opicional)</label>
                                <select
                                    value={newClient.hairType}
                                    onChange={e => setNewClient({ ...newClient, hairType: e.target.value })}
                                    className="w-full bg-stone-800 border border-stone-700 text-white p-4 rounded-xl focus:border-gold-500 outline-none transition-all appearance-none"
                                >
                                    <option value="4C">Tipo 4C (Crespo)</option>
                                    <option value="4B">Tipo 4B</option>
                                    <option value="4A">Tipo 4A</option>
                                    <option value="3C">Tipo 3C</option>
                                </select>
                            </div>

                            <button className="w-full bg-gold-500 text-stone-950 font-black py-4 rounded-2xl mt-4 shadow-lg shadow-gold-500/20 active:scale-95 transition-all">
                                Cadastrar Cliente
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Clientes;
