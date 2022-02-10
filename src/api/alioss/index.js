import { GET, POST, PUT, DELETE } from '@/util/http'

export function getSTS() {
  return GET({ url: '/alioss/sts' })
}
