import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://nestiq.avorria.com'
  
  // Marketing & Core Pages
  const coreRoutes = [
    '',
    '/about',
    '/search',
    '/agents',
    '/agents/directory',
    '/pricing',
    '/fair-portal-charter',
    '/portal-cost-calculator',
    '/resources',
    '/tools',
    '/buying-a-home',
    '/renting-a-home',
    '/selling-a-home',
    '/landlords',
    '/new-homes',
    '/commercial-property',
    '/property-investors',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  // SEO Campaign Cluster
  const seoRoutes = [
    '/rightmove-alternative-for-estate-agents',
    '/rightmove-fees-claim',
    '/estate-agent-portal-costs',
    '/property-portal-alternative',
    '/independent-estate-agent-software',
    '/fair-property-portal',
    '/estate-agent-lead-generation-platform',
    '/reduce-rightmove-dependency',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...coreRoutes, ...seoRoutes]
}
