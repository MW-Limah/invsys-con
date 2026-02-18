"use client";

import Aside from "@/components/Aside";
import { FaTrash } from "react-icons/fa";
import Image from "next/image";
import ProductsModal from "../components/ProductsModal";
import { useState } from "react";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false); // passa estado fechado

  return (
    <div className="flex h-screen w-full">
      <Aside />
      <main className="flex-1 py-6 px-10">
        <nav className="flex w-full justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Produtos</h1>
            <p className="text-xl">Gerencie seus produtos</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-6 py-2 rounded-md cursor-pointer hover:bg-gray-800 transition-colors"
          >
            + Produto
          </button>
        </nav>
        <section>
          <div>
            {/* Quantidade de clientes */}
            <div className="w-full border-b-2 border-[#ddd] py-8 bg-white mb-6">
              <p className="text-gray-500">Total de produtos</p>
              <h2 className="text-3xl font-bold mt-2">1</h2>
            </div>
          </div>
          <div className="w-full border-2 border-[#ddd] rounded-xl p-8 shadow-xl bg-white">
            {/* Lista de Fornecedores */}
            <table className="w-full">
              <thead>
                <tr className="text-gray-500 border-b border-gray-400">
                  <th className="pb-4 font-medium text-left w-1/8">
                    Nome do Produto
                  </th>
                  <th className="pb-4 font-medium text-left w-1/8">
                    Código de barras
                  </th>
                  <th className="pb-4 font-medium text-left w-1/7">
                    Descrição
                  </th>
                  <th className="pb-4 font-medium text-left w-1/8">
                    Quantidade atual
                  </th>
                  <th className="pb-4 font-medium text-left w-1/8">
                    Categoria
                  </th>
                  <th className="pb-4 font-medium text-left w-1/8">
                    Data de validade
                  </th>
                  <th className="pb-4 font-medium text-left w-1/8">
                    Imagem do Produto
                  </th>
                  <th className="pb-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                <tr className="group">
                  <td className="py-4 text-gray-700">Laço de Cetim</td>
                  <td className="py-4 text-gray-700">7891234567890</td>
                  <td className="py-4 text-gray-700">
                    {/* No máx 100 letras */}
                    Laço de cetim bege, com presilha de metal e brilho. Laço de
                    cetim bege, com presilha de metal e brilho.
                  </td>
                  <td className="py-4 text-gray-700">50</td>
                  <td className="py-4 text-gray-700">Vestuário</td>
                  <td className="py-4 text-gray-700">-</td>
                  <td className="py-4 text-gray-700 w-16 h-16 overflow-hidden ">
                    <Image
                      src={"/bege.jpg"}
                      width={60}
                      height={60}
                      className="rounded-lg object-cover"
                      alt="Produto"
                    />
                  </td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-4">
                      <button className="bg-black text-white px-4 py-1.5 rounded-xl text-sm font-light hover:bg-gray-800 transition-colors">
                        Editar dados
                      </button>
                      <button className="text-gray-800 hover:text-red-600 transition-colors cursor-pointer">
                        <FaTrash size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
        <ProductsModal show={isModalOpen} setShow={setIsModalOpen} />
      </main>
    </div>
  );
}
