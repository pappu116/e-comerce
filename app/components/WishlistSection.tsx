"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useWishlist } from "@/app/store/wishlistStore";
import { useCart } from "@/app/store/cartStore";
import { useAuth } from "@/app/store/authStore";
import { getImageUrl } from "@/app/lib/apiClient";

export default function WishlistSection() {
  const { wishlist, hydrateWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const [busyId, setBusyId] = useState<string>("");

  useEffect(() => {
    if (!isLoggedIn) return;
    hydrateWishlist();
  }, [isLoggedIn, hydrateWishlist]);

  const handleMoveToCart = async (id: string) => {
    const item = wishlist.find((entry) => entry.id === id);
    if (!item) return;

    setBusyId(id);
    await addToCart(item, 1);
    await removeFromWishlist(id);
    setBusyId("");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black tracking-tight">My Wishlist</h2>
          <p className="text-xs text-muted-foreground">
            {wishlist.length} item{wishlist.length === 1 ? "" : "s"} saved
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>

      {!wishlist.length ? (
        <Card className="border border-border/70">
          <CardContent className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="rounded-full bg-indigo-500/10 p-3 text-indigo-500">
              <Heart size={22} />
            </div>
            <p className="text-sm font-medium">Your wishlist is empty.</p>
            <p className="text-xs text-muted-foreground">
              Save products you love and purchase later.
            </p>
            <Button asChild className="mt-2">
              <Link href="/shop">Browse Products</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {wishlist.map((item) => {
            const productId = item.id || item._id;
            const image = getImageUrl(item.image || item.images?.[0] || "");
            const isBusy = busyId === productId;
            return (
              <Card key={productId} className="border border-border/70">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base leading-snug">{item.name}</CardTitle>
                  <CardDescription>{item.category || "General"}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link
                    href={`/product/${productId}`}
                    className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-muted"
                  >
                    <Image
                      src={image}
                      alt={item.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </Link>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-black text-indigo-600">
                      Tk {Number(item.discountPrice || item.price || 0).toLocaleString()}
                    </p>
                    {item.discountPrice ? (
                      <p className="text-xs text-muted-foreground line-through">
                        Tk {Number(item.price || 0).toLocaleString()}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      className="flex-1"
                      disabled={isBusy}
                      onClick={() => handleMoveToCart(productId)}
                    >
                      <ShoppingCart size={14} />
                      {isBusy ? "Updating..." : "Move to Cart"}
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => removeFromWishlist(productId)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
