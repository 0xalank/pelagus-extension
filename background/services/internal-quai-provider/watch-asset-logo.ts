import { NetworkInterface } from "../../constants/networks/networkTypes"

const QUAI_MAINNET_CHAIN_ID = "9"
const QUAI_EXPLORER_TOKEN_ICON_ORIGIN = "https://explorer.qu.ai"

/**
 * Return Pelagus' trusted mainnet artwork alias for one contract.
 *
 * `wallet_watchAsset.options.image` is controlled by the requesting DApp. Using
 * it directly would let any site assign a misleading logo or make extension
 * pages contact an arbitrary tracking host. The explorer alias binds artwork
 * to the exact contract address and can safely fall back to no image when the
 * explorer has no archived logo.
 */
export default function trustedWatchAssetLogoURL(
  contractAddress: string,
  network: NetworkInterface
): string | undefined {
  if (
    network.chainID !== QUAI_MAINNET_CHAIN_ID ||
    !/^0x[0-9a-f]{40}$/i.test(contractAddress)
  ) {
    return undefined
  }

  return `${QUAI_EXPLORER_TOKEN_ICON_ORIGIN}/api/token/${contractAddress.toLowerCase()}/icon`
}
