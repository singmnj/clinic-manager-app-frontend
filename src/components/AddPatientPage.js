import React from 'react';
import { useForm, useField, splitFormProps } from "react-form";
import { toast } from 'react-toastify';

async function sendToFakeServer(values) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return values;
}

const InputField = React.forwardRef((props, ref) => {
  // Let's use splitFormProps to get form-specific props
  const [field, fieldOptions, rest] = splitFormProps(props);

  // Use the useField hook with a field and field options
  // to access field state
  const {
    meta: { error, isTouched, isValidating },
    getInputProps
  } = useField(field, fieldOptions);

  // Build the field
  return (
    <>
      <input {...getInputProps({ ref, ...rest })} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
});

async function validateField(value) {
  if (!value) {
    return "This field is required";
  }
  return false;
}

const AddPatientPage = () => {

    const {
        Form,
        meta: { isSubmitting, canSubmit }
      } = useForm({
        onSubmit: async (values, instance) => {
          // onSubmit (and everything else in React Form)
          // has async support out-of-the-box
          await sendToFakeServer(values);
          toast("Wow so easy !");
          console.log("Huzzah!");
        },
        debugForm: false
      });

    return(
        <Form>
          <div className="container">
            <div className="row">
              <h1>Add Patient</h1>
              <hr/>
              <div className="col-md-2">
                <label> OPD Number </label>
                <InputField field="opd" validate={validateField} className="form-control"/>
              </div>
            </div>

            <div className="row mt-3">
              <h5>Personal Information</h5>
              <div className="col-md-3">
                <label> First Name </label>
                <InputField field="firstName" validate={validateField} className="form-control"/>
              </div>
              <div className="col-md-3">
                <label> Last Name </label>
                <InputField field="lastName" validate={validateField} className="form-control"/>
              </div>
            </div>
            
            <div className="row mt-3">
              <div className="col-md-3">
                <label>Gender</label> 
                <div className="mt-2">
                  <InputField type="radio" name="gender" id="male" field="gender" value="M" className="form-check-input" defaultChecked/>
                  <label className="form-check-label" htmlFor="male">Male</label>{' '}
                  <InputField type="radio" name="gender" id="female" field="gender" value="F" className="form-check-input"/>
                  <label className="form-check-label" htmlFor="female">Female </label>{' '}
                  <InputField type="radio" name="gender" id="other" field="gender" value="O" className="form-check-input"/>
                  <label className="form-check-label" htmlFor="other">Other </label>
                </div>
              </div>
              <div className="col-md-3">
                <label> DOB </label>
                <InputField type="date" field="dob" validate={validateField} className="form-control"/>
              </div>
            </div>
            
            <div className="row mt-3">
              <h5>Contact Information</h5>
              <div className="col-md-3">
                <label> Phone </label>
                <InputField field="phone" className="form-control"/>
              </div>
              <div className="col-md-3">
                <label> Address </label>
                <InputField field="address" className="form-control"/>
              </div>
            </div>

            <div className="row">
              <div className="col-md-2">
                <label> City </label>
                <InputField field="city" validate={validateField} className="form-control"/>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-3">
                <h5> Notes </h5>
                <InputField field="notes" className="form-control"/>
              </div>
            </div>

            <div className="row mt-3">
              <div>
                <button type="submit" disabled={!canSubmit} className="btn btn-primary">
                  Submit
                </button>
              </div>

              <div>
                <em>{isSubmitting ? "Submitting..." : null}</em>
              </div>
            </div>
          </div>
        </Form>
    );
};

export default AddPatientPage;