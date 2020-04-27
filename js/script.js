"use strict";

//declare global vars here
var divQuote;
var btnQuote;
var imgChuck;

//wait for document load
window.addEventListener('load',Initialize);

function Initialize()
{
    BindElements();
    addEvents();
    
}

/**
 * FUNCTIONS
 */

 function BindElements()
 {
    divQuote = document.querySelector("#divquote");
    btnQuote = document.querySelector("#btngetquote");
    imgChuck = document.querySelector("#imgchuck");
 }

 function addEvents()
 {
    //btnQuote.addEventListener("click",GetQuote);
    btnQuote.addEventListener("click",GetQuoteWithFetch);
 }

 /**
  * gets a chuck norris quote using XMLhttp
  */
 function GetQuote()
 {
    //declare api url
    let chuckApiUrl = "https://api.chucknorris.io/jokes/random";
    //declare var to hold xmlHTTP request object
    let xmlHTTP = new XMLHttpRequest();
    
    //set the onreadystatechanged property to an anonymous function
    //that handles the response
    //does not work with arrow function without referencing to xmlHTTP
    xmlHTTP.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200)
            {
                //get the response and parse it
                let quote = JSON.parse(this.response);
                //call the display function
                DisplayQuote(quote);
            }
    };
    //call the web api
    xmlHTTP.open("GET",chuckApiUrl,true);
    //send the request
    xmlHTTP.send();    
 }

 function DisplayQuote(quote)
 {
    /* for (let value in quote)
    {
        console.log(value+':'+quote[value]);
    } */
    //show the quote
    divQuote.innerHTML = quote.value;
    //set the icon
    imgChuck.src = quote.icon_url;
    
 }

 /**
  * gets a chuck norris quote using fetch
  */
 function GetQuoteWithFetch()
 {
    let chuckApiUrl = "https://api.chucknorris.io/jokes/random";
    fetch(chuckApiUrl).then((response) => 
    {
       return  response.json();
    }).then((data) =>
    {
        DisplayQuote(data);
    }).catch((response) =>
    {
        console.log(response);
    });
 }

