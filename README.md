# Mapa de Ônibus - Gerenciador de Assentos

Um aplicativo web para gerenciar a posição de clientes nas poltronas de ônibus. Desenvolvido com HTML, CSS e JavaScript vanilla, pronto para ser executado no GitHub Pages.

## Funcionalidades

- **Visualização Interativa de Assentos**: Mapa visual dos assentos do ônibus com status em tempo real
- **Gerenciamento de Passageiros**: Adicionar e remover passageiros com suas respectivas poltronas
- **Seleção de Assentos**: Clique em um assento disponível para selecioná-lo antes de adicionar um passageiro
- **Busca e Filtro**: Procure passageiros por nome ou número de assento
- **Persistência de Dados**: Todos os dados são salvos automaticamente no navegador (localStorage)
- **Responsivo**: Interface adaptável para desktop, tablet e celular
- **Status em Tempo Real**: Contador automático de assentos ocupados e disponíveis

## Como Usar

### Localmente

1. Clone o repositório:
```bash
git clone https://github.com/juli0cesardesigner/mapa_bus.git
```

2. Abra o arquivo `index.html` no seu navegador:
```bash
# Windows
start index.html

# Mac
open index.html

# Linux
xdg-open index.html
```

### Online (GitHub Pages)

Acesse: `https://juli0cesardesigner.github.io/mapa_bus/`

> **Nota**: Certifique-se de ativar o GitHub Pages nas configurações do repositório

## Guia de Uso

1. **Adicionar Passageiro**:
   - Digite o nome do passageiro no campo "Nome"
   - Clique em um assento disponível no mapa do ônibus ou selecione no dropdown
   - Clique no botão "Adicionar"

2. **Visualizar Passageiros**:
   - Todos os passageiros cadastrados aparecem na lista à direita
   - O número do assento é destacado em azul

3. **Buscar Passageiro**:
   - Use o campo de busca para filtrar por nome ou número de assento

4. **Remover Passageiro**:
   - Clique no botão "Remover" ao lado do passageiro na lista
   - Ou use "Limpar Todos" para remover todos os passageiros

## Estrutura do Projeto

```
mapa_bus/
├── index.html          # Estrutura HTML da aplicação
├── styles.css          # Estilos CSS com design responsivo
├── script.js           # Lógica JavaScript da aplicação
├── README.md           # Este arquivo
└── .gitignore          # Arquivos ignorados pelo Git
```

## Características Técnicas

- **Sem Dependências**: Utiliza apenas HTML, CSS e JavaScript vanilla
- **Modern CSS**: Grid layout, flexbox, variáveis CSS e media queries
- **LocalStorage**: Persistência automática de dados no navegador
- **Animações**: Transições suaves e efeitos visuais
- **Acessibilidade**: Títulos descritivos e estrutura semântica
- **Mobile First**: Design responsivo e otimizado para todos os tamanhos

## Configuração de Assentos

Atualmente configurado para:
- **Total de Assentos**: 40
- **Distribuição**: 20 assentos por lado (lado esquerdo e direito)
- **Layout**: 10 linhas × 2 colunas (cada lado)

Para modificar essas configurações, edite a seção `BUS_CONFIG` no arquivo `script.js`:

```javascript
const BUS_CONFIG = {
    totalSeats: 40,        // Altere para o número desejado
    seatsPerRow: 4,        // Altere para o número desejado
    storageKey: 'busSeatingData'
};
```

## Legenda de Cores

| Cor | Status | Significado |
|-----|--------|-------------|
| Azul Claro | Disponível | Assento vazio e disponível para seleção |
| Vermelho | Ocupado | Assento já possui um passageiro |
| Verde | Selecionado | Assento selecionado para novo passageiro |

## Dados Persistidos

Os seguintes dados são salvos automaticamente:
- Nome do passageiro
- Número do assento
- Data/hora de adição
- ID único para cada passageiro

Os dados são armazenados localmente no navegador usando `localStorage` e não são enviados a nenhum servidor.

## Privacidade e Segurança

- Todos os dados são armazenados localmente no seu navegador
- Nenhuma informação é enviada a servidores externos
- Os dados são limpos se você limpar o cache do navegador
- A aplicação é segura contra XSS (Cross-Site Scripting)

## Compatibilidade

- Chrome/Edge (versão 90+)
- Firefox (versão 88+)
- Safari (versão 14+)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deploy no GitHub Pages

1. Acesse as configurações do seu repositório no GitHub
2. Navegue até "Pages"
3. Selecione "Deploy from a branch"
4. Escolha a branch `main` e a pasta `root`
5. Clique em "Save"
6. A aplicação estará disponível em: `https://seu-usuario.github.io/mapa_bus/`

## Futuras Melhorias

- Exportar dados em CSV/PDF
- Diferentes tipos de assentos (normal, acessibilidade, etc.)
- Histórico de reservas
- Sincronização com banco de dados
- Sistema de autenticação
- Múltiplos ônibus
- Preços por assento

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para:
- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests com melhorias

## Licença

Este projeto está disponível sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Autor

Desenvolvido por **Júlio César** para gerenciamento eficiente de assentos em ônibus.

---

**Última atualização**: Novembro de 2025