"use client";
import { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";

export default function SuppliersModal({ show, setShow, onSupplierAdded, editingSuppliers, setEditingSuppliers }) {
  const [formData, setFormData] = useState({
    name_enterprise: "",
    cnpj: "",
    address: "",
    phone: "",
    email: "",
    main_contact: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (editingSuppliers) {
      setFormData({
        name_enterprise: editingSuppliers.name_enterprise || "",
        cnpj: editingSuppliers.cnpj || "",
        address: editingSuppliers.address || "",
        phone: editingSuppliers.phone || "",
        email: editingSuppliers.email || "",
        main_contact: editingSuppliers.main_contact || "",
      });
    } else {
      setFormData({
        name_enterprise: "",
        cnpj: "",
        address: "",
        phone: "",
        email: "",
        main_contact: "",
      });
    }
  }, [editingSuppliers, show]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/\D/g, ""); // Remover tudo que não é número

    let maskedValue = value;

    if (name === "cnpj") {
      /* 00.000.000/0000-00 */
      maskedValue = numericValue
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .replace(/(-\d{2})\d+?$/, "$1"); // Limitar a 18 digitos
    } else if (name === "phone") {
      /* (00) 00000-0000 */
      maskedValue = numericValue
        .replace(/^(\d{2})(\d)/g, "($1) $2") // Coloca parênteses no DDD
        .replace(/(\d{5})(\d)/, "$1-$2") // Coloca o hífen após o 5º dígito
        .replace(/(-\d{4})\d+?$/, "$1"); // Limitar a 11 digitos
    } else if (name === "email") {
      /* email@gmail.com */
      // no caso, letras e numeros separados por letras + ponto + letras
      maskedValue = value
        .toLowerCase()
        .replace(/\s/g, "")
        .replace(/[^a-z0-9._\-@+]/g, "");

      // Impedir mais de um @
      const parts = maskedValue.split("@");
      if (parts.length > 2) {
        maskedValue = parts[0] + "@" + parts.slice(1).join("");
      }
    }
    setFormData((prev) => ({ ...prev, [name]: maskedValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const isEditing = !!editingSuppliers;
    const url = isEditing ? `http://localhost:3001/suppliers/${editingSuppliers.id}` : `http://localhost:3001/suppliers`;
    const method = isEditing ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const responseData = await response.json();

      if (response.ok) {
        setMessage(isEditing ? "Fornecedor atualizado com sucesso!" : "Fornecedor cadastrado com sucesso!");
        onSupplierAdded();
        setTimeout(() => handleClose(), 1500);
      } else {
        setMessage(`Erro: ${responseData.message || responseData.error}`);
      }
    } catch (error) {
      console.error("Erro na operação:", error);
      setMessage("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setEditingSuppliers(null);
    setShow(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="fixed flex flex-col gap-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-lg w-[600px] h-auto border-2 border-[#ddd]">
        <div className="flex justify-between mb-2">
          <h2 className="text-xl font-semibold">{editingSuppliers ? "Editar Fornecedor" : "Cadastro de Fornecedor"}</h2>
          <button onClick={handleClose} className="self-end text-2xl text-gray-500 hover:text-gray-800 transition-colors cursor-pointer">
            <MdClose />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            name="name_enterprise"
            value={formData.name_enterprise}
            onChange={handleChange}
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="text"
            placeholder="Insira o nome da empresa"
            required
          />
          <input
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="text"
            placeholder="00.000.000/0000-00"
            maxLength={18}
            required
          />
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="text"
            placeholder="Insira o endereço completo da empresa"
            required
          />
          <input name="phone" value={formData.phone} onChange={handleChange} className="border-1 p-2 rounded-md border-[#ccc]" type="tel" placeholder="(00) 00000-0000" required />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="email"
            placeholder="exemplo@fornecedor.com"
            required
          />
          <input
            name="main_contact"
            value={formData.main_contact}
            onChange={handleChange}
            className="border-1 p-2 rounded-md border-[#ccc]"
            type="text"
            placeholder="Contato Principal. Ex: João Carlos"
            required
          />
          <button
            className="bg-emerald-500 rounded-xl font-bold py-3 w-[200px] self-center text-white hover:bg-emerald-400 transition-colors cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? "Enviando..." : editingSuppliers ? "Atualizar Fornecedor" : "Cadastrar Fornecedor"}
          </button>
        </form>
        {message && <p className={`text-center mt-2 font-medium ${message.includes("Erro") ? "text-red-500" : "text-emerald-600"}`}>{message}</p>}
      </div>
    </div>
  );
}
