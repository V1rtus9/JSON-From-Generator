import React from 'react';
import { 
  Theme, 
  makeStyles,
  createStyles
} from '@material-ui/core/styles';
import Editor from './editor';
import Form from './models/Form';
import FormBuilder from './form-builder';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      minHeight: "100vh"
    }
  }),
);

export default () => {
  const classes = useStyles();
  const [form, setForm] = React.useState<Form>(Form.defaultForm);

  const onSchemaChange = (schema:string) => {
    try{
      setForm(JSON.parse(schema) as Form);
    }
    catch{
      //TODO: validation with error output
    }

  }

  return(
    <div className={classes.root}>
      <Editor defaultSchema={JSON.stringify(Form.defaultForm)} onChange={onSchemaChange} />
      <FormBuilder form={form} />
 </div>
  );
}
