import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./HOC/Layout/Layout";
import PrivateRoute from "./shared/PrivateRoute";
import "react-toastify/dist/ReactToastify.css";

import Account from "./containers/Account/Account";
import DockSearcher from "./containers/DockSearcher/DockSearcher";
import Dock from "./containers/Dock/Dock";
import DockManager from "./containers/DockManager/DockManager";

import NotFound from "./components/NotFound/NotFound";

class App extends Component {
    render() {
        return (
            <>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={DockSearcher} />
                            <Route
                                exact
                                path="/rent-dock"
                                component={DockSearcher}
                            />
                            <PrivateRoute
                                exact
                                path="/Account"
                                component={Account}
                            />
                            <Route
                                exact
                                path="/dock/:dockid"
                                component={Dock}
                            />
                            <PrivateRoute
                                exact
                                path="/manage-docks"
                                component={DockManager}
                            />
                            <Route component={NotFound} />
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </>
        );
    }
}

export default App;
