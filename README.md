# Change Desk - The Luxury Events

Este projeto é uma ferramenta interna ("Change Desk") criada para padronizar e agilizar o processo de pedidos de alteração no website **The Luxury Events**.

## Objetivo
O objetivo principal é eliminar a ambiguidade nos pedidos de manutenção e evolução do site, transformando inputs informais em instruções técnicas precisas ("Prompts") que podem ser interpretadas diretamente por assistentes de IA (como ChatGPT ou Lovable) ou developers.

## Fluxo de Trabalho (Workflow)

O processo segue o seguinte fluxo:

1.  **WhatsApp / Input Inicial** 📱
    *   A equipa recebe pedidos de alteração, correções ou novas imagens, frequentemente via WhatsApp.

2.  **Change Desk (Netlify)** 💻
    *   O responsável acede a este Change Desk.
    *   Seleciona a área do site (ex: "Home", "Serviços"), o tipo de alteração e a prioridade.
    *   Preenche os detalhes e a referência da conversa original.

3.  **Geração de Prompt** 🤖
    *   Ao submeter, o sistema gera automaticamente um **Prompt Estruturado** na página de confirmação.
    *   Este prompt contém todo o contexto técnico necessário, protegido contra alterações acidentais de design.

4.  **AI Dev (ChatGPT / Lovable)** ⚡
    *   O responsável copia o texto gerado (botão "Copiar Texto").
    *   Cola o prompt na ferramenta de desenvolvimento AI.

5.  **Deploy (Netlify)** 🚀
    *   A alteração é aplicada no código e publicada automaticamente no URL principal.

## Estrutura do Projeto
*   `index.html`: Formulário de recolha de dados.
*   `obrigado.html`: Página de afinação e cópia do prompt.
*   `styles.css`: Estilos visuais.
*   `app.js`: Lógica de persistência e geração de texto.
