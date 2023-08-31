import STRATOS_LOGO_URL from '../assets/images/stratos-logo.svg'
import { ChainId } from '@uniswap/sdk-core'

export enum SupportedNetwork {
  MESOS,
}

export type NetworkInfo = {
  chainId: ChainId
  id: SupportedNetwork
  route: string
  name: string
  imageURL: string
  bgColor: string
  primaryColor: string
  secondaryColor: string
}

export const MesosNetworkInfo: NetworkInfo = {
  chainId: 2047,
  id: SupportedNetwork.MESOS,
  route: '',
  name: 'Mesos',
  bgColor: '#03847b',
  primaryColor: '#03847b',
  secondaryColor: '#141e26',
  imageURL: STRATOS_LOGO_URL,
}

export const SUPPORTED_NETWORK_VERSIONS: NetworkInfo[] = [MesosNetworkInfo]
