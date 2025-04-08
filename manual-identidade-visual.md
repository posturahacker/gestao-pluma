# Manual de Identidade Visual - GestãoPluma

## 1. Marca

### 1.1 Nome
- Nome completo: GestãoPluma
- Formatação: Gestão<span class="italic">Pluma</span>
- Fonte do logotipo: Instrument Serif

### 1.2 Logo
- Arquivo: `/public/logo.png`
- Favicon: `/public/favicon.ico`
- Imagem OpenGraph: `https://lovable.dev/opengraph-image-p98pqg.png`

### 1.3 Tagline
"Sistema completo para psicólogas organizarem sua clínica com clareza e leveza"

## 2. Cores

### 2.1 Cores Principais (PSI)
```css
--psi-50: #f6f4ff
--psi-100: #edebff
--psi-200: #dbd5ff
--psi-300: #bdb2ff
--psi-400: #9b87f5
--psi-500: #7a5af8
--psi-600: #6c3ced
--psi-700: #5a2bd7
--psi-800: #4b26ae
--psi-900: #3f238c
--psi-950: #241256
```

### 2.2 Cores Secundárias (Cream)
```css
--cream-50: #faf8f4
--cream-100: #f2efe4
--cream-200: #e7e0cd
--cream-300: #d6c9ad
--cream-400: #c4af8c
--cream-500: #b79b75
--cream-600: #a98965
--cream-700: #8c6f52
--cream-800: #725a46
--cream-900: #5e4b3b
--cream-950: #32261e
```

### 2.3 Cores de Interface (Light Mode)
```css
--background: 260 30% 99%
--foreground: 260 25% 15%
--card: 0 0% 100%
--card-foreground: 260 25% 15%
--popover: 0 0% 100%
--popover-foreground: 260 25% 15%
--primary: 255 82% 65%
--primary-foreground: 0 0% 100%
--secondary: 260 20% 96%
--secondary-foreground: 260 25% 15%
--muted: 260 20% 96%
--muted-foreground: 260 10% 50%
--accent: 255 82% 95%
--accent-foreground: 260 25% 15%
--destructive: 0 84.2% 60.2%
--destructive-foreground: 0 0% 98%
--border: 260 10% 90%
--input: 260 10% 90%
--ring: 255 82% 65%
```

### 2.4 Cores de Interface (Dark Mode)
```css
--background: 260 25% 15%
--foreground: 260 20% 96%
--card: 260 25% 15%
--card-foreground: 260 20% 96%
--popover: 260 25% 15%
--popover-foreground: 260 20% 96%
--primary: 255 82% 65%
--primary-foreground: 0 0% 100%
--secondary: 260 15% 25%
--secondary-foreground: 260 20% 96%
--muted: 260 15% 25%
--muted-foreground: 260 10% 70%
--accent: 255 82% 30%
--accent-foreground: 260 20% 96%
--destructive: 0 62.8% 30.6%
--destructive-foreground: 260 20% 96%
--border: 260 15% 25%
--input: 260 15% 25%
--ring: 255 82% 65%
```

## 3. Tipografia

### 3.1 Fontes
- Principal (sans): Inter (300, 400, 500, 600, 700)
- Display: Playfair Display (400, 500, 600, 700)

### 3.2 Importação
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap');
```

### 3.3 Hierarquia
```css
/* Base */
body {
  @apply bg-background text-foreground font-sans antialiased;
}

/* Títulos */
h1, h2, h3, h4, h5, h6 {
  @apply font-display font-medium tracking-tight;
}
```

## 4. Componentes

### 4.1 Botões
```typescript
const buttonVariants = {
  primary: 'bg-psi-400 text-white hover:bg-psi-500 focus:ring-2 focus:ring-psi-300 focus:ring-offset-2 transition-all',
  secondary: 'bg-secondary text-foreground hover:bg-secondary/80 focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 transition-all',
  outline: 'bg-transparent text-psi-500 border border-psi-400 hover:bg-psi-50 focus:ring-2 focus:ring-psi-300 focus:ring-offset-2 transition-all',
  ghost: 'bg-transparent text-foreground hover:bg-secondary focus:ring-2 focus:ring-secondary/50 focus:ring-offset-2 transition-all',
  link: 'bg-transparent text-psi-500 underline-offset-4 hover:underline hover:text-psi-700 focus:ring-0 p-0 h-auto transition-all'
}

const buttonSizes = {
  sm: 'text-sm px-3 py-1.5 rounded-md',
  md: 'text-base px-5 py-2.5 rounded-lg',
  lg: 'text-lg px-6 py-3 rounded-xl'
}
```

### 4.2 Cards
```css
.glass-card {
  @apply bg-white/70 backdrop-blur-md border border-white/20 shadow-sm;
}
```

### 4.3 Container
```css
.container-lg {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
```

## 5. Animações

### 5.1 Keyframes
```css
@keyframes fadeIn {
  from { opacity: 0 }
  to { opacity: 1 }
}

@keyframes slideUp {
  from { transform: translateY(20px); opacity: 0 }
  to { transform: translateY(0); opacity: 1 }
}

@keyframes slideDown {
  from { transform: translateY(-20px); opacity: 0 }
  to { transform: translateY(0); opacity: 1 }
}

@keyframes scaleIn {
  from { transform: scale(0.95); opacity: 0 }
  to { transform: scale(1); opacity: 1 }
}
```

### 5.2 Classes de Animação
```css
.animate-fade-in { animation: fadeIn 0.5s ease-out forwards }
.animate-slide-up { animation: slideUp 0.5s ease-out forwards }
.animate-slide-down { animation: slideDown 0.5s ease-out forwards }
.animate-scale-in { animation: scaleIn 0.3s ease-out forwards }
```

### 5.3 Delays
```css
.animate-delay-100 { animation-delay: 100ms }
.animate-delay-200 { animation-delay: 200ms }
.animate-delay-300 { animation-delay: 300ms }
.animate-delay-400 { animation-delay: 400ms }
.animate-delay-500 { animation-delay: 500ms }
```

## 6. Dependências

### 6.1 Principais
```json
{
  "dependencies": {
    "@radix-ui/react-*": "^1.x",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "framer-motion": "^12.6.0",
    "lucide-react": "^0.462.0",
    "tailwind-merge": "^2.5.2",
    "tailwindcss-animate": "^1.0.7"
  }
}
```

### 6.2 Dev Dependencies
```json
{
  "devDependencies": {
    "@tailwindcss/typography": "^0.5.15",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.11"
  }
}
```

## 7. Configuração

### 7.1 Tailwind Config
Arquivo: `tailwind.config.ts`
```typescript
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      // Cores, fontes e animações conforme definido acima
    }
  },
  plugins: [require("tailwindcss-animate")]
}
```

### 7.2 PostCSS Config
Arquivo: `postcss.config.js`
```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

## 8. Estrutura de Arquivos

```
src/
├── components/
│   ├── ui/          # Componentes base
│   └── [features]/  # Componentes específicos
├── styles/
│   └── index.css    # Estilos globais
├── lib/
│   └── utils.ts     # Utilitários
└── assets/
    └── images/      # Imagens e ícones
```

## 9. Boas Práticas

1. **Responsividade**
   - Mobile First
   - Breakpoints padrão do Tailwind
   - Containers responsivos

2. **Acessibilidade**
   - Contraste adequado
   - Foco visível
   - Textos legíveis

3. **Performance**
   - Lazy loading de imagens
   - Otimização de fontes
   - Purge CSS não utilizado

4. **Manutenção**
   - Componentes reutilizáveis
   - Variáveis CSS para temas
   - Documentação inline 