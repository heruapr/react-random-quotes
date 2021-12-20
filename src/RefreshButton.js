import './App.css';
import React, { useState, useEffect } from 'react';

function RefreshButton(props) {
    return <button class="button button_secondary" onClick={props.onClick}>Klik aku :)</button>;
    
}
export default RefreshButton;
