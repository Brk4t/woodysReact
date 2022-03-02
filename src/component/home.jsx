import { useEffect, useState } from "react";

import { ethers } from "ethers";
import WalletBalance from "./WalletBalance";
import Woodys from "../abi/woodys.json";

const contractAddress = "0x417c59F050e5Bb2061D915331158892417b5113b";
const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const woodyContract = new ethers.Contract(contractAddress, Woodys.abi, signer);

const Home = () => {
  const [totalMinted, setTotalMinted] = useState(0);
  const [arrayOfOwnedTokens = [], setArrayOfOwnedTokens] = useState(0);
  const [account, setAccount] = useState(0)

  useEffect(() => {
    getCount();
    getAccount();
  }, []);

  const getAccount = async () => {
    const [acc] = await window.ethereum.request({
      method: "eth_requestAccounts"
    });
    setAccount(acc)
    console.log("ACC +++++++++ " + acc)
    if(acc != 0)
    {
    const arr = await woodyContract.getUserTokens(acc);
    setArrayOfOwnedTokens(arr);
    console.log("ARRAY  " + arr)
    }
  }


  const getCount = async () => {
    const count = await woodyContract.count();
    setTotalMinted(parseInt(count));
  };

  const mintToken = async () => {
    
    const metadataURI = `../QxHASHAHASHASHASHAS/${totalMinted}.json`;
    const connection = woodyContract.connect(signer);
    const addr = connection.address;
    const result = await woodyContract.payToMint( metadataURI, {
      value: ethers.utils.parseEther("0.05")
    });
    await result.wait();
    window.location.reload();
    getMintedStatus();
  };

  const displayCards = () =>
  {
    if(Array.isArray(arrayOfOwnedTokens))
    {    
      return arrayOfOwnedTokens
      .map((_, i) => (
        <div key={i} className="oneCard">
          <NFTImage tokenId={i} />
        </div>
      ))
    }
  }

  return (
    <div>
      <div className="banner">
      <div className="title">Woody's World</div>
      <WalletBalance />
      </div>
      <div className="mint">
      <button className='button-29' onClick={mintToken}>Mint 0.05 ETH</button>
      </div>
      <div className ="MyCollection">
      <div className="title">My NFT collection </div>
      <div className ="MyCards">
      {displayCards()}
        </div>
    </div>
    </div>
  );
};

function NFTImage(props) {
  console.log("props of NFTIMAGE " + props.tokenId)
  const imageURI = '/img/'+props.tokenId+'.png';
  

  return (
    <div >
      <img
        src={imageURI}
        width="400"
        height="400"
      />
      <div >
      </div>
    </div>
  );
}

export default Home;
