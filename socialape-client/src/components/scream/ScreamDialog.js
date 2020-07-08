import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import NiceButton from '../../util/NiceButton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
//Mui
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//icons
import CloseIcon from '@material-ui/icons/Close'; 
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore'; 
import ChatIcon from '@material-ui/icons/Chat';
// redux
import { connect } from 'react-redux';
import { getScream } from '../../redux/actions/dataActions';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';

import themeFile from '../../util/theme';

const styles = themeFile;

class ScreamDialog extends Component{
    state = {
        open: false, 
        oldPath: '',
        newPath: ''
    };
    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen();
        }
    }
    handleOpen = () =>{
        let oldPath = window.location.pathname;
        const { userHandle, screamId } = this.props;
        const newPath = `/users/${userHandle}/scream/${screamId}`;
        if(oldPath===newPath) oldPath = `/users/${userHandle}`;
        window.history.pushState(null, null, newPath);
        this.setState({ open: true });
        this.props.getScream(this.props.screamId);
        console.log(this.props.scream.createdAt);
    };
    handleClose = () =>{
        window.history.pushState(null,null,this.state.oldPath);
        this.setState({ open: false });
    };
    render(){
        const { classes, scream: { screamId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments}, UI: { loading }} = this.props;

        const dialogMarkup = loading ? (
            <div className={classes.spinnerDiv}>
                <CircularProgress size={150} thickness={2}/>
            </div>
        ) : (
            <Grid container spacing={16}>
                <Grid item sm={5}>
                    <img src={userImage} alt="profile" className={classes.profileImage}/>
                </Grid>
                <Grid item sm={7}>
                    <Typography component={Link} color="primary" variant="h5" to={`/users/${userHandle}`}>
                        @{userHandle}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId} />
                    <span>{likeCount} likes</span>
                    <NiceButton tip="comments">
                        <ChatIcon color="primary"/>
                    </NiceButton>
                    <span>{commentCount} comments</span>
                </Grid>
                <hr className={classes.visibleSeparator}/>
                <CommentForm screamId={screamId}/>
                <Comments comments={comments}/>
            </Grid>
        )

        return (
            <Fragment>
                <NiceButton onClick={this.handleOpen} tip="View scream" tipClassName={classes.expandButton}>
                    <UnfoldMoreIcon color="primary"/>
                </NiceButton> 
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
                    <NiceButton tip="close" onClick={this.handleClose} tipClassName={classes.closeButton}>
                        <CloseIcon color="secondary"/>
                    </NiceButton>
                    <DialogTitle>Scream Details.</DialogTitle>
                    <DialogContent className={this.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </Fragment>
        )
    }
}

ScreamDialog.propTypes = {
    getScream: PropTypes.func.isRequired,
    screamId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    scream: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired 
}

const mapStateToProps = state => ({
    scream: state.data.scream,
    UI: state.UI
});

const mapActionsToProps = {
    getScream
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(ScreamDialog));