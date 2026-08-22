"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter as useNextRouter } from "next/navigation";
import {
  type RouteName,
  LEGACY_HASH_PATH_MAP,
  pathToRoute,
  routeToPath,
  ROUTE_PATH_MAP,
} from "@/lib/routes";

export type { RouteName };
export { ROUTE_PATH_MAP, LEGACY_HASH_PATH_MAP, pathToRoute, routeToPath };

export function useRouter() {
  const pathname = usePathname();
  const nextRouter = useNextRouter();

  const currentRoute = useMemo(() => pathToRoute(pathname), [pathname]);

  const navigate = useCallback(
    (route: RouteName, section?: string) => {
      const path = routeToPath(route);
      nextRouter.push(section ? `${path}#${section}` : path);
    },
    [nextRouter]
  );

  return { currentRoute, navigate, pathname };
}

export function useNavigation() {
  const { navigate } = useRouter();
  return navigate;
}

/** @deprecated Use ROUTE_PATH_MAP */
export const ROUTE_HASH_MAP = LEGACY_HASH_PATH_MAP;
