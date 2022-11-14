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

  it("only owner can transfer ownership", async () => {
    await expectRevert(
      LeagueOfPharaohsContract.transferOwnership(Play_to_Earn, {
        from: Play_to_Earn,
      }),
      "Ownable: caller is not the owner"
    )
  })

  it("new owner cannot be zero address", async () => {
    await expectRevert(
      LeagueOfPharaohsContract.transferOwnership(
        "0x0000000000000000000000000000000000000000",
        {from: OWNER}
      ),
      "Ownable: new owner is the zero address"
    )
  })

  it("transfer ownership success", async () => {
    let result = await LeagueOfPharaohsContract.transferOwnership(
      Play_to_Earn,
      {
        from: OWNER,
      }
    )
    expectEvent(result, "OwnershipTransferred")
  })
})
