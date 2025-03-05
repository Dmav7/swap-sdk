export function getEnv(env: string) {
  if (typeof process === 'object') return process.env[env]
}
