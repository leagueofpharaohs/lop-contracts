const LeagueOfPharaohs = artifacts.require("LeagueOfParaohs")
const {expectRevert, expectEvent} = require("@openzeppelin/test-helpers")

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

  it("only owner can renounce ownership", async () => {
    await expectRevert(
      LeagueOfPharaohsContract.renounceOwnership({from: Play_to_Earn}),
      "Ownable: caller is not the owner"
    )
  })

  it("renounce ownership success", async () => {
    let result = await LeagueOfPharaohsContract.renounceOwnership({from: OWNER})
    expectEvent(result, "OwnershipTransferred")
    let newOwner = await LeagueOfPharaohsContract.owner()
    assert.equal(
      newOwner,
      "0x0000000000000000000000000000000000000000",
      "renounce ownership failed"
    )
  })
})
