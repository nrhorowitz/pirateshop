import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid'
import NavBar from '../NavBar';
import './index.css';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";

import dvd4 from '../../img/dvd4.jpg';
import dvd5 from '../../img/dvd5.jpg';
import dvd6 from '../../img/dvd6.jpg';
import blue4 from '../../img/blue4.jpg';
import blue5 from '../../img/blue5.jpg';
import blue6 from '../../img/blue6.jpg';
import cart from '../../img/cart.png';

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
        price: 25,
        imageUrl: blue6,
    }, 
];
const dvdSet = [
    'Star Wars Episode IV DVD',
    'Star Wars Episode V DVD',
    'Star Wars Episode VI DVD',
];
const blueSet = [
    'Star Wars Episode IV Blu-Ray',
    'Star Wars Episode V Blu-Ray',
    'Star Wars Episode VI Blu-Ray',
];

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirect: '',
            showReceipt: false,
            didnotjump: true,
            inventory: {
                'Star Wars Episode IV DVD': 0,
                'Star Wars Episode V DVD': 0,
                'Star Wars Episode VI DVD': 0,
                'Star Wars Episode IV Blu-Ray': 0,
                'Star Wars Episode V Blu-Ray': 0,
                'Star Wars Episode VI Blu-Ray': 0,
            },
            sumColor: 'none',
            buffer: null,
        }
        this.updateSet = this.updateSet.bind(this);
        this.computeTotal = this.computeTotal.bind(this);
        this.computeCount = this.computeCount.bind(this);
        this.resolveClick = this.resolveClick.bind(this);
        this.renderMenu = this.renderMenu.bind(this);
        this.renderSingleItem = this.renderSingleItem.bind(this);
        this.renderMenuR = this.renderMenuR.bind(this);
        this.renderSingleItemR = this.renderSingleItemR.bind(this);
        this.renderItemCount = this.renderItemCount.bind(this);
        this.renderDiscount = this.renderDiscount.bind(this);
        this.renderOverallDiscount = this.renderOverallDiscount.bind(this);
    }

    componentDidUpdate() {
        if (this.state.showReceipt && this.state.didnotjump) {
            var element = document.getElementById("end");
            element.scrollIntoView();
            this.setState({didnotjump: false});
        }
    }

    updateSet() {
        var d = this.state.inventory;
        var allDvd = true;
        for (var i in dvdSet) {
            if (d[dvdSet[i]] === 0) {
                allDvd = false;
            }
        }
        var allBlue = true;
        for (var i in blueSet) {
            if (d[blueSet[i]] === 0) {
                allBlue = false;
            }
        }
        if (allDvd || allBlue) {
            this.setState({sumColor: 'primary'});
        } else {
            this.setState({sumColor: 'none'});
        }
    }

    computeTotal() {
        //apply deals
        var d = this.state.inventory;
        var allDvd = true;
        for (var i in dvdSet) {
            if (d[dvdSet[i]] === 0) {
                allDvd = false;
            }
        }
        var allBlue = true;
        for (var i in blueSet) {
            if (d[blueSet[i]] === 0) {
                allBlue = false;
            }
        }
        //sum total
        var sum = 0; 
        d = this.state.inventory;
        for (var i in d) {
            for (var j in itemList) {
                if (itemList[j]['name'] === i) { //names match
                    if ((dvdSet.indexOf(i) >= 0) && (allDvd)) {
                        sum += itemList[j]['price'] * d[i] * 0.85;
                    } else if ((blueSet.indexOf(i) >= 0) && (allBlue)) {
                        sum += itemList[j]['price'] * d[i] * 0.85;
                    } else {
                        sum += itemList[j]['price'] * d[i];
                    }
                }
            }
        }
        //apply 100 item discount
        var count = 0;
        for (var i in d) {
            count += d[i];
        }
        if (count >= 100) {
            sum *= .95;
        }
        return sum;
    }

    computeCount() {
        var sum = 0; 
        const d = this.state.inventory;
        for (var i in d) {
            sum += d[i];
        }
        return sum;
    }

    resolveClick(type, id=false) {
        if (type === "Dashboard") {
            if (true) {
                this.setState({redirect: '/dashboard'});
            }
        } else if (type === "Add") {
            var d = this.state.inventory;
            const prev = d[id];
            d[id] = prev + 1;
            this.setState({inventory: d});
            this.updateSet();
        } else if (type === "Remove") {
            var d = this.state.inventory;
            const prev = d[id];
            if (prev > 0) {
                d[id] = prev - 1;
                this.setState({inventory: d});
                this.updateSet();
            }
        } else if (type === "Receipt") {
            this.setState({buffer: this.state.inventory});
            this.setState({didnotjump: true});
            this.setState({showReceipt: true});
        }
    }

    renderMenu() {
        var sum = this.computeTotal();
        var count = this.computeCount();
        return (
            <div>
                {itemList.map((map)=>(this.renderSingleItem(map)))}
                <div class="img-container">
                    <Grid container>
                        <img src={cart}/>
                        <Grid xs={5}/>
                        <Grid xs={2}>
                            <Typography variant="h4" color={this.state.sumColor}>${sum.toFixed(2)}</Typography>
                        </Grid>
                        <Grid xs={1}>
                            <Typography variant="h4">{count}</Typography>
                        </Grid>
                        <Grid xs={2}>
                            <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={()=>this.resolveClick("Receipt")}
                                fullWidth
                            >Generate Receipt</Button>
                        </Grid>
                    </Grid>

                </div>
            </div>
        )
    }

    renderMenuR() {
        var sum = this.computeTotal();
        var count = this.computeCount();
        return (
            <div>
                {itemList.map((map)=>(this.renderSingleItemR(map)))}
                {this.renderOverallDiscount()}
                <div class="total">
                    <Grid container>
                        <Grid xs={5}>
                            <Typography variant="h4">TOTAL</Typography>
                        </Grid>
                        <Grid xs={2}/>
                        <Grid xs={2}>
                            <Typography variant="h4">{"$" + sum.toFixed(2)}</Typography>
                        </Grid>
                        <Grid xs={1}>
                            <Typography variant="h4">{count}</Typography>
                        </Grid>
                        <Grid xs={2}/>
                    </Grid>

                </div>
            </div>
        )
    }

    renderItemCount(map) {
        const count = this.state.inventory[map];
        if (count === 0) {
            return (
                <Typography variant="h4"> - </Typography>
            )
        } else {
            return (
                <Typography variant="h4"> {count} </Typography>
            )
        }

    }

    renderSingleItem(map) {
        return (
            <div>
                <div class="img-container">
                    <Grid container>
                        <img src={map.imageUrl}/>
                        <Grid xs={4}>
                            <Typography variant="h4">{map.name}</Typography>
                        </Grid>
                        <Grid xs={1}/>
                        <Grid xs={2}>
                            <Typography variant="h4">{"$" + map.price}</Typography>
                        </Grid>
                        <Grid xs={1}>
                            {this.renderItemCount(map.name)}
                        </Grid>
                        <Grid xs={2}>
                            <Button 
                                variant='contained' 
                                color='primary' 
                                fullWidth
                                onClick={()=>(this.resolveClick("Add", map.name))}
                            >ADD</Button>
                            <Button 
                                variant='contained' 
                                color='primary' 
                                fullWidth
                                onClick={()=>(this.resolveClick("Remove", map.name))}
                            >REMOVE</Button>
                        </Grid>
                    </Grid>
                </div>
            </div>
        )
    }

    renderSingleItemR(map) {
        if (this.state.buffer[map.name] > 0) {
            return (
                <div>
                    <div class="img-container">
                        <Grid container>
                            <Grid xs={5}>
                                <Typography variant="h4">{map.name}</Typography>
                            </Grid>
                            <Grid xs={2}/>
                            <Grid xs={2}>
                                <Typography variant="h4"> {"$" + map.price}</Typography>
                            </Grid>
                            <Grid xs={1}>
                                <Typography variant="h4">{this.state.buffer[map.name]}</Typography>
                            </Grid>
                            <Grid xs={2}/>
                        </Grid>
                    </div>
                    {this.renderDiscount(map)}
                </div>
            )
        } else {
            return (
                <div/>
            )
        }
        
    }

    renderDiscount(map) {
        //apply deals
        var d = this.state.inventory;
        var allDvd = true;
        for (var i in dvdSet) {
            if (d[dvdSet[i]] === 0) {
                allDvd = false;
            }
        }
        var allBlue = true;
        for (var i in blueSet) {
            if (d[blueSet[i]] === 0) {
                allBlue = false;
            }
        }
        var sum = 0;
        if ((dvdSet.indexOf(map.name) >= 0) && (allDvd)) {
            sum = map.price * this.state.buffer[map.name] * 0.1;
            return (
                <div class="img-container">
                    <Grid container>
                        <Grid xs={5}>
                            <Typography variant="h4" color='primary'>ALL DVD DISCOUNT</Typography>
                        </Grid>
                        <Grid xs={2}/>
                        <Grid xs={2}>
                            <Typography variant="h4" color='primary'>{"-$" + sum}</Typography>
                        </Grid>
                        <Grid xs={3}/>
                    </Grid>
                </div>
            )
        } else if ((blueSet.indexOf(map.name) >= 0) && (allBlue)) {
            sum = map.price * this.state.buffer[map.name] * 0.15;
            return (
                <div class="img-container">
                    <Grid container>
                        <Grid xs={5}>
                            <Typography variant="h4" color='primary'>ALL BLUE-RAY DISCOUNT</Typography>
                        </Grid>
                        <Grid xs={2}/>
                        <Grid xs={2}>
                            <Typography variant="h4" color='primary'>{"-$" + sum}</Typography>
                        </Grid>
                        <Grid xs={3}/>
                    </Grid>
                </div>
            )
        } else {
            return (
                <div/>
            )
        }
    }

    renderReceipt() {
        if (this.state.showReceipt) {
            return (
                <div>
                    <div className="dashboard-container">
                        <Typography variant="h1">RECEIPT</Typography>
                        {this.renderMenuR()}
                    </div>
                </div>
            )
        } else {
            return (
                <div/>
            )
        }
    }

    renderOverallDiscount() {
        var sum = 0;
        const d = this.state.buffer;
        for (var i in d) {
            sum += d[i];
            
        }
        if (sum >= 100) {
            return (
                <div class="img-container">
                    <Grid container>
                        <Grid xs={5}>
                            <Typography variant="h4" color='secondary'>100+ ITEM DISCOUNT</Typography>
                        </Grid>
                        <Grid xs={2}/>
                        <Grid xs={2}>
                            <Typography variant="h4" color='secondary'>{"-$" + (this.computeTotal() / .95 * .05).toFixed(2)}</Typography>
                        </Grid>
                        <Grid xs={3}/>
                    </Grid>
                </div>
            )
        } else {
            return (
                <div/>
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
                    </div>
                    {this.renderReceipt()}
                    <div id="end"/>
                </div>
            )
        }
    }
}

export default Dashboard;