foam.CLASS({
  package:'foam.support.view',
  name:'SupportEmailView',
  extends:'foam.u2.View',

  requires: [ 
    'foam.u2.ListCreateController',
    'foam.u2.dialog.Popup'
  ],

  imports: [ 
    'supportEmailDAO', 
    'createLabel',  
    'ctrl' 
  ],

  exports: [
    'as data'
  ],

  css:`
    ^ {
      width: 940px;
      border-radius: 2px;
      background-color: #ffffff;
      margin: auto;
      padding: 2px;
      margin-top: 40px;
      padding-left: 40px;
      text-align: center;
    }
    ^ .foam-u2-UnstyledActionView-create {
      display: none;
    }
    ^ .foam-u2-UnstyledActionView-newEmail{
      width: 135px;
      height: 40px;
      border-radius: 2px;
      border: none;
      background-color: #59a5d5;
      text-align: center;
      color: #ffffff;
      position: relative;
      margin: auto;
    }
    ^ .btn-mid{
      width: 100%;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 23px;
    }
    ^ .title{
      opacity: 0.6;
      font-size: 20px;
      font-weight: 300;
      text-align: left;
      color: #093649;
      margin: 20px 0 40px 0;
    }
    ^ .foam-u2-view-TableView-th-connectedTime{
      width: 400px;
    }
    ^ .foam-u2-view-TableView-row{
      border: solid 0.5px #e9e9e9;
    }
    ^ .foam-u2-view-TableView {
      width: 880px;
      margin: 0;
    }
    ^ th {
      font-weight: 400;
    }
  `,

  properties: [
    {
      class: 'Boolean',
      name: 'emptyDAO',
    }
  ],

  messages: [
    { name: 'Title', message: 'Support Email Management' }
  ],

  methods: [
    function initE(){
      var self = this;
      this.supportEmailDAO.limit(1).select().then(function(a){ 
        self.emptyDAO = a.array.length == 0;
      });

      this
      .addClass(this.myClass())
      .start().add(this.Title).addClass('title').end()
      .start({
        class: 'foam.u2.ListCreateController',
        dao: this.supportEmailDAO,
        summaryView: this.EmailSupportTableView.create(),
        showActions: false
      }).hide(this.emptyDAO$).end()
      .start().show(this.emptyDAO$)
        .start().add('No Support Emails Connected').end()
      .end()
      .start().addClass('btn-mid')
        .start(this.NEW_EMAIL).end()
      .end()
    }
  ],

  actions: [
    {
      name: 'newEmail',
      label: 'New Email',
      code: function(){
        this.ctrl.add(this.Popup.create().tag({ class: 'foam.support.modal.NewEmailSupportModal'}));
      }
    }
  ],

  classes: [
    {
      name: 'EmailSupportTableView',
      extends: 'foam.u2.View',
      
      exports: [ 'as data' ],
      
      imports: [ 'supportEmailDAO' ],
      
      properties: [
        'selection'
      ],
      
    methods: [
      function initE() {
        this
          .start({
            selection$: this.selection$,
            class: 'foam.u2.view.ScrollTableView',
            height: 20,
            data: this.supportEmailDAO,
            columns: [ 'email', 'connectedTime', 'status' ]
          }).addClass(this.myClass('table')).end();
          }
        ] 
      }
    ]
  });