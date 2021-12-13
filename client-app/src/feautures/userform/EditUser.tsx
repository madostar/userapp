import React from "react";
import './../../App.css';
import { useParams } from "react-router-dom";
import {
    Form,
    Field,
    FormElement,
    FieldRenderProps,
    FormRenderProps,
  } from "@progress/kendo-react-form";
import { Error } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { User } from "../../app/models/User";

//each has max. 25 characters and must start with capital
const nameRegex: RegExp = new RegExp(/([A-Z]{1})+([a-z]{1,24})/);

//max. 15 characters, only alphanumeric characters, non-empty, unique, case insensitive
const usernameRegex: RegExp = new RegExp(/[A-Za-z0-9]{1,15}/);

const nameValidator = (value: string) =>
  nameRegex.test(value) ? "" : "The name must start with a capital letter and between 2 and 25 letters";

const usernameValidator = (value: string) =>
  usernameRegex.test(value) ? "" : "The username can only contain letters, numbers and be less than 15 characters";

const NameInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
      <div>
        <Input {...others} />
        {visited && validationMessage && <Error>{validationMessage}</Error>}
      </div>
    );
};

const UserameInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
      <div>
        <Input {...others} />
        {visited && validationMessage && <Error>{validationMessage}</Error>}
      </div>
    );
};

export default function EditUser()
{

    let params = useParams();
    let usern = params.username;
    const handleSubmit = (user: { [name: string]: User }) =>
    alert(JSON.stringify(user, null, 2));
    
    return(
        <div className="App">

        
        <Form
      onSubmit={handleSubmit}
      render={(formRenderProps: FormRenderProps) => (
        <FormElement style={{ maxWidth: 650, margin:"20% auto 0 auto", border:"1px solid black", padding:"10px",  background:"#4b576e" }}>
          <fieldset style={{color:"#7c93c1"}} className={"k-form-fieldset mb-3"}>
            <legend style={{color:"white", borderBottom:"none"}} className={"k-form-legend"}>
              Please fill in the fields:
            </legend>
            <div className="mb-3">
              <Field
               name={"username"}
               component={UserameInput}
               label={usern}
               validator={usernameValidator}
              />
            </div>
            <div className="mb-3">
              <Field
                name={"firstName"}
                component={NameInput}
                label={"First name"}
                validator={nameValidator}
              />
            </div>

            <div className="mb-3">
              <Field name={"lastName"}
               component={NameInput}
               label={"Last name"}
               validator={nameValidator}
              />
            </div>
            
          </fieldset>
          <div style={{margin:"3em 0", color:"white"}} className="check">
            <input
                type={"checkbox"}
                className={"k-checkbox"}
            />
            <label className={"k-checkbox-label"}>
                Please check this box to enable.
            </label>
          </div>
          <div style={{justifyContent:"center", marginBottom:"3em"}} className="k-form-buttons">
            <button
              type={"submit"}
              className="k-button"
              style={{color:"white", background:"green"}}
              disabled={!formRenderProps.allowSubmit}
            >
              Update User
            </button>
          </div>
        </FormElement>
      )}
    /></div>
    )
}