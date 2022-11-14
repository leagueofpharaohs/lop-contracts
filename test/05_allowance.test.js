const LeagueOfPharaohs = artifacts.require("LeagueOfParaohs")

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

  it("not allowance", async () => {
    const result = await LeagueOfPharaohsContract.allowance(
      Play_to_Earn,
      Private,
      {
        from: Play_to_Earn,
      }
    )

    assert.equal(0, result.toNumber(), "wrong result")
  })

  it("allowance", async () => {
    const expectedAmount = 1000

    await LeagueOfPharaohsContract.approve(Private, expectedAmount, {
      from: Play_to_Earn,
    })
    const result = await LeagueOfPharaohsContract.allowance(
      Play_to_Earn,
      Private,
      {
        from: Play_to_Earn,
      }
    )

    assert.equal(expectedAmount, result.toNumber(), "wrong result")
  })
})
