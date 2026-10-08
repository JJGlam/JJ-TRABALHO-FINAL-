import React, { useState, useMemo } from 'react';
import {
  PET_PRODUCTS,
  HERO_CAMPAIGN,
  ATELIER_TESTIMONIALS,
  PetProduct,
  PetCategory,
  PetSize,
} from './data/products';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SizeGuideSection } from './components/SizeGuideSection';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { Search, ShoppingBag, ArrowRight, X } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<PetCategory>('all');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState<PetSize | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [activeProduct, setActiveProduct] = useState<PetProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [heroImgError, setHeroImgError] = useState<boolean>(false);
  const [newsletterEmail, setNewsletterEmail] = useState<string>('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState<boolean>(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      key: 'jj-01-M-Canela Tostado',
      product: PET_PRODUCTS[0],
      size: 'M',
      colorName: 'Canela Tostado',
      quantity: 1,
    },
  ]);

  const totalCartItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const filteredProducts = useMemo(() => {
    return PET_PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        product.category === selectedCategory ||
        product.garmentType === selectedCategory;

      const matchesSize =
        selectedSizeFilter === 'all' || product.sizes.includes(selectedSizeFilter);

      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query) ||
        product.categoryLabel.toLowerCase().includes(query) ||
        product.material.toLowerCase().includes(query);

      return matchesCategory && matchesSize && matchesQuery;
    });
  }, [selectedCategory, selectedSizeFilter, searchQuery]);

  const handleAddToCart = (
    product: PetProduct,
    size: PetSize,
    colorName: string,
    quantity: number = 1
  ) => {
    const key = `${product.id}-${size}-${colorName}`;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.key === key);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { key, product, size, colorName, quantity }];
    });
  };

  const handleUpdateQuantity = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFilterByRecommendedSize = (size: PetSize) => {
    setSelectedSizeFilter(size);
    setSelectedCategory('all');
    scrollToSection('colecao');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C241E]">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 h-16 bg-[#FAF8F5]/95 backdrop-blur-xs border-b border-[#E6DFD3] px-4 sm:px-8 flex items-center justify-between">
        {/* Zone 1: Single Text Element Wordmark */}
        <a
          href="#topo"
          className="font-display text-xl font-semibold tracking-tight text-[#1C241E] whitespace-nowrap shrink-0"
        >
          JJ STORE
        </a>

        {/* Zone 2: 5 Clean Text Navigation Links */}
        <nav
          aria-label="Navegação Principal"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5C645E]"
        >
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              scrollToSection('colecao');
            }}
            className="hover:text-[#1C241E] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Coleção
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('dogs');
              scrollToSection('colecao');
            }}
            className="hover:text-[#1C241E] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Cães
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('cats');
              scrollToSection('colecao');
            }}
            className="hover:text-[#1C241E] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Gatos
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('guia-medidas')}
            className="hover:text-[#1C241E] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Guia de Medidas
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('atelie')}
            className="hover:text-[#1C241E] hover:underline underline-offset-4 transition-colors whitespace-nowrap"
          >
            Ateliê
          </button>
        </nav>

        {/* Zone 3: 2 Primary Actions (Search & Shopping Bag) */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              setIsSearchOpen((prev) => !prev);
              if (!isSearchOpen) {
                scrollToSection('colecao');
              }
            }}
            aria-label="Buscar peças no catálogo"
            className="h-10 px-3 rounded-lg border border-[#E6DFD3] bg-[#F3EFE6] hover:bg-[#EAE4D7] text-xs font-medium text-[#1C241E] flex items-center gap-1.5 transition-colors whitespace-nowrap"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Buscar</span>
          </button>

          <button
            type="button"
            onClick={() => setIsCartOpen(true)}
            className="h-10 px-4 rounded-lg bg-[#2A4230] hover:bg-[#1F3324] text-[#FAF8F5] text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Sacola</span>
            <span className="font-mono-num">({totalCartItems})</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main id="topo" className="flex-1">
        {/* Section 1: Storefront Hero Campaign */}
        <section className="py-10 sm:py-16 border-b border-[#E6DFD3]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Editorial Narrative */}
              <div className="lg:col-span-5 flex flex-col items-start">
                <div className="text-xs text-[#5C645E] mb-3">
                  <span>{HERO_CAMPAIGN.seasonKicker}</span>
                </div>

                <h1
                  className="font-display text-3xl sm:text-4xl font-semibold text-[#1C241E] tracking-tight leading-[1.15]"
                  style={{ textWrap: 'balance' }}
                >
                  {HERO_CAMPAIGN.headline}
                </h1>

                <p className="mt-4 text-[15px] sm:text-base text-[#5C645E] leading-relaxed">
                  {HERO_CAMPAIGN.subheadline}
                </p>

                {/* Primary Focal CTA + Secondary Link */}
                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    onClick={() => scrollToSection('colecao')}
                    className="h-11 px-6 rounded-lg bg-[#2A4230] hover:bg-[#1F3324] text-[#FAF8F5] text-sm font-medium flex items-center gap-2 transition-colors whitespace-nowrap"
                  >
                    <span>Explorar Coleção</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={() => scrollToSection('guia-medidas')}
                    className="h-11 px-4 text-sm font-medium text-[#1C241E] hover:text-[#2A4230] underline underline-offset-4 transition-colors whitespace-nowrap"
                  >
                    Descobrir Tamanho do Pet
                  </button>
                </div>

                {/* Unboxed Quantitative Craftsmanship Proof */}
                <div className="mt-10 pt-6 border-t border-[#E6DFD3] w-full grid grid-cols-3 gap-4 text-left">
                  <div>
                    <div className="font-mono-num text-lg font-semibold text-[#1C241E]">
                      100%
                    </div>
                    <div className="text-xs text-[#5C645E] mt-0.5">
                      Fibras Hipoalergênicas
                    </div>
                  </div>
                  <div>
                    <div className="font-mono-num text-lg font-semibold text-[#1C241E]">
                      PP ao GG
                    </div>
                    <div className="text-xs text-[#5C645E] mt-0.5">
                      1,5 kg até 28 kg
                    </div>
                  </div>
                  <div>
                    <div className="font-mono-num text-lg font-semibold text-[#1C241E]">
                      Frete Grátis
                    </div>
                    <div className="text-xs text-[#5C645E] mt-0.5">
                      Acima de R$ 125
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 16:9 Editorial Campaign Showcase */}
              <div className="lg:col-span-7">
                <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden bg-[#F3EFE6] border border-[#E6DFD3]">
                  {!heroImgError ? (
                    <img
                      src={HERO_CAMPAIGN.image}
                      alt="Filhote de Golden Retriever e Bulldog Francês vestindo coletes matelassê verde oliva e suéteres de tricô aveia da JJ STORE em jardim ensolarado"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImgError(true)}
                      className="w-full h-full object-cover object-center"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#DCE2D7] to-[#C8C0B0] flex items-center justify-center p-8 text-center">
                      <span className="font-display text-xl text-[#1C241E]">
                        JJ STORE — Alfaiataria & Moda Pet
                      </span>
                    </div>
                  )}

                  {/* Measured Contrast Scrim with Interactive Spotlight */}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-5 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                    <div className="text-[#FAF8F5]">
                      <div className="text-xs text-[#FAF8F5]/80">
                        Na foto: Golden Retriever (Tam M) · Bulldog Francês (Tam G)
                      </div>
                      <div className="font-display text-base sm:text-lg font-medium mt-0.5">
                        Colete Matelassê Oliva & Tricô Duo
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveProduct(PET_PRODUCTS[4])}
                      className="h-9 px-4 rounded-lg bg-[#FAF8F5] text-[#1C241E] hover:bg-[#EAE4D7] text-xs font-medium transition-colors self-start sm:self-auto whitespace-nowrap"
                    >
                      Ver Look da Campanha · R$ 132,00
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Featured Collection Grid */}
        <section id="colecao" className="py-16 sm:py-20">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            {/* Section Header & Interactive Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <div className="text-xs text-[#5C645E] mb-2">
                  <span>01. Curadoria de Inverno & Meia-Estação</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>Pronta Entrega</span>
                </div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#1C241E] tracking-tight">
                  Peças Essenciais JJ STORE
                </h2>
              </div>

              {/* Functional Segmented Filter Bar */}
              <div className="flex flex-wrap items-center gap-2">
                <div
                  className="flex items-center gap-1 p-1 bg-[#F3EFE6] border border-[#E6DFD3] rounded-lg overflow-x-auto"
                  role="tablist"
                  aria-label="Filtrar por categoria"
                >
                  {(
                    [
                      { id: 'all', label: 'Todas as Peças' },
                      { id: 'dogs', label: 'Cães' },
                      { id: 'cats', label: 'Gatos' },
                      { id: 'knitwear', label: 'Tricôs & Malhas' },
                      { id: 'outerwear', label: 'Parkas & Sherpa' },
                    ] as { id: PetCategory; label: string }[]
                  ).map((tab) => {
                    const active = selectedCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        onClick={() => setSelectedCategory(tab.id)}
                        className={`h-9 px-3.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                          active
                            ? 'bg-[#FAF8F5] text-[#1C241E] shadow-2xs'
                            : 'text-[#5C645E] hover:text-[#1C241E]'
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Optional Expandable Search & Size Filter Bar */}
            {(isSearchOpen || selectedSizeFilter !== 'all' || searchQuery) && (
              <div className="mb-8 p-4 rounded-xl bg-[#F3EFE6] border border-[#E6DFD3] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#5C645E] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por tecido (merino, impermeável, algodão), cor ou peça..."
                    className="w-full h-10 pl-10 pr-9 rounded-lg bg-[#FAF8F5] border border-[#E6DFD3] text-xs text-[#1C241E] focus:outline-none focus:border-[#2A4230]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Limpar busca"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5C645E] hover:text-[#1C241E]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#5C645E] whitespace-nowrap">
                    Filtrar tamanho:
                  </span>
                  <div className="flex items-center gap-1 bg-[#EAE4D7] p-1 rounded-lg">
                    {(['all', 'PP', 'P', 'M', 'G', 'GG'] as const).map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        onClick={() => setSelectedSizeFilter(sz)}
                        className={`h-7 px-2.5 rounded-md text-xs font-mono-num font-medium transition-colors whitespace-nowrap ${
                          selectedSizeFilter === sz
                            ? 'bg-[#2A4230] text-[#FAF8F5]'
                            : 'text-[#5C645E] hover:text-[#1C241E]'
                        }`}
                      >
                        {sz === 'all' ? 'Todos' : sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 3-Column Product Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-16 px-4 text-center bg-[#F3EFE6]/50 border border-[#E6DFD3] rounded-xl">
                <h3 className="font-display text-lg font-semibold text-[#1C241E]">
                  Nenhuma peça encontrada com esses filtros
                </h3>
                <p className="text-xs text-[#5C645E] mt-1">
                  Experimente limpar o filtro de tamanho ou buscar por outra categoria.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedSizeFilter('all');
                    setSearchQuery('');
                  }}
                  className="mt-4 h-10 px-4 rounded-lg bg-[#2A4230] text-[#FAF8F5] text-xs font-medium hover:bg-[#1F3324] transition-colors whitespace-nowrap"
                >
                  Restaurar Catálogo Completo
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelectProduct={(p) => setActiveProduct(p)}
                    onQuickAdd={(p, size, color) => handleAddToCart(p, size, color, 1)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Section 3: Interactive Size Guide & Fit Calculator */}
        <SizeGuideSection onFilterByRecommendedSize={handleFilterByRecommendedSize} />

        {/* Section 4: Atelier Craftsmanship & Attributable Testimonials */}
        <section id="atelie" className="py-16 sm:py-24 border-t border-[#E6DFD3]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Craftsmanship Principles */}
              <div className="lg:col-span-5">
                <div className="text-xs text-[#5C645E] mb-2">
                  <span>03. Filosofia de Ateliê</span>
                  <span className="mx-1.5" aria-hidden="true">·</span>
                  <span>Design Centrado no Bem-Estar Animal</span>
                </div>
                <h2
                  className="font-display text-2xl sm:text-3xl font-semibold text-[#1C241E] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  Roupas feitas para proteger, nunca para restringir.
                </h2>
                <p className="mt-4 text-[15px] text-[#5C645E] leading-relaxed">
                  Na JJ STORE, cada molde passa por validação veterinária e testes em caminhadas reais antes de ir para a bancada de corte. Abolimos velcros barulhentos que assustam animais sensíveis e elásticos apertados.
                </p>

                <div className="mt-8 space-y-6 pt-6 border-t border-[#E6DFD3]">
                  <div>
                    <h3 className="text-sm font-semibold text-[#1C241E]">
                      01. Costura Embutida Anti-Atrito
                    </h3>
                    <p className="text-xs text-[#5C645E] mt-1 leading-relaxed">
                      Acabamento interno plano nas cavas dianteiras, prevenindo assaduras e nós em cães de pelo longo como Poodle, Shih Tzu e Golden.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1C241E]">
                      02. Tecidos Acusticamente Silenciosos
                    </h3>
                    <p className="text-xs text-[#5C645E] mt-1 leading-relaxed">
                      A audição canina e felina é quatro vezes mais sensível que a humana. Nossas parkas impermeáveis usam algodão encerado macio em vez de plástico ruidoso.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-[#1C241E]">
                      03. Primeira Troca de Tamanho Gratuita
                    </h3>
                    <p className="text-xs text-[#5C645E] mt-1 leading-relaxed">
                      Se o tricô ficar folgado ou justo no tórax, coletamos na sua casa e enviamos o novo tamanho sem custo de frete em até 30 dias.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Attributable Testimonials (Claim-to-Proof Adjacency) */}
              <div className="lg:col-span-7 space-y-6">
                <div className="text-xs text-[#5C645E]">
                  Relatos verificados de tutores e médicos veterinários
                </div>

                {ATELIER_TESTIMONIALS.map((item) => (
                  <blockquote
                    key={item.id}
                    className="p-6 sm:p-8 rounded-xl bg-[#F3EFE6] border border-[#E6DFD3] flex flex-col justify-between gap-5"
                  >
                    <p className="font-display text-base sm:text-lg text-[#1C241E] leading-relaxed">
                      “{item.quote}”
                    </p>

                    <footer className="pt-4 border-t border-[#E6DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div>
                        <strong className="text-[#1C241E] font-semibold">
                          {item.author}
                        </strong>
                        <span className="text-[#5C645E] block sm:inline sm:ml-2">
                          {item.role} · {item.location}
                        </span>
                      </div>
                      <span className="text-[#2A4230] font-medium whitespace-nowrap">
                        {item.verifiedPurchase}
                      </span>
                    </footer>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="bg-[#F3EFE6] border-t border-[#E6DFD3] py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-[#E6DFD3]">
            <div className="md:col-span-5">
              <span className="font-display text-xl font-semibold text-[#1C241E]">
                JJ STORE
              </span>
              <p className="mt-3 text-xs text-[#5C645E] max-w-sm leading-relaxed">
                Alfaiataria botânica e vestuário funcional para cães e gatos. Confeccionado em pequenos lotes no Brasil com fibras naturais certificadas.
              </p>
              <div className="mt-4 text-xs text-[#5C645E]">
                <span>Ateliê & Showroom: Rua dos Pinheiros, 840 — São Paulo, SP</span>
                <span className="mx-1.5" aria-hidden="true">·</span>
                <span>Seg a Sáb, 10h às 19h</span>
              </div>
            </div>

            <div className="md:col-span-3 space-y-2 text-xs">
              <div className="font-semibold text-[#1C241E] mb-3">Navegação</div>
              <ul className="space-y-2 text-[#5C645E]">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('dogs');
                      scrollToSection('colecao');
                    }}
                    className="hover:text-[#1C241E] transition-colors"
                  >
                    Linha Cães (PP ao GG)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory('cats');
                      scrollToSection('colecao');
                    }}
                    className="hover:text-[#1C241E] transition-colors"
                  >
                    Linha Gatos (Ergonomia Livre)
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('guia-medidas')}
                    className="hover:text-[#1C241E] transition-colors"
                  >
                    Calculadora de Medidas
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('atelie')}
                    className="hover:text-[#1C241E] transition-colors"
                  >
                    Sobre o Ateliê JJ STORE
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4">
              <div className="text-xs font-semibold text-[#1C241E] mb-2">
                Jornal JJ STORE & Lançamentos Sazonais
              </div>
              <p className="text-xs text-[#5C645E] mb-3 leading-relaxed">
                Receba avisos de reposição dos tricôs merino e dicas de cuidado com a pelagem no inverno.
              </p>
              {newsletterSubscribed ? (
                <div className="p-3 rounded-lg bg-[#2A4230]/10 text-[#2A4230] text-xs font-medium">
                  Inscrição confirmada! Bem-vindo à família JJ STORE.
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (newsletterEmail.trim()) {
                      setNewsletterSubscribed(true);
                      setNewsletterEmail('');
                    }
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com.br"
                    className="flex-1 h-10 px-3 rounded-lg bg-[#FAF8F5] border border-[#E6DFD3] text-xs text-[#1C241E] focus:outline-none focus:border-[#2A4230]"
                  />
                  <button
                    type="submit"
                    className="h-10 px-4 rounded-lg bg-[#1C241E] hover:bg-[#2A4230] text-[#FAF8F5] text-xs font-medium transition-colors whitespace-nowrap"
                  >
                    Inscrever
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5C645E]">
            <div>
              © {new Date().getFullYear()} JJ STORE Alfaiataria Pet Ltda. Todos os direitos reservados.
            </div>
            <div className="flex items-center gap-4">
              <span>Troca Fácil em 30 Dias</span>
              <span aria-hidden="true">·</span>
              <span>Pagamento Seguro PIX & Cartão</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Contiguous Product Detail Modal (PDP) */}
      <ProductDetailModal
        product={activeProduct}
        onClose={() => setActiveProduct(null)}
        onAddToCart={(prod, size, color, qty) => {
          handleAddToCart(prod, size, color, qty);
        }}
        onOpenSizeGuide={() => scrollToSection('guia-medidas')}
      />

      {/* Slide-Over Cart & Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
