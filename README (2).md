# Guia de Desenvolvimento Infantil — Página de Vendas VSL

## Sobre o Projeto

Página de vendas moderna, persuasiva e visualmente atraente para um produto digital **low ticket** voltado para pais que querem desenvolver o **foco, atenção e coordenação motora** dos filhos.

## ✅ Funcionalidades Implementadas

### Estrutura VSL (Video Sales Letter)
- [x] **Hero** com headline, subheadline e vídeo principal em destaque
- [x] **Seção de identificação** com lista de dores dos pais
- [x] **Agravação do problema** com consequências emocionais
- [x] **Introdução da solução** com mockup visual do produto
- [x] **Como funciona** em 4 etapas visuais
- [x] **Benefícios** com ilustração orbital animada
- [x] **Prova social** com 2 vídeos de depoimentos + 3 depoimentos em texto
- [x] **Quebra de objeções** com 4 perguntas/respostas comuns
- [x] **Seção de oferta** com lista de entregáveis
- [x] **Preço com ancoragem** (De R$97 por R$19,90)
- [x] **Garantia de 7 dias** com visual de selo de confiança
- [x] **Urgência** com tags animadas
- [x] **Botão de compra ÚNICO** no final (com link de checkout externo)
- [x] **Rodapé** com Política de Privacidade e Termos de Uso

### Design & UX
- [x] Cores suaves: azul (#2563eb), verde (#16a34a), branco, teal
- [x] Tipografia: Inter + Nunito (Google Fonts)
- [x] Animações suaves no scroll (Intersection Observer)
- [x] Barra de progresso no topo da página
- [x] Efeito parallax nos elementos do hero
- [x] Lazy loading nos iframes de vídeo
- [x] Responsivo para mobile, tablet e desktop
- [x] Pulse animation no botão CTA ao entrar na tela

## 📁 Estrutura de Arquivos

```
index.html          → Página de vendas principal
css/
  style.css         → Todos os estilos, variáveis CSS, responsividade
js/
  main.js           → Scroll reveal, parallax, lazy load, progress bar
README.md           → Documentação do projeto
```

## 🔗 URI Principal

| Caminho    | Descrição                        |
|------------|----------------------------------|
| `/`        | Página de vendas VSL principal   |
| `/#compra` | Ancora direta para o botão de compra |
| `/#garantia` | Ancora para seção de garantia  |

## ⚙️ Como Personalizar

### Trocar o link do botão de compra
No `index.html`, procure:
```html
<a href="https://checkout.exemplo.com/guia-desenvolvimento-infantil" class="cta-button"...>
```
Substitua pela URL real do seu checkout (Hotmart, Eduzz, Kiwify, etc.)

### Trocar os vídeos (VSL e depoimentos)
Substitua os `src` dos iframes:
```html
<iframe src="https://www.youtube.com/embed/SEU_VIDEO_ID?rel=0&modestbranding=1" ...>
```

### Personalizar cores
No `css/style.css`, edite as variáveis CSS no `:root`:
```css
--blue:     #2563eb;
--green:    #16a34a;
--teal:     #0d9488;
```

## ❌ Regras Seguidas Estritamente

- ❌ **Sem botão de compra no topo**
- ❌ **Sem botão flutuante ou fixo**
- ❌ **Sem repetição de CTA ao longo da página**
- ✅ **Botão único apenas no final** da página

## 🚧 Próximos Passos Sugeridos

1. **Substituir vídeos de placeholder** pelos vídeos reais (VSL + depoimentos)
2. **Atualizar link do checkout** pela URL real da plataforma escolhida
3. **Adicionar pixel de rastreamento** (Meta Pixel, Google Analytics)
4. **Adicionar timer de urgência** real para criar escassez verdadeira
5. **Otimizar meta tags** com Open Graph para compartilhamento em redes sociais
6. **Adicionar favicon** personalizado
7. **Testar velocidade** com PageSpeed Insights após publicar

## 🎨 Estilo Visual

Inspirado no estilo de [dinamicasjiujitsu.netlify.app](https://dinamicasjiujitsu.netlify.app/) com:
- Layout mais elegante e espaçoso
- Seções bem delimitadas com fundos alternados
- Visual limpo e impactante
- Design envolvente com elementos visuais modernos

---

*Projeto: Guia Desenvolvimento Infantil — Página de Vendas*  
*Última atualização: 2025*
