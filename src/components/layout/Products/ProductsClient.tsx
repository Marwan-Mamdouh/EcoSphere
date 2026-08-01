"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/layout/restaurant/products/ProductCard";
import ProductPopup from "@/components/layout/restaurant/products/ProductPopup";
import DeleteProductDialog from "@/components/layout/restaurant/products/DeleteProductDialog";
import { Plus } from "lucide-react";
import ProductsToolbar from "./ProductsToolbar";
import { useProducts } from "./useProducts";
import { ProductResponse } from "@/backend/features/product/dto/product.dto";

export default function ProductsClient({
  restaurantId,
  initialProducts,
  initialMetadata,
}: Readonly<{
  restaurantId: string;
  initialProducts: ProductResponse[];
  initialMetadata: any;
}>) {
  const t = useTranslations("Restaurant.Products");

  const { state, actions } = useProducts(
    restaurantId,
    initialProducts,
    initialMetadata
  );

  const renderProductsGrid = () => {
    if (state.loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-75 w-full rounded-xl" />
          ))}
        </div>
      );
    }

    if (state.products.length === 0) {
      return (
        <div className="text-center py-20 text-muted-foreground">
          {t("noProducts")}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-15">
        {state.products.map((product) => (
          <ProductCard
            key={String(product._id)}
            product={product}
            onEdit={(p) => {
              actions.setEditingProduct(p);
              actions.setIsPopupOpen(true);
            }}
            onDelete={(id) => actions.setDeleteProductId(id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="pt-15 h-[calc(100vh-20px)] w-[80%] mx-auto flex flex-col space-y-4">
      {/* Top Header */}
      <div className="flex justify-between items-center flex-wrap gap-4 shrink-0">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <Button
          onClick={() => actions.setIsPopupOpen(true)}
          className="myBtnPrimary hover:scale-105 transition-transform"
        >
          <Plus className="mr-2 h-5 w-5" /> {t("addProduct")}
        </Button>
      </div>

      <ProductsToolbar
        searchTerm={state.searchTerm}
        setSearchTerm={actions.setSearchTerm}
        selectedCategory={state.selectedCategory}
        setSelectedCategory={actions.setSelectedCategory}
        sort={state.sort}
        setSort={actions.setSort}
        sortOrder={state.sortOrder}
        setSortOrder={actions.setSortOrder}
        setPage={actions.setPage}
      />

      {/* Products Grid */}
      <div className="flex-1 overflow-y-auto px-1 min-h-0">
        {renderProductsGrid()}
      </div>

      {/* Pagination */}
      {state.metadata && state.metadata.totalPages > 1 && (
        <div className="flex justify-center space-x-2 shrink-0">
          <Button
            className="myBtnPrimary"
            disabled={state.page === 1}
            onClick={() => actions.setPage(Math.max(1, state.page - 1))}
          >
            {t("previous")}
          </Button>

          <div className="flex items-center px-4 text-sm">
            {t("page", { current: state.page, total: state.metadata.totalPages })}
          </div>

          <Button
            className="myBtnPrimary"
            disabled={state.page === state.metadata.totalPages}
            onClick={() => actions.setPage(Math.min(state.metadata.totalPages, state.page + 1))}
          >
            {t("next")}
          </Button>
        </div>
      )}

      {/* Popup */}
      <ProductPopup
        key={state.editingProduct ? String(state.editingProduct._id) : "new"}
        isOpen={state.isPopupOpen}
        onClose={() => actions.setIsPopupOpen(false)}
        onSubmit={state.editingProduct ? actions.handleUpdate : actions.handleCreate}
        title={state.editingProduct ? t("popup.editTitle") : t("popup.addTitle")}
        initialData={
          state.editingProduct
            ? {
                title: state.editingProduct.title,
                subtitle: state.editingProduct.subtitle,
                price: state.editingProduct.price,
                availableOnline: state.editingProduct.availableOnline,
                category: state.editingProduct.category,
                quantity: state.editingProduct.quantity,
                avatar: state.editingProduct.avatar,
              }
            : undefined
        }
      />

      {/* Delete Dialog */}
      <DeleteProductDialog
        isOpen={!!state.deleteProductId}
        onClose={() => actions.setDeleteProductId(null)}
        onConfirm={actions.confirmDelete}
        isDeleting={state.loading}
        productTitle={
          state.products.find((p) => String(p._id) === state.deleteProductId)?.title
        }
      />
    </div>
  );
}
