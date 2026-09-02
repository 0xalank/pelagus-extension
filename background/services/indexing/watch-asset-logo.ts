type AssetWithOptionalLogo = {
  metadata?: { logoURL?: string }
}

/** Fill a missing trusted logo without mutating cached asset state. */
export default function withAssetLogoURL<T extends AssetWithOptionalLogo>(
  asset: T,
  logoURL: string | undefined
): T {
  if (!logoURL || asset.metadata?.logoURL) return asset

  return {
    ...asset,
    metadata: {
      ...asset.metadata,
      logoURL,
    },
  } as T
}
