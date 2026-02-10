/**
 * Database client stub.
 *
 * The real @prisma/client import is removed so the SSR bundle has zero native
 * dependencies at cold-start time.  The proxy below supports property chaining
 * (e.g. `prisma.adminUser.findUnique(...)`) and throws a clear error only when
 * a DB method is actually *called*.
 */

function dbStub(): never {
  throw new Error(
    "DATABASE_URL is not configured — database features are unavailable. " +
      "Set DATABASE_URL and redeploy to enable the admin panel."
  );
}

function createChainableProxy(): any {
  return new Proxy(function () {}, {
    get(_target, _prop) {
      // Every property access returns another proxy so chaining works:
      // prisma.adminUser.findUnique  →  Proxy.Proxy
      return createChainableProxy();
    },
    apply() {
      // Actually calling the function at any depth triggers the error.
      dbStub();
    },
  });
}

export const prisma: any = new Proxy({} as any, {
  get(_target, _prop) {
    return createChainableProxy();
  },
});
