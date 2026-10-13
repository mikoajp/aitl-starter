import { MikroORM } from '@mikro-orm/postgresql'
import { TaskEntity } from './taskEntity'

export function createOrm(clientUrl: string) {
  return MikroORM.init({ clientUrl, entities: [TaskEntity], allowGlobalContext: true })
}
