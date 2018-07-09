import React, {Component} from 'react';
import {createMuiTheme, MuiThemeProvider} from '@material-ui/core/styles';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import {Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {IntlProvider} from 'react-intl'
import 'react-big-calendar/lib/less/styles.less';
import 'styles/bootstrap.scss'
import 'styles/app.scss';
import 'styles/app-rtl.scss';
import defaultTheme from './themes/defaultTheme';
import AppLocale from '../lngProvider';

import MainApp from 'app/index';
import SignIn from './SignIn';
import SignUp from './SignUp';
import {setInitUrl} from '../actions/Auth';
import RTL from 'util/RTL';
import asyncComponent from 'util/asyncComponent';

const RestrictedRoute = ({component: Component, ...rest, authUser}) =>
    <Route
        {...rest}
        render={props =>
            authUser
                ? <Component {...props} />
                : <Redirect
                    to={{
                        pathname: '/signin',
                        state: {from: props.location}
                    }}
                />}
    />;

class App extends Component {

    render() {
        const {match, location, locale, authUser, initURL, isDirectionRTL} = this.props;
        if (location.pathname === '/') {
            if (authUser === null) {
                return ( <Redirect to={'/signin'}/> );
            } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
                return ( <Redirect to={'/app/sample-page'}/> );
            } else {
                return ( <Redirect to={initURL}/> );
            }
        }
        const applyTheme = createMuiTheme(defaultTheme);

        if (isDirectionRTL) {
            applyTheme.direction = 'rtl';
            document.body.classList.add('rtl')
        } else {
            document.body.classList.remove('rtl');
            applyTheme.direction = 'ltr';
        }

        const currentAppLocale = AppLocale[locale.locale];
        return (
            <MuiThemeProvider theme={applyTheme}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <IntlProvider
                        locale={currentAppLocale.locale}
                        messages={currentAppLocale.messages}>
                        <RTL>
                            <div className="app-main">
                                <Switch>
                                    <RestrictedRoute path={`${match.url}app`} authUser={authUser}
                                                     component={MainApp}/>
                                    <Route path='/signin' component={SignIn}/>
                                    <Route path='/signup' component={SignUp}/>
                                    <Route
                                        component={asyncComponent(() => import('components/Error404'))}/>
                                </Switch>
                            </div>
                        </RTL>
                    </IntlProvider>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({settings, auth}) => {
    const {sideNavColor, locale, isDirectionRTL} = settings;
    const {authUser, initURL} = auth;
    return {sideNavColor, locale, isDirectionRTL, authUser, initURL}
};

export default connect(mapStateToProps, {setInitUrl})(App);

