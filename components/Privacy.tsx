import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const Privacy = () => {
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
                    <h1 className="font-display italic text-xl">Política de Privacidade</h1>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 max-w-3xl prose prose-stone prose-headings:font-display prose-a:text-gold-600">
                <p className="font-bold text-sm text-stone-500 uppercase tracking-widest mb-8">Última atualização: 02 de Fevereiro de 2026</p>

                <p>Sua privacidade é prioridade para o Trança Pro. Esta Política descreve como coletamos, usamos e protegemos seus dados, em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</p>

                <h3>1. Dados que Coletamos</h3>
                <p>Para que o aplicativo funcione, coletamos os seguintes dados:</p>
                <ul>
                    <li><strong>Dados de Cadastro:</strong> Nome, e-mail e (opcionalmente) telefone para criação da conta.</li>
                    <li><strong>Dados de Uso:</strong> Registros de agendamentos, valores de serviços (para o financeiro) e preferências de configurações.</li>
                    <li><strong>Conteúdo Enviado:</strong> Fotos de cabelos/penteados carregadas para análise no "Escaneamento Profissional" ou "Estúdio IA".</li>
                    <li><strong>Dados do Dispositivo:</strong> Modelo do celular, sistema operacional e identificadores para correção de bugs.</li>
                </ul>

                <h3>2. Para que usamos seus dados (Finalidade)</h3>
                <ul>
                    <li><strong>Prestação do Serviço:</strong> Para calcular preços, agendar clientes e gerar relatórios financeiros.</li>
                    <li><strong>Recursos de IA:</strong> As fotos e textos enviados ao Assistente IA são processados para gerar as respostas e análises solicitadas.</li>
                    <li><strong>Melhoria do App:</strong> Análise estatística anônima para entender quais funcionalidades são mais usadas.</li>
                </ul>

                <h3>3. Compartilhamento de Dados</h3>
                <p>Não vendemos seus dados pessoais. Compartilhamos informações apenas com parceiros essenciais para o funcionamento do app:</p>
                <ul>
                    <li><strong>Google (Gemini API):</strong> Textos e descrições visuais podem ser enviados para a API do Google para processamento da Inteligência Artificial. O Google processa esses dados conforme suas próprias políticas de privacidade e segurança.</li>
                    <li><strong>Serviços de Nuvem:</strong> Para armazenar seu backup de agenda e financeiro (ex: AWS, Firebase ou similar).</li>
                </ul>

                <h3>4. Dados Sensíveis e Fotos de Terceiros</h3>
                <ul>
                    <li><strong>4.1. Saúde Capilar:</strong> Ao utilizar ferramentas que analisam a saúde do couro cabeludo, podemos tratar dados que a LGPD considera sensíveis (referentes à saúde). O tratamento é feito com base no consentimento do Usuário ao ativar a funcionalidade, estritamente para a finalidade de auxílio profissional.</li>
                    <li><strong>4.2. Fotos de Clientes:</strong> O Usuário (Trancista) é o "Controlador" dos dados de seus clientes. Ao inserir dados ou fotos de terceiros no App, o Usuário garante que obteve o consentimento necessário desses terceiros.</li>
                </ul>

                <h3>5. Seus Direitos (LGPD)</h3>
                <p>Você tem o direito de:</p>
                <ul>
                    <li>Confirmar a existência de tratamento de dados.</li>
                    <li>Acessar seus dados.</li>
                    <li>Corrigir dados incompletos ou desatualizados.</li>
                    <li>Solicitar a exclusão de seus dados (pode implicar na impossibilidade de usar o app).</li>
                    <li>Revogar o consentimento a qualquer momento.</li>
                </ul>
                <p>Para exercer seus direitos, entre em contato pelo e-mail: [SEU E-MAIL DE SUPORTE].</p>

                <h3>6. Segurança</h3>
                <p>Adotamos medidas técnicas (como criptografia e HTTPS) para proteger seus dados. No entanto, nenhum sistema é 100% infalível. Recomendamos que o Usuário utilize senhas fortes e não compartilhe seu acesso.</p>

                <h3>7. Alterações nesta Política</h3>
                <p>Podemos atualizar esta política periodicamente. Avisaremos sobre mudanças significativas através do próprio aplicativo. O uso contínuo do serviço após as alterações implica na aceitação da nova política.</p>
            </main>
        </div>
    );
};

export default Privacy;
