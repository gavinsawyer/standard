import { type PxScalarString }  from "./PxScalarString";
import { type RemScalarString } from "./RemScalarString";
import { type VariableString }  from "./VariableString";


export type PhiScalarString = `calc(${ PxScalarString | RemScalarString | VariableString } * pow(var(--phi), ${ number }))`;
