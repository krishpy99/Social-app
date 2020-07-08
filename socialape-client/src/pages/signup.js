import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import AppIcon from '../images/icon.jpg';
import { Link } from 'react-router-dom';
//MUI stuff
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import themeFile from '../util/theme';
//Redux stuff
import { connect } from 'react-redux';
import { signupUser } from '../redux/actions/userActions';

const styles = themeFile;

class signup extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            confirmPassword:'',
            handle:'',
            errors: {}
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors)
        this.setState({ errors: nextProps.UI.errors });
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const newuserData = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }; 
        this.props.signupUser(newuserData, this.props.history);
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };
    render() {
        const { classes } = this.props;
        const { UI: { loading } } = this.props;
        const { errors } = this.state;
        return (
            <Grid container className={classes.form}>
                <Grid item sm/>
                <Grid item sm>
                    <img src={AppIcon} alt="monkey" className={classes.logo}/>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Sign Up
                    </Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <TextField id="email" name="email" type="email" label="Email" 
                            className={classes.textField}  
                            value={this.state.email} 
                            helperText={errors.email} error={errors.email ? true : false} 
                            onChange={this.handleChange} fullWidth/>
                        <TextField id="password" name="password" type="password" label="Password" 
                            className={classes.textField}
                            value={this.state.password} 
                            helperText={errors.password} error={errors.password ? true : false} 
                            onChange={this.handleChange} fullWidth/>
                        <TextField id="confirmPassword" name="confirmPassword" type="password" label="ConfirmPassword" 
                            className={classes.textField}
                            value={this.state.confirmPassword} 
                            helperText={errors.confirmPassword} error={errors.confirmPassword ? true : false} 
                            onChange={this.handleChange} fullWidth/>
                        <TextField id="handle" name="handle" type="text" label="Handle" 
                            className={classes.textField}
                            value={this.state.handle} 
                            helperText={errors.handle} error={errors.handle ? true : false} 
                            onChange={this.handleChange} fullWidth/>
                        {errors.general && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.general}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" className={classes.button} disabled={loading}>
                            Register
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        <br/>
                        <small>Already have an Account? <Link to="/login">Login</Link></small>                         
                    </form>
                </Grid>
                <Grid item sm/>
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired,
    signupUser: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(withStyles(styles)(signup))

