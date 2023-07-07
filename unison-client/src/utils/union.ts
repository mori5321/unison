export const exhaustiveUnionCheck = (x: never): never => {
  throw new Error(`Exhaustive check failed: ${x}`);
}

