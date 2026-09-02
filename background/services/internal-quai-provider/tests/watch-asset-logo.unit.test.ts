import {
  QuaiMainnet,
  QuaiOrchardTestnet,
} from "../../../constants/networks/networks"
import trustedWatchAssetLogoURL from "../watch-asset-logo"

const CHECKSUMMED_ADDRESS = "0x004AFDb66677D177B759356D2367AeA3A79Fe58b"
const NORMALIZED_ADDRESS = CHECKSUMMED_ADDRESS.toLowerCase()

describe("trusted watch-asset artwork", () => {
  it("derives a case-normalized explorer alias on Quai mainnet", () => {
    expect(trustedWatchAssetLogoURL(CHECKSUMMED_ADDRESS, QuaiMainnet)).toBe(
      `https://explorer.qu.ai/api/token/${NORMALIZED_ADDRESS}/icon`
    )
  })

  it("does not add explorer artwork behavior to other networks", () => {
    expect(
      trustedWatchAssetLogoURL(CHECKSUMMED_ADDRESS, QuaiOrchardTestnet)
    ).toBeUndefined()
  })

  it("does not construct an artwork URL for a malformed contract", () => {
    expect(trustedWatchAssetLogoURL("0x1234", QuaiMainnet)).toBeUndefined()
  })
})
