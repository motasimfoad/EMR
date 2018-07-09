import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import {Dropdown, DropdownMenu, DropdownToggle} from 'reactstrap';
import {
    BELOW_THE_HEADER,
    COLLAPSED_DRAWER,
    FIXED_DRAWER,
    HORIZONTAL_NAVIGATION,
    INSIDE_THE_HEADER
} from 'constants/ActionTypes';
import SearchBox from 'components/SearchBox';
import MailNotification from '../MailNotification/index';
import AppNotification from '../AppNotification/index';
import CardHeader from 'components/dashboard/Common/CardHeader/index';
import {switchLanguage, toggleCollapsedNav} from 'actions/Setting';
import IntlMessages from 'util/IntlMessages';
import LanguageSwitcher from 'components/LanguageSwitcher/index';
import Menu from 'components/TopNav/Menu';
import UserInfoPopup from 'components/UserInfo/UserInfoPopup';

class Header extends React.Component {

    onAppNotificationSelect = () => {
        this.setState({
            appNotification: !this.state.appNotification
        })
    };
    onMailNotificationSelect = () => {
        this.setState({
            mailNotification: !this.state.mailNotification
        })
    };
    onLangSwitcherSelect = (event) => {
        this.setState({
            langSwitcher: !this.state.langSwitcher, anchorEl: event.currentTarget
        })
    };
    onSearchBoxSelect = () => {
        this.setState({
            searchBox: !this.state.searchBox
        })
    };
    onUserInfoSelect = () => {
        this.setState({
            userInfo: !this.state.userInfo
        })
    };
    handleRequestClose = () => {
        this.setState({
            langSwitcher: false,
            userInfo: false,
            mailNotification: false,
            appNotification: false,
            searchBox: false
        });
    };


    constructor() {
        super();
        this.state = {
            anchorEl: undefined,
            searchBox: false,
            searchText: '',
            mailNotification: false,
            userInfo: false,
            langSwitcher: false,
            appNotification: false,
        }
    }

    onToggleCollapsedNav = (e) => {
        const val = !this.props.navCollapsed;
        this.props.toggleCollapsedNav(val);
    };

    updateSearchText(evt) {
        this.setState({
            searchText: evt.target.value,
        });
    }

    render() {
        const {drawerType, locale, navigationStyle, horizontalNavPosition} = this.props;
        const drawerStyle = drawerType.includes(FIXED_DRAWER) ? 'd-block d-xl-none' : drawerType.includes(COLLAPSED_DRAWER) ? 'd-block' : 'd-none';

        return (
            <AppBar
                className={`app-main-header ${(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === BELOW_THE_HEADER) ? 'app-main-header-top' : ''}`}>
                <Toolbar className="app-toolbar" disableGutters={false}>
                    {navigationStyle === HORIZONTAL_NAVIGATION ?
                        <div className="d-block d-md-none pointer mr-3" onClick={this.onToggleCollapsedNav}>
                            <span className="jr-menu-icon">
                              <span className="menu-icon"/>
                            </span>
                        </div>
                        :
                        <IconButton className={`jr-menu-icon mr-3 ${drawerStyle}`} aria-label="Menu"
                                    onClick={this.onToggleCollapsedNav}>
                            <span className="menu-icon"/>
                        </IconButton>
                    }

                    <Link className="app-logo mr-2 d-none d-sm-block" to="/">
                        <img src="http://via.placeholder.com/177x65" alt="Jambo" title="Jambo"/>
                    </Link>


                    <SearchBox styleName="d-none d-lg-block" placeholder=""
                               onChange={this.updateSearchText.bind(this)}
                               value={this.state.searchText}/>
                    {(navigationStyle === HORIZONTAL_NAVIGATION && horizontalNavPosition === INSIDE_THE_HEADER) &&
                    <Menu/>}

                    <ul className="header-notifications list-inline ml-auto">
                        <li className="d-inline-block d-lg-none list-inline-item">
                            <Dropdown
                                className="quick-menu nav-searchbox"
                                isOpen={this.state.searchBox}
                                toggle={this.onSearchBoxSelect.bind(this)}>

                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">
                                    <IconButton className="icon-btn size-30">
                                        <i className="zmdi zmdi-search zmdi-hc-fw"/>
                                    </IconButton>
                                </DropdownToggle>

                                <DropdownMenu right className="p-0">
                                    <SearchBox styleName="search-dropdown" placeholder=""
                                               onChange={this.updateSearchText.bind(this)}
                                               value={this.state.searchText}/>
                                </DropdownMenu>
                            </Dropdown>
                        </li>
                        <li className="list-inline-item">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.langSwitcher}
                                toggle={this.onLangSwitcherSelect.bind(this)}>

                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">
                                    <div className="d-flex align-items-center pointer pt-1">
                                        <i className={`flag flag-24 flag-${locale.icon}`}/>
                                    </div>
                                </DropdownToggle>

                                <DropdownMenu right className="w-50">
                                    <LanguageSwitcher switchLanguage={this.props.switchLanguage}
                                                      handleRequestClose={this.handleRequestClose}/>
                                </DropdownMenu>
                            </Dropdown>


                        </li>
                        <li className="list-inline-item app-tour">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.appNotification}
                                toggle={this.onAppNotificationSelect.bind(this)}>

                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">
                                    <IconButton className="icon-btn size-20 font-size-20">
                                        <i className="zmdi zmdi-notifications-active icon-alert animated infinite wobble"/>
                                    </IconButton>
                                </DropdownToggle>

                                <DropdownMenu right>
                                    <CardHeader styleName="align-items-center"
                                                heading={<IntlMessages id="appNotification.title"/>}/>
                                    <AppNotification/>
                                </DropdownMenu>
                            </Dropdown>
                        </li>
                        <li className="list-inline-item mail-tour">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.mailNotification}
                                toggle={this.onMailNotificationSelect.bind(this)}
                            >
                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">

                                    <IconButton className="icon-btn size-20 font-size-20">
                                        <i className="zmdi zmdi-comment-alt-text icon-alert zmdi-hc-fw"/>
                                    </IconButton>
                                </DropdownToggle>


                                <DropdownMenu right>
                                    <CardHeader styleName="align-items-center"
                                                heading={<IntlMessages id="mailNotification.title"/>}/>
                                    <MailNotification/>
                                </DropdownMenu>
                            </Dropdown>
                        </li>

                        {navigationStyle === HORIZONTAL_NAVIGATION &&
                        <li className="list-inline-item user-nav">
                            <Dropdown
                                className="quick-menu"
                                isOpen={this.state.userInfo}
                                toggle={this.onUserInfoSelect.bind(this)}>

                                <DropdownToggle
                                    className="d-inline-block"
                                    tag="span"
                                    data-toggle="dropdown">
                                    <IconButton className="icon-btn size-30">
                                        <Avatar
                                            alt='...'
                                            src='http://via.placeholder.com/150x150'
                                            className="size-30"
                                        />
                                    </IconButton>
                                </DropdownToggle>

                                <DropdownMenu right>
                                    <UserInfoPopup/>
                                </DropdownMenu>
                            </Dropdown>
                        </li>}
                    </ul>
                </Toolbar>
            </AppBar>
        );
    }

}

const mapStateToProps = ({settings}) => {
    const {drawerType, locale, navigationStyle, horizontalNavPosition} = settings;
    return {drawerType, locale, navigationStyle, horizontalNavPosition}
};

export default withRouter(connect(mapStateToProps, {toggleCollapsedNav, switchLanguage})(Header));