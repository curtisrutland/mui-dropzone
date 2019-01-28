import { createStyles, withStyles } from "@material-ui/core/styles";

export const styles = (theme) => createStyles({
    appRoot: {
        height: "100%",
        display: "flex",
        flexFlow: "column nowrap"
    },
    fileDropZone: {
        height: 300,
        margin: theme.spacing.unit * 4
    },
    table: {
        margin: theme.spacing.unit * 4
    },
    modalContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    data: {
        width: 600,
        height: 400,
        flexGrow: 1
    },
    link: {
        position: "fixed",
        width: 300,
        bottom: 10,
        left: "calc(50% - 150px)"
    }
});

export const withStylesApplied = withStyles(styles);