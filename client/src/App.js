import React from "react";
import { Container } from '@mui/material';

import Films from './components/Films/Films';
import SearchBar from './components/SearchBar/SearchBar'

const App = () => {
    return (
        <>
            <SearchBar />
            <Films />
        </>  
    );
}

export default App;