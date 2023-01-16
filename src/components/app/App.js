import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import AppHeader from "../appHeader/AppHeader";
import { MainPage, ComicsPage, SingleComicPage, SingleCharPage, SinglePage, Page404 } from '../pages';

const App = () => {

    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Switch>
                        <Route exact path="/characters">
                            <MainPage/>
                        </Route>
                        <Route exact path="/comics">
                            <ComicsPage/>
                        </Route>
                        <Route path="/comics/:id">
                            <SinglePage Component={SingleComicPage} dataType="comic"/>
                        </Route>
                        <Route path="/characters/:id">
                            <SinglePage Component={SingleCharPage} dataType="character"/>
                        </Route>
                        <Route path="*">
                            <Page404/>
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    )
}

export default App;