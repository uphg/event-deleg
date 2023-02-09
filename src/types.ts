export interface EventHandler<T extends Event = any> {
  (e: T): void
}