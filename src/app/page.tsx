import ProductReeel from "@/components/ProductReeel";
import Wrapper from "@/components/Wrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { ArrowDownToLine, CheckCircle, LeafIcon } from "lucide-react";
import Link from "next/link";

const perks = [
  {
    name: "Instant delivery",
    description: "Your assets delivered in seconds.",
    Icon: ArrowDownToLine,
  },
  {
    name: "Guaranteed Quality",
    description: "Every asset is verified.",
    Icon: CheckCircle,
  },
  {
    name: "For the Planet",
    description: "We have pledged 1% of sales to the preservation.",
    Icon: LeafIcon,
  },
];

export default function Home() {
  return (
    <>
      <Wrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
            Your market place fir high quality{" "}
            <span className="text-blue-600">digital assets</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Welcome to DeMaplace. Every asset is verified by our team of
            specialists to ensure in quality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link className={buttonVariants()} href="/products">
              Browse Trending
            </Link>
            <Button variant={"ghost"}>Quality promise &rarr;</Button>
          </div>
        </div>

        <ProductReeel
          title="New products"
          query={{ sort: "desc", limit: 4 }}
          href="/products"
        />
      </Wrapper>
      <section className="border-t border-gray-200 bg-gray-50">
        <Wrapper className="py-20">
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-0">
            {perks.map((perk) => (
              <div
                key={perk.name}
                className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
              >
                <div className="md:flex-shrink-0 flex justify-center">
                  <div className="h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900">
                    {<perk.Icon className="w-1/3 h-1/3" />}
                  </div>
                </div>

                <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                  <h3 className="text-base font-medium text-gray-900">
                    {perk.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {perk.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Wrapper>
      </section>
    </>
  );
}
