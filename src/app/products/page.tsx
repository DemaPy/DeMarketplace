import ProductReeel from "@/components/ProductReeel";
import Wrapper from "@/components/Wrapper";
import { PRODUCT_CATEGORIES } from "@/config";

type Param = string | string[] | undefined;

interface ProductsPageProps {
  searchParams: { [key: string]: Param };
}

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const Products = ({ searchParams }: ProductsPageProps) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === category
  )?.label;

  return (
    <Wrapper>
      <ProductReeel
        title={label ?? "Browse assets"}
        query={{
          category,
          limit: 40,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </Wrapper>
  );
};

export default Products;
