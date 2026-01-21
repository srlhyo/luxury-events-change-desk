# Change Desk - The Luxury Events

Este projeto é uma ferramenta interna ("Change Desk") criada para padronizar e agilizar o processo de pedidos de alteração no website **The Luxury Events**.

## Objetivo
Centralizar todos os pedidos de alteração num formulário simples que envia os dados diretamente para o painel do Netlify, permitindo uma gestão organizada das solicitações.

## Fluxo de Trabalho (Workflow)

1.  **WhatsApp / Input Inicial** 📱
    *   A equipa recebe pedidos de alteração.

2.  **Change Desk (Netlify)** 💻
    *   O responsável acede a este Change Desk.
    *   Preenche o formulário com a localização, tipo de alteração, prioridade e descrição.
    *   Opcionalmente, adiciona referência de conversa do WhatsApp.

3.  **Gestão (Netlify Forms)** 📨
    *   O pedido é submetido e fica guardado no painel "Forms" do Netlify.
    *   A equipa técnica consulta estes registos para executar as alterações.

## Estrutura do Projeto
*   `index.html`: Formulário de recolha de dados.
*   `styles.css`: Estilos visuais.

## Notificações de Email (Webhook)

O sistema usa uma Netlify Function para enviar notificações por email via Mailgun sempre que um formulário é submetido.

### Configuração
1.  **Netlify**:
    *   Ir a **Site Settings > Build & deploy > Environment variables**.
    *   Adicionar as seguintes variáveis (obrigatórias):
        *   `MAILGUN_API_KEY`: Chave de API do Mailgun.
        *   `MAILGUN_DOMAIN`: Domínio sandbox ou verificado (ex: `sandbox...mailgun.org`).
        *   `MAILGUN_FROM`: Remetente (ex: `Change Desk <postmaster@sandbox...mailgun.org>`).
        *   `MAILGUN_TO`: Email de destino.

2.  **Ativar Webhook**:
    *   Ir a **Site configuration > Forms > Form notifications**.
    *   Adicionar **Outgoing webhook**.
    *   **URL**: `https://[TEU-SITE].netlify.app/.netlify/functions/form-webhook`
    *   **Event**: New form submission.

> **Nota sobre Sandbox**: Se usar o domínio sandbox do Mailgun, é necessário adicionar e verificar o email de destino (`MAILGUN_TO`) na lista de "Authorized Recipients" no painel do Mailgun.
