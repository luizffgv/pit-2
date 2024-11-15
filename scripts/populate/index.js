import { PrismaClient } from "../../prisma/prisma-client-js/index.js";

const prisma = new PrismaClient();

await prisma.$connect();

await prisma.product.deleteMany();

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

prisma.$disconnect();

console.log("Populated database with products");
