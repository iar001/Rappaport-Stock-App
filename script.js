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

clearButton.addEventListener("click", async () => {
  let stockOneInfo = document.querySelector("body > main > div.stock-comparison > section.stock-info > div.stock-info");
  stockOneInfo.innerHTML = "";
  let stockTwoInfo = document.querySelector("body > main > div.stock-comparison > section.stock-info2 > div.stock-info2");
  stockTwoInfo.innerHTML = "";
  let comparisonInfo = document.querySelector("body > main > div.stock-comparison > section.comparison");
  comparisonInfo.innerHTML = `<h2>Comparison</h2>`
  
});

const randomStock = (array) => {
  let randomNumber = Math.floor(Math.random() * array.length);
  return array[randomNumber]
};

buttonRandom.addEventListener("click", async () => {
  let randomStockOne = randomStock(sp500);
  let randomStockTwo = randomStock(sp500);
  let response1 = await axios.get(`https://cloud.iexapis.com/stable/stock/${randomStockOne}/quote?token=${apikey}`);
  let response2 = await axios.get(`https://cloud.iexapis.com/stable/stock/${randomStockTwo}/quote?token=${apikey}`);
  console.log(response1)
  console.log(randomStockOne)
  renderstock1(response1)
  renderstock2(response2)
  compareStocks(response1, response2)
})




buttonCompare.addEventListener("click", async () => {
  let compare1 = stockInput1.value;
  let compare2 = stockInput2.value;
  let response1 = await axios.get(`https://cloud.iexapis.com/stable/stock/${compare1}/quote?token=${apikey}`)
  let response2 = await axios.get(`https://cloud.iexapis.com/stable/stock/${compare2}/quote?token=${apikey}`)
  compareStocks(response1, response2)
})

button1.addEventListener("click", async () => {
  let stockInfo = stockInput1.value;
  let response = await axios.get(`https://cloud.iexapis.com/stable/stock/${stockInfo}/quote?token=${apikey}`);
  console.log(response);
  renderstock1(response);
})

button2.addEventListener("click", async () => {
  let stockInfo = stockInput2.value;
  let response = await axios.get(`https://cloud.iexapis.com/stable/stock/${stockInfo}/quote?token=${apikey}`);
  console.log(response);
  console.log(response.data.symbol)
  renderstock2(response)
})

// https://sandbox.iexapis.com/stable/stock/AAPL/company?token=Tpk_877363aca2ec4c8894febb553930ff55


const renderstock1 = (information) => {
  let element = document.createElement("div");
  element.classList.add("stock-info");
  element.innerHTML =
    `<p> ${information.data.companyName}</p>
    <p>${information.data.symbol}</p>
    <p> ${information.data.previousClose}</p>
    <p>${information.data.ytdChange} %</p>
    <p>${information.data.peRatio}</p>
    <p>${information.data.marketCap}</p>
    <p>${information.data.changePercent}</p>
    
    

    `
  stockResult1.append(element)
}

const renderstock2 = (information) => {
  // let peRatio2 = information.data.peRatio;
  let element = document.createElement("div");
  element.classList.add("stock-info2");
  element.innerHTML =
    `<p> ${information.data.companyName}</p>
    <p>${information.data.symbol}</p>
    <p>${information.data.previousClose}</p>
    <p>${information.data.ytdChange} %</p>
    <p>${information.data.peRatio}</p>
    <p>${information.data.marketCap}</p>
    <p>${information.data.changePercent}</p>
    
    `
  stockResult2.append(element)
}

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

  if (closingPrice1 > closingPrice2) {
    company1 += 1;
    let element = document.createElement("div");
    element.classList.add("comparison");
    element.innerHTML = `
    <p>Names of the Companies</p>
    <p>Stock Symbol</p>
    <p>Price Winner: ${stock1.data.symbol}</p>`
    compareResult.append(element)
  } else {
    company2 += 1;
    let element = document.createElement("div")
    element.classList.add("comparison");
    element.innerHTML = `
    <p>Names of the Companies</p>
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
    element.innerHTML = `<p>Bigger Company: ${stock1.data.symbol}</p>`
    compareResult.append(element)
  } else {
    company2 += 1;
    let element = document.createElement("div")
    element.classList.add("comparison");
    element.innerHTML = `<p>Bigger Company: ${stock2.data.symbol}</p>`
    compareResult.append(element)
  }

  if (dailyChange1 > dailyChange2) {
    company1 += 1;
    let element = document.createElement("div");
    element.classList.add("comparison");
    element.innerHTML = `<p>Yesterday's Move: ${stock1.data.symbol}</p>`
    compareResult.append(element)
  } else {
    company2 += 1;
    let element = document.createElement("div")
    element.classList.add("comparison");
    element.innerHTML = `<p>Yesterday's Move: ${stock2.data.symbol}</p>`
    compareResult.append(element)
  }

  if (company1 > company2) {
    let element = document.createElement("div");
    element.classList.add("comparison");
    element.innerHTML = `<h2>YOU SHOULD BUY: ${stock1.data.symbol}</h2>`
    compareResult.append(element)
  } else {
    let element = document.createElement("div");
    element.classList.add("comparison");
    element.innerHTML = `<h2>YOU SHOULD BUY: ${stock2.data.symbol}</h2>`
    compareResult.append(element)
  }
}

 let sp500 = ['ABT', 'ABBV', 'ACN', 'ACE', 'ADBE', 'ADT', 'AAP', 'AES', 'AET', 'AFL', 'AMG', 'A', 'GAS', 'APD', 'ARG', 'AKAM', 'AA', 'AGN', 'ALXN', 'ALLE', 'ADS', 'ALL', 'ALTR', 'MO', 'AMZN', 'AEE', 'AAL', 'AEP', 'AXP', 'AIG', 'AMT', 'AMP', 'ABC', 'AME', 'AMGN', 'APH', 'APC', 'ADI', 'AON', 'APA', 'AIV', 'AMAT', 'ADM', 'AIZ', 'T', 'ADSK', 'ADP', 'AN', 'AZO', 'AVGO', 'AVB', 'AVY', 'BHI', 'BLL', 'BAC', 'BK', 'BCR', 'BXLT', 'BAX', 'BBT', 'BDX', 'BBBY', 'BRK-B', 'BBY', 'BLX', 'HRB', 'BA', 'BWA', 'BXP', 'BSK', 'BMY', 'BRCM', 'BF-B', 'CHRW', 'CA', 'CVC', 'COG', 'CAM', 'CPB', 'COF', 'CAH', 'HSIC', 'KMX', 'CCL', 'CAT', 'CBG', 'CBS', 'CELG', 'CNP', 'CTL', 'CERN', 'CF', 'SCHW', 'CHK', 'CVX', 'CMG', 'CB', 'CI', 'XEC', 'CINF', 'CTAS', 'CSCO', 'C', 'CTXS', 'CLX', 'CME', 'CMS', 'COH', 'KO', 'CCE', 'CTSH', 'CL', 'CMCSA', 'CMA', 'CSC', 'CAG', 'COP', 'CNX', 'ED', 'STZ', 'GLW', 'COST', 'CCI', 'CSX', 'CMI', 'CVS', 'DHI', 'DHR', 'DRI', 'DVA', 'DE', 'DLPH', 'DAL', 'XRAY', 'DVN', 'DO', 'DTV', 'DFS', 'DISCA', 'DISCK', 'DG', 'DLTR', 'D', 'DOV', 'DOW', 'DPS', 'DTE', 'DD', 'DUK', 'DNB', 'ETFC', 'EMN', 'ETN', 'EBAY', 'ECL', 'EIX', 'EW', 'EA', 'EMC', 'EMR', 'ENDP', 'ESV', 'ETR', 'EOG', 'EQT', 'EFX', 'EQIX', 'EQR', 'ESS', 'EL', 'ES', 'EXC', 'EXPE', 'EXPD', 'ESRX', 'XOM', 'FFIV', 'FB', 'FAST', 'FDX', 'FIS', 'FITB', 'FSLR', 'FE', 'FSIV', 'FLIR', 'FLS', 'FLR', 'FMC', 'FTI', 'F', 'FOSL', 'BEN', 'FCX', 'FTR', 'GME', 'GPS', 'GRMN', 'GD', 'GE', 'GGP', 'GIS', 'GM', 'GPC', 'GNW', 'GILD', 'GS', 'GT', 'GOOGL', 'GOOG', 'GWW', 'HAL', 'HBI', 'HOG', 'HAR', 'HRS', 'HIG', 'HAS', 'HCA', 'HCP', 'HCN', 'HP', 'HES', 'HPQ', 'HD', 'HON', 'HRL', 'HSP', 'HST', 'HCBK', 'HUM', 'HBAN', 'ITW', 'IR', 'INTC', 'ICE', 'IBM', 'IP', 'IPG', 'IFF', 'INTU', 'ISRG', 'IVZ', 'IRM', 'JEC', 'JBHT', 'JNJ', 'JCI', 'JOY', 'JPM', 'JNPR', 'KSU', 'K', 'KEY', 'GMCR', 'KMB', 'KIM', 'LM', 'LEG', 'LEN', 'LVLT', 'LUK', 'LLY', 'LNC', 'LLTC', 'LMT', 'L', 'LOW', 'LYB', 'MTB', 'MAC', 'M', 'MNK', 'MRO', 'MPC', 'MAR', 'MMC', 'MLM', 'MAS', 'MA', 'MAT', 'MKC', 'MCD', 'MHFI', 'MCK', 'MJN', 'MMV', 'MDT', 'MRK', 'MET', 'KORS', 'MCHP', 'MU', 'MSFT', 'MHK', 'TAP', 'MDLZ', 'MON', 'MNST', 'MCO', 'MS', 'MOS', 'MSI', 'MUR', 'MYL', 'NDAQ', 'NOV', 'NAVI', 'NTAP', 'NFLX', 'NWL', 'NFX', 'NEM', 'NWSA', 'NEE', 'NLSN', 'NKE', 'NI', 'NE', 'NBL', 'JWN', 'NSC', 'NTRS', 'NOC', 'NRG', 'NUE', 'NVDA', 'ORLY', 'OXY', 'OMC', 'OKE', 'ORCL', 'OI', 'PCAR', 'PLL', 'PH', 'PDCO', 'PAYX', 'PNR', 'PBCT', 'POM', 'PEP', 'PKI', 'PRGO', 'PFE', 'PCG', 'PM', 'PSX', 'PNW', 'PXD', 'PBI', 'PCL', 'PNC', 'RL', 'PPG', 'PPL', 'PX', 'PCP', 'PCLN', 'PFG', 'PG', 'PGR', 'PLD', 'PRU', 'PEG', 'PSA', 'PHM', 'PVH', 'QRVO', 'PWR', 'QCOM', 'DGX', 'RRC', 'RTN', 'O', 'RHT', 'REGN', 'RF', 'RSG', 'RAI', 'RHI', 'ROK', 'COL', 'ROP', 'ROST', 'RLC', 'R', 'CRM', 'SNDK', 'SCG', 'SLB', 'SNI', 'STX', 'SEE', 'SRE', 'SHW', 'SIAL', 'SPG', 'SWKS', 'SLG', 'SJM', 'SNA', 'SO', 'LUV', 'SWN', 'SE', 'STJ', 'SWK', 'SPLS', 'SBUX', 'HOT', 'STT', 'SRCL', 'SYK', 'STI', 'SYMC', 'SYY', 'TROW', 'TGT', 'TEL', 'TE', 'TGNA', 'THC', 'TDC', 'TSO', 'TXN', 'TXT', 'HSY', 'TRV', 'TMO', 'TIF', 'TWX', 'TWC', 'TJK', 'TMK', 'TSS', 'TSCO', 'RIG', 'TRIP', 'FOXA', 'TSN', 'TYC', 'UA', 'UNP', 'UNH', 'UPS', 'URI', 'UTX', 'UHS', 'UNM', 'URBN', 'VFC', 'VLO', 'VAR', 'VTR', 'VRSN', 'VZ', 'VRTX', 'VIAB', 'V', 'VNO', 'VMC', 'WMT', 'WBA', 'DIS', 'WM', 'WAT', 'ANTM', 'WFC', 'WDC', 'WU', 'WY', 'WHR', 'WFM', 'WMB', 'WEC', 'WYN', 'WYNN', 'XEL', 'XRX', 'XLNX', 'XL', 'XYL', 'YHOO', 'YUM', 'ZBH', 'ZION', 'ZTS']





