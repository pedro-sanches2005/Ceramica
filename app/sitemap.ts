import type { MetadataRoute } from "next";
import { SITE } from "@/lib/dados";

// Uma página só: a landing. As seções entram como âncoras dela.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE}/`, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
