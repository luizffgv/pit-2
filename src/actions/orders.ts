"use server";

import { prisma } from "@/prisma";
import { getSession } from "@auth0/nextjs-auth0";

type OrderProps = {
  products: {
    id: string;
    count: number;
  }[];
};

export async function order({ products }: OrderProps) {
  const session = await getSession();

  if (session == null) throw new Error("User is not authenticated");

  const id = session.user.sub;
  if (typeof id !== "string") throw new Error("User is not authenticated");

  await prisma.user.upsert({
    where: { id },
    update: {},
    create: { id },
  });

  const order = await prisma.order.create({
    data: { userId: id },
  });

  await prisma.productsOnOrders.createMany({
    data: products.map((product) => ({
      orderId: order.id,
      productId: Number.parseInt(product.id),
      productCount: product.count,
    })),
  });

  return order.id;
}

export async function getOrders() {
  const session = await getSession();

  if (session == null) throw new Error("User is not authenticated");

  const id = session.user.sub;
  if (typeof id !== "string") throw new Error("User is not authenticated");

  const orders = await prisma.order.findMany({
    where: { userId: id },
    orderBy: { id: "desc" },
  });

  return await Promise.all(
    orders.map(async (order) => {
      const productsOnOrders = await prisma.productsOnOrders.findMany({
        where: { orderId: order.id },
      });

      const products = (
        await Promise.all(
          productsOnOrders.map(async (productOnOrder) => {
            const product = await prisma.product.findUnique({
              where: { id: productOnOrder.productId },
            });

            return {
              ...product,
              count: productOnOrder.productCount,
            };
          }),
        )
      ).filter((product) => product != null);

      return { ...order, products };
    }),
  );
}
