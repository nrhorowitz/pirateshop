import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";


class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
        }
        this.resolveClick = this.resolveClick.bind(this);
    }

    resolveClick(type) {
        if (type === "Dashboard") {
            if (this.props.current !== "Dashboard") {
                this.setState({redirect: '/dashboard'});
            }
        } else if (type === "Landing") {
            if (this.props.current !== "Landing") {
                this.setState({redirect: '/'});
            }
        } else if (type === "Checkout") {
            if (this.props.current !== "Checkout") {
                this.setState({redirect: '/checkout'});
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
                <Grid container>
                    <Grid container xs='6'>
                        <Button variant="contained" color="secondary" onClick={()=>this.resolveClick("Landing")}>LANDING</Button>
                    </Grid>
                    <Grid container xs='6'>
                        <Button variant="contained" color="secondary" onClick={()=>this.resolveClick("Dashboard")}>DASHBOARD</Button>
                    </Grid>
                </Grid>
            )
        }
    }
}

export default NavBar;