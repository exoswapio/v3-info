import React, { useMemo } from 'react'
import styled from 'styled-components'
import { isAddress } from 'utils'
import Logo from '../Logo'
import { useCombinedActiveList } from 'state/lists/hooks'
import useHttpLocations from 'hooks/useHttpLocations'
import { useActiveNetworkVersion } from 'state/application/hooks'
import { ChainId } from '@uniswap/sdk-core'

export function chainIdToNetworkName(networkId: ChainId) {
  switch (networkId) {
    case 2047:
      return 'mesos'
    case 2048:
      return 'stratos'
    default:
      return 'mesos'
  }
}

const getTokenLogoURL = ({ address, chainId }: { address: string; chainId: ChainId }) => {
  return `https://raw.githubusercontent.com/uniswap/assets/master/blockchains/${chainIdToNetworkName(
    chainId
  )}/assets/${address}/logo.png`
}

const StyledLogo = styled(Logo)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  border-radius: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  background-color: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.text4};
`

const StyledEthereumLogo = styled.img<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
  border-radius: 24px;
`

export default function CurrencyLogo({
  address,
  size = '24px',
  style,
  ...rest
}: {
  address?: string
  size?: string
  style?: React.CSSProperties
}) {
  const mesosList = useCombinedActiveList()?.[2047]
  const stratosList = useCombinedActiveList()?.[2048]

  const [activeNetwork] = useActiveNetworkVersion()

  const checkSummed = isAddress(address)

  const mesosURI = useMemo(() => {
    if (checkSummed && mesosList?.[checkSummed]) {
      return mesosList?.[checkSummed].token.logoURI
    }
    return undefined
  }, [checkSummed, mesosList])
  const uriLocationsMesos = useHttpLocations(mesosURI)

  const stratosURI = useMemo(() => {
    if (checkSummed && stratosList?.[checkSummed]) {
      return stratosList?.[checkSummed].token.logoURI
    }
    return undefined
  }, [checkSummed, stratosList])
  const uriLocationsStratos = useHttpLocations(stratosURI)

  const srcs: string[] = useMemo(() => {
    const checkSummed = isAddress(address)

    if (checkSummed && address) {
      return [
        getTokenLogoURL({ address: checkSummed, chainId: activeNetwork.chainId }),
        ...uriLocationsMesos,
        ...uriLocationsStratos,
      ]
    }
    return []
  }, [address, activeNetwork.chainId, uriLocationsMesos, uriLocationsStratos])

  return <StyledLogo size={size} srcs={srcs} alt={'token logo'} style={style} {...rest} />
}
