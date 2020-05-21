import React from 'react';
import { Input } from '@rocketseat/unform';
import Panel from '~/components/Panel';

import { ModalContent } from './styles';
import Form from '~/components/Form';

function ModalSearch() {
  return (
    <Panel weight={1}>
      <ModalContent>
        <h6>Digite a localização</h6>
        <Form onSubmit={() => {}}>
          <Input name="city" placeholder="Cidade" />
          <Input name="state" placeholder="Estado" />
          <button type="submit">Enviar</button>
        </Form>
      </ModalContent>
    </Panel>
  );
}

export default ModalSearch;
