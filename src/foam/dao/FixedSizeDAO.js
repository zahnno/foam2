/**
 * @license
 * Copyright 2018 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

foam.CLASS({
  package: 'foam.dao',
  name: 'FixedSizeDAO',
  extends: 'foam.dao.ProxyDAO',

  documentation: function () {/*
    DAO Decorator that stores a fixed number of objects.
  */},

  javaImports: [
    'org.apache.commons.collections.buffer.CircularFifoBuffer',
    'foam.dao.Sink',
  ],

  properties: [
    {
      class: 'Int',
      name: 'fixedArraySize',
      value: 2
    },
    {
      class: 'Object',
      name: 'FixedSizeArray',
      javaType: 'org.apache.commons.collections.buffer.CircularFifoBuffer',
      javaFactory: `return new org.apache.commons.collections.buffer.CircularFifoBuffer(getFixedArraySize()); `
    }
  ],

  methods: [
    {
      name: 'put_',
      args: [
        {
          name: 'x',
          of: 'foam.core.X'
        },
        {
          name: 'obj',
          of: 'foam.core.FObject',
        }
      ],
      javaCode: `
      foam.core.FObject delegatedObject = getDelegate().put_(x, obj);
      getFixedSizeArray().add(delegatedObject);
      return delegatedObject;
  `
    },
    {
      name: 'select_',
      javaReturns: 'foam.dao.Sink',
      javaCode: `
if ( sink == null ) {
  sink = new foam.dao.ArraySink();
}
Object[] tester = getFixedSizeArray().toArray();
for (int i = 0; i < tester.length; i++){
  sink.put(tester[i],null);
}
return sink;
        `
    }
  ]
});
