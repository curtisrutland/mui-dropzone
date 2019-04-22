import * as React from "react";
import { Component, createRef, DragEvent } from "react";
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {withStylesApplied} from "./style";
import { Props, State } from "./types";
import { allowAndCaptureEvent, allowFileDropOnWindow, blockFileDropOnWindow } from "../../helpers/drag";
import { convertFileListToArray } from "../../helpers/files";

import noOp from "../../helpers/noOp";

class FileDropZone extends Component<Props, State> {
    state = { isDragOver: false };
    inputRef = createRef<HTMLInputElement>();

    constructor(props: Props) {
        super(props); 
        if (this.blockDrops)
            blockFileDropOnWindow();
    }

    get blockDrops() { return this.props.blockOtherDrops == null ? true : this.props.blockOtherDrops };

    onDrop = (evt: DragEvent) => {
        allowAndCaptureEvent(evt);
        let files = convertFileListToArray(evt.dataTransfer.files);
        this.handleFilesAdded(files);
        this.setState({ isDragOver: false });

    }

    onDragLeave = (evt: DragEvent) => {
        allowAndCaptureEvent(evt);
        if (this.blockDrops)
            blockFileDropOnWindow();
        this.setState({ isDragOver: false });
    }

    // IMPORTANT! Required to override and prevent default on onDragOver event. 
    // Otherwise, onDrop will not fire correctly. Even if you implement onDragEnter.
    onDragOver = (evt: DragEvent) => {
        if (this.blockDrops)
            allowFileDropOnWindow();
        allowAndCaptureEvent(evt);
        this.setState({ isDragOver: true })
    }

    onDivClick = () => {
        if (this.inputRef.current != null) {
            this.inputRef.current.click();
        }
    }

    onInputChange = () => {
        if (this.inputRef.current) {
            let files = convertFileListToArray(this.inputRef.current.files);
            this.inputRef.current.value = "";
            this.handleFilesAdded(files);
        }
    }

    handleFilesAdded(files: File[]) {
        const keepers: File[] = [];
        const rejects: File[] = [];
        let { acceptedExtensions, acceptedMimeTypes } = this.props;
        if (acceptedExtensions) {
            acceptedExtensions = acceptedExtensions.map(e => e.toLowerCase().replace(/\./ig, ""));
        }
        if (acceptedMimeTypes) {
            acceptedMimeTypes = acceptedMimeTypes.map(e => e.toLowerCase());
        }
        files.forEach(file => {
            let extParts = file.name.split('.');
            let ext = extParts.length > 1 ? extParts[extParts.length - 1].toLowerCase() : "";
            let type = file.type;
            let validExt = !acceptedExtensions || acceptedExtensions.indexOf(ext) >= 0;
            let validMime = !acceptedMimeTypes || acceptedMimeTypes.indexOf(type) >= 0;
            if (validExt && validMime) {
                keepers.push(file);
            } else {
                rejects.push(file);
            }
        });
        if (keepers.length > 0) {
            this.onFilesAdded(keepers);
        }
        if (rejects.length > 0) {
            this.onFilesRejected(rejects);
        }
    }

    onFilesAdded(files: File[]) {
        console.debug("Files Added", files);
        let ofa = this.props.onFilesAdded || noOp;
        ofa(files);
    }

    onFilesRejected(files: File[]) {
        console.debug("Files Rejected", files);
        let ofr = this.props.onFilesRejected || noOp;
        ofr(files);
    }

    render() {
        const {
            classes, className = "", dragOverClassName = "", style,
            elevation = 2, dragOverElevation = 10,
            message = "Drag and Drop Files, or Click to Select Files",
            dragOverMessage = "Drop File(s) to Upload",
        } = this.props;
        const paperClassName = `${this.state.isDragOver ? (dragOverClassName !== "" ? dragOverClassName : className) : className} ${classes.paper}`.trim();
        const paperElevation = this.state.isDragOver ? dragOverElevation : elevation;
        const displayMessage = this.state.isDragOver ? dragOverMessage : message;
        return (
            <Paper
                elevation={paperElevation}
                onDragLeave={this.onDragLeave}
                style={style}
                onDrop={this.onDrop}
                onDragOver={this.onDragOver}
                className={paperClassName}>
                <div
                    className={classes.target}
                    onClick={this.onDivClick}>
                    <Typography
                        variant="h4"
                        className={classes.displayMessage}>
                        {displayMessage}
                    </Typography>
                    <input
                        type="file"
                        multiple
                        ref={this.inputRef}
                        className={classes.input}
                        onChange={this.onInputChange} />
                </div>
            </Paper>
        )
    }
}

export default withStylesApplied(FileDropZone);