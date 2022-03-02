import { useState } from "react";
import { ethers } from "ethers";

function WalletBalance() {
  const [balance, setBalance] = useState();
  const [address = '', setAddress] = useState();

  const getBalance = async () => {
    const [account] = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const balance = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(balance));
    setAddress(account)
  };
  getBalance()
  return (
    <div className="card">
      <div>
        <h5> Network : {window.ethereum.networkVersion} <br/> Address : {address.substring(0,5) + '...'+address.substring(address.length-3)} <br/> Balance : {Math.round(balance*1000)*0.001} MATIC </h5>
      </div>
    </div>
  );
}
export default WalletBalance;
