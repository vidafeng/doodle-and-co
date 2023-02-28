import React from "react";
import Image from "next/image";
import { data } from "../utils/data";

const Products = () => {
  return (
    <div>
      {data.products.map((product) => (
        <Image
          key={product.id}
          src={`/images${product.image}`}
          alt={product.title}
          height={230}
          width={230}
          style={{ objectFit: "cover", height: "230px" }}
        />
      ))}
    </div>
  );
};

export default Products;
