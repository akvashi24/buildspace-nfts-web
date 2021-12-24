import React, { useState, useEffect } from 'react';
import { ethers } from "ethers"
import ThreeWordNFT from "../utils/ThreeWordNFT.json"
// Constants
const TWITTER_HANDLE = 'akvashi24';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = '';
const TOTAL_MINT_COUNT = 50;


const App = () => {

  useEffect(
    () => {
      const { ethereum } = window
    }
  )

  const [account, setAccount] = useState(null)
  const [loading, setLoading] = useState(false)
  const [mining, setMining] = useState(false)
  const [minted, setMinted] = useState(null)

  const connectWallet = async () => {
    if (!ethereum) {
      return false
    }
    setLoading(true)
    const connected = await ethereum.enable()
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    /*
    * User can have multiple authorized accounts, we grab the first one if its there!
    */
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setAccount(account)
    } else {
      console.log("No authorized account found")
    }
    setLoading(false)
  }
  // Render Methods
  const renderNotConnectedContainer = () => (
    <button className="cta-button connect-wallet-button" onClick={connectWallet}>
      {!loading ? "Connect Wallet" : "Loading..."}
    </button>
  );

  const mintNFT = async () => {
    const CONTRACT_ADDRESS = "0xCae0c1f0948E237525C30fc6FD724Acc395e4642";

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, ThreeWordNFT.abi, signer);

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.makeThreeWordNFT();

        console.log("Mining...please wait.")
        setMining(true)
        await nftTxn.wait();
        setMining(false)
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);


        connectedContract.on("NewThreeWordNFTMinted", (from, tokenId) => {
          setMinted(`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: <https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}>`)
        });

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  const gradient = "bg-gradient-to-br from-teal-400 to-purple-600"

  const renderConnectedContainer = () => {
    console.log("account", account);
    return <button className={"mx-auto h-3 border-none w-auto px-6 flex py-1 h-10 flex items-center rounded border-r-2 cursor-pointer text-xl font-bold text-white" + " " + gradient} onClick={mintNFT}>
      {!mining ? "Mint a Key!" : "Mining..."}
    </button>
  }

  const renderButton = () => {
    let result;
    console.log("account", account)
    console.log("loading", loading)
    if (account !== null && !loading) {
      result = renderNotConnectedContainer()
    } else {
      result = renderConnectedContainer()
    }
    return result;
  }


  const renderNFT = () => (
    <div className="rendered-nft">
      <a href={minted} className={gradient}>View on OpenSea</a>
    </div>
  )


  return (
    <div className="bg-zinc-900 h-screen overflow-scroll text-center">
      <div className="h-full bg-zinc-900 flex flex-col justify-between">
        <div className="pt-8 bg-zinc-900">
          <p className={gradient + " " + "bg-clip-text text-transparent text-6xl font-black mb-4 animate-gradient"}>The Parisian Salon</p>
          <div className="w-1/2 mx-auto overflow-wrap">
            <p className="font-2xl text-zinc-100 mb-20">
              If you're here, it's because I want you to be a part of a community.
          </p>
          </div>
          {renderButton()}
          {
            minted ? renderNFT() : null
          }
        </div>
        <div className="flex justify-center items-center pt-4">
          <img alt="Twitter Logo" className="h-7 w-7" src="/icons/twitter-logo.svg" />
          <a
            className="text-zinc-100 font-semibold decoration-teal-400"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;