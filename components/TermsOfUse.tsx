import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ScrollText } from 'lucide-react';

const TermsOfUse = () => {
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
                        <ScrollText className="text-gold-500" size={24} />
                        <span className="font-display italic text-xl">Termos de Uso</span>
                    </div>
                    <div className="w-20"></div>
                </div>
            </header>

            <main className="pt-32 px-6">
                <div className="container mx-auto max-w-3xl prose prose-stone dark:prose-invert">
                    <h1 className="text-4xl font-display italic mb-8">Termos e Condições de Uso</h1>
                    <p className="text-sm text-stone-500 mb-8">Última atualização: 03 de Fevereiro de 2026</p>

                    <h3>1. Aceitação dos Termos</h3>
                    <p>
                        Ao acessar e utilizar o Trança Pro ("Plataforma"), você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá utilizar nossos serviços.
                    </p>

                    <h3>2. Descrição do Serviço</h3>
                    <p>
                        O Trança Pro é uma plataforma de gestão para trancistas e salões de beleza, oferecendo ferramentas para agendamento, gestão financeira, controle de clientes e recursos de inteligência artificial.
                    </p>

                    <h3>3. Uso da Licença</h3>
                    <p>
                        Concedemos a você uma licença limitada, não exclusiva e intransferível para usar a Plataforma apenas para fins profissionais internos. É proibido:
                    </p>
                    <ul>
                        <li>Revender, sublicenciar ou comercializar o acesso à Plataforma;</li>
                        <li>Tentar fazer engenharia reversa ou copiar o código-fonte;</li>
                        <li>Usar a Plataforma para atividades ilegais ou não autorizadas.</li>
                    </ul>

                    <h3>4. Planos e Pagamentos</h3>
                    <p>
                        Alguns recursos do Trança Pro são pagos. Ao assinar um plano Premium, você concorda com os preços e ciclos de faturamento apresentados no momento da compra. O cancelamento pode ser feito a qualquer momento, sem reembolso do período já pago.
                    </p>

                    <h3>5. Propriedade Intelectual</h3>
                    <p>
                        Todo o conteúdo, design, logotipos e software presentes na Plataforma são propriedade exclusiva do Trança Pro e estão protegidos por leis de direitos autorais e propriedade intelectual.
                    </p>

                    <h3>6. Limitação de Responsabilidade</h3>
                    <p>
                        A Plataforma é fornecida "como está". Não garantimos que o serviço será ininterrupto ou livre de erros. Em nenhuma circunstância o Trança Pro será responsável por danos indiretos, incidentais ou lucros cessantes decorrentes do uso da Plataforma.
                    </p>

                    <h3>7. Modificações</h3>
                    <p>
                        Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações entrarão em vigor imediatamente após a publicação na Plataforma. O uso continuado após as alterações constitui aceitação dos novos termos.
                    </p>

                    <h3>8. Contato</h3>
                    <p>
                        Para dúvidas sobre estes termos, entre em contato através do email: <a href="mailto:legal@trancapro.com">legal@trancapro.com</a>
                    </p>
                </div>
            </main>
        </div>
    );
};

export default TermsOfUse;
