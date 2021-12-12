import React from "react";
import './../../App.css';
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

const MyCustomCheckbox = (fieldRenderProps: FieldRenderProps) => {
  const {
    // The meta props of the Field.
    validationMessage,
    touched,
    visited,
    modified,
    valid,
    // The input props of the Field.
    value,
    onChange,
    onFocus,
    onBlur,
    // The custom props that you passed to the Field.
    ...others
  } = fieldRenderProps;
  const onValueChange = React.useCallback(() => {
    // onChange callback expects argument with 'value' property
    onChange({
      value: !value,
    });
  }, [onChange, value]);
  return (
    <div onFocus={onFocus} onBlur={onBlur}>
      <input
        type={"checkbox"}
        className={"k-checkbox"}
        onChange={onValueChange}
        checked={value}
        id={others.id}
      />
      <label className={"k-checkbox-label"} htmlFor={others.id}>
        {others.label}
      </label>
      {
        // Display an error message after the "visited" or "touched" field is set to true.
        visited && validationMessage && <Error>{validationMessage}</Error>
      }
    </div>
  );
};


const UsernameInput = (fieldRenderProps: FieldRenderProps) => {
    const { validationMessage, visited, ...others } = fieldRenderProps;
    return (
      <div>
        <Input {...others} />
        {visited && validationMessage && <Error>{validationMessage}</Error>}
      </div>
    );
};

export default function NewUser()
{
    const handleSubmit = (user: { [name: string]: User }) =>{
      // alert(JSON.stringify(user, null, 2));
      console.log(user);

      let firstName = user.firstName,
          lastName = user.lastName,
          username = user.username,
          lastlogin = new Date(),
          enabled = user.enabled;
      
      $.ajax({
          method: "POST",
          url: 'http://localhost:5000/api/users',
          data: { username: username , firstname: firstName, lastname: lastName, lastLogin: lastlogin, enabled: enabled},
          success: function(response){
              console.log(response);
          },
          error: function(xhr, status, error){
              console.error(xhr);
          }
      });
            
  
    }
    
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
               component={UsernameInput}
               label={"Username"}
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

            <div style={{margin:"3em 0", color:"white"}} className="check">
              <Field
                name={"enabled"}
                label={"Please check this box to enable."}
                component={MyCustomCheckbox}
              />
            </div>

          </fieldset>
          <div style={{justifyContent:"center", marginBottom:"3em"}} className="k-form-buttons">
            <button
              type={"submit"}
              className="k-button"
              disabled={!formRenderProps.allowSubmit}
            >
              Create User
            </button>
          </div>
        </FormElement>
      )}
    /></div>
    )
}