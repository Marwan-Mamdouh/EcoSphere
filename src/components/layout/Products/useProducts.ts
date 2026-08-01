import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useDebounce } from "@/hooks/use-debounce";
import { ProductResponse, CreateProductDTO } from "@/backend/features/product/dto/product.dto";
import { MenuItemCategory } from "@/backend/features/restaurant/restaurant.model";

export function useProducts(
  restaurantId: string,
  initialProducts: ProductResponse[],
  initialMetadata: any
) {
  const t = useTranslations("Restaurant.Products");

  const [products, setProducts] = useState<ProductResponse[]>(initialProducts);
  const [metadata, setMetadata] = useState<any>(initialMetadata);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(searchTerm, 500);

  const [selectedCategory, setSelectedCategory] = useState<MenuItemCategory | "all">("all");
  const [sort, setSort] = useState<"price" | "sustainabilityScore">("price");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductResponse | undefined>();
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  const backendSort = useMemo(() => {
    if (sort === "price") {
      return sortOrder === "asc" ? "priceLow" : "priceHigh";
    }
    if (sort === "sustainabilityScore") {
      return sortOrder === "asc" ? "sustainabilityLow" : "sustainabilityHigh";
    }
    return "default";
  }, [sort, sortOrder]);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: String(page),
        limit: "12",
        search: debouncedSearch ?? "",
        ...(selectedCategory !== "all" && { category: selectedCategory }),
        sort: backendSort,
      });

      const res = await fetch(`/api/restaurants/${restaurantId}/products?${params}`);
      if (!res.ok) throw new Error(res.statusText);

      const { data } = await res.json();

      if (data.data) {
        setProducts(data.data);
        setMetadata(data.metadata);
      } else {
        setProducts(data);
      }
    } catch (error) {
      toast.error(t("toasts.loadError"));
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearch, selectedCategory, backendSort, restaurantId, t]);

  useEffect(() => {
    // Skip the first fetch if we are on page 1, empty search, all categories, default sort
    // because we already have initialProducts.
    // However, since sort defaults to 'price' and 'asc', we might need to fetch immediately.
    // It's safer to just fetch products if any dependency changes.
    fetchProducts();
  }, [fetchProducts]);

  const handleCreate = async (payload: CreateProductDTO) => {
    try {
      const res = await fetch(`/api/restaurants/${restaurantId}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(res.statusText);

      toast.success(t("toasts.createSuccess"));
      setIsPopupOpen(false);
      fetchProducts();
    } catch {
      toast.error(t("toasts.createError"));
    }
  };

  const handleUpdate = async (payload: CreateProductDTO) => {
    if (!editingProduct) return;

    try {
      const res = await fetch(
        `/api/restaurants/${restaurantId}/products/${editingProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error(res.statusText);

      toast.success(t("toasts.updateSuccess"));
      setEditingProduct(undefined);
      setIsPopupOpen(false);
      fetchProducts();
    } catch {
      toast.error(t("toasts.updateError"));
    }
  };

  const confirmDelete = async () => {
    if (!deleteProductId) return;

    try {
      const res = await fetch(
        `/api/restaurants/${restaurantId}/products/${deleteProductId}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error(res.statusText);

      toast.success(t("toasts.deleteSuccess"));
      setDeleteProductId(null);
      fetchProducts();
    } catch {
      toast.error(t("toasts.deleteError"));
    }
  };

  return {
    state: {
      products,
      metadata,
      loading,
      searchTerm,
      page,
      selectedCategory,
      sort,
      sortOrder,
      isPopupOpen,
      editingProduct,
      deleteProductId,
    },
    actions: {
      setSearchTerm,
      setPage,
      setSelectedCategory,
      setSort,
      setSortOrder,
      setIsPopupOpen,
      setEditingProduct,
      setDeleteProductId,
      handleCreate,
      handleUpdate,
      confirmDelete,
    },
  };
}
