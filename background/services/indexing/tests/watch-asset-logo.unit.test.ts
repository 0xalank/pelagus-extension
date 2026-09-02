import { SmartContractFungibleAsset } from "../../../assets"
import { QuaiMainnet } from "../../../constants/networks/networks"
import withAssetLogoURL from "../watch-asset-logo"

const TRUSTED_LOGO =
  "https://explorer.qu.ai/api/token/0x004afdb66677d177b759356d2367aea3a79fe58b/icon"

function asset(logoURL?: string): SmartContractFungibleAsset {
  return {
    contractAddress: "0x004afdb66677d177b759356d2367aea3a79fe58b",
    decimals: 18,
    homeNetwork: QuaiMainnet,
    metadata: { verified: true, ...(logoURL ? { logoURL } : {}) },
    name: "Boss",
    symbol: "BOSS",
  }
}

describe("wallet-added token artwork persistence", () => {
  it("fills a missing logo without mutating the cached asset", () => {
    const current = asset()
    const updated = withAssetLogoURL(current, TRUSTED_LOGO)

    expect(updated).not.toBe(current)
    expect(current.metadata?.logoURL).toBeUndefined()
    expect(updated.metadata).toEqual({ verified: true, logoURL: TRUSTED_LOGO })
  })

  it("preserves an existing curated or token-list logo", () => {
    const current = asset("https://old.example/token.png")
    const updated = withAssetLogoURL(current, TRUSTED_LOGO)

    expect(updated).toBe(current)
    expect(updated.metadata?.logoURL).toBe("https://old.example/token.png")
  })

  it("keeps the existing object when no update is needed", () => {
    const current = asset(TRUSTED_LOGO)

    expect(withAssetLogoURL(current, TRUSTED_LOGO)).toBe(current)
    expect(withAssetLogoURL(current, undefined)).toBe(current)
  })
})
