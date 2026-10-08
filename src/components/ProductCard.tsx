import React, { useState } from 'react';
import { PetProduct, PetSize } from '../data/products';
import { Check, Eye, Plus, ExternalLink } from 'lucide-react';

interface ProductCardProps {
  product: PetProduct;
  onSelectProduct: (product: PetProduct) => void;
  onQuickAdd: (product: PetProduct, size: PetSize, colorName: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onQuickAdd,
}) => {
  const [selectedSize, setSelectedSize] = useState<PetSize>(product.sizes[1] || product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0].name);
  const [imageError, setImageError] = useState<boolean>(false);
  const [justAdded, setJustAdded] = useState<boolean>(false);

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onQuickAdd(product, selectedSize, selectedColor);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article
      onClick={() => onSelectProduct(product)}
      className="group cursor-pointer flex flex-col bg-[#F3EFE6] border border-[#E6DFD3] rounded-xl overflow-hidden transition-transform duration-200 ease-out hover:-translate-y-0.5"
    >
      {/* Image Container - 70% visual weight, 4:3 aspect ratio */}
      <div className="relative aspect-4/3 w-full bg-[#EFECE6] overflow-hidden">
        {!imageError ? (
          <img
            src={product.image}
            alt={`${product.name} — ${product.subtitle}`}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-300 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${product.fallbackGradient} flex flex-col items-center justify-center p-6 text-center`}
          >
            <svg
              className="w-10 h-10 text-[#2A4230]/50 mb-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
            </svg>
            <span className="font-display text-sm text-[#1C241E] font-medium">
              {product.name}
            </span>
          </div>
        )}

        {/* Quick Inspect Overlay Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelectProduct(product);
          }}
          aria-label={`Ver detalhes de ${product.name}`}
          className="absolute top-3 right-3 h-10 px-3 bg-[#FAF8F5]/90 backdrop-blur-xs text-[#1C241E] text-xs font-medium rounded-lg flex items-center gap-1.5 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity duration-150 hover:bg-[#FAF8F5] whitespace-nowrap"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Ver Peça</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-1 justify-between gap-4">
        <div>
          {/* Unboxed quiet metadata line - Zero-Pill Discipline */}
          <div className="flex items-center gap-1.5 text-[12px] text-[#5C645E] mb-1.5 truncate">
            <span>{product.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{product.statusNote}</span>
          </div>

          {/* Title & Price Row */}
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[16px] font-semibold text-[#1C241E] leading-snug group-hover:text-[#2A4230] transition-colors">
              {product.name}
            </h3>
            <div className="flex flex-col items-end shrink-0">
              {product.originalPrice && (
                <span className="font-mono-num text-[11px] text-[#5C645E] line-through">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
              <span className="font-mono-num text-[15px] font-semibold text-[#2A4230]">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          <p className="text-[13px] text-[#5C645E] mt-1 line-clamp-2 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        {/* Interactive Variant Selection & Add to Bag */}
        <div
          className="pt-3 border-t border-[#E6DFD3] flex flex-col gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-2">
            {/* Color Swatches */}
            <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Cores disponíveis">
              {product.colors.map((color) => {
                const isSelected = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    title={`Cor: ${color.name}`}
                    aria-label={`Selecionar cor ${color.name}`}
                    aria-checked={isSelected}
                    role="radio"
                    className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2A4230] ${
                      isSelected ? 'ring-2 ring-[#1C241E] ring-offset-1 ring-offset-[#F3EFE6] scale-105' : 'opacity-80 hover:opacity-100'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/15"
                      style={{ backgroundColor: color.hex }}
                    />
                  </button>
                );
              })}
            </div>

            {/* Interactive Size Selector Buttons */}
            <div className="flex items-center gap-1 bg-[#EAE4D7] p-0.5 rounded-lg" role="group" aria-label="Tamanhos">
              {product.sizes.map((size) => {
                const active = selectedSize === size;
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[28px] h-7 px-1.5 text-[11px] font-mono-num font-medium rounded-md transition-colors whitespace-nowrap ${
                      active
                        ? 'bg-[#FAF8F5] text-[#1C241E] shadow-2xs'
                        : 'text-[#5C645E] hover:text-[#1C241E]'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <a
              href={product.checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="h-10 px-3 rounded-lg bg-[#2A4230] hover:bg-[#1F3324] text-[#FAF8F5] text-xs font-medium flex items-center justify-center gap-1.5 transition-colors duration-150 whitespace-nowrap"
            >
              <span>Comprar Agora</span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>

            <button
              type="button"
              onClick={handleQuickAddClick}
              className={`h-10 px-3 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors duration-150 whitespace-nowrap ${
                justAdded
                  ? 'bg-[#2A4230] text-[#FAF8F5]'
                  : 'bg-[#1C241E] text-[#FAF8F5] hover:bg-[#2A4230]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 shrink-0" />
                  <span>Na Sacola</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5 shrink-0" />
                  <span>Sacola · {selectedSize}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
