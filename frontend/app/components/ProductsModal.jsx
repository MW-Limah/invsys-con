import { useState } from "react";
import { MdClose } from "react-icons/md";

/* Passe parametros props como objeto */
export default function ProductsModal({ show, setShow }) {
  const [category, setCategory] = useState("");
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="fixed flex flex-col gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-lg w-[600px] h-auto border-2 border-[#ddd]">
        <div className="flex justify-between mb-2">
          <h2 className="text-xl">Cadastro de Produto</h2>
          <button
            onClick={() => {
              setShow(false);
            }}
            className="self-end text-2xl text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <MdClose />
          </button>
        </div>
        <form className="flex flex-col gap-4">
          <input
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="text"
            placeholder="Insira o Nome do Produto"
          />
          <input
            type="number"
            placeholder="Insira o Código de Barras"
            className="border p-2 rounded-md border-[#ccc] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {/* Limitar a 100 letras */}
          <input
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="text"
            placeholder="Descreva brevemente o produto"
          />
          <input
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="number"
            placeholder="Insira a Quantidade em Estoque"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-2 rounded-md border-[#ccc] bg-white"
          >
            <option value="" disabled>
              Selecione uma categoria
            </option>
            <option value="eletronics">Eletrônicos</option>
            <option value="food">Alimentos</option>
            <option value="clothing">Vestuário</option>
            <option value="cosmetics">Cosméticos</option>
            <option value="others">Outros</option>
          </select>

          {category === "others" && (
            <input
              className="border p-2 rounded-md border-emerald-400 bg-emerald-50 animate-in fade-in zoom-in duration-200"
              type="text"
              placeholder="Qual a outra categoria?"
              autoFocus
            />
          )}

          <input
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="date"
            placeholder="Insira a Data de Validade (se aplicável)"
          />
          <input
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="file"
            placeholder="Insira a Imagem do Produto (se aplicável)"
          />
        </form>
        <button className="bg-emerald-500 rounded-xl font-bold py-3 w-[200px] self-center text-white hover:bg-emerald-400 transition-colors cursor-pointer">
          Cadastrar Produto
        </button>
        {/* Renderizar mensagem de erro/sucesso dinamicamente */}
        <p>Erro: teste</p>
      </div>
    </div>
  );
}
