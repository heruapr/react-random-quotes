import "../App.css";
import RefreshButton from "./RefreshButton";
import React, { useState, useEffect } from "react";
// const be_url = "https://express-random-quotes.vercel.app/qod";
const be_url = "https://zenquotes.io/api/random";
const apiNameSpace = "zenquotes.io";
// const be_url = "http://localhost:3002/qod";

function Quote() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    GetRandomQuote();
  }, []);

  if (error) {
    return (
      <div>
        {/* Error: {error.message} */}
        Duh &#128534; kayaknya servernya lagi gangguan, bentar yakk tunggu
        beberapa saat lagi! &#128517;
        <br /> <br />
        <RefreshButton onClick={GetRandomQuote} />
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div>
        Loading...
        <RefreshButton onClick={GetRandomQuote} />
      </div>
    );
  } else {
    return (
      <div>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <blockquote>{item.q}</blockquote>

              <p>-{item.a}</p>
            </li>
          ))}
        </ul>
        <RefreshButton onClick={GetRandomQuote} />
      </div>
    );
  }

  // function GetRandomQuote() {
  //     fetch(be_url, {
  //         method: 'GET',
  //         headers: { 'Content-Type': 'application/json' }
  //     })
  //         .then(res => res.json())
  //         .then(
  //             (result) => {
  //                 setIsLoaded(true);
  //                 setItems(result);
  //             },
  //             (error) => {
  //                 setIsLoaded(true);
  //                 setError(error);
  //             }
  //         )
  // }

  async function GetRandomQuote() {
    try {
      const response = await fetch(be_url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      const isReqLimit = data[0]?.a === apiNameSpace;
      if (!isReqLimit) {
        setIsLoaded(true);
        setItems(data);
      } else {
        setIsLoaded(true);
        setItems([
          {
            q: 'Please wait a moment :) Try clicking again after a few seconds, the development is still free so it is very limited T_T',
            a: 'apr'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching data:', error.message);
      setIsLoaded(true);
      setItems([
        {
          q: 'Failed to fetch data. Please try again later.',
          a: 'error'
        }
      ]);
    }
  }
  
}

export default Quote;
