"use server";

import { prisma, Product } from "@/prisma";

type GetProductsProps = {
  ids: string[];
};

export async function getProducts({
  ids,
}: GetProductsProps): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: ids.map((id) => Number.parseInt(id)),
      },
    },
  });

  return products;
}
