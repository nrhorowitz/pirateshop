import React from 'react';
import Landing from '../Landing';
import Dashboard from '../Dashboard';

import Loading from '../Loading';

import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import firebase from '../Firebase';

import '../../css/index.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          loading: true,
        }
        this.renderView = this.renderView.bind(this);
    }

    componentWillMount() {
      this.setState({loading: false});
    }

    renderView(name, pathInput=" ") {
        if (name === "Landing") {
            return (
                <Landing
                    firebase = {firebase}
                ></Landing>
            )
      } else if (name === "Dashboard") {
        return (
            <Dashboard
                firebase = {firebase}
                data = {this.data}
            ></Dashboard>
        )
      }
    }

    render() {
      if (this.state.loading) {
        return (
          <Loading></Loading>
        )
      } else {
        return (
          <div>
            <Router>
              <Switch>
                <Route exact path="/" component={() => this.renderView("Landing")} />
                <Route exact path="/dashboard" component={() => this.renderView("Dashboard")} />
              </Switch>
            </Router>
          </div>
        )
      }
    }
}

export default App;