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

  it("transferFrom should throw if balance is insufficient", async () => {
    await LeagueOfPharaohsContract.approve(Play_to_Earn, 1000, {from: OWNER})

    await expectRevert(
      LeagueOfPharaohsContract.transferFrom(OWNER, Play_to_Earn, 1000, {
        from: Play_to_Earn,
      }),
      "ERC20: transfer amount exceeds balance"
    )
  })

  it("transferFrom should throw if sender is not approved", async () => {
    await expectRevert(
      LeagueOfPharaohsContract.transferFrom(Play_to_Earn, Private, 1000, {
        from: Play_to_Earn,
      }),
      "ERC20: insufficient allowance"
    )
  })

  it("transferFrom success", async () => {
    await LeagueOfPharaohsContract.approve(OWNER, 1000, {from: Play_to_Earn})
    const result = await LeagueOfPharaohsContract.transferFrom(
      Play_to_Earn,
      Private,
      1000,
      {
        from: OWNER,
      }
    )

    expectEvent(result, "Transfer")
  })
})
