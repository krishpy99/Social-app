import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import WithStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from './EditDetails';
import NiceButton from '../../util/NiceButton';
import ProfileSkeleton from '../../util/ProfileSkeleton';
//MUI stuff
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
//Redux stuff
import { connect } from 'react-redux';
import { uploadImage, logoutUser } from '../../redux/actions/userActions';
//Icons
import LocationOn from '@material-ui/icons/LocationOn';
import LinkIcon from '@material-ui/icons/Link';
import CalendarToday from '@material-ui/icons/CalendarToday';
import EditIcon from '@material-ui/icons/Edit';
import LogoutButton from '@material-ui/icons/PowerSettingsNew';
import themeFile from '../../util/theme';
const styles = themeFile;


export class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };
    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };
    handleLogout = () => {
        this.props.logoutUser();
    }
    render() {
        const { classes, 
                user: { 
                    credentials: { handle, createdAt, imageUrl, bio, website, location}, 
                    loading,
                    authenticated
                }
            } = this.props;
        let profileMarkup = !loading ? (authenticated ? (
            <Paper className={classes.paper}>
                <div className={classes.profile}>
                    <div className="image-wrapper">
                        <img src={imageUrl} alt="profile" className="profile-image"/>
                        <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange} />
                        <NiceButton tip="Edit Picture" onClick={this.handleEditPicture} btnClassName={classes.button}>
                            <EditIcon color="primary"/>
                        </NiceButton>
                    </div>
                    <hr/>
                    <hr/>
                    <div className="profile-details">
                        <MuiLink component={Link} to={`/users/${handle}`} color="primary" variant="h6">
                            @{handle}
                        </MuiLink>
                        <hr/>
                        {bio && <Typography variant="body2">{bio}</Typography>}
                        <hr/>
                        {
                            location && (
                                <Fragment>
                                    <LocationOn color="primary"/> <span>{location}</span>
                                    <hr/> 
                                </Fragment>
                            )
                        }
                        {
                            website && (
                                <Fragment>
                                    <LinkIcon color="primary"/>
                                    <a href={website} target="_blank" rel="noopener noreferrer" className={classes.writing}>
                                        {' '}{website}
                                    </a>
                                    <hr/>
                                </Fragment>
                            )
                        }
                        <CalendarToday color="primary"/>{' '}
                        <span>Joined {dayjs(Date(createdAt)).format('MMM YYYY')}</span>
                    </div>
                    <div>
                        <NiceButton tip="Logout" onClick={this.handleLogout}>
                            <LogoutButton color="secondary"/>
                        </NiceButton>
                        <EditDetails/>
                    </div>
                </div>
            </Paper>
        ) : (
            <Paper className={classes.paper}>
                <Typography variant="body2" align="center">
                    No profile found, please login again.
                    <div className={classes.buttons}>
                        <Button variant="contained" color="primary" component={Link} to="/login">
                            Login
                        </Button>
                        <Button variant="contained" color="secondary" component={Link} to="/signup">
                            Sign Up
                        </Button>
                    </div>
                </Typography>
            </Paper>
        )) : (<ProfileSkeleton/>)
        return profileMarkup;
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
    user: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    uploadImage: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapActionsToProps)(WithStyles(styles)(Profile))
