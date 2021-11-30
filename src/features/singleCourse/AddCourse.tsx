import React, {useState} from 'react';
import Uploader from '../../components/Uploader';
import { database } from '../../config/firebase';
import logging from '../../config/logging';
import { MainButton } from '../../styles/buttons';
import { FormContainer, Input, InputRow, Label, Icon } from '../../styles/forms';

const AddCourse = () => {
    const [name, setName] = useState<string>('');
    const [shortDesc, setShortDesc] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [place, setPlace] = useState<string>('');
    const [type, setType] = useState<number>(18);
    const [image, setImage] = useState<File>();
    const [url, setUrl] = useState<String>('');

    const types = ['image/png', 'image/jpeg'];
    // Make Array of Holes to loop over and create Input Rows 
    const holes = (Array.from(Array(type).keys()).map(x => x + 1));

    // [ToDo:]Make one Function => also used in Register Component
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && types.includes(event.target.files[0].type)) {
        setImage(event.target.files[0]);
      }
    };

    const addNewCourse = async () => {
      try {
        const data = await database.collection('courses').add({
          name,
          shortDesc,
          desc,
          type,
          url,
        });
        logging.info(`Platz ${data.id} erfolgreich angelegt.`);

      } catch (error) {
        logging.warn(error)
      }
        
    } 

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
        {image && (
          <Uploader image={image} setImage={setImage} setUrl={setUrl} />
        )}
        {holes.map(hole => {
          console.log(hole)
          return (
            <InputRow key={hole} >
              <Icon>{hole}</Icon>
              <Input placeholder='Par' />
              <Input placeholder='HCP' />
              <Input placeholder='Men Medal' />
              <Input placeholder='Men Champs' />
              <Input placeholder='Women Champs' />
              <Input placeholder='Women Medal' />
            </InputRow>
          )
        })}
        <MainButton onClick={() => addNewCourse()}>Kurs Hinzufügen</MainButton>

      </FormContainer>
    );
}

export default AddCourse;