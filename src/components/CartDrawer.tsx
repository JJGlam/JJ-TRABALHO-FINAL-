import React from 'react';
import { PetProduct, PetSize } from '../data/products';
import { X, Trash2, ShoppingBag, ArrowRight, ExternalLink } from 'lucide-react';

export interface CartItem {
  key: string;
  product: PetProduct;
  size: PetSize;
  colorName: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (key: string, delta: number) => void;
  onRemoveItem: (key: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 125;
  const shippingCost = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : 18.9;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  // Deduplicate products in cart to show direct Stripe checkout links if multiple distinct products are in the bag
  const uniqueProductsInCart = Array.from(
    new Map<string, PetProduct>(items.map((item) => [item.product.id, item.product])).values()
  );

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/45 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Sacola de compras JJ STORE"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-[#FAF8F5] border-l border-[#E6DFD3] h-full flex flex-col justify-between shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E6DFD3] flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-semibold text-[#1C241E]">
              Sacola JJ STORE
            </h2>
            <p className="text-xs text-[#5C645E]">
              {remainingForFreeShipping > 0 ? (
                <>
                  Faltam{' '}
                  <strong className="font-mono-num text-[#1C241E]">
                    R$ {remainingForFreeShipping.toFixed(2).replace('.', ',')}
                  </strong>{' '}
                  para Frete Grátis
                </>
              ) : subtotal > 0 ? (
                <span className="text-[#2A4230] font-medium">
                  Frete Expresso Grátis desbloqueado
                </span>
              ) : (
                'Alfaiataria botânica para cães e gatos'
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar sacola"
            className="w-10 h-10 rounded-lg hover:bg-[#F3EFE6] flex items-center justify-center text-[#1C241E] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-12 h-12 rounded-full bg-[#F3EFE6] flex items-center justify-center text-[#5C645E] mb-4">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="font-display text-base font-semibold text-[#1C241E]">
                Sua sacola está vazia
              </h3>
              <p className="text-xs text-[#5C645E] mt-1 max-w-xs leading-relaxed">
                Explore nossos tricôs em lã merino, parkas impermeáveis e cardigans ergonômicos para vestir seu pet com conforto.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-5 h-10 px-5 rounded-lg bg-[#2A4230] text-[#FAF8F5] text-xs font-medium hover:bg-[#1F3324] transition-colors whitespace-nowrap"
              >
                Explorar Coleção
              </button>
            </div>
          ) : (
            <ul className="divide-y divide-[#E6DFD3]">
              {items.map((item) => (
                <li key={item.key} className="py-4 first:pt-0 last:pb-0 flex flex-col gap-3">
                  <div className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-20 h-20 rounded-lg object-cover bg-[#F3EFE6] border border-[#E6DFD3] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-[#1C241E] truncate">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.key)}
                          aria-label={`Remover ${item.product.name}`}
                          className="text-[#5C645E] hover:text-[#1C241E] p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-xs text-[#5C645E] mt-0.5">
                        <span>Tam {item.size}</span>
                        <span className="mx-1.5" aria-hidden="true">·</span>
                        <span>{item.colorName}</span>
                      </div>

                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center border border-[#E6DFD3] rounded-md bg-[#F3EFE6] h-8">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.key, -1)}
                            className="w-7 h-full text-xs font-mono-num text-[#1C241E] hover:bg-[#EAE4D7]"
                          >
                            -
                          </button>
                          <span className="w-7 text-center font-mono-num text-xs font-medium text-[#1C241E]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.key, 1)}
                            className="w-7 h-full text-xs font-mono-num text-[#1C241E] hover:bg-[#EAE4D7]"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-mono-num text-xs font-semibold text-[#2A4230]">
                          R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Individual Stripe Link per Product */}
                  <a
                    href={item.product.checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-9 px-3 rounded-lg bg-[#F3EFE6] hover:bg-[#EAE4D7] border border-[#E6DFD3] text-[#1C241E] text-xs font-medium flex items-center justify-between transition-colors whitespace-nowrap"
                  >
                    <span className="truncate">Prosseguir: {item.product.name}</span>
                    <span className="flex items-center gap-1 text-[#2A4230] font-semibold shrink-0 ml-2">
                      <span>Pagar no Stripe</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#E6DFD3] bg-[#F3EFE6]/60 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#5C645E]">
                <span>Subtotal</span>
                <span className="font-mono-num">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-[#5C645E]">
                <span>Frete</span>
                <span className="font-mono-num">
                  {shippingCost === 0 ? 'Grátis' : `R$ ${shippingCost.toFixed(2).replace('.', ',')}`}
                </span>
              </div>
              <div className="pt-2 border-t border-[#E6DFD3] flex justify-between text-sm font-semibold text-[#1C241E]">
                <span>Total</span>
                <span className="font-mono-num">
                  R$ {(subtotal + shippingCost).toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            {uniqueProductsInCart.length === 1 ? (
              <a
                href={uniqueProductsInCart[0].checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-11 px-5 rounded-lg bg-[#2A4230] hover:bg-[#1F3324] text-[#FAF8F5] text-xs font-medium flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <span>Prosseguir para Pagamento Seguro</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            ) : (
              <div className="space-y-2">
                <div className="text-[11px] text-[#5C645E] text-center">
                  Prosseguir para o checkout individual de cada peça selecionada:
                </div>
                {uniqueProductsInCart.map((prod) => (
                  <a
                    key={prod.id}
                    href={prod.checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full h-10 px-4 rounded-lg bg-[#2A4230] hover:bg-[#1F3324] text-[#FAF8F5] text-xs font-medium flex items-center justify-between transition-colors whitespace-nowrap"
                  >
                    <span className="truncate">{prod.name}</span>
                    <span className="flex items-center gap-1.5 shrink-0 ml-2 font-mono-num">
                      <span>R$ {prod.price.toFixed(2).replace('.', ',')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
