import { fill } from "lodash-es";

function findOrThrow<T>(items: ReadonlyArray<T>, predicate: (item: T) => boolean): T {
  const index = items.findIndex(predicate);
  if (index === -1) {
    throw new Error("No item")
  }
  return items[index];
}

function createArrayOf<T>(length: number, item: T): ReadonlyArray<T> {
  return fill(Array(length), item)
}

export { findOrThrow, createArrayOf }
