import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Terms = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
            <header className="bg-white border-b border-stone-200 sticky top-0 z-50">
                <div className="container mx-auto px-6 h-20 flex items-center gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="p-2 -ml-2 hover:bg-stone-100 rounded-full transition-colors"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <h1 className="font-display italic text-xl">Termos de Uso</h1>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 max-w-3xl prose prose-stone prose-headings:font-display prose-a:text-gold-600">
                <p className="font-bold text-sm text-stone-500 uppercase tracking-widest mb-8">Última atualização: 02 de Fevereiro de 2026</p>

                <p>Bem-vindo ao Trança Pro 2.3! Estes Termos de Uso ("Termos") regem o acesso e a utilização do aplicativo Trança Pro, disponibilizado por [INSERIR NOME DA SUA EMPRESA OU SEU NOME], doravante denominado "Nós" ou "Plataforma".</p>

                <p>Ao baixar, acessar ou utilizar o Trança Pro, você ("Usuário" ou "Trancista") concorda expressamente com estes Termos. Se não concordar, por favor, não utilize o aplicativo.</p>

                <h3>1. O Objeto</h3>
                <p>O Trança Pro é uma ferramenta de gestão e auxílio profissional para trancistas, oferecendo funcionalidades como: calculadora de preços e materiais, agenda digital, controle financeiro e assistente virtual com Inteligência Artificial.</p>

                <h3>2. Uso da Inteligência Artificial (Estúdio IA e Escaneamento)</h3>
                <p>O aplicativo utiliza integração com a API do Google Gemini para fornecer dicas, consultoria e análise visual.</p>
                <ul>
                    <li><strong>2.1. Não é Diagnóstico Médico:</strong> As sugestões fornecidas pelo "Estúdio IA" ou "Escaneamento Profissional" sobre saúde capilar (ex: análise de alopecia) são apenas informativas e educativas. A IA não substitui um médico dermatologista ou tricologista. O Usuário deve orientar suas clientes a buscar ajuda médica profissional em casos de doenças do couro cabeludo.</li>
                    <li><strong>2.2. Limitação da IA:</strong> A Inteligência Artificial pode cometer erros (alucinações). O Usuário deve sempre verificar as informações antes de aplicá-las. Não nos responsabilizamos por decisões tomadas exclusivamente com base nas sugestões da IA.</li>
                </ul>

                <h3>3. Ferramentas Financeiras e Calculadoras</h3>
                <ul>
                    <li><strong>3.1. Estimativas:</strong> As calculadoras de preço e materiais fornecem estimativas baseadas nos dados inseridos pelo Usuário.</li>
                    <li><strong>3.2. Isenção de Responsabilidade:</strong> O Trança Pro não garante lucro e não se responsabiliza por prejuízos financeiros, precificação errada ou falta de materiais. A decisão final sobre o preço cobrado e a compra de insumos é inteiramente do Usuário.</li>
                    <li><strong>3.3. Vínculo Fiscal:</strong> O aplicativo é uma ferramenta de controle interno. Não realizamos contabilidade oficial nem emitimos notas fiscais em nome do Usuário. O cumprimento das obrigações fiscais (MEI, Imposto de Renda) é responsabilidade exclusiva do Usuário.</li>
                </ul>

                <h3>4. Conteúdo do Usuário e Privacidade de Terceiros</h3>
                <ul>
                    <li><strong>4.1. Upload de Fotos:</strong> Ao enviar fotos de clientes para o "Escaneamento Profissional", o Usuário declara que possui a autorização/consentimento da cliente para capturar e processar aquela imagem.</li>
                    <li><strong>4.2. Licença:</strong> O Usuário mantém os direitos sobre as fotos enviadas, mas concede ao Trança Pro uma licença para processar essas imagens a fim de entregar o serviço de análise.</li>
                </ul>

                <h3>5. Obrigações do Usuário</h3>
                <p>É proibido utilizar o App para:</p>
                <ul>
                    <li>Inserir dados falsos ou fraudulentos.</li>
                    <li>Violar direitos de propriedade intelectual do Trança Pro (engenharia reversa, cópia do código ou design).</li>
                    <li>Carregar imagens ofensivas, ilegais ou de nudez.</li>
                </ul>

                <h3>6. Planos e Pagamentos (Se aplicável)</h3>
                <ul>
                    <li><strong>6.1.</strong> O download do app é gratuito. Algumas funcionalidades podem exigir assinatura Premium.</li>
                    <li><strong>6.2.</strong> O cancelamento pode ser feito a qualquer momento pelas configurações da loja de aplicativos (Google Play/App Store).</li>
                </ul>

                <h3>7. Limitação de Responsabilidade</h3>
                <p>Em nenhuma hipótese a Plataforma será responsável por danos indiretos, lucros cessantes ou perda de dados decorrentes do uso do aplicativo. O serviço é fornecido "como está" (as is), podendo sofrer indisponibilidades temporárias para manutenção.</p>

                <h3>8. Foro</h3>
                <p>Fica eleito o foro da comarca de [SUA CIDADE/ESTADO], Brasil, para dirimir quaisquer dúvidas oriundas destes Termos.</p>
            </main>
        </div>
    );
};

export default Terms;
