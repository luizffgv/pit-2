import { ProductPreview } from "@/components/ProductPreview";
import { UserFavoritesContextProvider } from "@/contexts/UserFavoritesContext";
import { prisma } from "@/prisma";

export default async function Home() {
  const products = await prisma.product.findMany();

  return (
    <UserFavoritesContextProvider>
      <div className="flex justify-center">
        <div className="flex max-w-screen-lg flex-wrap justify-center gap-8 px-8">
          {products.map((product) => (
            <ProductPreview key={product.id} product={product} />
          ))}
        </div>
      </div>
    </UserFavoritesContextProvider>
  );
}
