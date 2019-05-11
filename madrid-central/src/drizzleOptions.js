import MadridCentral from "./contracts/MadridCentral.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:7545",
    },
  },
  contracts: [MadridCentral],
  events: {},
  polls: {
    accounts: 1500,
  },
};

export default options;
