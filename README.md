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
