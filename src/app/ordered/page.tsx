"use client";

import { TruckIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/Button";
import { redirect } from "next/navigation";

export default function Ordered() {
  const handleReturn = () => {
    redirect("/");
  };

  return (
    <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 flex-col items-center gap-4">
      <div className="-rotate-12">
        <motion.div
          initial={{ opacity: 0, translateX: -100 }}
          animate={{ opacity: 1, translateX: 0 }}
        >
          <TruckIcon className="h-64 w-64 text-orange-950 opacity-50" />
        </motion.div>
      </div>
      <motion.p
        transition={{ delay: 0.1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-4xl font-bold"
      >
        Seu pedido está a caminho!
      </motion.p>
      <motion.div
        transition={{ delay: 0.2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Button onClick={handleReturn}>Retornar</Button>
      </motion.div>
    </div>
  );
}
