export type PetCategory = 'all' | 'dogs' | 'cats' | 'outerwear' | 'knitwear';

export type PetSize = 'PP' | 'P' | 'M' | 'G' | 'GG';

export interface ProductSizeSpec {
  size: PetSize;
  neckCm: string;
  chestCm: string;
  backLengthCm: string;
  weightRangeKg: string;
  breedExamples: string;
}

export interface ProductColorVariant {
  name: string;
  hex: string;
}

export interface PetProduct {
  id: string;
  sku: string;
  name: string;
  subtitle: string;
  category: 'dogs' | 'cats';
  garmentType: 'outerwear' | 'knitwear';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  checkoutUrl: string;
  image: string;
  fallbackGradient: string;
  material: string;
  careInstructions: string;
  thermalIndex: string;
  leashHoleIncluded: boolean;
  statusNote: string;
  colors: ProductColorVariant[];
  sizes: PetSize[];
  description: string;
  fitHighlights: string[];
  rating: number;
  reviewCount: number;
}

export const SIZE_SPECIFICATIONS: ProductSizeSpec[] = [
  {
    size: 'PP',
    neckCm: '20 – 24 cm',
    chestCm: '28 – 34 cm',
    backLengthCm: '22 cm',
    weightRangeKg: '1,5 – 3,0 kg',
    breedExamples: 'Chihuahua, Yorkshire Micro, Filhotes Felinos',
  },
  {
    size: 'P',
    neckCm: '25 – 30 cm',
    chestCm: '35 – 42 cm',
    backLengthCm: '28 cm',
    weightRangeKg: '3,2 – 5,8 kg',
    breedExamples: 'Spitz Alemão, Poodle Toy, Maltês, Gatos Adultos (British / Siamês)',
  },
  {
    size: 'M',
    neckCm: '31 – 37 cm',
    chestCm: '43 – 52 cm',
    backLengthCm: '35 cm',
    weightRangeKg: '6,0 – 10,5 kg',
    breedExamples: 'Dachshund (Teckel), Shih Tzu, Pug, Jack Russell',
  },
  {
    size: 'G',
    neckCm: '38 – 45 cm',
    chestCm: '53 – 64 cm',
    backLengthCm: '42 cm',
    weightRangeKg: '11,0 – 17,5 kg',
    breedExamples: 'Bulldog Francês, Corgi, Beagle, Cocker Spaniel',
  },
  {
    size: 'GG',
    neckCm: '46 – 54 cm',
    chestCm: '65 – 78 cm',
    backLengthCm: '52 cm',
    weightRangeKg: '18,0 – 28,0 kg',
    breedExamples: 'Golden Retriever Jovem, Border Collie, Bulldog Inglês',
  },
];

export const HERO_CAMPAIGN = {
  seasonKicker: 'Coleção Outono / Inverno · Alfaiataria Botânica',
  headline: 'Conforto anatômico e fibras naturais para o passeio diário.',
  subheadline:
    'Roupas desenhadas respeitando o movimento livre de cães e gatos. Lã merino certificada, algodão orgânico penteado e tecidos impermeáveis com abertura selada para guia.',
  image: '/src/assets/images/hero_pet_editorial_1791498762841.jpg',
  featuredProductIds: ['jj-04', 'jj-02'],
};

export const PET_PRODUCTS: PetProduct[] = [
  {
    id: 'jj-01',
    sku: 'JJ-26-MER-01',
    name: 'Tricô Gola Alta Merino Canela',
    subtitle: 'Trama trançada artesanal com elasticidade de 4 vias no tórax',
    category: 'dogs',
    garmentType: 'knitwear',
    categoryLabel: 'Cães · Tricô de Lã Merino',
    price: 94.5,
    originalPrice: 189.0,
    checkoutUrl: 'https://buy.stripe.com/test_5kQfZia9eaqqcvP6rLbAs0c',
    image: '/src/assets/images/product_knit_sweater_1791498773417.jpg',
    fallbackGradient: 'from-[#E5DDD2] to-[#D4C5B4]',
    material: '85% Lã Merino Extra-Macia · 15% Algodão Orgânico',
    careInstructions: 'Lavagem delicada em água fria. Secar na horizontal à sombra.',
    thermalIndex: 'Conforto Térmico: 8°C a 18°C',
    leashHoleIncluded: true,
    statusNote: 'Tiragem Artesanal',
    colors: [
      { name: 'Canela Tostado', hex: '#A85226' },
      { name: 'Aveia Natural', hex: '#DFD5C6' },
      { name: 'Verde Musgo', hex: '#2A4230' },
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    description:
      'Desenvolvido especialmente para cães de dorso alongado e peito profundo. O ponto trançado retém o calor corporal sem abafar a pelagem, evitando nós ou atrito nas axilas durante caminhadas longas.',
    fitHighlights: [
      'Recorte inferior anatômico que mantém a peça limpa e seca durante o passeio',
      'Punhos canelados sem elástico sintético para não comprimir as patas dianteiras',
      'Abertura reforçada na nuca para conexão direta no peitoral ou coleira',
    ],
    rating: 4.9,
    reviewCount: 64,
  },
  {
    id: 'jj-02',
    sku: 'JJ-26-PRK-02',
    name: 'Parka Impermeável Brisa & Floresta',
    subtitle: 'Membrana corta-vento bicolor com botões de latão escovado',
    category: 'dogs',
    garmentType: 'outerwear',
    categoryLabel: 'Cães · Impermeável Técnico',
    price: 124.0,
    originalPrice: 248.0,
    checkoutUrl: 'https://buy.stripe.com/test_5kQ6oI0yE7ee7bv2bvbAs0d',
    image: '/src/assets/images/product_rain_parka_1791498783157.jpg',
    fallbackGradient: 'from-[#E0D9CC] to-[#C8C0B0]',
    material: 'Algodão Encerado Impermeável · Forro em Flanela de Algodão',
    careInstructions: 'Limpar com pano úmido ou ciclo rápido para impermeáveis.',
    thermalIndex: 'Proteção Chuva & Vento: 5°C a 20°C',
    leashHoleIncluded: true,
    statusNote: 'Impermeável 5.000mm',
    colors: [
      { name: 'Mostarda & Floresta', hex: '#D49B27' },
      { name: 'Oliva & Pedra', hex: '#4B5842' },
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    description:
      'Para dias chuvosos ou trilhas úmidas. A Parka Brisa & Floresta combina tecido externo repelente à água com forro interno em flanela respirável 100% algodão, mantendo o subpelo seco sem ruídos plásticos que incomodam a audição canina.',
    fitHighlights: [
      'Tecido silencioso (zero ruído de nylon) que não causa estresse sensorial no pet',
      'Vivo refletivo discreto ao longo das costas para visibilidade noturna',
      'Bolso funcional traseiro com botão de pressão para saquinhos higiênicos',
    ],
    rating: 5.0,
    reviewCount: 92,
  },
  {
    id: 'jj-03',
    sku: 'JJ-26-FEL-03',
    name: 'Cardigan Felino Sálvia Botânica',
    subtitle: 'Modelagem sem mangas de ombro livre para mobilidade felina total',
    category: 'cats',
    garmentType: 'knitwear',
    categoryLabel: 'Gatos & Pequeno Porte · Malha Canelada',
    price: 77.0,
    originalPrice: 154.0,
    checkoutUrl: 'https://buy.stripe.com/test_fZu3cwa9e7ee9jDg2lbAs0e',
    image: '/src/assets/images/product_cat_cardigan_1791498794920.jpg',
    fallbackGradient: 'from-[#DCE2D7] to-[#C5CFC0]',
    material: '100% Algodão Orgânico Penteado (Certificado GOTS)',
    careInstructions: 'Lavável na máquina em saco protetor. Não usar alvejante.',
    thermalIndex: 'Conforto Interno: 12°C a 22°C',
    leashHoleIncluded: false,
    statusNote: 'Ergonomia Felina',
    colors: [
      { name: 'Verde Sálvia', hex: '#9CAF98' },
      { name: 'Areia Calcário', hex: '#E4DEC9' },
      { name: 'Grafite Suave', hex: '#52575D' },
    ],
    sizes: ['PP', 'P', 'M'],
    description:
      'Gatos exigem liberdade absoluta nas escápulas para saltar e se espreguiçar. Este colete cardigan utiliza malha canelada super leve com abertura frontal por botões naturais de madeira de oliveira, facilitando o vestir sem passar pela cabeça.',
    fitHighlights: [
      'Cava ampla desenhada para não interferir no equilíbrio ou reflexo de salto',
      'Fechamento ventral suave com botões planos de madeira natural hipoalergênica',
      'Fibras antiestáticas que evitam embaraçar pelos densos como British Shorthair e Persa',
    ],
    rating: 4.8,
    reviewCount: 47,
  },
  {
    id: 'jj-04',
    sku: 'JJ-26-SHP-04',
    name: 'Jaqueta Sherpa Aveia & Bandana Linho',
    subtitle: 'Fleece bouclé de alta densidade com acabamento em viés verde oliva',
    category: 'dogs',
    garmentType: 'outerwear',
    categoryLabel: 'Cães & Filhotes · Fleece Bouclé',
    price: 107.5,
    originalPrice: 215.0,
    checkoutUrl: 'https://buy.stripe.com/test_14A28s4OUdCCgM517rbAs0f',
    image: '/src/assets/images/product_fleece_hoodie_1791498804504.jpg',
    fallbackGradient: 'from-[#EFECE6] to-[#DFD8CC]',
    material: 'Sherpa Algodão Reciclado · Bandana em Linho Puro Removível',
    careInstructions: 'Lavar do avesso em água fria. Escovar levemente após secar.',
    thermalIndex: 'Inverno Intenso: 4°C a 16°C',
    leashHoleIncluded: true,
    statusNote: 'Acompanha Bandana',
    colors: [
      { name: 'Aveia & Oliva', hex: '#E6DEC8' },
      { name: 'Caramelo & Musgo', hex: '#C68B59' },
    ],
    sizes: ['PP', 'P', 'M', 'G'],
    description:
      'Nossa peça dois-em-um favorita para manhãs geladas. A Jaqueta Sherpa envolve o pet em uma textura macia tipo carneirinho vegano, com zíper protegido por aba interna que impede qualquer beliscão nos pelos longos ou encaracolados.',
    fitHighlights: [
      'Zíper YKK com guarda-pelo interno de algodão para proteção total da pelagem',
      'Acompanha bandana triangular em linho listrado que pode ser usada separadamente',
      'Punhos em ribana macia com toque aveludado e zero compressão articular',
    ],
    rating: 4.9,
    reviewCount: 81,
  },
  {
    id: 'jj-05',
    sku: 'JJ-26-PUF-05',
    name: 'Colete Matelassê Oliva & Tricô Duo',
    subtitle: 'Conjunto acolchoado leve usado em nossa campanha de jardim',
    category: 'dogs',
    garmentType: 'outerwear',
    categoryLabel: 'Cães · Conjunto Alfaiataria',
    price: 132.0,
    originalPrice: 264.0,
    checkoutUrl: 'https://buy.stripe.com/test_aFa00kgxCfKK7bv5nHbAs0g',
    image: '/src/assets/images/hero_pet_editorial_1791498762841.jpg',
    fallbackGradient: 'from-[#D7DDD3] to-[#BFC8B9]',
    material: 'Nylon Ripstop Fosco Repelente + Base em Tricô de Algodão',
    careInstructions: 'Peças separáveis: lavar o tricô no ciclo delicado.',
    thermalIndex: 'Dual Layer: 3°C a 19°C',
    leashHoleIncluded: true,
    statusNote: 'Edição de Campanha',
    colors: [
      { name: 'Oliva & Aveia', hex: '#3E4A35' },
      { name: 'Terracota & Cru', hex: '#B85A3A' },
    ],
    sizes: ['P', 'M', 'G', 'GG'],
    description:
      'O visual icônico da campanha JJ STORE. Combina uma camada base em tricô canelado cor aveia com um colete matelassê verde oliva estruturado, permitindo usar as peças juntas nos dias de geada ou separadas na meia-estação.',
    fitHighlights: [
      'Modelagem testada em tórax largo (Bulldog Francês) e porte atlético (Golden filhote)',
      'Enchimento térmico hipoalergênico ultraleve (apenas 110g no tamanho M)',
      'Bolsos laterais em alfaiataria e botões de pressão em latão fosco',
    ],
    rating: 5.0,
    reviewCount: 53,
  },
];

export const ATELIER_TESTIMONIALS = [
  {
    id: 't1',
    quote:
      'Antes do Tricô Merino da JJ STORE, meu Dachshund (Otto, 7,4 kg) ficava com vermelhidão nas axilas por conta das costuras sintéticas de roupas comuns. Com o tamanho M da JJ, ele corre no parque por 45 minutos sem nenhuma marca na pele e a pelagem continua sedosa.',
    author: 'Mariana Vasconcelos',
    role: 'Tutora do Otto (Dachshund Standard)',
    location: 'São Paulo, SP',
    verifiedPurchase: 'Tricô Gola Alta Merino Canela · Tam M',
  },
  {
    id: 't2',
    quote:
      'Minha gata British Shorthair sempre congelava e se recusava a andar quando tentávamos colocar roupinhas pós-tosa ou no inverno. O Cardigan Sálvia tem a cava tão livre que ela pulou na poltrona no primeiro minuto de uso.',
    author: 'Dr. Henrique Alencar',
    role: 'Médico Veterinário Felino & Tutor da Margot',
    location: 'Curitiba, PR',
    verifiedPurchase: 'Cardigan Felino Sálvia Botânica · Tam P',
  },
];
