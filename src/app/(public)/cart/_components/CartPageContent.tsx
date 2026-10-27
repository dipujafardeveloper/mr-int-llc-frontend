"use client";

import { useMemo, useState } from "react";
import CartItemsPanel from "./CartItemsPanel";
import CartSummary from "./CartSummary";
import { initialCartItems, type CartItem } from "./cart.data";

export default function CartPageContent() {
  const [items, setItems] = useState(initialCartItems);

  const { selectedItemCount, subtotal } = useMemo(() => {
    const selectedItems = items.filter((item) => item.selected);

    return {
      selectedItemCount: selectedItems.reduce(
        (count, item) => count + item.quantity,
        0
      ),
      subtotal: selectedItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    };
  }, [items]);

  const handleQuantityChange = (id: string, change: number) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemove = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const handleDeleteAll = () => setItems([]);

  const handleItemChange = (updatedItem: CartItem) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  };

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)] xl:gap-12">
      <CartItemsPanel
        items={items}
        onDeleteAll={handleDeleteAll}
        onRemove={handleRemove}
        onQuantityChange={handleQuantityChange}
        onItemChange={handleItemChange}
      />
      <CartSummary selectedItemCount={selectedItemCount} subtotal={subtotal} />
    </div>
  );
}
