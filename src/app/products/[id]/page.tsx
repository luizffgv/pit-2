import { getProducts } from "@/actions/products";
import { CoffeeIcon } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [product] = await getProducts({ ids: [id] });

  if (product == null) return <div>Produto não encontrado</div>;

  return (
    <div className="flex justify-center">
      <div className="max-w-lg">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <CoffeeIcon className="h-8 w-8" />
        </div>
        <p className="mb-2">{product.description}</p>
        <div className="font-mockup">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
            tincidunt neque ac arcu luctus, in sodales nulla tempor. Maecenas
            efficitur arcu et libero lacinia, vel hendrerit sem pellentesque.
            Vivamus dapibus sapien at mauris finibus scelerisque.
          </p>
          <p>
            Nulla facilisi. Donec et turpis ac nisi volutpat fringilla. Aliquam
            vestibulum felis non libero convallis, in tempor elit dapibus.
            Integer condimentum tincidunt nunc, id mollis elit vehicula in.
            Aenean vel eros sed justo ultricies eleifend.
          </p>
          <p>
            Fusce venenatis odio a velit tempor tincidunt. Ut gravida justo ut
            volutpat interdum. Morbi tincidunt arcu a odio aliquet, eget euismod
            neque cursus. Suspendisse potenti. Integer sed dolor in ligula
            fermentum placerat.
          </p>
        </div>
      </div>
    </div>
  );
}
