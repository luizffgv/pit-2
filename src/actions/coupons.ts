"use server";

import { prisma } from "@/prisma";

export async function getCoupons() {
  return await prisma.coupon.findMany();
}
