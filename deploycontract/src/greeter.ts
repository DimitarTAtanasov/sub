import { GreetingSet as GreetingSetEvent } from "../generated/Greeter/Greeter"
import { GreetingSet } from "../generated/schema"

export function handleGreetingSet(event: GreetingSetEvent): void {
  let entity = new GreetingSet(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._greeting = event.params._greeting

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
