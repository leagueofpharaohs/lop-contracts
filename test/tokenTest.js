const {expect} = require("chai")

describe("LopTOken", function () {
  beforeEach(async function () {
    [owner,signer,treasuryContract] = await ethers.getSigners()

    LOPToken = await ethers.getContractFactory("LOPToken", owner.address)

    lopToken = await LOPToken.deploy()
  })

  describe("transfer", function () {
    it("transfers toekns, reduces supply and wallet balances", async function () {
        let ownerBalance
        let SignerBalance
        let treasuryContractBalance
        let totalSupply

        totalSupply = await lopToken.totalSupply()
        ownerBalance = await lopToken.balanceOf(owner.address)
        expect(totalSupply).to.equal(ethers.utils.parseEther("10000000000"))
        expect(ownerBalance).to.equal(ethers.utils.parseEther("10000000000"))
      
        await lopToken.transfer(signer.address, ethers.utils.parseEther("1000000"))
        
        totalSupply = await lopToken.totalSupply()
        ownerBalance = await lopToken.balanceOf(owner.address)
        SignerBalance = await lopToken.balanceOf(signer.address)
        treasuryContractBalance = await lopToken.balanceOf(treasuryContract.address)
        expect(totalSupply).to.equal(ethers.utils.parseEther("10000000000"))
        expect(ownerBalance).to.equal(ethers.utils.parseEther("9999000000"))
        expect(SignerBalance).to.equal(ethers.utils.parseEther("1000000"))
        expect(treasuryContractBalance).to.equal(ethers.utils.parseEther("0"))

    })
  })
})
