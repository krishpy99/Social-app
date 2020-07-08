import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NiceButton from '../../util/NiceButton';
import PostScream from '../scream/PostScream';
//MUI 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//Icons
import HomeIcon from '@material-ui/icons/Home';
import Notifications from './Notifications';

export class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {
                        authenticated ? 
                        (
                            <Fragment>
                                <PostScream/>
                                <Link to="/">
                                    <NiceButton tip="Home">
                                        <HomeIcon/>
                                    </NiceButton>
                                </Link>
                                <Notifications />
                            </Fragment>
                        ) :
                        (
                            <Fragment>
                                <Button color="inherit" component={Link} to="/">Home</Button>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
                            </Fragment>
                        )
                    }
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired
};


const mapStateToProps = state => ({
    authenticated: state.user.authenticated
})

export default connect(mapStateToProps)(Navbar);
