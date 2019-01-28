import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FileIcon from "@material-ui/icons/InsertDriveFile";
import Button from '@material-ui/core/Button';
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from '@material-ui/core/Snackbar';
import { withStylesApplied } from "./style";
import './index.css';

import { FileDropZone, excel, files } from "mui-dropzone";
// import { parseExcel, excelMimeTypes } from "../../lib/helpers/excel";
// import { loadFileAsText } from "../../lib/helpers/files";

const SNACKBAR_AUTOCLOSE = 6000;

class App extends Component {
  state = {
    files: [],
    data: null,
    title: null,
    loading: false,
    snackbar: null
  };

  onFilesAdded = (files) => {
    this.setState(oldState => {
      const newFiles = [...oldState.files, ...files];
      return { files: newFiles };
    });
  }

  onFilesRejected = (files) => {
    const fileNames = files.map(f => `${f.name} (${f.type})`).reduce((w, n) => `${w}, ${n}`);
    const message = `Some files did not match required mime types and were rejected: ${fileNames}`;
    console.warn(message);
    this.setState({ snackbar: message })
  }

  onFileSelected = async (file) => {
    this.setState({ title: file.name, loading: true });
    if (excel.excelMimeTypes.indexOf(file.type.toLowerCase()) >= 0) {
      let spreadsheet = await excel.parseExcel(file);
      this.setState({ data: JSON.stringify(spreadsheet, null, 2), loading: false });
    } else {
      let text = await files.loadFileAsText(file);
      this.setState({ data: text, loading: false });
    }
  }

  renderDialog() {
    let { title, loading } = this.state;
    let open = title != null;
    let titleText = title == null ? "" : title;
    let text = this.state.data || "";
    let { classes } = this.props;
    return (
      <Dialog open={open} onClose={this.handleDialogClose}>
        <DialogTitle>{titleText}</DialogTitle>
        <div className={classes.modalContainer}>
          {loading
            ? <CircularProgress size={60} disableShrink />
            : <textarea className={classes.data} defaultValue={text} />
          }
        </div>
      </Dialog>
    )
  }

  handleDialogClose = () => {
    this.setState({ data: null, title: null });
  }

  renderTable() {
    const { files } = this.state;
    const { classes } = this.props;
    return (
      <Paper className={classes.table}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>File Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {files.map((f, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>
                    <FileIcon />
                  </TableCell>
                  <TableCell>
                    {f.name}
                  </TableCell>
                  <TableCell>
                    {f.type}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => this.onFileSelected(f)}>View Data</Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Paper>
    )
  }

  renderSnackbar() {
    const { snackbar } = this.state;
    const open = snackbar != null;
    const origin = { vertical: "bottom", horizontal: "right" };
    const handleClose = () => this.setState({ snackbar: null });
    const message = <span>{snackbar}</span>
    return (
      <Snackbar
        anchorOrigin={origin}
        open={open}
        autoHideDuration={SNACKBAR_AUTOCLOSE}
        onClose={handleClose}
        message={message} />
    )
  }

  render() {
    const { classes } = this.props;
    const mimeTypes = [...excel.excelMimeTypes, "text/plain"];
    return (

      <div className={classes.appRoot}>
        <FileDropZone
          className={classes.fileDropZone}
          acceptedMimeTypes={mimeTypes}
          onFilesAdded={this.onFilesAdded}
          onFilesRejected={this.onFilesRejected}
          elevation={2}
          dragOverElevation={10}
          blockOtherDrops={true} />
        {this.renderTable()}
        {this.renderDialog()}
        {this.renderSnackbar()}
        <Button href="http://github.saas.amherst.com/crutland/mui-dropzone" target="_blank" className={classes.link}>
          View Project on Github Enterprise
        </Button>
      </div>

    )
  }
}

export default withStylesApplied(App);