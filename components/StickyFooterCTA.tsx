
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';

interface StickyFooterCTAProps {
    onStart?: () => void;
}

const StickyFooterCTA = ({ onStart }: StickyFooterCTAProps) => {
    const navigate = useNavigate();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = () => {
        if (onStart) {
            onStart();
        } else {
            navigate('/dashboard');
        }
    };

    return (
        <div
            className={`fixed bottom-0 left-0 right-0 z-50 p-4 lg:hidden transition-transform duration-500 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
        >
            <button
                onClick={handleClick}
                className="w-full bg-gold-500 text-stone-900 font-black uppercase tracking-widest py-4 rounded-2xl shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all text-sm border-2 border-stone-900"
            >
                <Sparkles size={18} />
                Testar Grátis Agora
                <ArrowRight size={18} />
            </button>
        </div>
    );
};

export default StickyFooterCTA;
