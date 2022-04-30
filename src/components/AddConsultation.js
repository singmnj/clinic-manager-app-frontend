import React from "react";
import { useForm, useField, splitFormProps } from "react-form";
import { toast } from 'react-toastify';

import useAxiosPrivate from '../hooks/useAxiosPrivate';

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

const AddConsultation = ({ patientId, hideModal, setConsultations }) => {

    const axiosPrivate = useAxiosPrivate();

    const defaultValues = React.useMemo(
		() => ({
            date: new Date().toISOString().substring(0,10),
			      notes: "",
            medicines: "",
            days: 0,
            amountCharged: 0,
            amountReceived: 0,
            maramTherapyDone: "false"
		}),
		[]
	);

    const {
        Form,
        meta: { isSubmitting, canSubmit }
      } = useForm({
		defaultValues,
        onSubmit: async (values, instance) => {
          await saveConsultation(values);
        },
        debugForm: false
    });

    const validateField = (value) => {
        if (!value) {
          return "This field is required";
        }
        return false;
    }

    const saveConsultation = (consultationObject) => {
        consultationObject.amountCharged = parseInt(consultationObject.amountCharged);
        consultationObject.amountReceived = parseInt(consultationObject.amountReceived);
        consultationObject.days = parseInt(consultationObject.days);
        console.log(consultationObject);
        axiosPrivate.post(`/patients/${patientId}/consultations`, consultationObject).then(response => {	
          console.log(response.data);
          toast(`Consultation Added`);
          consultationObject.id = response.data.id;
          setConsultations(list => list.concat(consultationObject));
          hideModal();
        }).catch(error => {
          console.error(error);
          toast('Error occurred while Saving Consultation');
        });
    }

    return(
        <Form>
          <div className="container">
            <div className="row">
              <h1>Add Consultation</h1>
              <hr/>
              <div className="col-md-2">
                <label> Date </label>
                <InputField type="date" field="date" validate={validateField} className="form-control"/>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-3">
                <label> Notes </label>
                <InputField field="notes" className="form-control"/>
              </div>
              <div className="col-md-3">
                <label> Medicines </label>
                <InputField field="medicines" className="form-control"/>
              </div>
            </div>
            
            <div className="row mt-3">
              <div className="col-md-3">
                <label> Days </label>
                <InputField type="number" field="days" className="form-control"/>
              </div>
              <div className="col-md-3 form-check">
                  <div className="mt-4 mx-3">
                    <label className="form-check-label" htmlFor="maramCheck"> MaramTherapy Done </label>
                    <InputField type="checkbox" id="maramCheck" field="maramTherapyDone" value="true" className="form-check-input"/>
                </div>
              </div>
            </div>

            <div className="row mt-3">
              <div className="col-md-3">
                <label> Amount Charged </label>
                <InputField type="number" field="amountCharged" className="form-control"/>
              </div>
              <div className="col-md-3">
                <label> Amount Received </label>
                <InputField type="number" field="amountReceived" className="form-control"/>
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

export default AddConsultation;