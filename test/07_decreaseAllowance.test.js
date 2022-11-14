const LeagueOfPharaohs = artifacts.require("LeagueOfParaohs")
const {expectEvent} = require("@openzeppelin/test-helpers")

contract("LeagueOfPharaohs", (accounts) => {
  // fetch accounts on different index
  let [
    OWNER,
    Play_to_Earn,
    Liquidity,
    Staking,
    Private,
    Team,
    Public,
    Marketing,
    NFT_Staking,
    Centralized_Exchange,
    Advisors,
    Community,
    Ecosystem_Fund,
  ] = accounts
  let LeagueOfPharaohsContract

  beforeEach(async () => {
    LeagueOfPharaohsContract = await LeagueOfPharaohs.new(
      Play_to_Earn,
      Liquidity,
      Staking,
      Private,
      Team,
      Public,
      Marketing,
      NFT_Staking,
      Centralized_Exchange,
      Advisors,
      Community,
      Ecosystem_Fund
    )
  })

  it("decreaseAllowance success", async () => {
    const initialAmount = 1000
    const expectedAmount = 500

    await LeagueOfPharaohsContract.approve(Private, initialAmount, {
      from: Play_to_Earn,
    })
    const resultBeforeIncrease = await LeagueOfPharaohsContract.allowance(
      Play_to_Earn,
      Private,
      {from: Play_to_Earn}
    )
    const resultIncrease = await LeagueOfPharaohsContract.decreaseAllowance(
      Private,
      500,
      {from: Play_to_Earn}
    )
    const resultAfterIncrease = await LeagueOfPharaohsContract.allowance(
      Play_to_Earn,
      Private,
      {from: Play_to_Earn}
    )

    assert.equal(
      initialAmount,
      resultBeforeIncrease.toNumber(),
      "wrong result berore increase"
    )
    assert.equal(
      expectedAmount,
      resultAfterIncrease.toNumber(),
      "wrong result after increase"
    )
    expectEvent(resultIncrease, "Approval")
  })
})
