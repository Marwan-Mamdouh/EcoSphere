"use client";

import { useTranslations } from "next-intl";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MenuItemCategory } from "@/backend/features/restaurant/restaurant.model";

interface ProductsToolbarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedCategory: MenuItemCategory | "all";
  setSelectedCategory: (category: MenuItemCategory | "all") => void;
  sort: "price" | "sustainabilityScore";
  setSort: (sort: "price" | "sustainabilityScore") => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: "asc" | "desc") => void;
  setPage: (page: number) => void;
}

export default function ProductsToolbar({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sort,
  setSort,
  sortOrder,
  setSortOrder,
  setPage,
}: Readonly<ProductsToolbarProps>) {
  const t = useTranslations("Restaurant.Products");

  return (
    <>
      <div className="flex items-center space-x-2 bg-card p-3 mb-5 rounded-full border border-border shadow-sm shrink-0">
        <Search className="w-5 h-5 text-muted-foreground ml-2" />
        <Input
          placeholder={t("searchPlaceholder")}
          className="border-none focus-visible:ring-0 shadow-none bg-transparent rounded-full"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center shrink-0 mb-6">
        <div className="flex items-center gap-2">
          <Label
            htmlFor="category-filter"
            className="text-sm font-medium whitespace-nowrap"
          >
            {t("filter.category")}:
          </Label>
          <Select
            value={selectedCategory}
            onValueChange={(value) => {
              setSelectedCategory(value as MenuItemCategory | "all");
              setPage(1);
            }}
          >
            <SelectTrigger id="category-filter" className="w-45">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filter.allCategories")}</SelectItem>
              <SelectItem value="Fruits">{t("Categories.fruits")}</SelectItem>
              <SelectItem value="Vegetables">{t("Categories.vegetables")}</SelectItem>
              <SelectItem value="Meat">{t("Categories.meat")}</SelectItem>
              <SelectItem value="Dairy">{t("Categories.dairy")}</SelectItem>
              <SelectItem value="Bakery">{t("Categories.bakery")}</SelectItem>
              <SelectItem value="Beverages">{t("Categories.beverages")}</SelectItem>
              <SelectItem value="Snacks">{t("Categories.snacks")}</SelectItem>
              <SelectItem value="Other">{t("Categories.other")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Label
            htmlFor="sort-by"
            className="text-sm font-medium whitespace-nowrap"
          >
            {t("filter.sortBy")}:
          </Label>
          <Select
            value={sort}
            onValueChange={(value) => {
              setSort(value as "price" | "sustainabilityScore");
              setPage(1);
            }}
          >
            <SelectTrigger id="sort-by" className="w-50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">{t("filter.sortOptions.price")}</SelectItem>
              <SelectItem value="sustainabilityScore">
                {t("filter.sortOptions.sustainability")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={() => {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            setPage(1);
          }}
          className="rounded-full"
          title={sortOrder === "asc" ? "Ascending" : "Descending"}
        >
          {sortOrder === "asc" ? (
            <ArrowUpIcon className="h-4 w-4" />
          ) : (
            <ArrowDownIcon className="h-4 w-4" />
          )}
        </Button>
      </div>
    </>
  );
}
