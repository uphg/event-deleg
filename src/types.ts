export interface EventHandler<T, Evt extends Event = any> {
  (this: T, ev: Evt): void
}