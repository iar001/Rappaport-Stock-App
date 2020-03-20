// Overall Buttons

const apikey = "pk_8af8780cf1724175be34760605a1ec23"
const domain = "https://cloud.iexapis.com/";
const baseUrl = "";

const button1 = document.querySelector("#search1");
const stockInput1 = document.querySelector("#blank1");
let stockResult1 = document.querySelector(".stock-info");

const button2 = document.querySelector("#search2");
const stockInput2 = document.querySelector("#blank2");
let stockResult2 = document.querySelector(".stock-info2")

const buttonCompare = document.querySelector("#search3")
const compareInput = document.querySelector("#blank3")
let compareResult = document.querySelector(".comparison")

const buttonRandom = document.querySelector("#search4");
const clearButton = document.querySelector("#search5");

// EVENT LISTENERS

const randomStock = (array) => {
  let randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber]
};

buttonRandom.addEventListener("click", async () => {
  let randomStockOne = randomStock(sp500);
  let randomStockTwo = randomStock(sp500);
  let response1 = await axios.get(`https://cloud.iexapis.com/stable/stock/${randomStockOne}/quote?token=${apikey}`);
  let response2 = await axios.get(`https://cloud.iexapis.com/stable/stock/${randomStockTwo}/quote?token=${apikey}`);
  let logo1 = await axios.get(`https://cloud.iexapis.com/stable/stock/${randomStockOne}/logo?token=${apikey}`);
  let logo2 = await axios.get(`https://cloud.iexapis.com/stable/stock/${randomStockTwo}/logo?token=${apikey}`);
  let company1 = await axios.get(`https://cloud.iexapis.com/stable/stock/${randomStockOne}/company?token=${apikey}`);
  let company2 = await axios.get(`https://cloud.iexapis.com/stable/stock/${randomStockTwo}/company?token=${apikey}`);
  console.log(response1)
  console.log(randomStockOne)
  renderstock1(response1, logo1, company1)
  renderstock2(response2, logo2, company2)
  compareStocks(response1, response2)
})


// Compare Stocks Event Listener

buttonCompare.addEventListener("click", async () => {
  let compare1 = stockInput1.value;
  let compare2 = stockInput2.value;
  let response1 = await axios.get(`https://cloud.iexapis.com/stable/stock/${compare1}/quote?token=${apikey}`)
  let response2 = await axios.get(`https://cloud.iexapis.com/stable/stock/${compare2}/quote?token=${apikey}`)
  compareStocks(response1, response2)
})

// Company One Event Listener 

button1.addEventListener("click", async () => {
  let stockInfo = stockInput1.value;
  let response = await axios.get(`https://cloud.iexapis.com/stable/stock/${stockInfo}/quote?token=${apikey}`);
  let logo = await axios.get(`https://cloud.iexapis.com/stable/stock/${stockInfo}/logo?token=${apikey}`);
  let company = await axios.get(`https://cloud.iexapis.com/stable/stock/${stockInfo}/company?token=${apikey}`)
  console.log(company)
  console.log(logo);
  console.log(response);
  renderstock1(response, logo, company);
})

// Company Two Event Listener 

button2.addEventListener("click", async () => {
  let stockInfo = stockInput2.value;
  let response = await axios.get(`https://cloud.iexapis.com/stable/stock/${stockInfo}/quote?token=${apikey}`);
  let logo = await axios.get(`https://cloud.iexapis.com/stable/stock/${stockInfo}/logo?token=${apikey}`);
  let company = await axios.get(`https://cloud.iexapis.com/stable/stock/${stockInfo}/company?token=${apikey}`)
  console.log(response);
  console.log(response.data.symbol)
  console.log(company)
  renderstock2(response, logo, company)
})

// Company 1 Function 

const renderstock1 = (information, picture, company) => {
  let element = document.createElement("div");
  element.classList.add("stock-info");
  element.innerHTML =
    `<p> ${information.data.companyName}</p>
    <p>${information.data.symbol}</p>
    <p>Price: ${(information.data.latestPrice).toFixed(2)}</p>
    <p>Year to Date Move: ${(information.data.ytdChange * 100).toFixed(2)}%</p>
    <p>PE Ratio: ${information.data.peRatio}</p>
    <p>Market Cap: $${(information.data.marketCap / 1000000000).toFixed(2)} billion</p>
    <p>Yesterday's Change: ${(information.data.changePercent * 100).toFixed(2)}%</p>
    <div id="testing">
    <img src=${picture.data.url} style="width:50px;height:50px" alt="hello">
    <br>
    <a href="${company.data.website}" target="_blank">Company Website</a>
    </div>

    
    
    `
  stockResult1.append(element)
}

// Company 2 Function 

const renderstock2 = (information, picture, company) => {
  // let peRatio2 = information.data.peRatio;
  let element = document.createElement("div");
  element.classList.add("stock-info2");
  element.innerHTML =
    `<p> ${information.data.companyName}</p>
    <p>${information.data.symbol}</p>
    <p>Price: ${(information.data.latestPrice).toFixed(2)}</p>
    <p>Year to Date Move: ${(information.data.ytdChange * 100).toFixed(2)}%</p>
    <p>PE Ratio: ${information.data.peRatio}</p>
    <p>Market Cap: $${(information.data.marketCap / 1000000000).toFixed(2)} billion</p>
    <p>Yesterday's Change: ${(information.data.changePercent * 100).toFixed(2)}%</p>
    <div id="testing">
    <img src=${picture.data.url} style="width:50px;height:50px" alt="hello">
    <br>
    <a href="${company.data.website}" target="_blank">Company Website</a>
    </div>
    
    `
  stockResult2.append(element)
}

// Compare Function 

const compareStocks = (stock1, stock2) => {

  
  let closingPrice1 = stock1.data.previousClose;
  let closingPrice2 = stock2.data.previousClose;
  let ytdChange1 = stock1.data.ytdChange;
  let ytdChange2 = stock2.data.ytdChange;
  let peRatio1 = stock1.data.peRatio;
  let peRatio2 = stock2.data.peRatio;
  let marketCap1 = stock1.data.marketCap;
  let marketCap2 = stock2.data.marketCap;
  let dailyChange1 = stock1.data.changePercent;
  let dailyChange2 = stock2.data.changePercent;
  let company1 = 0;
  let company2 = 0;

  
 

  let element = document.createElement("div");
  element.classList.add("comparison");
  if (closingPrice1 > closingPrice2) {
    company1 += 1;
    let element = document.createElement("div");
    element.classList.add("comparison");
    element.innerHTML = `
    <p>Company Name</p>
    <p>Stock Symbol</p>
    <p>Price Winner: ${stock1.data.symbol}</p>`
    compareResult.append(element)
  } else {
    company2 += 1;
    let element = document.createElement("div")
    element.classList.add("comparison");
    element.innerHTML = `
    <p>Company Name</p>
    <p>Stock Symbol</p>
    <p>Price Winner: ${stock2.data.symbol}</p>`
    compareResult.append(element)
  }

  if (ytdChange1 > ytdChange2) {
    company1 += 1;
    let element = document.createElement("div");
    element.classList.add("comparison");
    element.innerHTML = `<p>Performance Winner: ${stock1.data.symbol}</p>`
    compareResult.append(element)
  } else {
    company2 += 1;
    let element = document.createElement("div")
    element.classList.add("comparison");
    element.innerHTML = `<p>Performance Winner: ${stock2.data.symbol}</p>`
    compareResult.append(element)
  }

  if (peRatio1 < 0 && peRatio2 > 0) {
    company2 += 1;
    let element = document.createElement("div");
    element.classList.add("comparison");
    element.innerHTML = `<p>PE Ratio Winner: ${stock2.data.symbol}</p>`
    compareResult.append(element)
  } else if (peRatio1 > 0 && peRatio2 < 0) {
    company1 += 1;
    let element = document.createElement("div");
    element.classList.add("comparison");
    element.innerHTML = `<p>PE Ratio Winner: ${stock1.data.symbol}</p>`
    compareResult.append(element)
  } else if (peRatio1 > peRatio2) {
    company2 += 1;
    let element = document.createElement("div");
    element.classList.add("comparison");
    element.innerHTML = `<p>PE Ratio Winner: ${stock2.data.symbol}</p>`
    compareResult.append(element)
  } else {
    company1 += 1;
    let element = document.createElement("div");
    element.classList.add("comparison");
    element.innerHTML = `<p>PE Ratio Winner: ${stock1.data.symbol}</p>`
    compareResult.append(element)
  }

  if (marketCap1 > marketCap2) {
    company1 += 1;
    let element = document.createElement("div");
    element.classList.add("comparison");
    element.innerHTML = `<p>Which Company is Bigger?: ${stock1.data.symbol}</p>`
    compareResult.append(element)
  } else {
    company2 += 1;
    let element = document.createElement("div")
    element.classList.add("comparison");
    element.innerHTML = `<p>Which Company is Bigger?: ${stock2.data.symbol}</p>`
    compareResult.append(element)
  }

  if (dailyChange1 > dailyChange2) {
    company1 += 1;
    let element = document.createElement("div");
    element.classList.add("comparison");
    element.innerHTML = `<p>Yesterday's Price Move: ${stock1.data.symbol}</p>`
    compareResult.append(element)
  } else {
    company2 += 1;
    let element = document.createElement("div")
    element.classList.add("comparison");
    element.innerHTML = `<p>Yesterday's Price Move: ${stock2.data.symbol}</p>`
    compareResult.append(element)
  }

  if (company1 > company2) {
    let element = document.createElement("div");
    element.classList.add("comparison");
    element.innerHTML = `<h2>BUY: ${stock1.data.companyName}</h2>`
    compareResult.append(element)
  } else {
    let element = document.createElement("div");
    element.classList.add("comparison");
    element.innerHTML = `<h2>BUY: ${stock2.data.companyName}</h2>`
    compareResult.append(element)
  }
}

// ARRAY OF STOCK SYMBOLS

let sp500 = ['ABT', 'ABBV', 'ACN', 'ADBE', 'ADT', 'AAP', 'AES', 'AFL', 'AMG', 'A', 'APD', 'ARGO', 'AKAM', 'AA', 'AGN', 'ALXN', 'ALLE', 'ADS', 'ALL', 'ALTR', 'MO', 'AMZN', 'AEE', 'AAL', 'AEP', 'AXP', 'AIG', 'AMT', 'AMP', 'ABC', 'ZOOM', 'AMGN', 'APH', 'APC', 'ADI', 'AON', 'APA', 'AIV', 'AMAT', 'ADM', 'AIZ', 'T', 'ADSK', 'ADP', 'AN', 'AZO', 'AVGO', 'AVB', 'AVY', 'BLL', 'BAC', 'BK', 'BCRH', 'BAX', 'BBT', 'BDX', 'BBBY', 'BRK.A', 'BBY', 'BLX', 'HRB', 'BA', 'BWA', 'BXP', 'BMY', 'CHRW', 'COG', 'CPB', 'COF', 'CAH', 'HSIC', 'KMX', 'CCL', 'CAT', 'CBRE', 'CBS', 'CELG', 'CNP', 'CTL', 'CERN', 'CF', 'SCHW', 'CHK', 'CVX', 'CMG', 'CB', 'CI', 'XEC', 'CINF', 'CTAS', 'CSCO', 'C', 'CTXS', 'CLX', 'CME', 'CMS', 'COH', 'KO', 'CCE', 'CTSH', 'CL', 'CMCSA', 'CMA', 'CAG', 'COP', 'CNX', 'ED', 'STZ', 'GLW', 'COST', 'CCI', 'CSX', 'CMI', 'CVS', 'DHI', 'DHR', 'DRI', 'DVA', 'DE', 'DLPH', 'DAL', 'XRAY', 'DVN', 'DO', 'DTV', 'DFS', 'DISCA', 'DISCK', 'DG', 'DLTR', 'D', 'DOV', 'DOW', 'PTON', 'DTE', 'DD', 'DUK', 'DNB', 'ETFC', 'EMN', 'ETN', 'EBAY', 'ECL', 'EIX', 'EW', 'EA', 'WORK', 'EMR', 'ENDP', 'ESV', 'ETR', 'EOG', 'EQT', 'EFX', 'EQIX', 'EQR', 'ESS', 'EL', 'ES', 'EXC', 'EXPE', 'EXPD', 'XOM', 'FFIV', 'FB', 'FAST', 'FDX', 'FIS', 'FITB', 'FSLR', 'FE', 'FISV', 'FLIR', 'FLS', 'FLR', 'FMC', 'FTI', 'F', 'FOSL', 'BEN', 'FCX', 'FTR', 'GME', 'GPS', 'GRMN', 'GD', 'GE', 'GIS', 'GM', 'GPC', 'GNW', 'GILD', 'GS', 'GT', 'GOOGL', 'GOOG', 'GWW', 'HAL', 'HBI', 'HOG', 'HRS', 'HIG', 'HAS', 'HCA', 'HCP', 'WELL', 'HP', 'HES', 'HPQ', 'HD', 'HON', 'HRL', 'HST', 'HUM', 'HBAN', 'ITW', 'IR', 'INTC', 'ICE', 'IBM', 'IP', 'IPG', 'IFF', 'INTU', 'ISRG', 'IVZ', 'IRM', 'JEC', 'JBHT', 'JNJ', 'JCI', 'JPM', 'JNPR', 'KSU', 'K', 'KEY', 'KDP', 'KMB', 'KIM', 'LM', 'LEN', 'GRUB', 'LLY', 'LNC', 'LMT', 'L', 'LOW', 'LYB', 'MTB', 'MAC', 'M', 'MNK', 'MRO', 'MPC', 'MAR', 'MMC', 'MLM', 'MAS', 'MA', 'MAT', 'MKC', 'MCD', 'MCK', 'UBER', 'MMV', 'MDT', 'MRK', 'MET', 'MCHP', 'MU', 'MSFT', 'MHK', 'TAP', 'MDLZ', 'MNST', 'MCO', 'MS', 'MOS', 'MSI', 'MUR', 'MYL', 'NDAQ', 'NOV', 'NAVI', 'NTAP', 'NFLX', 'NWL', 'NFX', 'NEM', 'NWSA', 'NEE', 'NLSN', 'NKE', 'NI', 'NE', 'NBL', 'JWN', 'NSC', 'NTRS', 'NOC', 'NRG', 'NUE', 'NVDA', 'ORLY', 'OXY', 'OMC', 'OKE', 'ORCL', 'OI', 'PCAR', 'PLL', 'PH', 'PDCO', 'PAYX', 'PNR', 'PBCT', 'PEP', 'PKI', 'PRGO', 'PFE', 'PCG', 'PM', 'PSX', 'PNW', 'PXD', 'PBI', 'PNC', 'RL', 'PPG', 'PPL', 'PCLN', 'PFG', 'PG', 'PGR', 'PLD', 'PRU', 'PEG', 'PSA', 'PHM', 'PVH', 'QRVO', 'PWR', 'QCOM', 'DGX', 'RRC', 'RTN', 'O', 'RHT', 'REGN', 'RF', 'RSG', 'RA', 'RHI', 'ROK', 'TMUS', 'ROP', 'ROST', 'R', 'CRM', 'CDW', 'SLB', 'SNAP', 'STX', 'SEE', 'SRE', 'SHW', 'SPG', 'SWKS', 'SLG', 'SJM', 'SNA', 'SO', 'LUV', 'SWN', 'SE', 'ST', 'SWK', 'NVR', 'SBUX', 'JHG', 'STT', 'SRCL', 'SYK', 'STI', 'SYMC', 'SYY', 'TROW', 'TGT', 'TEL', 'TGNA', 'THC', 'TDC', 'TXN', 'TXT', 'HSY', 'TRV', 'TMO', 'TIF', 'TWTR', 'TJX', 'TMK', 'TSS', 'TSCO', 'RIG', 'TRIP', 'FOXA', 'TSN', 'UA', 'UNP', 'UNH', 'UPS', 'URI', 'UTX', 'UHS', 'UNM', 'URBN', 'VFC', 'VLO', 'VAR', 'VTR', 'VRSN', 'VZ', 'VRTX', 'VIAB', 'V', 'VNO', 'VMC', 'WMT', 'WBA', 'DIS', 'WM', 'WAT', 'ANTM', 'WFC', 'WDC', 'WU', 'WY', 'WHR', 'WMB', 'WEC', 'WYNN', 'XEL', 'XRX', 'XLNX', 'LYFT', 'XYL', 'YELP', 'YUM', 'ZBH', 'ZION', 'ZTS']


// PE RATIO FUNCTIONALITY

const buttonPrice = document.querySelector("#price-button");
const priceInput = document.querySelector("#blank3");
let userInput = document.querySelector(".stock-result");

buttonPrice.addEventListener("click", async () => {
  let randomNumber = Math.floor(Math.random() * sp500.length)
  let stockInfo = sp500[randomNumber]
  let response = await axios.get(`https://cloud.iexapis.com/stable/stock/${stockInfo}/quote?token=${apikey}`);
  let logo = await axios.get(`https://cloud.iexapis.com/stable/stock/${stockInfo}/logo?token=${apikey}`);
  let company = await axios.get(`https://cloud.iexapis.com/stable/stock/${stockInfo}/company?token=${apikey}`)

  let pricer = Number(priceInput.value);

  if (response.data.peRatio < pricer && response.data.peRatio > 0) {
    renderstock3(response, logo, company)
  } else if (response.data.peRatio < 0) {
    window.alert(`${response.data.companyName} has a negative PE Ratio. Try Again.`)
  } else {
    window.alert(`${response.data.companyName} has a higher PE Ratio than ${pricer}.  Try Again`)
  }
})



// PE Ratio Function 

const renderstock3 = (information, picture, company) => {
  let element = document.createElement("div");
  element.classList.add("stock-result");
  element.innerHTML =
    `<p> ${information.data.companyName}</p>
    <img src=${picture.data.url} style="width:50px;height:50px" alt="hello">
    <a href="${company.data.website}" target="_blank">Company Website</a>
    `
  userInput.append(element)
}

