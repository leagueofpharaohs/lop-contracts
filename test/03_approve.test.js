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

  it("approve should throw if spender is zero address", async () => {
    await expectRevert(
      LeagueOfPharaohsContract.approve(
        "0x0000000000000000000000000000000000000000",
        1000,
        {from: Play_to_Earn}
      ),
      "ERC20: approve to the zero address"
    )
  })

  it("approve success", async () => {
    const result = await LeagueOfPharaohsContract.approve(Private, 1000, {
      from: Play_to_Earn,
    })

    expectEvent(result, "Approval")
  })
})
