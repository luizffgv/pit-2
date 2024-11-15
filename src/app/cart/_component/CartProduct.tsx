import { useCart } from "@/contexts/CartContext";
import { Product } from "@/prisma";
import { MinusIcon, PlusIcon } from "lucide-react";
import { CircleButton } from "./CircleButton";

type Props = {
  product: Product;
};

export function CartProduct({ product }: Props): JSX.Element {
  const { itemCounts, addItem, removeItem } = useCart();

  const productQuantity = itemCounts.get(String(product.id));

  return (
    <div className="flex min-h-12 items-center justify-between gap-8 overflow-hidden rounded-full bg-orange-100 pl-4">
      <div className="flex gap-2">
        <div className="min-w-10 text-lg font-bold">{productQuantity}x</div>
        <div className="text-lg font-bold">{product.name}</div>
      </div>
      <div className="group relative flex min-h-full min-w-32 select-none items-center justify-center overflow-hidden rounded-l-full bg-orange-950 px-4 font-bold text-orange-100 hover:bg-orange-200">
        {new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(product.price * (itemCounts.get(String(product.id)) ?? 0))}
        <div className="group-hover: absolute h-full w-full bg-orange-200 px-4 opacity-0 transition-opacity group-hover:opacity-100">
          <div className="flex h-full scale-110 items-center justify-between transition-transform group-hover:scale-100">
            <CircleButton onClick={() => removeItem(String(product.id))}>
              <MinusIcon />
            </CircleButton>
            <CircleButton onClick={() => addItem(String(product.id))}>
              <PlusIcon />
            </CircleButton>
          </div>
        </div>
      </div>
    </div>
  );
}
