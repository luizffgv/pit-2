"use client";

import { useCart } from "@/contexts/CartContext";
import { useCallback, useMemo } from "react";
import { CartProduct } from "./_component/CartProduct";
import { TotalCost } from "./_component/TotalCost";
import { TextInput } from "@/components/TextInput";
import { useForm } from "react-hook-form";
import { CoffeeIcon, ShoppingCartIcon } from "lucide-react";
import clsx from "clsx";
import { useCartProducts } from "@/contexts/CartProductsContext";
import { order } from "@/actions/orders";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Select } from "@/components/Select";
import { REACT_QUERY_KEYS } from "@/constants/react-query";
import { getCoupons } from "@/actions/coupons";

type FormData = {
  address: string;
  couponId: string;
};

export default function Cart(): JSX.Element {
  const { clearCart, itemCounts } = useCart();
  const { isError, isLoading, products } = useCartProducts();
  const { isPending, mutate, isSuccess } = useMutation({ mutationFn: order });
  const {
    data: coupons,
    isError: isErrorCoupons,
    isLoading: isLoadingCoupons,
  } = useQuery({
    queryKey: REACT_QUERY_KEYS.getCoupons(),
    queryFn: getCoupons,
  });

  const {
    formState: { isValid },
    handleSubmit,
    register,
    watch,
  } = useForm<FormData>({
    defaultValues: {
      address: "",
      couponId: "",
    },
  });

  const selectedCouponId = watch("couponId");
  const selectedCoupon = useMemo(
    () => coupons?.find((coupon) => coupon.id === Number(selectedCouponId)),
    [coupons, selectedCouponId],
  );

  const couponOptions = useMemo(
    () => [
      { id: "", name: "Nenhum" },
      ...(coupons?.map((coupon) => ({
        id: String(coupon.id),
        name: coupon.code,
      })) ?? []),
    ],
    [coupons],
  );

  const submit = useCallback(() => {
    clearCart();
    mutate(
      {
        products: products.map((product) => ({
          id: String(product.id),
          count: itemCounts.get(String(product.id)) ?? 0,
        })),
      },
      {
        onSuccess: () => {
          window.location.href = "/ordered";
        },
      },
    );
  }, [clearCart, mutate, products]);

  const handleReturnToProducts = useCallback(() => {
    window.location.href = "/";
  }, []);

  if (isLoading || isPending || isSuccess) {
    return <Loader />;
  }

  if (isError || products == null) {
    return <div>Erro ao carregar produtos</div>;
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4">
        <p className="text-center">
          Parece que seu carrinho está vazio
          <br />
          Que tal escolher um café?
        </p>
        <Button onClick={handleReturnToProducts}>
          <CoffeeIcon />
          Visualizar cafés
        </Button>
      </div>
    );
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
          label="Endereço"
          maxLength={255}
          {...register("address", {
            required: true,
          })}
        />
        <Select
          {...register("couponId")}
          label="Cupom de desconto (opcional)"
          options={couponOptions}
        />
        <div className="flex items-center justify-center gap-8">
          <TotalCost discountPercentage={selectedCoupon?.discountPercentage} />
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
