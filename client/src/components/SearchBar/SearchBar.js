import React from 'react';
import { TextField } from '@mui/material';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value:''};
        this.changeHandle = this.changeHandle.bind(this);
        this.keyPress = this.keyPress.bind(this);
    }

    // Update the 'value' prop when a change in text occurs
    changeHandle(e) {
        this.setState({value: e.target.value});
    }

    // Check if Enter was pressed and update the state
    keyPress(e) {
        if (e.key === "Enter") {
            console.log('value', e.target.value);
        }
    }

    render() {
        return  (
            <TextField 
                id="search-bar" 
                label="Search" 
                variant="outlined" 
                size="small"
                fullWidth={true} 

                // Update value on change
                value={this.state.value}
                // Submit the search on Enter
                onKeyDown={this.keyPress}
                onChange={this.changeHandle}
            />
        )
    }
}

export default SearchBar;