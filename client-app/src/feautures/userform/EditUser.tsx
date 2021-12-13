import React, { useEffect } from "react";
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
import agent from "../../app/api/agent";
import { useNavigate, useParams } from 'react-router-dom';
import { useStore } from "../../app/stores/store";







//each has max. 25 characters and must start with capital
const nameRegex: RegExp = new RegExp(/([A-Z]{1})+([a-z]{1,24})/);

const nameValidator = (value: string) =>
  nameRegex.test(value) ? "" : "The name must start with a capital letter and between 2 and 25 letters";



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




export default function EditUser()
{
    
    const {userStore} = useStore();

    var editfn= false;
    var editln= false;
    var valuefn: any = userStore.selectedUser?.firstName;
    var valueln: any = userStore.selectedUser?.lastName;
    
    

    let params = useParams();

    const navigate = useNavigate();
    console.log(params.userid);
    console.log(userStore.isUser(params.userid));
    

    useEffect(() =>
    {
      userStore.selectUser(params.userid);
    })
    const handleEditF = () => {
      if(editfn){
        valuefn= userStore.selectedUser?.firstName;
        editfn = false
      } 
      else{
        valuefn= null;
        editfn = true
      } 
    }
    const handleEditL = () => {
      if(editln)
      {
        valueln= userStore.selectedUser?.lastName;
        editln = false}
      else{
        editln = true
        valueln= null;
      } 
    }

    const FirstNameInput = (fieldRenderProps: FieldRenderProps) => {
      const { validationMessage, visited, ...others } = fieldRenderProps;
      return (
        <div>
          <Input {...others} value={valuefn}/>
          {visited && validationMessage && <Error>{validationMessage}</Error>}
        </div>
      );
    };
    

    const LastNameInput = (fieldRenderProps: FieldRenderProps) => {
        const { validationMessage, visited, ...others } = fieldRenderProps;
        return (
          <div>
            <Input {...others} value={valueln}/>
            {visited && validationMessage && <Error>{validationMessage}</Error>}
          </div>
        );
    };

    const handleSubmit = (user: any ) =>{
      console.log(user);
      if(params.userid){
        user.id = params.userid
        user.lastLogin = new Date();
        agent.Users.update(user).then(() => {
          navigate("/");
        })
      }
      
  
    }
    
    return(
        <div className="App">

        
        <Form
          onSubmit={handleSubmit}
          render={(formRenderProps: FormRenderProps) => (
        <FormElement style={{ maxWidth: 650, margin:"20% auto 0 auto", border:"1px solid black", padding:"10px",  background:"#4b576e" }}>
          <fieldset style={{color:"#7c93c1",textAlign: "left"}} className={"k-form-fieldset mb-3"}>
            <legend style={{color:"white", borderBottom:"none"}} className={"k-form-legend"}>
              Please check the info and click update if there are changes
            </legend>
            <div className="mb-3">
              <p style={{color: "white",display:"inline-block"}}>Username: <strong>{userStore.selectedUser?.username}</strong></p>
            </div>
            <div className="mb-3">
            
             {!editfn && <p style={{color: "white",display:"inline-block"}}>First Name: <strong>{userStore.selectedUser?.firstName}</strong></p>}
              {editfn && <Field
                name={"firstName"}
                component={FirstNameInput}
                label={userStore.selectedUser?.firstName}
                validator={nameValidator}
              />}
              <button style={{display:"inline-block",marginLeft:"1em",marginTop:"1em"}} id="un" onClick={handleEditF}> Edit</button>
            </div>

            <div className="mb-3">
            
            {!editln && <p style={{color: "white",display:"inline-block"}}>Last Name: <strong>{userStore.selectedUser?.lastName}</strong></p>}
              {editln &&
              <Field name={"lastName"}
               component={LastNameInput}
               label={userStore.selectedUser?.lastName}
               validator={nameValidator}
               
              />}
              <button style={{display:"inline-block",marginLeft:"1em"}} id="un" onClick={handleEditL}> Edit</button>
            </div>

            <div style={{margin:"2em 0", color:"white"}} className="check">
              <Field
                name={"enabled"}
                label={"Please check this box to enable."}
                component={MyCustomCheckbox}
              />
            </div>

          </fieldset>
          <div style={{justifyContent:"center", marginBottom:"2em"}} className="k-form-buttons">
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