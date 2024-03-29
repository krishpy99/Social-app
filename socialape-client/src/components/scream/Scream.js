import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'; 
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'; 
import PropTypes from 'prop-types'; 
import NiceButton from '../../util/NiceButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';
//Mui Card Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

//Icons
import ChatIcon from '@material-ui/icons/Chat';
//Redux

import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';
import themeFile from '../../util/theme';
import LikeButton from './LikeButton';
const styles = themeFile;


class Scream extends Component {
    render() {
        dayjs.extend(relativeTime) ;  
        const { classes, scream : { body, createdAt, userImage, userHandle, screamId, likeCount, commentCount }, user: {authenticated, credentials: { handle }} } = this.props;
        const deleteButton = authenticated && userHandle === handle ? <DeleteScream screamId={screamId}/> : null ;
        return (
            <Card className={classes.card}>
                <CardMedia
                image={userImage}
                title="Profile Image" 
                className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} to={`/users/${userHandle}`} color="primary">
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <LikeButton screamId={screamId}/>
                    <span>{likeCount} likes</span>
                    <NiceButton tip="comments">
                        <ChatIcon color="primary"/>
                    </NiceButton>
                    <span>{commentCount} comments</span>
                    <ScreamDialog screamId={screamId} userHandle={userHandle} openDialog={this.props.openDialog}/>
                </CardContent>
            </Card>
        )
    }
}

Scream.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    scream: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    openDialog: PropTypes.bool
}

const mapStateToProps = state => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream, 
    unlikeScream
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Scream));
