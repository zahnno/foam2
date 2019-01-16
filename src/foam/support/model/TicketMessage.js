<<<<<<< HEAD
=======
/**
 * @license
 * Copyright 2018 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
foam.CLASS({
  package: 'foam.support.model',
  name: 'TicketMessage',

  documentation: 'Message Model Class and Properties',

  properties: [
    {
      class: 'Long',
      name: 'id',
      visibility: foam.u2.Visibility.RO,
      label: 'Ticket Message Id'
    },
    {
      class: 'Long',
      name: 'senderId'
    },
    {
      class: 'Long',
      name: 'receiverId'
    },
    {
      class: 'Date',
      name: 'dateCreated'
    },
    {
      class: 'String',
      name: 'message'
    },
    {
      class: 'String',
      name: 'type'
    }
  ]
<<<<<<< HEAD
});
=======
});
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
