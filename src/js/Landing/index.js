import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import NavBar from '../NavBar';
import './index.css'
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";


class Landing extends React.Component {
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
                    <NavBar current={'Landing'}/>
                    <div className="landing-container">
                        <Typography variant="h1">WELCOME TO PIRATESHOP</Typography>
                        <Button variant="contained" color="secondary" onClick={()=>this.resolveClick("Dashboard")}>BROWSE STARWARS</Button>
                    </div>
                </div>
            )
        }
    }
}

export default Landing;