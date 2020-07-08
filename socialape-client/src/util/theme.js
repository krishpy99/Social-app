export default {
    palette: {
        primary: {
            light: '#8627b0',
            main: '#8627b0',
            dark: '#8627b0',
            contrastText:'#fff'
        },
        secondary: {
            light: '#f5f5f5',
            main: '#dd2c00',
            dark: '#424242',
            contrastText:'#fff'
        },
    },
    typography: {
        useNextVariants: true,
        fontSize: 12,
    },
    form: {
        textAlign: 'center'
    },
    logo: {
        maxWidth: 100,
        margin: '10px auto 10px auto'
    },
    pageTitle: {
        margin: '10px auto 10px auto'
    },
    textField: {
        margin: '5px auto 5px auto'
    },
    button: {
        margin: '20px auto 10px auto',
        position: 'relative'
    },
    //edit details button
    bbutton: {
        float: 'right'
    },
    customError:{
        color: '#ff0000',
        fontSize: '0.8rem',
        marginTop: 10
    },
    progress: {
        position: 'absolute'
    },
    profile: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
          position:'relative',
          maxWidth: 200,
          height: 150,
          padding: 25,
          objectFit: 'cover',
          borderRadius: '50%',
        },
        '& .profile-details': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: 'primary'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
    },
    paper: {
      padding: 20,
      minWidth: 250,
      marginLeft: 20 
    },
    // profile buttons div
    buttons: {
      textAlign: 'center',
      '& a': {
        margin: '20px 10px'
      }
    },
    // delete button
    deleteButton: {
      position: 'absolute',
      left: "90%",
      top: "10%"
    },
    // screams
    card : {
        display: 'flex',
        marginBottom: 20,
        position: 'relative'
    },
    image:{
        position:'relative',
        width: 50,
        height: 50,
        padding: 25,
        borderRadius: '50%',
        marginTop: '30px',
        marginLeft: 5
    },
    content:{
        padding:25,
        objectFit: 'cover'
    },
    //post scream
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10
    },
    progressSpinner: {
        position: 'absolute'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    },
    //Scream Details
    expandButton: {
      position: 'absolute',
      left: '90%'
    },
    dialogContent: {
      padding: 20
    },
    invisibleSeparator: {
      border: 'none',
      margin: 4
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20
    },
    profileImage: {
      maxWidth: 200,
      height: 200,
      borderRadius: '50%',
      objectFit: 'cover'
    },
    spinnerDiv: {
      textAlign: 'center',
      marginTop: 50,
      marginBottom: 50  
    },
    //comments
    commentImage: {
      maxWidth: 100,
      height: 100,
      objectFit: 'cover',
      borderRadius: '50%'
    },
    commentData:{
      marginLeft: 20
    },
    //pro skel
    handle: {
      height: 20,
      backgroundColor: '#8627b0',
      width: 60,
      margin: '0 auto 7px auto'
    },
    fullLine: {
      height: 15,
      backgroundColor: 'rgba(0,0,0,0.6)',
      width: '100%',
      marginBottom: 10
    },
    halfLine: {
      height: 15,
      backgroundColor: 'rgba(0,0,0,0.6)',
      width: '50%',
      marginBottom: 10
    }
}