import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import NiceButton from '../../util/NiceButton';
//redux
import { connect } from 'react-redux';
//MUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import { postScream } from '../../redux/actions/dataActions';

import themeFile from '../../util/theme';
const styles = themeFile;

class PostScream extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    };
    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({
                errors: nextProps.UI.errors
            })
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body: '', open: false, errors: {}});
            this.handleClose();
        }
    }
    handleOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false, errors: {} });
    };
    handleChange = (event) => {  
        this.setState({ [event.target.name ]: event.target.value });
    };
    handleSubmit = (event) =>{
        event.preventDefault();
        this.props.postScream({ body: this.state.body });
    }
    render(){
        const { errors } = this.state;
        const { classes, UI : { loading }} = this.props;
        return (
            <Fragment>
                <NiceButton onClick={this.handleOpen} tip="Post a Scream!">
                    <AddIcon/>
                </NiceButton>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <NiceButton tip="close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon color="secondary"/>
                    </NiceButton>
                    <DialogTitle>Write Something on your Wall!</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField name="body" type="text" label="scream!" multiline rows="2" placeholder="Scream your heart out!" 
                            error={ errors.body ? true : false }  helperText={errors.body} className={classes.textField} onChange={this.handleChange} fullWidth/>
                            <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
                                Submit
                                {loading && (<CircularProgress size={30} className={classes.progressSpinner}/>)}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

PostScream.propTypes = {
    postScream: PropTypes.func.isRequired,
    loading: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    UI: state.UI
});

export default connect(mapStateToProps,{ postScream })(withStyles(styles)(PostScream));