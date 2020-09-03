import React from 'react';
import { 
    Theme, 
    makeStyles,
    createStyles
} from '@material-ui/core/styles';
import {
    Typography, 
    Button, 
    TextField, 
    FormControlLabel,
    Checkbox,
    FormControl,
    FormLabel,
    Radio,
    RadioGroup
  } from '@material-ui/core';
import Form from './models/Form';
import FieldType from './models/Field/FieldType';
import ButtonType from './models/Button/ButtonType';
import RadioField from './models/Field/RadioField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "600px",
      minHeight: "600px"
    },
    wrapper: {
        padding: "5px 1rem 0 1rem"
    },
    fullWidth: {
        width: "100%"
    },
    formItems: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(2)
    },
    formItem: {
      marginBottom: theme.spacing(2)
    },
    formButtons: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end"
    },
    formButton: {
      marginLeft: theme.spacing(1)
    }
  }),
);

interface FormBuilderProps {
    form:Form;
}

export default (props:FormBuilderProps) => {
    const {form} = props;
    const classes = useStyles();

    return(
        <div className={classes.container}>
            <div className={classes.wrapper}>
            <Typography variant="h5">
                {form.caption}
            </Typography>
            <div className={classes.formItems}>
                {
                form.items?.map(x => {
                    const {type, label} = x;
                    switch(type){
                        case FieldType.Text:
                            return <TextField className={classes.formItem} label={label} fullWidth variant="outlined" />;
                        case FieldType.Time:
                            return <TextField className={classes.formItem} label={label} type="time" InputLabelProps={{shrink: true,}} inputProps={{step: 300}} fullWidth  variant="outlined"/>
                        case FieldType.Date:
                            return <TextField className={classes.formItem} label={label} type="date" InputLabelProps={{ shrink: true, }} fullWidth variant="outlined" />
                        case FieldType.Checkbox:
                            return (
                                <div className={classes.fullWidth}>
                                    <FormControlLabel className={classes.formItem} label={label} control={<Checkbox color="primary" />} labelPlacement="end" />
                                </div>
                            );
                        case FieldType.TextArea:
                            return <TextField className={classes.formItem} label={label} multiline rows={3} fullWidth variant="outlined" />
                        case FieldType.Number:
                            return <TextField className={classes.formItem} label={label} type="number" fullWidth variant="outlined" />
                        case FieldType.Radio:
                            const radioField = x as RadioField;
                            return(
                                <FormControl className={classes.formItem} component="fieldset">
                                    <FormLabel component="legend">{label}</FormLabel>
                                    <RadioGroup value={radioField.values[0]} onChange={(e) => {}}>
                                        { radioField.values.map(v => <FormControlLabel value={v} control={<Radio />} label={v} />)}
                                    </RadioGroup>
                                </FormControl>
                            );
                    }
                })
                }
            </div>
            <div className={classes.formButtons}>
                {
                form.buttons?.map(x => {
                    return <Button className={classes.formButton} variant="contained" color={x.type ? x.type : ButtonType.Primary}>{x.label}</Button>
                })
                }
            </div>
            </div>
        </div>
    );
}