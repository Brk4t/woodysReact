import { useEffect, useState } from "react";

import { ethers } from "ethers";
import WalletBalance from "./WalletBalance";
import Woodys from "../abi/woodys.json";

const contractAddress = "0x32d2b0EFc0E841e9CEAD6aaA732956bb07F9c5aE";
const provider = new ethers.providers.Web3Provider(window.ethereum);

const signer = provider.getSigner();

const woodyContract = new ethers.Contract(contractAddress, Woodys.abi, signer);

const Home = () => {
  const [totalMinted, setTotalMinted] = useState(0);

  useEffect(() => {
    getCount();
  }, []);

  const getCount = async () => {
    const count = await woodyContract.count();
    console.log(parseInt(count));
    setTotalMinted(parseInt(count));
  };

  return (
    <div>
      <h3> Metamask installed, now what</h3>
      <WalletBalance />
      <h1>NFT collection </h1>
      <div className ="MyCollection">
      {Array(totalMinted + 1)
        .fill(0)
        .map((_, i) => (
          <div key={i}>
            <NFTImage tokenId={i} />
          </div>
        ))}
    </div>
    </div>
  );
};

function NFTImage(props) {
  console.log("props " + props.tokenId)
  const metadataURI = `../QxHASHAHASHASHASHAS/${props.tokenId}.json`;
  const imageURI = '/img/'+props.tokenId+'.png';
  
  console.log(metadataURI)

  const [isMinted, setIsMinted] = useState(false);
  useEffect(() => {
    getMintedStatus();
  }, [isMinted]);

  const getMintedStatus = async () => {
    const result = await woodyContract.isContentOwned(metadataURI);
    console.log(result);
    setIsMinted(result);
  };

  const mintToken = async () => {
    const connection = woodyContract.connect(signer);
    const addr = connection.address;
    const result = await woodyContract.payToMint( metadataURI, {
      value: ethers.utils.parseEther("0.05")
    });
    await result.wait();
    getMintedStatus();
  };

  async function getURI() {
    const uri = await woodyContract.tokenURI(props.tokenId);
    return uri;
  }

  return (
    <div >
      <img
        src={isMinted ? imageURI : "https://jooinn.com/images/lock-12.png"}
        width="200"
        height="200"
      />
      <div >
        <h5> ID #{props.tokenId}</h5>
        {!isMinted ? (
          <button onClick={mintToken}>Mint 0.05 ETH</button>
        ) : (
          <button onClick={getURI}>Taken! Show URI</button>
        )}
      </div>
    </div>
  );
}

export default Home;
