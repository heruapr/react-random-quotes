import '../App.css';
import RefreshButton from './RefreshButton';
import React, { useState, useEffect } from 'react';

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
            Error: {error.message}
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
        fetch("https://apr-backend.herokuapp.com/qod", {
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
