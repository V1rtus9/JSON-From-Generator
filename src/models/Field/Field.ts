import IField from "./IField";
import FieldType from "./FieldType";

export default class Field implements IField {
    public label:string;
    public type:FieldType;
}