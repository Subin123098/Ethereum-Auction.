const Auction = artifacts.require("Auction");

module.exports = function(deployer) {
  deployer.deploy(Auction,10,"Audi","au123");
};

