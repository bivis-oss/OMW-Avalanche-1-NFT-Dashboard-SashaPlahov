// Set your API key here
const APIKEY = 'ckey_d81ab58d3ef748dba534888bbc1';

// List of supported_collection
const supported_collection = [
  {
    "name": "CryptoSeals",
    "address": "0x0540E4EE0C5CdBA347C2f0E011ACF8651bB70Eb9"
  },
  {
    "name": "Avaxstars",
    "address": "0x53d2230EAC25643cd0772B310EEBb569a100eA73"
  },
  {
    "name": "CryptoWines",
    "address": "0x4DEa595c8274C113493496aE77bdb46D74F18e5f"
  },
  {
    "name": "Love",
    "address": "0x81e2d2423F19f3fDA0E3b392C3d44cE0b316C997"
  },
  {
    "name": "Koios",
    "address": "0x45D794FFCBe134E2BAf81126373A7DaA950aF69c"
  },
  {
    "name": "Snowies",
    "address": "0xB9EB63cCa0B57EeE107958626cA075F0d84FC4dD"
  }
  ,
  {
    "name": "SPORE",
    "address": "0x6e7f5C0b9f4432716bDd0a77a3601291b9D9e985"
  }
  
]

function getNFTIdData() {
    // Get key HTML elements and reset table content
    const ul = document.getElementById('metadata');
    const tableRef = document.getElementById('tokenTable').getElementsByTagName('tbody')[0];
    tableRef.innerHTML = "";

    

    // Covalent API request setup
    const address = document.getElementById('address').value || supported_collection.address;


    //chain choice
    const chainId = document.getElementById('chain').value || '1';
    const url = new URL(`https://api.covalenthq.com/v1/${chainId}/tokens/${address}/nft_token_ids/`);

    url.search = new URLSearchParams({
        key: APIKEY
    })

    // Use Fetch API to get Covalent data
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        let tokens = data.data.items;
        
        // Update wallet metadata
        ul.innerHTML = 
            `<li> Contract address: ${data.data.items[0].contract_address} </li>` +
            `<li> Last update: ${data.data.updated_at} </li>` 
            

        return tokens.map(function(token) { // Map through the results and for each run the code below
        if (token.contract_decimals > 0) {
            balance = parseInt(token.balance) / Math.pow(10, token.contract_decimals);
        } else {
            balance = parseInt(token.balance);
        }
        tableRef.insertRow().innerHTML = 
            
            `<td> ${token.contract_name} </td>` +
            `<td> ${token.contract_ticker_symbol} </td>` +
            `<td> ${token.token_id} </td>`;
        })
    })
}

function getNFTMetaData() {
    // Get key HTML elements and reset table content
    const ul = document.getElementById('metadata');
    const tableRef = document.getElementById('tokenTable').getElementsByTagName('tbody')[0];
    tableRef.innerHTML = "";

    // Covalent API request setup
    const address = document.getElementById('address').value;
    const tokenId = document.getElementById('tokenId').value;
    //chain choice
    const chainId = document.getElementById('chain').value || '1';    

    const url = new URL(`https://api.covalenthq.com/v1/${chainId}/tokens/${address}/nft_metadata/${tokenId}/`);
    url.search = new URLSearchParams({
        key: APIKEY
    })

    // Use Fetch API to get Covalent data
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data) {
        let tokens = data.data.items;
        
        // Update wallet metadata
        ul.innerHTML = 
            `<li> Contract address: ${data.data.items[0].contract_address} </li>` +
            `<li> Last update: ${data.data.updated_at} </li>` 
            

        return tokens.map(function(token) { // Map through the results and for each run the code below
        if (token.contract_decimals > 0) {
            balance = parseInt(token.balance) / Math.pow(10, token.contract_decimals);
        } else {
            balance = parseInt(token.balance);
        }
        console.log(token.nft_data);
        tableRef.insertRow().innerHTML = 
            
            `<td> <img src="${token.nft_data[0].external_data.image}" width=200 height=200></img></td>` +
            `<td><a href="https://cchain.explorer.avax.network/address/${token.nft_data[0].owner}" target="_blank"> ${token.nft_data[0].owner} </a></td>` +
            `<td><a href="${token.nft_data[0].token_url}">View API data</a> </td>` +
            `<td><a href="https://cchain.explorer.avax.network/tokens/${address}/instance/${tokenId}/token-transfers">NFT [${tokenId}]</a> </td>`;
        })
    })
}

supported_collection.forEach((item, index) => {
  var option = document.createElement("option");
  option.text = item.name;
  option.value = item.address;
  var collection = document.getElementById('address');
  collection.appendChild(option);
});