import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck } from 'lucide-react';

const PrivacyPolicy = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-900 text-stone-800 dark:text-stone-100 font-sans pb-20">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-stone-900/80 backdrop-blur-md border-b border-stone-200 dark:border-stone-800">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-stone-500 hover:text-stone-800 dark:hover:text-white transition-colors text-sm font-bold uppercase tracking-widest flex items-center gap-2"
                    >
                        <ChevronLeft size={16} /> Voltar
                    </button>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="text-gold-500" size={24} />
                        <span className="font-display italic text-xl">Política de Privacidade</span>
                    </div>
                    <div className="w-20"></div>
                </div>
            </header>

            <main className="pt-32 px-6">
                <div className="container mx-auto max-w-3xl prose prose-stone dark:prose-invert">
                    <h1 className="text-4xl font-display italic mb-8">Política de Privacidade</h1>
                    <p className="text-sm text-stone-500 mb-8">Última atualização: 03 de Fevereiro de 2026</p>

                    <h3>1. Introdução</h3>
                    <p>
                        O Trança Pro respeita sua privacidade e está comprometido em proteger seus dados pessoais. Esta política descreve como coletamos, usamos e protegemos suas informações, em conformidade com a Lei Geral de Proteção de Dados (LGPD).
                    </p>

                    <h3>2. Coleta de Dados</h3>
                    <p>
                        Coletamos informações que você nos fornece diretamente ao utilizar a plataforma, incluindo:
                    </p>
                    <ul>
                        <li>Dados de cadastro: Nome, email, senha e foto de perfil.</li>
                        <li>Dados do estúdio: Informações sobre serviços e preços.</li>
                        <li>Dados de uso: Registros de agendamentos e clientes.</li>
                    </ul>

                    <h3>3. Uso das Informações</h3>
                    <p>
                        Utilizamos seus dados para:
                    </p>
                    <ul>
                        <li>Fornecer e melhorar nossos serviços;</li>
                        <li>Processar pagamentos e assinaturas;</li>
                        <li>Enviar comunicações importantes sobre sua conta;</li>
                        <li>Personalizar sua experiência com nossa Inteligência Artificial (Zuri).</li>
                    </ul>

                    <h3>4. Compartilhamento de Dados</h3>
                    <p>
                        Não vendemos seus dados pessoais. Podemos compartilhar informações apenas com:
                    </p>
                    <ul>
                        <li>Processadores de pagamento seguros (para transações).</li>
                        <li>Provedores de infraestrutura em nuvem (para hospedagem).</li>
                        <li>Autoridades legais, quando exigido por lei.</li>
                    </ul>

                    <h3>5. Segurança dos Dados</h3>
                    <p>
                        Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado, alteração ou destruição. Seus dados são armazenados em servidores seguros com criptografia.
                    </p>

                    <h3>6. Seus Direitos</h3>
                    <p>
                        Você tem o direito de:
                    </p>
                    <ul>
                        <li>Acessar seus dados pessoais;</li>
                        <li>Solicitar a correção de dados incompletos ou incorretos;</li>
                        <li>Solicitar a exclusão de seus dados;</li>
                        <li>Revogar seu consentimento a qualquer momento.</li>
                    </ul>

                    <h3>7. Cookies</h3>
                    <p>
                        Utilizamos cookies essenciais para autenticação e funcionamento da plataforma. Não utilizamos cookies de rastreamento de terceiros para fins publicitários sem seu consentimento explícito.
                    </p>

                    <h3>8. Contato</h3>
                    <p>
                        Para exercer seus direitos ou tirar dúvidas sobre privacidade, entre em contato com nosso Encarregado de Proteção de Dados (DPO) pelo email: <a href="mailto:dpo@trancapro.com">dpo@trancapro.com</a>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicy;
