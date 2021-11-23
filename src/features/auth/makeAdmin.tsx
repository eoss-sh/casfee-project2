import React, { useState } from 'react';
import {functions} from '../../config/firebase';
import { MainButton } from '../../styles/buttons';
import { FormContainer, Input } from '../../styles/forms';

const MakeAdmin = () => {
    const [email, setEmail] = useState('')

    const addAdminRole = functions.httpsCallable('addAdminRole')

    return (
      <FormContainer>
        <Input
          large
          type="email"
          name="email"
          id="email"
          placeholder="Email zum Admin machen"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <MainButton onClick={async () => {
                const confirm = await addAdminRole({email})
                console.log(confirm)
            }
        }>
          Bestätigen
        </MainButton>
      </FormContainer>
    );
}

export default MakeAdmin;
