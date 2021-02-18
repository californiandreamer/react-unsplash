import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage/MainPage";
import ResultsPage from "./pages/ResultsPage/ResultsPage";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/">
                        <MainPage />
                    </Route>
                    <Route path="/results">
                        <ResultsPage />
                    </Route>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
