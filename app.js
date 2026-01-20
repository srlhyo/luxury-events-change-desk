document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form[name="pedido-alteracao"]');
    const promptBox = document.getElementById('generated-prompt');
    const copyBtn = document.getElementById('copy-btn');

    // Handle Form Submission (Index Page)
    if (form) {
        form.addEventListener('submit', () => {
            const formData = new FormData(form);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            sessionStorage.setItem('lastRequest', JSON.stringify(data));
        });
    }

    // Handle Prompt Generation (Obrigado Page)
    if (promptBox) {
        const data = JSON.parse(sessionStorage.getItem('lastRequest'));
        
        if (data) {
            const today = new Date().toLocaleDateString('pt-PT');
            const promptText = `CONTEXTO:
O site é https://theluxuryevents.netlify.app/

INSTRUÇÕES GERAIS:
Atuar como developer expert em frontend.
NÃO alterar layout, cores ou fontes existentes, a menos que explicitamente solicitado.
Manter a consistência do design system.

PEDIDO DE ALTERAÇÃO (${today}):
--------------------------------------------------
LOCAL: ${data.local}
TIPO: ${data.tipo}
PRIORIDADE: ${data.prioridade}
REF WHATSAPP: ${data.whatsapp_ref || 'N/A'}
--------------------------------------------------

DESCRIÇÃO DETALHADA:
${data.descricao}

Por favor, implementa esta alteração garantindo HTML válido e responsividade.`;

            promptBox.textContent = promptText;
        } else {
            promptBox.textContent = 'Nenhum dado de pedido encontrado. Por favor preencha o formulário novamente.';
        }
    }

    // Handle Copy Button
    if (copyBtn && promptBox) {
        copyBtn.addEventListener('click', () => {
            const text = promptBox.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = 'Copiado!';
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                }, 2000);
            }).catch(err => {
                console.error('Erro ao copiar:', err);
                alert('Erro ao copiar texto. Selecione manualmente.');
            });
        });
    }
});
