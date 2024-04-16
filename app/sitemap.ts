import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
          url: 'https://bookokay.app',
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 1,
        },
        {
          url: 'https://bookokay.app/legal',
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 0.8,
        },
        {
          url: 'https://bookokay.app/dashboard',
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.8,
        },
        {
          url: 'https://bookokay.app/posts',
          lastModified: new Date(),
          changeFrequency: 'weekly',
          priority: 0.5,
        },
      ]
}
