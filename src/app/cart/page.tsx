"use client";

import { useCart } from "@/contexts/CartContext";
import { useCallback } from "react";
import { CartProduct } from "./_component/CartProduct";
import { TotalCost } from "./_component/TotalCost";
import { TextInput } from "@/components/TextInput";
import { useForm } from "react-hook-form";
import { ShoppingCartIcon } from "lucide-react";
import { redirect } from "next/navigation";
import clsx from "clsx";
import { useCartProducts } from "@/contexts/CartProductsContext";

type FormData = {
  address: string;
};

export default function Cart(): JSX.Element {
  const { clearCart } = useCart();
  const { isError, isLoading, products } = useCartProducts();

  const {
    formState: { isValid },
    handleSubmit,
    register,
  } = useForm<FormData>({
    defaultValues: {
      address: "",
    },
  });

  const submit = useCallback(() => {
    clearCart();
    redirect("/ordered");
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError || products == null) {
    return <div>Erro ao carregar produtos</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="flex max-w-screen-lg flex-col gap-8 px-8">
        <h1 className="text-center text-xl font-bold">
          Produtos em seu carrinho
        </h1>
        <div className="flex flex-col gap-4">
          {products.map((product) => (
            <CartProduct key={product.id} product={product} />
          ))}
        </div>
        <TextInput
          label="Endereço de entrega"
          {...register("address", {
            required: true,
          })}
        />
        <div className="flex items-center justify-center gap-8">
          <TotalCost />
          <button
            className={clsx(
              ":not(:disabled):hover:bg-orange-900 :not(:disabled):cursor-pointer flex min-h-full flex-col items-center justify-center gap-2 rounded-xl bg-orange-950 p-2 font-bold text-orange-100 transition-colors disabled:opacity-75",
            )}
            disabled={!isValid}
            onClick={handleSubmit(submit)}
          >
            <ShoppingCartIcon
              className="mr-1 inline-block"
              size={16}
              strokeWidth={3}
            />
            Fazer pedido
          </button>
        </div>
      </div>
    </div>
  );
}
