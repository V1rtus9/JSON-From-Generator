import IField from "./Field/IField";
import Button from "./Button/Button";
import ButtonType from "./Button/ButtonType";
import FieldType from "./Field/FieldType";
import RadioField from "./Field/RadioField";

export default class Form {
    caption: string;
    items: IField[];
    buttons: Button[];

    public static defaultForm: Form = {
        caption: "Form",
        items: [
            {
                label: "TextField",
                type: FieldType.Text
            },
            {
                label: "DateField",
                type: FieldType.Date
            },
            {
                label: "TimeField",
                type: FieldType.Time
            },
            {
                label: "NumberField",
                type: FieldType.Number
            },
            {
                label: "Checkbox",
                type: FieldType.Checkbox
            },
            {
                label: "Radio",
                type: FieldType.Radio,
                values: [
                    "First",
                    "Second",
                    "Third"
                ]
            } as RadioField,
            {
                label: "Textarea",
                type: FieldType.TextArea
            }
        ],
        buttons: [
            {label: "Ok"},
            {label: "Cancel", type: ButtonType.Secondary}
        ]
    }
}