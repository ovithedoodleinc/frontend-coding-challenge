"use client";

import { BackToHome } from "@/components/backToHome/backToHome";
import { PRODUCTS_DATA } from "@/data/productsData";
import { usePagination } from "@/hooks/usePagination";
import { Product } from "@/types";
import { PaginationControls } from "@/views/products/paginationControls/paginationControls";
import { ProductList } from "@/views/products/productList/productList";
import { ProductModal } from "@/views/products/productModal/productModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

export const Products: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const {
    currentPage,
    totalPages,
    paginatedItems: paginatedProducts,
    handlePageChange,
  } = usePagination({ items: PRODUCTS_DATA, itemsPerPage: 5 });

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleOpenModal = useCallback(
    (product: Product) => {
      setSelectedProduct(product);

      if (product?.id) {
        router.push(`${pathname}?product-id=${product.id}`);
      }
    },
    [pathname, router]
  );

  const handleCloseModal = useCallback(() => {
    setSelectedProduct(null);

    router.push(pathname);
  }, [pathname, router]);

  const handleFindProductById = useCallback(
    (id: string) => {
      const product = PRODUCTS_DATA.find((item) => item.id === id);

      handleOpenModal(product as Product);
    },
    [handleOpenModal]
  );

  const handleSearchParams = useCallback(() => {
    if (searchParams.has("product-id")) {
      const id = searchParams.get("product-id");

      handleFindProductById(id as string);
    } else {
      setSelectedProduct(null);
    }
  }, [handleFindProductById, searchParams]);

  useEffect(() => {
    handleSearchParams();
  }, [handleSearchParams]);

  return (
    <div>
      <BackToHome />
      <ProductList products={paginatedProducts} onOpenModal={handleOpenModal} />
      <div className="h-4" />
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
