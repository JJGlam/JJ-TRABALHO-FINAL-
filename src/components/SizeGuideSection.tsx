import React, { useState } from 'react';
import { PetSize, SIZE_SPECIFICATIONS } from '../data/products';

interface SizeGuideSectionProps {
  onFilterByRecommendedSize: (size: PetSize) => void;
}

export const SizeGuideSection: React.FC<SizeGuideSectionProps> = ({
  onFilterByRecommendedSize,
}) => {
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog');
  const [chestCm, setChestCm] = useState<number>(44);
  const [weightKg, setWeightKg] = useState<number>(6.8);

  const calculateRecommendedSize = (): {
    size: PetSize;
    confidenceNote: string;
    spec: (typeof SIZE_SPECIFICATIONS)[0];
  } => {
    if (chestCm <= 34 || weightKg <= 3.0) {
      return {
        size: 'PP',
        confidenceNote: 'Ajuste delicado para micro porte ou filhotes com caixa torácica estreita.',
        spec: SIZE_SPECIFICATIONS[0],
      };
    }
    if (chestCm <= 42 || weightKg <= 5.8) {
      return {
        size: 'P',
        confidenceNote:
          petType === 'cat'
            ? 'Modelagem ideal para gatos adultos com liberdade total de escápula.'
            : 'Caimento anatômico para cães de pequeno porte com folga respirável de 2 cm.',
        spec: SIZE_SPECIFICATIONS[1],
      };
    }
    if (chestCm <= 52 || weightKg <= 10.5) {
      return {
        size: 'M',
        confidenceNote: 'Equilíbrio ideal entre circunferência peitoral e comprimento dorsal.',
        spec: SIZE_SPECIFICATIONS[2],
      };
    }
    if (chestCm <= 64 || weightKg <= 17.5) {
      return {
        size: 'G',
        confidenceNote: 'Recorte peitoral expandido para raças de tórax profundo como Bulldog e Corgi.',
        spec: SIZE_SPECIFICATIONS[3],
      };
    }
    return {
      size: 'GG',
      confidenceNote: 'Modelagem ampla para porte médio-grande com cava reforçada.',
      spec: SIZE_SPECIFICATIONS[4],
    };
  };

  const recommendation = calculateRecommendedSize();

  return (
    <section
      id="guia-medidas"
      className="py-16 sm:py-24 border-t border-[#E6DFD3] bg-[#F3EFE6]/60"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="max-w-2xl mb-12">
          <div className="text-xs text-[#5C645E] mb-2">
            <span>02. Alfaiataria Anatômica</span>
            <span className="mx-1.5" aria-hidden="true">·</span>
            <span>Provador Digital JJ STORE</span>
          </div>
          <h2
            className="font-display text-2xl sm:text-3xl font-semibold text-[#1C241E] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            Encontre o caimento exato sem apertar a pelagem.
          </h2>
          <p className="mt-3 text-[15px] text-[#5C645E] leading-relaxed">
            A medida mais importante na alfaiataria pet é a circunferência do tórax (logo atrás das patas dianteiras). Use nossa calculadora abaixo ou consulte a tabela técnica em centímetros.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Fit Calculator */}
          <div className="lg:col-span-5 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xl p-6 sm:p-7">
            <h3 className="font-display text-lg font-semibold text-[#1C241E] mb-4">
              Simulador de Medida do Pet
            </h3>

            {/* Species Selector */}
            <div className="mb-5">
              <label className="block text-xs text-[#5C645E] mb-2">Espécie do seu companheiro</label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-[#F3EFE6] rounded-lg">
                <button
                  type="button"
                  onClick={() => {
                    setPetType('dog');
                    setChestCm(46);
                    setWeightKg(7.5);
                  }}
                  className={`h-10 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    petType === 'dog'
                      ? 'bg-[#FAF8F5] text-[#1C241E] shadow-2xs'
                      : 'text-[#5C645E] hover:text-[#1C241E]'
                  }`}
                >
                  Cachorro
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPetType('cat');
                    setChestCm(36);
                    setWeightKg(4.5);
                  }}
                  className={`h-10 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                    petType === 'cat'
                      ? 'bg-[#FAF8F5] text-[#1C241E] shadow-2xs'
                      : 'text-[#5C645E] hover:text-[#1C241E]'
                  }`}
                >
                  Gato
                </button>
              </div>
            </div>

            {/* Chest Slider */}
            <div className="mb-5">
              <div className="flex items-center justify-between text-xs mb-2">
                <label htmlFor="chest-slider" className="text-[#5C645E]">
                  Circunferência do Tórax (Peito)
                </label>
                <span className="font-mono-num font-semibold text-[#1C241E]">
                  {chestCm} cm
                </span>
              </div>
              <input
                id="chest-slider"
                type="range"
                min={22}
                max={76}
                step={1}
                value={chestCm}
                onChange={(e) => setChestCm(Number(e.target.value))}
                className="w-full accent-[#2A4230] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono-num text-[#5C645E] mt-1">
                <span>22 cm (Micro)</span>
                <span>48 cm (Médio)</span>
                <span>76 cm (Grande)</span>
              </div>
            </div>

            {/* Weight Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <label htmlFor="weight-slider" className="text-[#5C645E]">
                  Peso Aproximado
                </label>
                <span className="font-mono-num font-semibold text-[#1C241E]">
                  {weightKg.toFixed(1).replace('.', ',')} kg
                </span>
              </div>
              <input
                id="weight-slider"
                type="range"
                min={1.5}
                max={26}
                step={0.5}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-[#2A4230] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] font-mono-num text-[#5C645E] mt-1">
                <span>1,5 kg</span>
                <span>12,0 kg</span>
                <span>26,0 kg</span>
              </div>
            </div>

            {/* Output Recommendation */}
            <div className="pt-5 border-t border-[#E6DFD3]">
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-[#5C645E]">Tamanho Recomendado JJ:</span>
                <span className="font-mono-num text-2xl font-semibold text-[#2A4230]">
                  Tamanho {recommendation.size}
                </span>
              </div>
              <p className="mt-2 text-xs text-[#5C645E] leading-relaxed">
                {recommendation.confidenceNote}
              </p>
              <button
                type="button"
                onClick={() => onFilterByRecommendedSize(recommendation.size)}
                className="mt-4 w-full h-10 px-4 rounded-lg bg-[#2A4230] hover:bg-[#1F3324] text-[#FAF8F5] text-xs font-medium transition-colors whitespace-nowrap"
              >
                Filtrar Peças no Tamanho {recommendation.size}
              </button>
            </div>
          </div>

          {/* Tabular Size Chart */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-[#E6DFD3] rounded-xl overflow-hidden">
            <div className="p-6 border-b border-[#E6DFD3] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-lg font-semibold text-[#1C241E]">
                  Tabela Técnica de Medidas
                </h3>
                <p className="text-xs text-[#5C645E] mt-0.5">
                  Caso o seu pet fique entre dois tamanhos, recomendamos escolher o maior para preservar a mobilidade.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E6DFD3] bg-[#F3EFE6]/50 text-[12px] text-[#5C645E] font-medium">
                    <th className="py-3.5 px-4">Tam.</th>
                    <th className="py-3.5 px-4">Tórax (Peito)</th>
                    <th className="py-3.5 px-4">Pescoço</th>
                    <th className="py-3.5 px-4">Comprimento</th>
                    <th className="py-3.5 px-4">Peso Ref.</th>
                    <th className="py-3.5 px-4">Referência de Porte / Raça</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E6DFD3] text-xs">
                  {SIZE_SPECIFICATIONS.map((row) => {
                    const isHighlighted = row.size === recommendation.size;
                    return (
                      <tr
                        key={row.size}
                        className={`transition-colors ${
                          isHighlighted ? 'bg-[#2A4230]/8 font-medium' : 'hover:bg-[#F3EFE6]/40'
                        }`}
                      >
                        <td className="py-3.5 px-4 font-mono-num font-semibold text-[#1C241E]">
                          {row.size}
                          {isHighlighted && (
                            <span className="ml-1.5 text-[11px] text-[#2A4230] font-sans font-normal">
                              (Seu Pet)
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 font-mono-num text-[#1C241E] whitespace-nowrap">
                          {row.chestCm}
                        </td>
                        <td className="py-3.5 px-4 font-mono-num text-[#5C645E] whitespace-nowrap">
                          {row.neckCm}
                        </td>
                        <td className="py-3.5 px-4 font-mono-num text-[#5C645E] whitespace-nowrap">
                          {row.backLengthCm}
                        </td>
                        <td className="py-3.5 px-4 font-mono-num text-[#1C241E] whitespace-nowrap">
                          {row.weightRangeKg}
                        </td>
                        <td className="py-3.5 px-4 text-[#5C645E] min-w-[200px]">
                          {row.breedExamples}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
