import React, { useState } from 'react';
import { PetProduct, PetSize, SIZE_SPECIFICATIONS } from '../data/products';
import { X, Check, ShoppingBag, Ruler, ExternalLink } from 'lucide-react';

interface ProductDetailModalProps {
  product: PetProduct | null;
  onClose: () => void;
  onAddToCart: (product: PetProduct, size: PetSize, colorName: string, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<PetSize>(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0].name);
  const [quantity, setQuantity] = useState<number>(1);
  const [imgError, setImgError] = useState<boolean>(false);
  const [addedFeedback, setAddedFeedback] = useState<boolean>(false);

  const currentSizeSpec = SIZE_SPECIFICATIONS.find((s) => s.size === selectedSize);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pdp-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#E6DFD3] rounded-2xl overflow-hidden shadow-xl max-h-[90vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar detalhes do produto"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#FAF8F5]/90 text-[#1C241E] hover:bg-[#EAE4D7] flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Sticky Gallery Column */}
        <div className="md:w-1/2 bg-[#F3EFE6] flex flex-col justify-between">
          <div className="relative aspect-4/3 md:aspect-auto md:h-full w-full overflow-hidden">
            {!imgError ? (
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-center"
              />
            ) : (
              <div
                className={`w-full h-full min-h-[320px] bg-gradient-to-br ${product.fallbackGradient} flex items-center justify-center p-8 text-center`}
              >
                <span className="font-display text-lg text-[#1C241E]">{product.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Contiguous Purchase Module */}
        <div className="md:w-1/2 p-6 sm:p-8 overflow-y-auto flex flex-col justify-between gap-6">
          <div>
            {/* Quiet Unboxed Metadata */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-[#5C645E] mb-2">
              <span>{product.categoryLabel}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-num">Ref: {product.sku}</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono-num">★ {product.rating.toFixed(1)} ({product.reviewCount} avaliações)</span>
            </div>

            <h2
              id="pdp-modal-title"
              className="font-display text-2xl sm:text-[26px] font-semibold text-[#1C241E] leading-tight"
            >
              {product.name}
            </h2>

            <div className="mt-2 flex flex-wrap items-baseline gap-2.5">
              {product.originalPrice && (
                <span className="font-mono-num text-sm text-[#5C645E] line-through">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
              <span className="font-mono-num text-xl font-semibold text-[#2A4230]">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-xs text-[#5C645E]">
                ou 3x de <strong className="font-mono-num font-normal">R$ {(product.price / 3).toFixed(2).replace('.', ',')}</strong> sem juros
              </span>
            </div>

            <p className="mt-4 text-sm text-[#1C241E]/85 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#5C645E]">Cor selecionada:</span>
                <span className="font-medium text-[#1C241E]">{selectedColor}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((color) => {
                  const active = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      className={`h-10 px-3 rounded-lg border text-xs font-medium flex items-center gap-2 transition-colors whitespace-nowrap ${
                        active
                          ? 'border-[#1C241E] bg-[#F3EFE6] text-[#1C241E]'
                          : 'border-[#E6DFD3] bg-transparent text-[#5C645E] hover:text-[#1C241E]'
                      }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20 shrink-0"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Selection with Instant Telemetry */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-[#5C645E]">Tamanho anatômico:</span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenSizeGuide();
                  }}
                  className="text-[#2A4230] font-medium hover:underline flex items-center gap-1 whitespace-nowrap"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Calculadora de Medidas</span>
                </button>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {(['PP', 'P', 'M', 'G', 'GG'] as PetSize[]).map((size) => {
                  const available = product.sizes.includes(size);
                  const active = selectedSize === size;
                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!available}
                      onClick={() => setSelectedSize(size)}
                      className={`h-10 rounded-lg font-mono-num text-xs font-medium transition-colors whitespace-nowrap ${
                        !available
                          ? 'bg-[#F3EFE6]/50 text-[#5C645E]/40 border border-[#E6DFD3] cursor-not-allowed line-through'
                          : active
                          ? 'bg-[#2A4230] text-[#FAF8F5] border border-[#2A4230]'
                          : 'bg-[#F3EFE6] text-[#1C241E] border border-[#E6DFD3] hover:border-[#1C241E]'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>

              {/* Instant Size Fit Specs */}
              {currentSizeSpec && (
                <div className="mt-3 p-3 rounded-lg bg-[#F3EFE6] border border-[#E6DFD3] text-xs text-[#5C645E] flex flex-col gap-1">
                  <div className="flex items-center justify-between font-mono-num text-[#1C241E]">
                    <span>Tórax: {currentSizeSpec.chestCm}</span>
                    <span>·</span>
                    <span>Dorso: {currentSizeSpec.backLengthCm}</span>
                    <span>·</span>
                    <span>Peso: {currentSizeSpec.weightRangeKg}</span>
                  </div>
                  <div className="text-[11px] text-[#5C645E]">
                    Ideal para: {currentSizeSpec.breedExamples}
                  </div>
                </div>
              )}
            </div>

            {/* Technical Material & Fit Highlights */}
            <div className="mt-5 pt-4 border-t border-[#E6DFD3] space-y-2 text-xs text-[#5C645E]">
              <div>
                <strong className="text-[#1C241E] font-medium">Composição:</strong> {product.material}
              </div>
              <div>
                <strong className="text-[#1C241E] font-medium">Faixa Térmica:</strong> {product.thermalIndex} ·{' '}
                {product.leashHoleIncluded ? 'Com abertura selada para guia' : 'Uso interno livre de guia'}
              </div>
              <ul className="space-y-1 pt-1">
                {product.fitHighlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#2A4230] font-bold">·</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contiguous Action Row */}
          <div className="pt-4 border-t border-[#E6DFD3] flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              {/* Quantity Stepper */}
              <div className="flex items-center border border-[#E6DFD3] rounded-lg bg-[#F3EFE6] h-11">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Diminuir quantidade"
                  className="w-10 h-full text-sm font-mono-num text-[#1C241E] hover:bg-[#EAE4D7] rounded-l-lg transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center font-mono-num text-xs font-medium text-[#1C241E]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Aumentar quantidade"
                  className="w-10 h-full text-sm font-mono-num text-[#1C241E] hover:bg-[#EAE4D7] rounded-r-lg transition-colors"
                >
                  +
                </button>
              </div>

              <a
                href={product.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 h-11 px-5 rounded-lg bg-[#2A4230] hover:bg-[#1F3324] text-[#FAF8F5] text-xs sm:text-sm font-medium flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <span>Prosseguir para Compra · R$ {(product.price * quantity).toFixed(2).replace('.', ',')}</span>
                <ExternalLink className="w-4 h-4 shrink-0" />
              </a>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              className="w-full h-10 px-4 rounded-lg border border-[#E6DFD3] bg-[#F3EFE6] hover:bg-[#EAE4D7] text-[#1C241E] text-xs font-medium flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
            >
              {addedFeedback ? (
                <>
                  <Check className="w-4 h-4 text-[#2A4230]" />
                  <span>Adicionado à Sacola</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Adicionar à Sacola para Comprar Mais Peças</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
