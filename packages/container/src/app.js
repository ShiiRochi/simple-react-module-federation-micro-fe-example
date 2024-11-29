import React, {lazy, Suspense, useEffect, useState} from "react";
import {Router, Route, Switch, Redirect} from "react-router-dom";
import {StylesProvider, createGenerateClassName} from "@material-ui/core";
import Header from "./components/Header";
import Progress from "./components/Progress";
import {createBrowserHistory} from "history";

const MarketingApp = lazy(() => import("./components/MarketingApp"));
const AuthApp = lazy(() => import("./components/AuthApp"));
const DashboardApp = lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({productionPrefix: "co"});


const history = createBrowserHistory();

export default function App() {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if (isSignedIn) {
            history.push('/dashboard');
        }
    }, [isSignedIn]);


    const handleSignIn = () => {
        setIsSignedIn(true);
    };

    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header signedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path="/auth">
                                <AuthApp onSignIn={handleSignIn} />
                            </Route>
                            <Route path="/dashboard">
                                {!isSignedIn && <Redirect to="/"/>}
                                <DashboardApp/>
                            </Route>
                            <Route path="/" component={MarketingApp} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
};