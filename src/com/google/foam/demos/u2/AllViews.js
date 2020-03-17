/**
 * @license
 * Copyright 2017 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'com.google.foam.demos.u2',
  name: 'SampleData',
  properties: [
    'id', 'name', 'value'
  ],
  methods: [
    function toSummary() { return this.id + ' ' + this.value; }
  ]
});


foam.CLASS({
  package: 'com.google.foam.demos.u2',
  name: 'AllViews',

  requires: [
    'com.google.foam.demos.u2.SampleData',
    'foam.dao.EasyDAO',
    'foam.dao.MDAO',
    'foam.u2.MultiView',
    'foam.u2.view.ReferenceView'
  ],

  exports: [ 'sampleDataDAO' ],

  properties: [
    {
      name: 'sampleDataDAO',
      factory: function() {
        return this.EasyDAO.create({
          of: this.SampleData,
          daoType: 'MDAO',
          testData: [
            { id: 'key1', name: 'John',  value: 'value1' },
            { id: 'key2', name: 'Jane',  value: 'value2' },
            { id: 'key3', name: 'Kevin', value: 'value3' },
            { id: 'key4', name: 'Kim',   value: 'value4' },
            { id: 'key5', name: 'Larry', value: 'value5' },
            { id: 'key6', name: 'Linda', value: 'value6' }
          ]
        });
      },
      view: {
        class: 'foam.u2.DAOList',
        rowView: { class: 'com.google.foam.demos.heroes.CitationView' }
      }
    },
    {
      class: 'Reference',
      of: 'com.google.foam.demos.u2.SampleData',
      name: 'reference',
      view: function(_, X) {
        return foam.u2.MultiView.create({
          views: [
            X.data.ReferenceView.create({dao: X.data.sampleDataDAO, of: X.data.SampleData}),
            foam.u2.TextField.create()
          ]
        });
      }
    },
    {
      class: 'Reference',
      of: 'com.google.foam.demos.u2.SampleData',
      name: 'referenceWithCustomObjToChoice',
      view: { class: 'foam.u2.view.ReferenceView', objToChoice: function(obj) { return [obj.id, obj.name]; } },
      targetDAOKey: 'sampleDataDAO'
    },
    {
      class: 'Int',
      name: 'defaultInt'
    },
    {
      class: 'Int',
      name: 'intWithMinAndMax',
      min: 1,
      max: 5,
      value: 3,
      units: 'rating (1-5)'
    },
    {
      class: 'Int',
      name: 'intWithRangeView',
      view: {
        class: 'foam.u2.RangeView'
      }
    },
    /*
    {
      class: 'Int',
      name: 'intWithTemperatureView',
      view: {
        class: 'foam.nanos.pm.TemperatureCView'
      }
    },
    */
    {
      class: 'Int',
      name: 'intWithProgressView',
      view: {
        class: 'foam.u2.ProgressView'
      },
      value: 42
    },
    {
      class: 'Int',
      name: 'intWithMultiView',
      view: {
        class: 'foam.u2.MultiView',
        views: [ 'foam.u2.RangeView', 'foam.u2.IntView' ]
      }
    },
    {
      class: 'Int',
      name: 'intWithMultiViewVertical',
      view: {
        class: 'foam.u2.MultiView',
        horizontal: false,
        views: [ 'foam.u2.RangeView', 'foam.u2.IntView' ]
      }
    },
    {
      class: 'Int',
      name: 'intWithDualView2',
      view: {
        class: 'foam.u2.view.DualView',
        viewa: 'foam.u2.RangeView',
        viewb: 'foam.u2.ProgressView'
      }
    },
    {
      class: 'String',
      name: 'defaultString'
    },
    {
      class: 'String',
      name: 'emptyRequiredString',
      validateObj: function(emptyRequiredString) { return emptyRequiredString ? '' : 'value required'; }
//      required: true
    },
    {
      class: 'String',
      name: 'requiredString',
      value: 'someValue',
      validateObj: function(requiredString) { return requiredString ? '' : 'value required'; }
//      required: true
    },
    {
      class: 'String',
      name: 'textFieldWithPlaceholder',
      view: {
        class: 'foam.u2.TextField',
        placeholder: 'placeholder'
      }
    },
    {
      class: 'String',
      name: 'textFieldWithPlaceholder2',
      placeholder: 'placeholder'
    },
    {
      class: 'String',
      name: 'textFieldWithChoices',
      documentation: 'Like a Combo-Box.',
      view: {
        class: 'foam.u2.TextField',
        choices: ['Yes', 'No', 'Maybe']
      }
    },
    {
      class: 'String',
      name: 'choiceView',
      view: {
        class: 'foam.u2.view.ChoiceView',
        choices: ['Yes', 'No', 'Maybe']
      }
    },
    {
      class: 'String',
      name: 'choiceViewWithValues',
      view: {
        class: 'foam.u2.view.ChoiceView',
        choices: [ [1, 'Yes'], [0, 'No'], [0.5, 'Maybe']]
      }
    },
    {
      class: 'String',
      name: 'radioView',
      view: {
        class: 'foam.u2.view.RadioView',
        choices: ['Yes', 'No', 'Maybe']
      }
    },
    {
      class: 'String',
      name: 'stringWithDisplayWidth',
      displayWidth: 4
    },
    {
      class: 'String',
      name: 'stringWithTextFieldWithSize',
      displayWidth: 4,
      view: {
        class: 'foam.u2.TextField',
        maxLength: 4
      }
    },
    {
      class: 'String',
      name: 'stringWithTextArea',
      view: {
        class: 'foam.u2.tag.TextArea',
        rows: 8, cols: 80,
      }
    },
    {
      class: 'Date',
      name: 'defaultDate'
    },
    {
      class: 'DateTime',
      name: 'defaultDateTime'
    },
    {
      class: 'Time',
      name: 'defaultTime'
    },
    {
      class: 'Byte',
      name: 'defaultByte'
    },
    {
      class: 'Short',
      name: 'defaultShort'
    },
    {
      class: 'Long',
      name: 'defaultLong'
    },
    {
      class: 'Float',
      name: 'defaultFloat'
    },
    {
      class: 'Float',
      name: 'floatWithPrecision',
      precision: 2,
      value: 3.1415926
    },
    {
      class: 'Double',
      name: 'defaultDouble'
    },
    {
      class: 'StringArray',
      name: 'defaultStringArray'
    },
    {
      class: 'StringArray',
      name: 'stringArrayRowView',
      view: { class: 'foam.u2.MultiView', views: [ 'foam.u2.view.StringArrayRowView', 'foam.u2.view.StringArrayRowView' ] },
      xxview: 'foam.u2.view.StringArrayRowView',
      factory: function() { return ['row1', 'row2', 'row3']; }
    },
    {
      class: 'FObjectArray',
      name: 'fobjectArray',
      of: 'com.google.foam.demos.u2.SampleData'
    },
    {
      class: 'EMail',
      name: 'defaultEMail',
      value: 'someone@somewhere.com'
    },
    {
      class: 'EMail',
      name: 'requiredEMail',
      required: true,
      value: ''
    },
    {
      class: 'Image',
      name: 'defaultImage',
      value: 'Dragon.png'
    },
    {
      class: 'Image',
      name: 'imageView',
      view: 'foam.u2.view.ImageView',
      value: 'Dragon.png'
    },
    {
      class: 'URL',
      name: 'defaultURL'
    },
    {
      class: 'Color',
      name: 'defaultColor'
    },
    {
      class: 'Color',
      name: 'readOnlyColor',
      value: 'orange',
      view: 'foam.u2.view.ReadColorView'
    },
    {
      class: 'Password',
      name: 'defaultPassword',
      value: 'secret'
    },
    {
      class: 'Password',
      name: 'passwordView',
      view: 'foam.u2.view.PasswordView',
      value: 'secret'
    },
    {
      class: 'PhoneNumber',
      name: 'defaultPhoneNumber'
    },
    {
      class: 'UnitValue',
      name: 'defaultCurrency'
    },
    {
      class: 'Boolean',
      name: 'defaultBoolean',
      label: 'CheckBox',
      view: { class: 'foam.u2.CheckBox' }// default
    },
    {
      class: 'Boolean',
      name: 'defaultBooleanWithLabel',
      view: { class: 'foam.u2.CheckBox', label: "Label goes here"}
    },
    {
      class: 'Boolean',
      name: 'mdCheckboxBoolean',
      label: 'MD CheckBox',
      view: { class: 'foam.u2.md.CheckBox' }
    },
    {
      class: 'String',
      name: 'htmlView',
      value: '<b>bold</b><br/><i>italic</i>',
      view: 'foam.u2.HTMLView'
    },
    {
      class: 'Map',
      name: 'map'
    },
    {
      class: 'FObjectProperty',
      name: 'defaultFObjectProperty',
      value: foam.util.Timer.create()
    },
    {
      class: 'FObjectProperty',
      name: 'fObjectView',
      label: 'FObjectView',
      view: { class: 'foam.u2.view.FObjectView' },
      value: foam.util.Timer.create()
    },
    {
      class: 'FObjectProperty',
      name: 'fObjectViewWithChoices',
      label: 'FObjectView With Choices',
      view: {
        class: 'foam.u2.view.FObjectView',
        choices: [
          [ 'foam.util.Timer', 'Timer' ],
          [ 'foam.core.Property', 'Property' ],
          [ 'foam.nanos.menu.DAOMenu',  'DAO'     ],
          [ 'foam.nanos.menu.SubMenu',  'SubMenu' ],
          [ 'foam.nanos.menu.TabsMenu', 'Tabs'    ]
        ]
      }
    },
    {
      class: 'FObjectProperty',
      name: 'fObjectViewWithChoicesValueSet',
      label: 'FObjectView With Choices (Value Set)',
      value: foam.core.Property.create(),
      view: {
        class: 'foam.u2.view.FObjectView',
        choices: [
          [ 'foam.util.Timer', 'Timer' ],
          [ 'foam.core.Property', 'Property' ],
          [ 'foam.nanos.menu.DAOMenu',  'DAO'     ],
          [ 'foam.nanos.menu.SubMenu',  'SubMenu' ],
          [ 'foam.nanos.menu.TabsMenu', 'Tabs'    ]
        ]
      }
    },
    {
      class: 'FObjectProperty',
      name: 'fObjectViewWithChoicesAndCustomClasses',
      label: 'FObjectView With Choices and Custom Classes',
      view: {
        class: 'foam.u2.view.FObjectView',
        allowCustom: true,
        choices: [
          [ 'foam.util.Timer', 'Timer' ],
          [ 'foam.core.Property', 'Property' ],
          [ 'foam.nanos.menu.DAOMenu',  'DAO'     ],
          [ 'foam.nanos.menu.SubMenu',  'SubMenu' ],
          [ 'foam.nanos.menu.TabsMenu', 'Tabs'    ]
        ]
      }
    }
  ]
})
