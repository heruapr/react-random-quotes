import '../App.css';
import RefreshButton from './RefreshButton';
import React, { useState, useEffect } from 'react';
const be_url = "https://apr-backend.herokuapp.com/qod";
// const be_url = "http://localhost:3002/qod";

function Quote() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        GetRandomQuote()
    }, [])

    if (error) {
        return <div>
            {/* Error: {error.message} */}
            Duh &#128534; kayaknya servernya lagi gangguan, bentar yakk tunggu beberapa saat lagi! &#128517;
            <br/> <br/>
            <RefreshButton
                onClick={GetRandomQuote}
            /></div>;
    } else if (!isLoaded) {
        return <div>
            Loading...
            <RefreshButton
                onClick={GetRandomQuote}
            />
        </div>;
    } else {
        return (
            <div>
                <ul>
                    {items.map(item => (
                        <li key={item.id}>
                            <blockquote>
                                {item.q}
                            </blockquote>

                            <p>-{item.a}</p>
                        </li>
                    ))}
                </ul>
                <RefreshButton
                    onClick={GetRandomQuote}
                />
            </div>
        );
    }

    function GetRandomQuote() {
        fetch(be_url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }
}

export default Quote;
