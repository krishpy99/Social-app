import React, { Component } from 'react';
import NiceButton from '../../util/NiceButton';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
//icons
import LikeIcon from '@material-ui/icons/ThumbUpAlt';
import LikeBorder from '@material-ui/icons/ThumbUpOutlined';
//redux
import { connect } from 'react-redux';
import { likeScream, unlikeScream } from '../../redux/actions/dataActions';

class LikeButton extends Component {
    likedScream = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId))
            return true;
        else return false;
    };
    likeScream = () => {
        this.props.likeScream(this.props.screamId);
    }
    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId);
    }
    render() {
        const {authenticated} = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
                <NiceButton tip="login">
                    <LikeBorder color="primary"/>
                </NiceButton>
            </Link>
        ) : (
            this.likedScream() ? (
                <NiceButton tip="unlike" onClick={this.unlikeScream}>
                    <LikeIcon color="primary"/>
                </NiceButton>
            ) : (
                <NiceButton tip="like" onClick={this.likeScream}>
                    <LikeBorder color="primary"/>
                </NiceButton>
            )
        );
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired,
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeScream,
    unlikeScream
}

export default connect(mapStateToProps,mapActionsToProps)(LikeButton);
