import React from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) =>
    createStyles({
        bar: {
            width: "100%",
            "& > * + *": {
                marginTop: theme.spacing(2),
            },
        },
    })
);

export default function Progress() {
    const classNames = useStyles();

    return (
        <div className={classNames.bar}>
            <LinearProgress />
        </div>
    );
};