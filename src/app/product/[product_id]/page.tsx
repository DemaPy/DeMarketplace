import AddToCartButton from "@/components/AddToCartButton";
import ImageSlider from "@/components/ImageSlider";
import ProductReeel from "@/components/ProductReeel";
import Wrapper from "@/components/Wrapper";
import { PRODUCT_CATEGORIES } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { formatPrice } from "@/lib/utils";
import { CheckIcon, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

const BREADCRUMBS = [
  {
    id: 1,
    name: "Home",
    href: "/",
  },
  {
    id: 2,
    name: "Products",
    href: "/products",
  },
];

const page = async ({
  params: { product_id },
}: {
  params: { product_id: string };
}) => {
  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: product_id,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
  });

  const [product] = products;

  if (!product) return notFound();

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.category
  )?.label;

  const urls = product.images
    .map((item) =>
      typeof item.image === "string" ? item.image : item.image.url
    )
    .filter(Boolean) as string[];

  return (
    <Wrapper>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((item) => (
                <li key={item.id}>
                  <div className="flex items-center text-sm">
                    <Link
                      className="font-medium text-sm text-muted-foreground"
                      href={item.href}
                      key={item.id}
                    >
                      {item.name} /
                    </Link>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-4">
              <h1 className="tracking-tight text-3xl font-bold text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <section className="mt-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">
                  {formatPrice(product.price)}
                </p>

                <div className="pl-4 ml-4 border-l text-muted-foreground border-gray-300">
                  {label}
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <CheckIcon className="w-4 h-4 flex-shrink-0 text-green-500" />
                <p className="ml-2 text-sm text-muted-foreground">
                  Eligible for instant delivery
                </p>
              </div>
            </section>
          </div>

          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg">
              <ImageSlider urls={urls} />
            </div>
          </div>

          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lf:self-start">
            <div>
              <div className="mt-10">
                <AddToCartButton product={product} />
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm">
                  <Shield className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
                  <span className="text-muted-foreground hover:text-gray-700">
                    30 Day Return Guarantees
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReeel
        href="/products"
        query={{ category: product.category, limit: 4 }}
        title={`Similar ${label}`}
        subtitle={`Browse high quality ${label} just like ${product.name}`}
      />
    </Wrapper>
  );
};

export default page;
