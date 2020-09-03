import React from 'react';
import { 
    Theme, 
    makeStyles,
    createStyles
} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: "600px",
      height: "600px",
      margin: theme.spacing(1)
    },
    editor: {
      height: "99%",
      width: "99%",
      overflow: "auto",
      resize: "vertical",
      whiteSpace: "pre"
    },
  }),
);


interface EditorProps {
    defaultSchema?:string;
    onChange: (schema:string) => void;
}

export default (props:EditorProps) => {
    const classes = useStyles();
    const {defaultSchema, onChange} = props;

    const schemaPrettify = (schema:string) => {
        try{
          var obj = JSON.parse(schema);
          console.log(obj);
          var pretty = JSON.stringify(obj, undefined, 4);
          return pretty;
        }
        catch{
          return schema;
        }
    }

    const [schema, setSchema] = React.useState<string>(schemaPrettify(defaultSchema));

    React.useEffect(() => {
      onChange(schema);
    }, [schema]);

    const editorOnChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
        var newSchema = 
          schemaPrettify(e.target.value);

        setSchema(newSchema);
    }

    const editorOnKeyDown = (e:React.KeyboardEvent<HTMLTextAreaElement>) => {
        const {keyCode, currentTarget} = e;
        switch (keyCode){
          case 9:
            e.preventDefault();
            var val = currentTarget.value,
               start = currentTarget.selectionStart,
               end = currentTarget.selectionEnd;
    
            // set textarea value to: text before caret + tab + text after caret
            currentTarget.value = val.substring(0, start) + '\t' + val.substring(end);
    
            // put caret at right position again
            currentTarget.selectionStart = currentTarget.selectionEnd = start + 1;
    
            break;
        }
    }

    return(
       <div className={classes.container}>
          <textarea className={classes.editor} value={schema} onChange={editorOnChange} onKeyDown={editorOnKeyDown} />
       </div>
    )
}