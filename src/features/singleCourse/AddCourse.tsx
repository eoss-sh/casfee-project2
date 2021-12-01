import React, { useState } from "react";
import Uploader from "../../components/Uploader";
import { database } from "../../config/firebase";
import logging from "../../config/logging";
import { MainButton } from "../../styles/buttons";
import { hole } from "../../interfaces/course";
import {
  FormContainer,
  Input,
  InputRow,
  Label,
  Icon,
} from "../../styles/forms";
import { IndexType } from "typescript";

interface holeInputsInterface {
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
  const [holeInputs, setHoleInputs] = useState<holeInputsInterface>({});

  const types = ["image/png", "image/jpeg"];
  // Make Array of Holes to loop over and create Input Rows
  const holes = Array.from(Array(type).keys());

  // [ToDo:]Make one Function => also used in Register Component
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && types.includes(event.target.files[0].type)) {
      setImage(event.target.files[0]);
    }
  };

  const addNewCourse = async () => {
    try {
      const data = await database.collection("courses").add({
        name,
        shortDesc,
        desc,
        type,
        url,
      });
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
              placeholder="Par"
              onChange={(event) =>
                setHoleInputs((prevState) => ({
                  holeInputs: {
                    ...prevState.holeInputs,
                    [hole]: {
                      data: {
                        ...prevState.holeInputs[hole].data,
                        par: event.target.valueAsNumber,
                      },
                      id: hole,
                    },
                  },
                }))
              }
              value={holeInputs?.[hole]?.data.par}
            />
            <Input
              type="number"
              placeholder="HCP"
              onChange={(event) =>
                setHoleInputs((prevState) => ({
                  holeInputs: {
                    ...prevState.holeInputs,
                    [hole]: {
                      data: {
                        ...prevState.holeInputs[hole].data,
                        hcp: event.target.valueAsNumber,
                      },
                      id: hole,
                    },
                  },
                }))
              }
              value={holeInputs?.[hole]?.data.hcp}
            />
            <Input
              placeholder="Men Champs"
              type="number"
              onChange={(event) =>
                setHoleInputs((prevState) => ({
                  holeInputs: {
                    ...prevState.holeInputs,
                    [hole]: {
                      data: {
                        ...prevState.holeInputs[hole].data,
                        dist1: event.target.valueAsNumber,
                      },
                      id: hole,
                    },
                  },
                }))
              }
              value={holeInputs?.[hole]?.data.dist1}
            />
            <Input
              placeholder="Men Medal"
              type="number"
              onChange={(event) =>
                setHoleInputs((prevState) => ({
                  holeInputs: {
                    ...prevState.holeInputs,
                    [hole]: {
                      data: {
                        ...prevState.holeInputs[hole].data,
                        dist2: event.target.valueAsNumber,
                      },
                      id: hole,
                    },
                  },
                }))
              }
              value={holeInputs?.[hole]?.data.dist2}
            />
            <Input
              placeholder="Women Champs"
              type="number"
              onChange={(event) =>
                setHoleInputs((prevState) => ({
                  holeInputs: {
                    ...prevState.holeInputs,
                    [hole]: {
                      data: {
                        ...prevState.holeInputs[hole].data,
                        dist3: event.target.valueAsNumber,
                      },
                      id: hole,
                    },
                  },
                }))
              }
              value={holeInputs?.[hole]?.data.dist3}
            />
            <Input
              placeholder="Women Medal"
              type="number"
              onChange={(event) =>
                setHoleInputs((prevState) => ({
                  holeInputs: {
                    ...prevState.holeInputs,
                    [hole]: {
                      data: {
                        ...prevState.holeInputs[hole].data,
                        dist4: event.target.valueAsNumber,
                      },
                      id: hole,
                    },
                  },
                }))
              }
              value={holeInputs?.[hole]?.data.dist4}
            />
          </InputRow>
        );
      })}
      <MainButton onClick={() => addNewCourse()}>Kurs Hinzufügen</MainButton>
    </FormContainer>
  );
};

export default AddCourse;
