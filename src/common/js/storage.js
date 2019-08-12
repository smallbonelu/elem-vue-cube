import goodStorage from 'good-storage'

const SELLER_KEY = '__seller__'

export function saveToLocal(id, key, val) {
  const seller = goodStorage.get(SELLER_KEY, {})
  if (!seller[id]) {
    seller[id] = {}
  }
  seller[id][key] = val
  goodStorage.set(SELLER_KEY, seller)
}

export function loadFromLocal(id, key, def) {
  const seller = goodStorage.get(SELLER_KEY, {})
  if (!seller[id]) {
    return def
  }
  return seller[id][key] || def
}
