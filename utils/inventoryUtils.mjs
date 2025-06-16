// src/utils/inventoryUtils.mjs

// ...existing exports...

/**
 * Filters items by a given rarity or rarities array.
 * @param {Array} items - List of items to filter.
 * @param {string|string[]} rarities - Rarity or array of rarities to keep.
 * @returns {Array} Filtered list of items.
 */
export function filterItemsByRarity(items, rarities) {
  if (!Array.isArray(rarities)) {
    rarities = [rarities];
  }
  return items.filter(item => rarities.includes(item.rarity));
}

/**
 * Groups stackable items and counts their quantities.
 * Non-stackable items are returned individually.
 * @param {Array} items - List of items to process.
 * @returns {Array} List of items with quantity for stackable ones.
 * Each element: { item, quantity }
 */
export function groupStackableItems(items) {
  const stackMap = new Map();

  for (const item of items) {
    if (item.stackable) {
      const key = item.name; // or unique ID if available
      if (stackMap.has(key)) {
        stackMap.get(key).quantity++;
      } else {
        stackMap.set(key, { item, quantity: 1 });
      }
    } else {
      // Non-stackable items kept as is, quantity = 1
      stackMap.set(Symbol(), { item, quantity: 1 });
    }
  }

  return Array.from(stackMap.values());
}
// src/utils/inventoryUtils.mjs

export function getItemType(item) {
  if (!item) return "item";
  return item.type || (item.constructor?.name?.toLowerCase()) || "item";
}

export function groupItemsByType(items) {
  return items.reduce((acc, item) => {
    const type = getItemType(item);
    acc[type] ??= [];
    acc[type].push(item);
    return acc;
  }, {});
}

export function sortGroupedItems(groups, key = "rarity") {
  const rarityOrder = ["common", "uncommon", "rare", "epic", "legendary"];
  const sorter = (a, b) => {
    if (key === "rarity") {
      return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
    }
    return (a[key] ?? 0) - (b[key] ?? 0);
  };

  for (const type in groups) {
    groups[type].sort(sorter);
  }

  return groups;
}
