import { PrismaClient } from "../../prisma/prisma-client-js/index.js";

const prisma = new PrismaClient();

await prisma.$connect();

await prisma.productsOnOrders.deleteMany();

await prisma.order.deleteMany();

await prisma.product.deleteMany();

await prisma.coupon.deleteMany();

await prisma.product.createMany({
  data: [
    {
      name: "Espresso",
      description: "Café forte e concentrado",
      price: 3.0,
    },
    {
      name: "Café Americano",
      description: "Espresso diluído em água quente",
      price: 3.5,
    },
    {
      name: "Café Latte",
      description: "Espresso com leite vaporizado",
      price: 4.0,
    },
    {
      name: "Cappuccino",
      description: "Espresso com leite vaporizado e espuma de leite",
      price: 4.5,
    },
    {
      name: "Mocha",
      description: "Espresso com chocolate, leite vaporizado e chantilly",
      price: 5.0,
    },
    {
      name: "Macchiato",
      description: "Espresso com uma pequena quantidade de espuma de leite",
      price: 3.5,
    },
    {
      name: "Café Gelado",
      description: "Café frio servido com gelo",
      price: 4.0,
    },
    {
      name: "Affogato",
      description: "Espresso servido sobre sorvete de baunilha",
      price: 5.5,
    },
    {
      name: "Café Irlandês",
      description: "Café com uísque irlandês, açúcar e creme",
      price: 6.0,
    },
    {
      name: "Flat White",
      description:
        "Espresso com leite vaporizado, similar ao latte mas com menos espuma",
      price: 4.5,
    },
  ],
});

await prisma.coupon.createMany({
  data: [
    {
      code: "BLACK10",
      discountPercentage: 10,
    },
    {
      code: "WELCOME15",
      discountPercentage: 15,
    },
  ],
});

prisma.$disconnect();

console.log("Populated database with products");
