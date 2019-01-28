import { Theme, withStyles, WithStyles, createStyles } from "@material-ui/core/styles";

export const styles = (theme: Theme) => createStyles({
    target: {
        border: "2px dashed gray",
        margin: theme.spacing.unit,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1
    },
    paper: {
        display: "flex",
        flexFlow: "row nowrap"
    },
    input: {
        display: "none"
    },
    displayMessage: {
        textAlign: "center"
    }
});

export const withStylesApplied = withStyles(styles);
export type WithClassNames = WithStyles<typeof styles>;