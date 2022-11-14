const LeagueOfPharaohs = artifacts.require("LeagueOfParaohs")
const chalk = require("chalk")
const log = console.log
const decimals = 1e18

contract("LeagueOfPharaohs", (accounts) => {
  let Play_to_EarnBalance = 2_500_000_000 * decimals
  let LiquidityBalance = 100_000_000 * decimals
  let StakingBalance = 1_500_000_000 * decimals
  let PrivateBalance = 1_000_000_000 * decimals
  let TeamBalance = 2_000_000_000 * decimals
  let PublicBalance = 200_000_000 * decimals
  let MarketingBalance = 500_000_000 * decimals
  let NFT_StakingBalance = 800_000_000 * decimals
  let Centralized_ExchangeBalance = 500_000_000 * decimals
  let AdvisorsBalance = 400_000_000 * decimals
  let CommunityBalance = 100_000_000 * decimals
  let Ecosystem_FundBalance = 400_000_000 * decimals

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
    log(`
        Contract deployed by ${chalk.yellow.bold("owner")}(${chalk.green(
      OWNER
    )})
        ${chalk.yellow.bold("Play_to_Earn")} Address:-${chalk.green(
      Play_to_Earn
    )}
        ${chalk.yellow.bold("Liquidity")} Address:-${chalk.green(Liquidity)}
        ${chalk.yellow.bold("Staking")} Address:-${chalk.green(Staking)}
        ${chalk.yellow.bold("Private")} Address:-${chalk.green(Private)}
        ${chalk.yellow.bold("Team")} Address:-${chalk.green(Team)}
        ${chalk.yellow.bold("Public")} Address:-${chalk.green(Public)}
        ${chalk.yellow.bold("Marketing")} Address:-${chalk.green(Marketing)}
        ${chalk.yellow.bold("NFT_Staking")} Address:-${chalk.green(NFT_Staking)}
        ${chalk.yellow.bold("Centralized_Exchange")} Address:-${chalk.green(
      Centralized_Exchange
    )}
        ${chalk.yellow.bold("Advisors")} Address:-${chalk.green(Advisors)}
        ${chalk.yellow.bold("Community")} Address:-${chalk.green(Community)}
        ${chalk.yellow.bold("Ecosystem_Fund")} Address:-${chalk.green(
      Ecosystem_Fund
    )}
    `)

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

  it("Checking balances for all--", async () => {
    let play_to_EarnBalanceMinted = await checkBalance(Play_to_Earn)
    assert.equal(
      play_to_EarnBalanceMinted,
      Play_to_EarnBalance,
      `Play_to_Earn Balance must be equal to ${setDecimals(
        Play_to_EarnBalance
      )}`
    )

    let liquidityBalanceMinted = await checkBalance(Liquidity)
    assert.equal(
      liquidityBalanceMinted,
      LiquidityBalance,
      `Liquidity Balance must be equal to ${setDecimals(LiquidityBalance)}`
    )

    let stakingBalanceMinted = await checkBalance(Staking)
    assert.equal(
      stakingBalanceMinted,
      StakingBalance,
      `Staking Balance must be equal to ${setDecimals(StakingBalance)}`
    )

    let privateBalanceMinted = await checkBalance(Private)
    assert.equal(
      privateBalanceMinted,
      PrivateBalance,
      `Private Balance must be equal to ${setDecimals(PrivateBalance)}`
    )

    let teamBalanceMinted = await checkBalance(Team)
    assert.equal(
      teamBalanceMinted,
      TeamBalance,
      `Team Balance must be equal to ${setDecimals(TeamBalance)}`
    )

    let publicBalanceMinted = await checkBalance(Public)
    assert.equal(
      publicBalanceMinted,
      PublicBalance,
      `Public Balance must be equal to ${setDecimals(PublicBalance)}`
    )
    let marketingBalanceMinted = await checkBalance(Marketing)
    assert.equal(
      marketingBalanceMinted,
      MarketingBalance,
      `Marketing Balance must be equal to ${setDecimals(MarketingBalance)}`
    )

    let nft_StakingBalanceMinted = await checkBalance(NFT_Staking)
    assert.equal(
      nft_StakingBalanceMinted,
      NFT_StakingBalance,
      `NFT_Staking Balance must be equal to ${setDecimals(NFT_StakingBalance)}`
    )

    let centralized_ExchangeBalanceMinted = await checkBalance(
      Centralized_Exchange
    )
    assert.equal(
      centralized_ExchangeBalanceMinted,
      Centralized_ExchangeBalance,
      `Centralized_Exchange Balance must be equal to ${setDecimals(
        Centralized_ExchangeBalance
      )}`
    )

    let advisorsBalanceMinted = await checkBalance(Advisors)
    assert.equal(
      advisorsBalanceMinted,
      AdvisorsBalance,
      `Advisors Balance must be equal to ${setDecimals(AdvisorsBalance)}`
    )

    let communityBalanceMinted = await checkBalance(Community)
    assert.equal(
      communityBalanceMinted,
      CommunityBalance,
      `Community Balance must be equal to ${setDecimals(CommunityBalance)}`
    )

    let ecosystem_FundBalanceMinted = await checkBalance(Ecosystem_Fund)
    assert.equal(
      ecosystem_FundBalanceMinted,
      Ecosystem_FundBalance,
      `Ecosystem_Fund Balance must be equal to ${setDecimals(
        Ecosystem_FundBalance
      )}`
    )
  })

  it("Checking maximum supply", async () => {
    let maxSupply = await LeagueOfPharaohsContract.MAX_SUPPLY()
    let totalSupply = await LeagueOfPharaohsContract.totalSupply()
    assert.equal(
      convertToNum(maxSupply),
      convertToNum(totalSupply),
      `Max Supply Balance must be equal to ${setDecimals(maxSupply)}`
    )
  })
  function convertToNum(balance) {
    return Number(BigInt(balance)) / 1e18
  }

  function setDecimals(balance) {
    return balance / decimals
  }

  async function checkBalance(_address) {
    return await LeagueOfPharaohsContract.balanceOf(_address)
  }
})
