import { Fraction } from 'bi-fraction'

/**
 * for generating test fixtures
 */
export function toJSON(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
) {
  return JSON.stringify(
    data,
    (_key, value) => {
      if (typeof value === 'bigint') {
        return {
          __serializeType: 'bigint',
          value: value.toString(),
        }
      }
      return value
    },
    2,
  )
}

/**
 * for generated test fixtures
 */
export function fromJSON(data: string) {
  return JSON.parse(data, (_key, value) => {
    if (value?.__serializeType === 'bigint') {
      return BigInt(value.value)
    }
    if (typeof value?.numerator === 'string' && typeof value?.denominator === 'string') {
      // might not be a good idea, but it works
      try {
        return new Fraction(value.numerator, value.denominator)
      } catch (error) {
        console.warn('deserialize: a value looks like Fraction but failed to parse', error)
      }
    }

    return value
  })
}
