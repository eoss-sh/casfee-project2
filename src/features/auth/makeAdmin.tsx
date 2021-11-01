import React, { useState } from 'react';
import {functions} from '../../config/firebase';
import { FormContainer, Input, Button } from '../../styles/forms';

const MakeAdmin = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')

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
        <Button onClick={async () => {
                const confirm = await addAdminRole({email})
                console.log(confirm)
            }
        }>
          Bestätigen
        </Button>
      </FormContainer>
    );
}

export default MakeAdmin;
