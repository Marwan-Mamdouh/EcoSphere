"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { CreateProductDTO } from "@/backend/features/product/dto/product.dto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import ImageUpload from "@/components/layout/common/ImageUpload";
import CategorySelect from "./CategorySelect";
import { useTranslations } from "next-intl";

interface ProductPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateProductDTO) => Promise<void>;
  initialData?: CreateProductDTO;
  title: string;
  description?: string;
}

export default function ProductPopup({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
  description,
}: Readonly<ProductPopupProps>) {
  const t = useTranslations("Restaurant.Products");
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductDTO>({
    defaultValues: initialData || {
      title: "",
      subtitle: "",
      price: 0,
      availableOnline: true,
      quantity: 1,
      category: undefined,
      avatar: undefined,
    },
  });

  const handleFormSubmit = async (data: CreateProductDTO) => {
    await onSubmit(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg p-6 w-full max-w-md border border-border shadow-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-4 text-card-foreground">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="bg-primary p-2 rounded-full hover:scale-105 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-primary-foreground"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        {description && (
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
        )}
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">{t("popup.titleLabel")}</Label>
            <Input
              id="title"
              placeholder={t("popup.titlePlaceholder")}
              {...register("title", {
                required: t("popup.errors.titleRequired"),
              })}
            />
            {errors.title && (
              <span className="text-sm text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">{t("popup.subtitleLabel")}</Label>
            <Textarea
              id="subtitle"
              placeholder={t("popup.subtitlePlaceholder")}
              {...register("subtitle", {
                required: t("popup.errors.subtitleRequired"),
              })}
            />
            {errors.subtitle && (
              <span className="text-sm text-red-500">
                {errors.subtitle.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">{t("popup.priceLabel")}</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", {
                required: t("popup.errors.priceRequired"),
                min: 0,
                valueAsNumber: true,
              })}
            />
          </div>

          <Controller
            control={control}
            name="category"
            rules={{ required: t("popup.errors.categoryRequired") }}
            render={({ field, fieldState }) => (
              <CategorySelect
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          <div className="space-y-2">
            <Label htmlFor="quantity">{t("popup.quantityLabel")}</Label>
            <Input
              id="quantity"
              type="number"
              min={0}
              {...register("quantity", {
                min: { value: 0, message: t("popup.errors.quantityNegative") },
                valueAsNumber: true,
              })}
            />
            {errors.quantity && (
              <span className="text-sm text-red-500">
                {errors.quantity.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label>{t("popup.imageLabel")}</Label>
            <div className="h-40 w-full border rounded-md">
              <Controller
                control={control}
                name="avatar"
                render={({ field }) => (
                  <ImageUpload
                    currentImageUrl={field.value?.url || initialData?.avatar?.url}
                    variant="square"
                    onImageUpdate={() => {}}
                    onUploadComplete={(data) => {
                      field.onChange({ key: data.key, url: data.url });
                    }}
                    endpoint="/api/upload/image"
                  />
                )}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="availableOnline"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              {...register("availableOnline")}
            />
            <Label htmlFor="availableOnline">{t("popup.availableLabel")}</Label>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <Button type="button" variant="outline" onClick={onClose}>
              {t("actions.cancel")}
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t("actions.saving")}
                </>
              ) : (
                t("actions.save")
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
