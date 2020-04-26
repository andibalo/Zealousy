import React, { useState, Fragment, useEffect } from 'react'
import { uploadImage } from '../../actions/auth'
import { connect } from 'react-redux'

//MATERIAL UI
import Box from '@material-ui/core/Box'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core'
import Divider from '@material-ui/core/Divider'
import PublishIcon from '@material-ui/icons/Publish';
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';

const useStyles = makeStyles((theme) => ({

    profile: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    },
    avatarWrapper: {
        position: "relative",
        '&:hover': {
            "& $avatarOverlay": {
                opacity: "1"
            }
        }
    },
    avatar: {
        width: theme.spacing(16.25),
        height: theme.spacing(16.25),
    },
    avatarOverlay: {
        height: "100%",
        background: "rgba(0, 0, 0, 0.4)",
        width: "100%",
        top: "0",
        position: "absolute",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 0.2s",
        opacity: "0",
        cursor: "pointer"
    },
    updateAvatarIcon: {
        color: "white",
        fontSize: theme.spacing(4)
    },
    imgPreview: {
        width: theme.spacing(16.25),
        height: theme.spacing(16.25),
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3)
    },
    fileInput: {
        display: "block"
    },

    fileInputWrapper: {
        marginBottom: theme.spacing(2)
    }
})
)

const UserAvatar = ({ user, uploadImage }) => {

    const classes = useStyles()

    const [open, setOpen] = useState(false);

    const [image, setImage] = useState({
        imageUrl: null
    })

    const [avatar, setAvatar] = useState(`http://localhost:5000/api/users/${user._id}/avatar`)

    const [fileState, setFile] = useState({
        file: null
    })

    const { imageUrl } = image
    const { file } = fileState


    useEffect(() => {
        const timestamp = Date.now();
        setAvatar('')
        setAvatar(`http://localhost:5000/api/users/${user._id}/avatar?t=${timestamp}`)
    }, [user.avatar])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onUpload = e => {
        setImage({
            ...image,
            imageUrl: URL.createObjectURL(e.target.files[0])
        })

        setFile({
            file: e.target.files[0]
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        if (!file) {
            return console.log('please upload an image')
        }

        uploadImage(file)

        handleClose()
    }


    return (
        <Fragment>
            <div className={classes.profile}>
                <div onClick={e => handleOpen(e)} className={classes.avatarWrapper}>
                    <Avatar src={avatar} className={classes.avatar}>
                    </Avatar>
                    <div className={classes.avatarOverlay}>
                        <AddAPhotoOutlinedIcon className={classes.updateAvatarIcon} />
                    </div>
                </div>

                <Typography variant="h6">
                    {user.name}
                </Typography>
                <Typography variant="subtitle1">
                    {user.email}
                </Typography>
            </div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }} >Upload Image Preview</DialogTitle>
                <Divider />
                <DialogContent>
                    <Box display="flex" justifyContent="center">
                        <Avatar src={imageUrl} className={classes.imgPreview}>
                        </Avatar>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <form onSubmit={e => onSubmit(e)} >
                        <div className={classes.fileInputWrapper}>
                            <input type="file" onChange={e => onUpload(e)} className={classes.fileInput} />
                            <Typography variant="caption">
                                Recommended Image Size: 250x250
                            </Typography>
                        </div>

                        <Button type="submit" color="primary" autoFocus variant="contained" startIcon={<PublishIcon />} style={{ width: "100%", backgroundColor: 'rgb(255, 151, 29)' }}>
                            Upload
                        </Button>
                    </form>
                </DialogActions>
            </Dialog>
        </Fragment>

    )
}


export default connect(null, { uploadImage })(UserAvatar)