import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NavBar from '../NavBar';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";


class Checkout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
        }
        this.resolveClick = this.resolveClick.bind(this);
    }

    resolveClick(type) {
        if (type === "Dashboard") {
            if (true) { //TODO: check token
                this.setState({redirect: '/dashboard'});
            }
        }
    }

    render() {
        if (this.state.redirect !== '') {
            return (
                <Redirect push to={this.state.redirect}></Redirect>
            )
        } else {
            return (
                <div>
                    <NavBar current={'Checkout'}/>
                    <Typography variant="h1">CHECKOUT</Typography>
                    <Button variant="contained" color="secondary" onClick={()=>this.resolveClick("Dashboard")}>BROWSE</Button>
                </div>
            )
        }
    }
}

export default Checkout;