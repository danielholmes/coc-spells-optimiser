import fill from "../_snowpack/pkg/lodash/fill.js";
function findOrThrow(items, predicate) {
  const index = items.findIndex(predicate);
  if (index === -1) {
    throw new Error("No item");
  }
  return items[index];
}
function createArrayOf(length, item) {
  return fill(Array(length), item);
}
export {findOrThrow, createArrayOf};
