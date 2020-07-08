import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

//MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


import themeFile from '../../util/theme';

const styles = themeFile;

class Comments extends Component{
    render(){
        const { comments, classes } = this.props;
        return (
            <Grid container>
                {comments.map((comment) => {
                    const { body, createdAt, userHandle, userImage} = comment;
                    return (
                        <Fragment key={createdAt}>
                            <hr className={classes.invisibleSeparator}/> 
                            <Grid item sm={12}>
                                <Grid container>
                                    <Grid item sm={2}>
                                        <img src={userImage} alt="comment" className={classes.commentImage}/>
                                    </Grid>
                                    <Grid item sm={9}>
                                        <div className={classes.commentData}>
                                            <Typography variant="h5" component={Link} to={`/users/${userHandle}`} colors="primary">
                                                @{userHandle}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary">
                                                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                                            </Typography>
                                            <hr className={classes.invisibleSeparator}/> 
                                            <Typography variant="body">{body}</Typography>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Fragment>
                    )
                })}
            </Grid>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array.isRequired
};

export default withStyles(styles)(Comments);