Ian's Stock App

Using HTML, CSS, and Javascrapt, this site is built for new investors who want to find a bit of information about publicly traded companies. With nothing more than a stock symbol, the app displays some of the most important information needed to analyze companies, and has the functionatliy to compare two different investments as well.  The app uses the companies performance and profitability to make recommencations on which stock to invest in. Additionally, the PE Ratio wizard allows the user to find companies that fit within their desired PE Ratio with the simple click of a button.  The last major function of the website is the randomizer, which iterates through SP500 companies, and compares two random ones.

Technologies Used

I used the IEX API in many capacities in the making of this site.  Different API links found different information necessary for the app's functionality.  For example, company logo's, websites, and financial data were all located within different API links.  

One of the more difficult aspects of the project was comparing data from the two company API requests.  This was needed to create the stock remmendation functionality.  I needed to pull API information for two companies, then compare the data.  I used a counter method for the five different categories, and whichever came out in the lead was the recommended stock.

Another difficult problem was iterating through a large array of stocks in order to find firms that hit certain characteristics.  I realized iterating through 500+ names for every request would eventually max my API limit, so instead used an alert to notify the user to make another request.  

Unsolved Problems

With more time, I would like to add additional characteristics beyond the PE Ratio so users can make more specific requests.  For example, companies with PE Ratios under 20 that are up over 10% for the year.  With more time I should be able to do this. 

Another issue is the CSS design, which could always be improved.












Testing;
Ian's Stock Portfolio

Playing with the Stock Market, by Ian Rappaport


Project Purpose

The purpose of Ian's stock portfolio is to use HTML, CSS, and Javascript to create a site where the user can look at their stock portfolio, determine their historical returns, and do research to make future trades. The user will be able to input the current stocks they own, how many shares, and get an overview of their portfolio.  There will be a page for research, a page for their current portfolio, and a page for the most recent stock news of the day.  This app will be for people who are overwhelmed by Etrade or other financial apps, with simple, easy to read info.  


APIs

I am using IEX stock API which has access to tons of information.  I image I may have to use a second API, like Yahoo Finance, for certain formation as well. 

Features

I will have to build a homepage with a bit of information on how to use the site.  I'll have to build a research page that will take information a user asks for and displays it in a user friendly format.  I will also want to build some type of drop down that will allow for specific info to be displayed for each stock.

Another page will be to input the user's stock portfolio.  Using a table possibly, The user will enter the stock, the number of shares, and from that the site will generate their market value and some other information.  At the bottom, there will be an aggregate of the user's entire portfolio.  

A third page will be stock news of the day.  There will be headlines at the top, and an ability to focus on specific sectors (technology, media, etc).  

Stretch Goals

Making the site look as professional as possible.  Design is not my strongsuit, so I believe I will have to spend a ton of time in this department.

Possibly another page with personal finance information you can input and see how much leftover money you have to make trades. For example, input takhome pay of 100 a week, expenses 75, savings 15, and 10 leftover for stocks.  Would have to expand on this.

 