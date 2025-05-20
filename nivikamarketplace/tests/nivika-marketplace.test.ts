import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { ListingCreated } from "../generated/schema"
import { ListingCreated as ListingCreatedEvent } from "../generated/NivikaMarketplace/NivikaMarketplace"
import { handleListingCreated } from "../src/nivika-marketplace"
import { createListingCreatedEvent } from "./nivika-marketplace-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#tests-structure

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let listingId = Bytes.fromI32(1234567890)
    let seller = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tokenAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let serialNumber = BigInt.fromI32(234)
    let price = BigInt.fromI32(234)
    let paymentToken = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let active = "boolean Not implemented"
    let newListingCreatedEvent = createListingCreatedEvent(
      listingId,
      seller,
      tokenAddress,
      serialNumber,
      price,
      paymentToken,
      active
    )
    handleListingCreated(newListingCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#write-a-unit-test

  test("ListingCreated created and stored", () => {
    assert.entityCount("ListingCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ListingCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "listingId",
      "1234567890"
    )
    assert.fieldEquals(
      "ListingCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "seller",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ListingCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ListingCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "serialNumber",
      "234"
    )
    assert.fieldEquals(
      "ListingCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234"
    )
    assert.fieldEquals(
      "ListingCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "paymentToken",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ListingCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "active",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/subgraphs/developing/creating/unit-testing-framework/#asserts
  })
})
