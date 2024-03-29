import React from "react";
import axios from "axios";
import Alert from "../../utilities/Alert";
import FormText from "../../utilities/TextField";
import CircularProgress from "../../utilities/CircularProgress";
import SubmitBtn from "../../utilities/SubmitBtn";
import FormSelect from "../../utilities/FormSelect";

export default function Single(props) {
  const [inputs, setInputs] = React.useState({
    machine: props.data.machine,
    department: props.data.department,
    model: props.data.model,
    backRollerDia: props.data.backRollerDia,
    backRollerPpr: props.data.backRollerPpr,
    backRollerRpm: props.data.backRollerRpm,
    deliveryRollerDia: props.data.deliveryRollerDia,
    deliveryRollerPpr: props.data.deliveryRollerPpr,
    deliveryRollerRpm: props.data.deliveryRollerRpm,
    middleRollerDia: props.data.middleRollerDia,
    middleRollerPpr: props.data.middleRollerPpr,
    middleRollerRpm: props.data.middleRollerRpm,
    shed: props.data.shed,
    tinRollerPpr: props.data.tinRollerPpr,
    tinRollerRpm: props.data.tinRollerRpm,
    spindles: props.data.spindles,
  });
  const [alert, setAlert] = React.useState(undefined);
  const [submitProgress, setSubmitProgress] = React.useState(false);
  const [models, setModels] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(process.env.REACT_APP_BACKEND + "/api/settings/mill/models")
      .then((res) => {
        setModels([...res.data.data]);
      })
      .catch((err) => {
        if (err.response) console.log(err.response.data);
      });
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitProgress(true);
    console.log(inputs);
    axios
      .post(
        process.env.REACT_APP_BACKEND + "/api/settings/machines/single/update",
        {
          ...inputs,
        }
      )
      .then((res) => {
        setSubmitProgress(false);
        setAlert(<Alert type="success" msg="Updated Successfully" />);
        console.log(res.data);
        props.update();
      })
      .catch((err) => {
        setAlert(<Alert type="error" msg="Update Failed Try again later" />);
        setSubmitProgress(false);
        if (err.response) console.log(err.response.data);
        console.log(err);
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormText
          required={true}
          label="Machine Number"
          variant="outlined"
          type="number"
          value={inputs.machine !== undefined ? inputs.machine : ""}
          disabled={true}
        />
        <FormText
          label="Department"
          variant="outlined"
          required={true}
          value={inputs.department !== undefined ? inputs.department : ""}
          onChange={(e) => setInputs({ ...inputs, department: e.target.value })}
          disabled={true}
        />
        <FormText
          required={true}
          label="Shed Number"
          variant="outlined"
          type="number"
          value={inputs.shed !== undefined ? inputs.shed : ""}
          onChange={(e) => setInputs({ ...inputs, shed: e.target.value })}
        />
        <FormSelect
          label=" Machine Model"
          variant="outlined"
          required={true}
          value={inputs.model !== undefined ? inputs.model : ""}
          onChange={(e) => setInputs({ ...inputs, model: e.target.value })}
          menuItems={models}
        />

        <FormText
          required={true}
          label="No of Spindles/Delivery"
          variant="outlined"
          type="number"
          value={inputs.spindles !== undefined ? inputs.spindles : ""}
          onChange={(e) => {
            setInputs({ ...inputs, spindles: e.target.value });
          }}
        />
        <FormText
          required={true}
          label="Delivery Roller Diameter(mm)"
          variant="outlined"
          type="number"
          value={
            inputs.deliveryRollerDia !== undefined
              ? inputs.deliveryRollerDia
              : ""
          }
          onChange={(e) =>
            setInputs({ ...inputs, deliveryRollerDia: e.target.value })
          }
        />
        <FormText
          required={true}
          label="Middle Roller Diameter(mm)"
          variant="outlined"
          type="number"
          value={
            inputs.middleRollerDia !== undefined ? inputs.middleRollerDia : ""
          }
          onChange={(e) =>
            setInputs({ ...inputs, middleRollerDia: e.target.value })
          }
        />
        <FormText
          required={true}
          label="Back Roller Diameter(mm)"
          variant="outlined"
          type="number"
          value={inputs.backRollerDia !== undefined ? inputs.backRollerDia : ""}
          onChange={(e) =>
            setInputs({ ...inputs, backRollerDia: e.target.value })
          }
        />
        <FormText
          required={true}
          label="No of teeth(Delivery Roller)"
          variant="outlined"
          type="number"
          value={
            inputs.deliveryRollerPpr !== undefined
              ? inputs.deliveryRollerPpr
              : ""
          }
          onChange={(e) =>
            setInputs({ ...inputs, deliveryRollerPpr: e.target.value })
          }
        />
        <FormText
          required={true}
          label="No of teeth(Middle Roller)"
          variant="outlined"
          type="number"
          value={
            inputs.middleRollerPpr !== undefined ? inputs.middleRollerPpr : ""
          }
          onChange={(e) =>
            setInputs({ ...inputs, middleRollerPpr: e.target.value })
          }
        />
        <FormText
          required={true}
          label="No of teeth(Back Roller)"
          variant="outlined"
          type="number"
          value={inputs.backRollerPpr !== undefined ? inputs.backRollerPpr : ""}
          onChange={(e) =>
            setInputs({ ...inputs, backRollerPpr: e.target.value })
          }
        />
        <FormText
          required={true}
          label="No of teeth(Tin Roller)"
          variant="outlined"
          type="number"
          value={inputs.tinRollerPpr !== undefined ? inputs.tinRollerPpr : ""}
          onChange={(e) =>
            setInputs({ ...inputs, tinRollerPpr: e.target.value })
          }
        />
        <FormText
          required={true}
          label="Delivery Roller RPM Currection"
          variant="outlined"
          type="number"
          value={
            inputs.deliveryRollerRpm !== undefined
              ? inputs.deliveryRollerRpm
              : ""
          }
          onChange={(e) =>
            setInputs({ ...inputs, deliveryRollerRpm: e.target.value })
          }
        />
        <FormText
          required={true}
          label="Middle Roller RPM Currection"
          variant="outlined"
          type="number"
          value={
            inputs.middleRollerRpm !== undefined ? inputs.middleRollerRpm : ""
          }
          onChange={(e) =>
            setInputs({ ...inputs, middleRollerRpm: e.target.value })
          }
        />
        <FormText
          required={true}
          label="Back Roller RPM Currection"
          variant="outlined"
          type="number"
          value={inputs.backRollerRpm !== undefined ? inputs.backRollerRpm : ""}
          onChange={(e) =>
            setInputs({ ...inputs, backRollerRpm: e.target.value })
          }
        />
        <FormText
          required={true}
          label="Tin Roller RPM Currection"
          variant="outlined"
          type="number"
          value={inputs.tinRollerRpm !== undefined ? inputs.tinRollerRpm : ""}
          onChange={(e) =>
            setInputs({ ...inputs, tinRollerRpm: e.target.value })
          }
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
