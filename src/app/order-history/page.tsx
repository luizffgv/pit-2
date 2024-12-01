"use client";

import { getOrders } from "@/actions/orders";
import { Button } from "@/components/Button";
import { Loader } from "@/components/Loader";
import { REACT_QUERY_KEYS } from "@/constants/react-query";
import { useQuery } from "@tanstack/react-query";
import { CoffeeIcon, EyeIcon } from "lucide-react";
import { useCallback } from "react";

export default function OrderHistory(): JSX.Element {
  const { data, isError, isLoading } = useQuery({
    queryKey: [REACT_QUERY_KEYS.getOrders],
    queryFn: getOrders,
  });

  const handleViewProducts = useCallback(() => {
    window.location.href = "/";
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError || data == null) {
    return <div>Erro ao carregar pedidos</div>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="mb-8 text-3xl font-bold">Seus pedidos</h1>
      <div className="flex flex-col items-center gap-8 px-8">
        {data.length === 0 ? (
          <div className="flex flex-col items-center gap-4">
            <p>Oops, parece que você não tem nenhum pedido...</p>
            <Button onClick={handleViewProducts}>
              <EyeIcon display="inline" />
              Ver cafés
            </Button>
          </div>
        ) : null}
        {data.map((order) => (
          <div
            key={order.id}
            className="flex w-64 flex-col rounded-md border-4 border-orange-950 bg-orange-100 p-4 shadow-md"
          >
            <h2 className="mb-4 text-center text-lg font-bold">
              Pedido {order.id}
            </h2>
            <ul className="flex flex-col gap-2">
              {order.products.map((product) => (
                <li
                  key={product.id}
                  className="flex list-inside list-disc gap-4"
                >
                  <CoffeeIcon />
                  <div>{product.count}x</div>
                  <div>{product.name}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
