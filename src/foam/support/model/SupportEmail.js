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
  name: 'SupportEmail',

  properties:[
    {
      class: 'Long',
      name: 'id'
    },
    {
      class: 'String',
      name: 'email'
    },
    {
      class: 'Password',
      name: 'password'
    },
    {
      class: 'String',
      name: 'status',
<<<<<<< HEAD
      factory: function(){
        return 'Pending'
      }
=======
      value: 'Pending'
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
    },
    {
      class: 'DateTime',
      name: 'connectedTime'
    }
  ]
<<<<<<< HEAD
});
=======
});

foam.RELATIONSHIP({
  sourceModel: 'foam.nanos.auth.User',
  targetModel: 'foam.support.model.SupportEmail',
  forwardName: 'supportEmails',
  inverseName: 'user'
});
>>>>>>> 1281ad28a23671fa61657301b9b87efd61e1c665
