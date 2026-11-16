import type { MetadataRoute } from "next";
import { SITE } from "@/lib/dados";

// Tudo liberado para buscadores; aponta o sitemap.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${SITE}/sitemap.xml`, host: SITE };
}
