import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ListingCreated,
  ListingDeleted,
  ListingUpdated,
  Purchased
} from "../generated/NivikaMarketplace/NivikaMarketplace"

export function createListingCreatedEvent(
  listingId: Bytes,
  seller: Address
): ListingCreated {
  let listingCreatedEvent = changetype<ListingCreated>(newMockEvent())

  listingCreatedEvent.parameters = new Array()

  listingCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromFixedBytes(listingId)
    )
  )
  listingCreatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return listingCreatedEvent
}

export function createListingDeletedEvent(listingId: Bytes): ListingDeleted {
  let listingDeletedEvent = changetype<ListingDeleted>(newMockEvent())

  listingDeletedEvent.parameters = new Array()

  listingDeletedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromFixedBytes(listingId)
    )
  )

  return listingDeletedEvent
}

export function createListingUpdatedEvent(
  listingId: Bytes,
  newPrice: BigInt
): ListingUpdated {
  let listingUpdatedEvent = changetype<ListingUpdated>(newMockEvent())

  listingUpdatedEvent.parameters = new Array()

  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromFixedBytes(listingId)
    )
  )
  listingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newPrice",
      ethereum.Value.fromUnsignedBigInt(newPrice)
    )
  )

  return listingUpdatedEvent
}

export function createPurchasedEvent(
  listingId: Bytes,
  buyer: Address
): Purchased {
  let purchasedEvent = changetype<Purchased>(newMockEvent())

  purchasedEvent.parameters = new Array()

  purchasedEvent.parameters.push(
    new ethereum.EventParam(
      "listingId",
      ethereum.Value.fromFixedBytes(listingId)
    )
  )
  purchasedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )

  return purchasedEvent
}
