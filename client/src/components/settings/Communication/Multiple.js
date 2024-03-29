import React from "react";
import axios from "axios";
import Alert from "../../utilities/Alert";
import FormText from "../../utilities/TextField";
import CircularProgress from "../../utilities/CircularProgress";
import SubmitBtn from "../../utilities/SubmitBtn";
import FormSelect from "../../utilities/FormSelect";

export default function Single() {
  const [inputs, setInputs] = React.useState({});
  const [alert, setAlert] = React.useState(undefined);
  const [departments, setDepartments] = React.useState([]);
  const [submitProgress, setSubmitProgress] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill/departments")
      .then((res) => {
        setDepartments([...res.data.data]);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
      });
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (e) => {
    setAlert(undefined);
    e.preventDefault();
    setSubmitProgress(true);
    axios
      .post(
        process.env.REACT_APP_BACKEND + "/api/settings/communication/multiple",
        {
          ...inputs,
        }
      )
      .then((res) => {
        console.log(res.data);
        setSubmitProgress(false);
        setAlert(<Alert type="success" msg="Updated Successfully" />);
        setInputs({});
      })
      .catch((err) => {
        setAlert(<Alert type="error" msg="Update Failed Try again later" />);
        setSubmitProgress(false);
        if (err.response) console.log(err.response.data);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit} noValidate>
        <FormText
          required={true}
          label="Machine Number(From)"
          variant="outlined"
          type="number"
          value={inputs.from ? inputs.from : ""}
          onChange={(e) => setInputs({ ...inputs, from: e.target.value })}
        />
        <FormText
          required={true}
          label="Machine Number(To)"
          variant="outlined"
          type="number"
          value={inputs.to ? inputs.to : ""}
          onChange={(e) => setInputs({ ...inputs, to: e.target.value })}
        />
        <FormSelect
          label="Department"
          variant="outlined"
          required={true}
          value={inputs.department ? inputs.department : ""}
          onChange={(e) => setInputs({ ...inputs, department: e.target.value })}
          menuItems={departments}
        />
        <FormText
          required={true}
          label="Module ID(From)"
          variant="outlined"
          type="number"
          value={inputs.fromId ? inputs.fromId : ""}
          onChange={(e) => setInputs({ ...inputs, fromId: e.target.value })}
        />
        <FormText
          required={true}
          label="Module ID(To)"
          variant="outlined"
          type="number"
          value={inputs.toId ? inputs.toId : ""}
          onChange={(e) => setInputs({ ...inputs, toId: e.target.value })}
        />

        {alert}
        <SubmitBtn type="submit">
          {submitProgress ? (
            <CircularProgress size={25} color="secondary" />
          ) : (
            "Submit"
          )}
        </SubmitBtn>
      </form>
    </>
  );
}
