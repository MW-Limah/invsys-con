import Link from "next/link";

export default function Aside() {
  return (
    <div className="flex px-4 py-2 flex-col h-screen w-[20rem] bg-white text-[#2d2d2d] ">
      <h1 className="mt-4 pb-2 text-2xl border-b-1 border-[#999] ">
        Invsys Controller
      </h1>
      <ul className="mt-4 text-xl">
        <li>
          <Link href={"/suppliers"}>Fornecedores</Link>
        </li>
        <li>
          <Link href={"/products"}>Produtos</Link>
        </li>
        <li>
          <Link href={"/associations"}>Associações</Link>
        </li>
      </ul>
    </div>
  );
}
