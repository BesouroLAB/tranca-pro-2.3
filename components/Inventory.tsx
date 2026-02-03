
import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, AlertTriangle, TrendingUp, History, Filter, ArrowRight, MoreHorizontal, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface StockItem {
    id: string;
    name: string;
    category: 'Cabelo' | 'Produtos' | 'Ferramentas' | 'Acessórios';
    quantity: number;
    minQuantity: number;
    unit: string;
    lastBought: string;
    status: 'ok' | 'low' | 'out';
    price: number;
}

const Inventory = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [items, setItems] = useState<StockItem[]>([]);
    const [editingItem, setEditingItem] = useState<StockItem | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem('inventory_items');
        if (saved) {
            setItems(JSON.parse(saved));
        } else {
            const mockItems: StockItem[] = [
                { id: '1', name: 'Jumbo Preto (Kanekalon)', category: 'Cabelo', quantity: 2, minQuantity: 5, unit: 'pacotes', lastBought: '2026-01-15', status: 'low', price: 35 },
                { id: '2', name: 'Jumbo Castanho 04', category: 'Cabelo', quantity: 12, minQuantity: 6, unit: 'pacotes', lastBought: '2026-01-20', status: 'ok', price: 32 },
                { id: '3', name: 'Pomada Modeladora Extra Forte', category: 'Produtos', quantity: 1, minQuantity: 3, unit: 'potes', lastBought: '2026-01-10', status: 'low', price: 45 },
                { id: '4', name: 'Agulha para Crochet', category: 'Ferramentas', quantity: 0, minQuantity: 2, unit: 'unidades', lastBought: '2025-12-01', status: 'out', price: 12 },
                { id: '5', name: 'Anéis Dourados (Decoração)', category: 'Acessórios', quantity: 150, minQuantity: 50, unit: 'unid', lastBought: '2026-01-25', status: 'ok', price: 0.5 },
                { id: '6', name: 'Gel Fixador Termoativo', category: 'Produtos', quantity: 8, minQuantity: 4, unit: 'unid', lastBought: '2026-01-18', status: 'ok', price: 28 },
            ];
            setItems(mockItems);
            localStorage.setItem('inventory_items', JSON.stringify(mockItems));
        }
    }, []);

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const updateQuantity = (id: string, delta: number) => {
        const updated = items.map(item => {
            if (item.id === id) {
                const newQty = Math.max(0, item.quantity + delta);
                let newStatus: StockItem['status'] = 'ok';
                if (newQty === 0) newStatus = 'out';
                else if (newQty < item.minQuantity) newStatus = 'low';
                return { ...item, quantity: newQty, status: newStatus };
            }
            return item;
        });
        setItems(updated);
        localStorage.setItem('inventory_items', JSON.stringify(updated));
    };

    const handleUpdatePrice = (id: string) => {
        const item = items.find(i => i.id === id);
        if (!item) return;
        const newPrice = prompt(`Novo preço para ${item.name}:`, item.price.toString());
        if (newPrice && !isNaN(parseFloat(newPrice))) {
            const updated = items.map(i => i.id === id ? { ...i, price: parseFloat(newPrice) } : i);
            setItems(updated);
            localStorage.setItem('inventory_items', JSON.stringify(updated));
        }
    };

    const handleEditItem = (item: StockItem) => {
        const newName = prompt('Editar Nome:', item.name);
        if (newName) {
            const updated = items.map(i => i.id === item.id ? { ...i, name: newName } : i);
            setItems(updated);
            localStorage.setItem('inventory_items', JSON.stringify(updated));
        }
    };

    const handleAddItem = () => {
        const name = prompt('Nome do novo item:');
        if (!name) return;

        const newItem: StockItem = {
            id: Date.now().toString(),
            name,
            category: 'Cabelo',
            quantity: 0,
            minQuantity: 5,
            unit: 'unid',
            lastBought: new Date().toISOString().split('T')[0],
            status: 'out',
            price: 0
        };

        const updated = [...items, newItem];
        setItems(updated);
        localStorage.setItem('inventory_items', JSON.stringify(updated));
    };

    const stats = {
        total: items.length,
        low: items.filter(i => i.status === 'low').length,
        out: items.filter(i => i.status === 'out').length,
        value: items.reduce((acc, i) => acc + (i.quantity * i.price), 0)
    };

    return (
        <div className="space-y-8 animate-fade-in pb-24 lg:pb-8">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 lg:pt-0">
                <div>
                    <h1 className="text-3xl font-black text-white tracking-tight">Controle de Estoque</h1>
                    <p className="text-xs text-stone-500 uppercase tracking-widest font-bold mt-1">Gestão Inteligente de Insumos</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex-1 md:flex-none bg-stone-800 border border-stone-700 text-white px-6 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-stone-700 transition-all">
                        <History size={18} />
                        Histórico
                    </button>
                    <button
                        onClick={handleAddItem}
                        className="flex-1 md:flex-none bg-gold-500 text-stone-950 px-6 py-3 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-gold-400 shadow-lg shadow-gold-500/20 transition-all active:scale-95"
                    >
                        <Plus size={18} />
                        Novo Item
                    </button>
                </div>
            </header>

            {/* Quick Stats Dashboard */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-stone-900 border border-stone-800 p-5 rounded-[2rem] relative overflow-hidden group">
                    <div className="flex justify-between items-start relative z-10">
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Total Geral</span>
                        <Package size={14} className="text-stone-600" />
                    </div>
                    <h3 className="text-3xl font-black text-white mt-2 relative z-10">{stats.total}</h3>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-stone-800/10 rounded-full blur-2xl group-hover:bg-stone-800/20 transition-all"></div>
                </div>

                <div className="bg-orange-950/20 border border-orange-500/20 p-5 rounded-[2rem] relative overflow-hidden group">
                    <div className="flex justify-between items-start relative z-10">
                        <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Estoque Baixo</span>
                        <AlertTriangle size={14} className="text-orange-500" />
                    </div>
                    <h3 className="text-3xl font-black text-white mt-2 relative z-10">{stats.low}</h3>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all"></div>
                </div>

                <div className="bg-red-950/20 border border-red-500/20 p-5 rounded-[2rem] relative overflow-hidden group">
                    <div className="flex justify-between items-start relative z-10">
                        <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Esgotados</span>
                        <Package size={14} className="text-red-500" />
                    </div>
                    <h3 className="text-3xl font-black text-white mt-2 relative z-10">{stats.out}</h3>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all"></div>
                </div>

                <div className="bg-emerald-950/20 border border-emerald-500/20 p-5 rounded-[2rem] relative overflow-hidden group">
                    <div className="flex justify-between items-start relative z-10">
                        <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Ativo em Estoque</span>
                        <TrendingUp size={14} className="text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-black text-white mt-2 relative z-10">R$ {stats.value.toLocaleString('pt-BR')}</h3>
                    <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all"></div>
                </div>
            </div>

            {/* Filters and Management */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-stone-500 group-focus-within:text-gold-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar item ou categoria..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full bg-stone-900 border border-stone-800 text-white pl-14 pr-6 py-4 rounded-2xl focus:border-gold-500 outline-none transition-all placeholder:text-stone-600"
                    />
                </div>
                <button className="bg-stone-900 border border-stone-800 p-4 rounded-2xl text-stone-400 hover:text-white transition-colors flex items-center justify-center gap-2">
                    <Filter size={20} />
                    Filtros
                </button>
            </div>

            {/* Inventory Table/Grid */}
            <div className="grid grid-cols-1 gap-4">
                {filteredItems.map((item) => (
                    <div key={item.id} className="bg-stone-900/50 border border-stone-800 p-5 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-stone-900 hover:border-stone-700 transition-all group relative overflow-hidden">
                        <div className="flex items-center gap-5">
                            <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center border-2 shadow-lg transition-transform group-hover:scale-105 ${item.status === 'ok' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' :
                                item.status === 'low' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' :
                                    'bg-red-500/10 border-red-500/20 text-red-500'
                                }`}>
                                <Package size={28} />
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center gap-3">
                                    <h4 className="text-lg font-black text-white tracking-tight">{item.name}</h4>
                                    <span className="bg-stone-800 text-[10px] font-black text-stone-400 px-2 py-0.5 rounded-lg uppercase tracking-widest">{item.category}</span>
                                </div>
                                <p className="text-xs text-stone-500">Última compra: {new Date(item.lastBought).toLocaleDateString('pt-BR')}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-8 md:gap-12 lg:gap-16">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">Mínimo Ideal</span>
                                <span className="text-sm font-bold text-stone-400">{item.minQuantity} {item.unit}</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-stone-600 uppercase tracking-widest mb-1">Qtd Atual</span>
                                <div className="flex items-center gap-2">
                                    <span className={`text-2xl font-black ${item.status === 'ok' ? 'text-white' :
                                        item.status === 'low' ? 'text-orange-500' :
                                            'text-red-500'
                                        }`}>{item.quantity}</span>
                                    <span className="text-xs font-medium text-stone-500 self-end mb-1">{item.unit}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => updateQuantity(item.id, -1)}
                                    className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-all active:scale-95"
                                >
                                    −
                                </button>
                                <button
                                    onClick={() => updateQuantity(item.id, 1)}
                                    className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-all active:scale-95"
                                >
                                    +
                                </button>
                                <button
                                    onClick={() => handleUpdatePrice(item.id)}
                                    className="w-10 h-10 bg-stone-800 rounded-xl flex items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-all active:scale-95"
                                    title="Alterar Preço"
                                >
                                    <span className="text-xs font-bold">R$</span>
                                </button>
                                <button
                                    onClick={() => handleEditItem(item)}
                                    className="hidden lg:flex w-10 h-10 bg-stone-800 rounded-xl items-center justify-center text-stone-400 hover:text-white hover:bg-stone-700 transition-all"
                                >
                                    <MoreHorizontal size={18} />
                                </button>
                                <button className="flex lg:hidden w-full bg-stone-800 p-2 rounded-xl items-center justify-center text-stone-400">
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Status bar bottom indicator */}
                        <div className={`absolute bottom-0 left-0 h-1 w-full transition-all ${item.status === 'ok' ? 'bg-emerald-500/20 group-hover:bg-emerald-500' :
                            item.status === 'low' ? 'bg-orange-500/20 group-hover:bg-orange-500' :
                                'bg-red-500/20 group-hover:bg-red-500'
                            }`}></div>
                    </div>
                ))}

                {filteredItems.length === 0 && (
                    <div className="text-center py-24 opacity-30 flex flex-col items-center gap-4">
                        <Package size={64} />
                        <p className="font-bold uppercase tracking-widest text-sm">Nenhum item localizado</p>
                    </div>
                )}
            </div>

            {/* Smart Suggestions Call to Action */}
            <div className="bg-gradient-to-r from-stone-900 to-amber-950/20 border border-amber-500/20 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group mt-12">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 justify-center md:justify-start">
                            <TrendingUp className="text-amber-500" size={20} />
                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Sugestão de Compra</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">Zuri identificou necessidade <br /> de reposição imediata.</h3>
                        <p className="text-stone-400 text-sm max-w-md">3 itens estão abaixo do mínimo tolerável para manter sua agenda de Novembro.</p>
                    </div>
                    <button onClick={() => navigate('/materiais')} className="bg-amber-500 text-stone-950 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-amber-400 transition-all active:scale-95 shadow-xl shadow-amber-500/10">
                        Gerar Lista de Compras
                        <ChevronRight size={16} />
                    </button>
                </div>
                {/* Visual decoration */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
            </div>
        </div>
    );
};

export default Inventory;
