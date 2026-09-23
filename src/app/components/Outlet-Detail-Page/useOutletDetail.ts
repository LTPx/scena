"use client";

import { useState } from "react";
import { OutletProductWp } from "../../_interfaces/wordpress-components";

export interface OutletDetailProps {
  products: OutletProductWp[];
  initialSlug: string;
}

function updateUrlSilently(slug: string) {
  if (typeof window === "undefined") return;
  const segments = window.location.pathname.split("/");
  segments[segments.length - 1] = slug;
  window.history.replaceState(window.history.state, "", segments.join("/"));
}

export function useOutletDetail({ products, initialSlug }: OutletDetailProps) {
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.max(
      products.findIndex((p) => p.slug === initialSlug),
      0,
    ),
  );
  const [galleryIndex, setGalleryIndex] = useState(0);

  const product = products[currentIndex];
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const activeImage = gallery[galleryIndex];

  function goTo(nextIndex: number) {
    if (nextIndex < 0 || nextIndex >= products.length) return;
    setCurrentIndex(nextIndex);
    setGalleryIndex(0);
    updateUrlSilently(products[nextIndex].slug);
  }

  function goNext() {
    goTo((currentIndex + 1) % products.length);
  }

  function goToGallery(delta: 1 | -1) {
    setGalleryIndex((prev) => (prev + delta + gallery.length) % gallery.length);
  }

  return {
    product,
    gallery,
    activeImage,
    currentIndex,
    galleryIndex,
    setGalleryIndex,
    goToGallery,
    goNext,
  };
}
