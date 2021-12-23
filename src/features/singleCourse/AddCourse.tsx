import React, { useState } from "react";
import Uploader from "../../components/Uploader";
import { database } from "../../config/firebase";
import logging from "../../config/logging";
import { MainButton } from "../../styles/buttons";
import { hole } from "../../interfaces/course";
import { FormContainer, Input, InputRow, Label } from "../../styles/forms";
import { Icon } from "../../styles/elements";

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
    <FormContainer>
      <h2>Neuen Kurs hinzufügen</h2>
      <Input
        large
        type="text"
        name="name"
        id="name"
        placeholder="Name"
        onChange={(event) => setName(event.target.value)}
        value={name}
      />
      <Input
        large
        type="textarea"
        name="shortDesc"
        id="shortDesc"
        placeholder="Kurzbeschreibung"
        onChange={(event) => setShortDesc(event.target.value)}
        value={shortDesc}
      />
      <Input
        large
        type="textfield"
        name="desc"
        id="desc"
        placeholder="Beschreibung"
        onChange={(event) => setDesc(event.target.value)}
        value={desc}
      />
      <Input
        large
        type="text"
        name="place"
        id="place"
        placeholder="Ort"
        onChange={(event) => setPlace(event.target.value)}
        value={place}
      />
      <Input
        large
        type="number"
        name="type"
        id="type"
        placeholder="Art"
        onChange={(event) => setType(event.target.valueAsNumber)}
        value={type}
      />
      <Label htmlFor="userImage">
        <Icon>+</Icon>Bild hinzufügen
      </Label>
      <Input
        large
        type="file"
        name="userImage"
        id="userImage"
        placeholder="Bild"
        onChange={handleFileUpload}
      />
      {image && <Uploader image={image} setImage={setImage} setUrl={setUrl} />}
      {holes.map((hole) => {
        return (
          <InputRow key={hole}>
            <Icon>{hole + 1}</Icon>
            <Input
              type="number"
              name="par"
              placeholder="Par"
              onChange={(event) => handleHolesInputs(event, hole)}
              value={holeInputs?.[hole]?.par}
            />
            <Input
              type="number"
              name="hcp"
              placeholder="HCP"
              onChange={(event) => handleHolesInputs(event, hole)}
              value={holeInputs?.[hole]?.hcp}
            />
            <Input
              placeholder="Men Champs"
              type="number"
              name="dist1"
              onChange={(event) => handleHolesInputs(event, hole)}
              value={holeInputs?.[hole]?.dist1}
            />
            <Input
              placeholder="Men Medal"
              type="number"
              name="dist2"
              onChange={(event) => handleHolesInputs(event, hole)}
              value={holeInputs?.[hole]?.dist2}
            />
            <Input
              placeholder="Women Champs"
              type="number"
              name="dist3"
              onChange={(event) => handleHolesInputs(event, hole)}
              value={holeInputs?.[hole]?.dist3}
            />
            <Input
              placeholder="Women Medal"
              type="number"
              name="dist4"
              onChange={(event) => handleHolesInputs(event, hole)}
              value={holeInputs?.[hole]?.dist4}
            />
          </InputRow>
        );
      })}
      <MainButton onClick={() => addNewCourse()}>Kurs Hinzufügen</MainButton>
    </FormContainer>
  );
};

export default AddCourse;
