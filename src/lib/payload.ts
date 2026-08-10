import { getPayload as getPayloadInstance } from 'payload'
import configPromise from '@payload-config'

export const getPayload = async () => await getPayloadInstance({ config: await configPromise })
