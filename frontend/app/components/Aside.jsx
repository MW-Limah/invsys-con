"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaTruckLoading, FaBoxes } from "react-icons/fa";
import { FaPeopleCarryBox } from "react-icons/fa6";
import { motion } from "framer-motion";

const pages = [
  { page: "/", icon: FaHome, label: "Visão geral" },
  { page: "/products", icon: FaBoxes, label: "Produtos" },
  { page: "/suppliers", icon: FaTruckLoading, label: "Fornecedores" },
  { page: "/associations", icon: FaPeopleCarryBox, label: "Associações" },
];

export default function Aside() {
  const pathname = usePathname();

  return (
    <aside className="flex px-4 py-2 flex-col h-screen w-[20rem] bg-white text-[#2d2d2d] border-r border-[#999]">
      <h2 className="text-4xl border-b-2 border-[#ddd] mb-5 pb-3">
        <Image className="py-4" src={"/logo.png"} width={200} height={100} alt="logo" />
      </h2>

      <ul className="flex flex-col gap-2 py-2 text-xl">
        {pages.map((page) => {
          const isActive = pathname === page.page;

          return (
            <Link key={page.page} href={page.page} className="relative group">
              <li
                className={`
                relative z-10 flex items-center gap-3 py-2 px-4 rounded-md transition-colors duration-500
                ${isActive ? "text-emerald-600" : "text-[#2d2d2d] hover:text-gray-500"}
              `}
              >
                <page.icon size={22} />

                {isActive && (
                  <motion.div layoutId="activeTab" className="absolute inset-0 bg-emerald-500 w-[5px] -z-10" transition={{ type: "spring", bounce: 0.5, duration: 0.3 }} />
                )}
                <span className="font-medium">{page.label}</span>
              </li>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
}
