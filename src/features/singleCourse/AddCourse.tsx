import React, { useState } from "react";
import Uploader from "../../components/Uploader";
import { database } from "../../config/firebase";
import logging from "../../config/logging";
import { MainButton } from "../../styles/buttons";
import { hole } from "../../interfaces/course";
import { FormContainer, Input, InputRow, Label } from "../../styles/forms";
import { Icon } from "../../styles/elements";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Alert, Col } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

interface HoleInputsInterface {
  [key: string]: hole;
}

const AddCourse = () => {
  const [name, setName] = useState<string>("");
  const [shortDesc, setShortDesc] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [type, setType] = useState<number>(18);
  const [image, setImage] = useState<File>();
  const [url, setUrl] = useState<String>("");
  const [holeInputs, setHoleInputs] = useState<HoleInputsInterface>({});

  const types = ["image/png", "image/jpeg"];
  // Make Array of Holes to loop over and create Input Rows
  const holes = Array.from(Array(type).keys());

  // [ToDo:]Make one Function => also used in Register Component
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && types.includes(event.target.files[0].type)) {
      setImage(event.target.files[0]);
    }
  };

  // Function to Update all the Hole Input Values
  // Pass number of hole to update, set all Inputs to Numbers
  const handleHolesInputs = (
    event: React.ChangeEvent<HTMLInputElement>,
    holeNo: number
  ) => {
    const { name, value } = event.target;
    setHoleInputs((prev) => {
      if (prev === null) {
        return { [holeNo]: { [name]: parseInt(value, 10) } };
      }
      return {
        ...prev,
        [holeNo]: { ...holeInputs?.[holeNo], [name]: parseInt(value, 10) },
      };
    });
  };

  // Function to Add Course to Database
  // First create Collection, get ID back and add Holes as SubCollection
  const addNewCourse = async () => {
    try {
      const data = await database.collection("courses").add({
        name,
        shortDesc,
        desc,
        type,
        url,
      });
      for (let [no, hole] of Object.entries(holeInputs)) {
        await database
          .collection("courses")
          .doc(data.id)
          .collection("holes")
          .add({ ...hole, no: parseInt(no, 10) + 1 });
      }
      logging.info(data);
    } catch (error) {
      logging.warn(error);
    }
  };

  return (
    <div className="container">
      <section className="form form-add-course">
        <section className="form-add-course__main">
          <h2>Neuen Platz hinzufügen</h2>
          <Form>
            <Row xs={1} lg={2}>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  onChange={(event) => setName(event.target.value)}
                  value={name}
                />
              </Form.Group>
              <Form.Group as={Col} className="mb-3">
                <Form.Label>Ort</Form.Label>
                <Form.Control
                  type="text"
                  name="place"
                  placeholder="Ort"
                  onChange={(event) => setPlace(event.target.value)}
                  value={place}
                />
              </Form.Group>
            </Row>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Kurzbeschreibung</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="shortDesc"
                placeholder="Kurzbeschreibung des Platzes"
                onChange={(event) => setShortDesc(event.target.value)}
                value={shortDesc}
              />
            </Form.Group>
            <Form.Group as={Col} className="mb-3">
              <Form.Label>Kurze Beschreibung</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="desc"
                placeholder="Beschreibung eintragen..."
                onChange={(event) => setDesc(event.target.value)}
                value={desc}
              />
            </Form.Group>
            <Row xs={1} lg={2}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label>Bild</Form.Label>
                <Form.Control type="file" onChange={handleFileUpload} />
                {image && (
                  <Uploader image={image} setImage={setImage} setUrl={setUrl} />
                )}
              </Form.Group>
            </Row>
          </Form>
        </section>
        <section className="form-add-course__holes">
          <Table responsive>
            <thead>
              <tr>
                <th>Hole</th>
                <th>Par</th>
                <th>Handicap</th>
                <th>Distanz Herren Champions</th>
                <th>Distanz Herren</th>
                <th>Distanz Frauen Champions</th>
                <th>Distanz Frauen</th>
              </tr>
            </thead>
            <tbody>
              {holes.map((hole) => {
                return (
                  <tr key={hole}>
                    <td className="add-course_input-hole">{hole + 1}</td>
                    <td>
                      <input
                        type="number"
                        className="table-input table-input__small"
                        name="par"
                        placeholder="Par"
                        onChange={(event) => handleHolesInputs(event, hole)}
                        value={holeInputs?.[hole]?.par}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="table-input table-input__small"
                        name="hcp"
                        placeholder="HCP"
                        onChange={(event) => handleHolesInputs(event, hole)}
                        value={holeInputs?.[hole]?.hcp}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="Men Champs"
                        className="table-input"
                        type="number"
                        name="dist1"
                        onChange={(event) => handleHolesInputs(event, hole)}
                        value={holeInputs?.[hole]?.dist1}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="Men Medal"
                        className="table-input"
                        type="number"
                        name="dist2"
                        onChange={(event) => handleHolesInputs(event, hole)}
                        value={holeInputs?.[hole]?.dist2}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="Women Champs"
                        className="table-input"
                        type="number"
                        name="dist3"
                        onChange={(event) => handleHolesInputs(event, hole)}
                        value={holeInputs?.[hole]?.dist3}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="Women Medal"
                        className="table-input"
                        type="number"
                        name="dist4"
                        onChange={(event) => handleHolesInputs(event, hole)}
                        value={holeInputs?.[hole]?.dist4}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </section>
        <Button variant="primary" onClick={() => addNewCourse()}>
          Kurs Hinzufügen
        </Button>
      </section>
    </div>
  );
};

export default AddCourse;
