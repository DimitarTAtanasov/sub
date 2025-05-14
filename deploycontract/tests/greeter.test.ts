import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import {} from "@graphprotocol/graph-ts"
import { GreetingSet } from "../generated/schema"
import { GreetingSet as GreetingSetEvent } from "../generated/Greeter/Greeter"
import { handleGreetingSet } from "../src/greeter"
import { createGreetingSetEvent } from "./greeter-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _greeting = "Example string value"
    let newGreetingSetEvent = createGreetingSetEvent(_greeting)
    handleGreetingSet(newGreetingSetEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("GreetingSet created and stored", () => {
    assert.entityCount("GreetingSet", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "GreetingSet",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_greeting",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
