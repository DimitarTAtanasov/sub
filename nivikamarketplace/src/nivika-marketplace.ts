import {
  ListingCreated as ListingCreatedEvent,
  ListingDeleted as ListingDeletedEvent,
  ListingUpdated as ListingUpdatedEvent,
  Purchased as PurchasedEvent
} from "../generated/NivikaMarketplace/NivikaMarketplace"
import {
  ListingCreated,
  ListingDeleted,
  ListingUpdated,
  Purchased
} from "../generated/schema"

export function handleListingCreated(event: ListingCreatedEvent): void {
  let entity = new ListingCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.seller = event.params.seller
  entity.tokenAddress = event.params.tokenAddress
  entity.serialNumber = event.params.serialNumber
  entity.price = event.params.price
  entity.paymentToken = event.params.paymentToken
  entity.active = event.params.active

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleListingDeleted(event: ListingDeletedEvent): void {
  let entity = new ListingDeleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleListingUpdated(event: ListingUpdatedEvent): void {
  let entity = new ListingUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.newPrice = event.params.newPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePurchased(event: PurchasedEvent): void {
  let entity = new Purchased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.listingId = event.params.listingId
  entity.buyer = event.params.buyer
  entity.tokenAddress = event.params.tokenAddress
  entity.serialNumber = event.params.serialNumber
  entity.paymentToken = event.params.paymentToken
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
