import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import NavBar from '../NavBar';
import './index.css';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

import dvd4 from '../../img/starwarsDVD4.jpg';
import dvd5 from '../../img/starwarsrawDVD5.jpg';
import dvd6 from '../../img/starwarsrawDVD6.jpg';
import blue4 from '../../img/starwarsblueraw4.jpg';
import blue5 from '../../img/starwarsblueraw5.jpg';
import blue6 from '../../img/starwarsblueraw6.jpg';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
            showReceipt: false,
        }
        this.resolveClick = this.resolveClick.bind(this);
        this.renderMenu = this.renderMenu.bind(this);
        this.renderSingleItem = this.renderSingleItem.bind(this);
    }

    resolveClick(type) {
        if (type === "Dashboard") {
            if (true) { //TODO: check token
                this.setState({redirect: '/dashboard'});
            }
        }
    }

    renderMenu() {
        const itemList = [
            {
                name: 'Star Wars Episode IV DVD',
                price: 20,
                imageUrl: dvd4,
            }, 
            {
                name: 'Star Wars Episode V DVD',
                price: 20,
                imageUrl: dvd5,
            }, 
            {
                name: 'Star Wars Episode VI DVD',
                price: 20,
                imageUrl: dvd6,
            }, 
            {
                name: 'Star Wars Episode IV Blu-Ray',
                price: 25,
                imageUrl: blue4,
            }, 
            {
                name: 'Star Wars Episode V Blu-Ray',
                price: 25,
                imageUrl: blue5,
            }, 
            {
                name: 'Star Wars Episode VI Blu-Ray',
                price: 20,
                imageUrl: blue6,
            }, 
        ];
        return (
            <div>
                {itemList.map((map)=>(this.renderSingleItem(map)))}
            </div>
        )
    }

    renderSingleItem(map) {
        return (
            <div>
                <Grid container>
                    <Grid xs={10}>
                        <img src={map.imageUrl}/>
                        <Typography variant="h4">{map.name}</Typography>
                    </Grid>
                    <Grid xs={2}>
                        <Typography variant="h4">{map.price}</Typography>
                    </Grid>
                </Grid>
            </div>
        )
    }

    renderReceipt() {
        if (this.state.showReceipt) {
            return (
                <div className="dashboard-container">
                    ASDF
                </div>
            )
        } else {
            return (
                <div></div>
            )
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
                    <NavBar current={'Dashboard'}/>
                    <div className="dashboard-container">
                        <Typography variant="h1">STARWARS MOVIES</Typography>
                        {this.renderMenu()}
                        <Button variant="contained" color="secondary" onClick={()=>this.resolveClick("Receipt")}>Generate Receipt</Button>
                    </div>
                    {this.renderReceipt()}
                </div>
            )
        }
    }
}

export default Dashboard;