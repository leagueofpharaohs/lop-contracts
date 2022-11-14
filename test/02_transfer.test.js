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

  it("transfer should throw if to address is not valid", async () => {
    await expectRevert(
      LeagueOfPharaohsContract.transfer(
        "0x0000000000000000000000000000000000000000",
        1000,
        {from: Play_to_Earn}
      ),
      "ERC20: transfer to the zero address"
    )
  })

  it("transfer should throw if balance is insufficient", async () => {
    await expectRevert(
      LeagueOfPharaohsContract.transfer(Play_to_Earn, 1000, {from: OWNER}),
      "ERC20: transfer amount exceeds balance"
    )
  })

  it("transfer success", async () => {
    const result = await LeagueOfPharaohsContract.transfer(Private, 1000, {
      from: Play_to_Earn,
    })

    expectEvent(result, "Transfer")
  })
})
