foam.CLASS({
  package: 'foam.doc',
  name: 'ApiBrowser',
  extends: 'foam.u2.Element',
  documentation: 'Show UML & properties for passed in models',

  requires: [
    'foam.doc.ClassList',
    'foam.doc.DocBorder',
    'foam.doc.SimpleClassView',
    'foam.doc.GetRequestView',
    'foam.doc.PutRequestView',
    'foam.doc.UMLDiagram',
    'foam.nanos.boot.NSpec',
  ],

  imports: [
    'nSpecDAO'
  ],

  exports: [
    'showOnlyProperties',
    'showInherited'
  ],

  properties: [
    {
      name: 'models',
      value: []
    },
    {
      name: 'showOnlyProperties',
      value: true
    },
    {
      name: 'showInherited',
      value: false
    }
  ],

  css: `
    ^ {
      display: flow-root;
      height: auto;
      width: 700px;
      margin: 20px;
    }
    ^ .foam-doc-UMLDiagram{ 
      width: 700px;
      margin: 0;
      margin-bottom: 20px;
    }
    ^ .foam-doc-UMLDiagram canvas{
      width: 700px;
    }
    ^ .foam-u2-view-TableView-foam-doc-PropertyInfo{
      width: 700px;
      float: left;
      margin-top: 20px;
      margin-bottom: 30px;
    }
    ^ .net-nanopay-ui-ActionView-printPage{
      margin-top: 20px;
    }
    ^ .light-roboto-h2{
      white-space: normal;
      width: 100%;
    }
    ^ .black-box{
      background: #1e1c3a;
      padding: 20px;
    }
    ^ .small-roboto{
      color: white;
      font-size: 14px;
      font-family: Roboto;
      line-height: 1.5;
      font-weight: 300;
    }
    ^ .sml{
      font-size: 14px;
      font-weight: 500;
      color: black;
    }
    @media print{
      .foam-u2-view-TableView-th-editColumns{
        display: none;
      }
      ^ .net-nanopay-ui-ActionView-printPage{
        display: none;
      }
      .net-nanopay-ui-topNavigation-TopNav{
        display: none;
      }
    }
  `,

  messages: [
    { name: "introMessage", message: "Welcome to the nanopay API documentation. This API will give you the ability to connect your software to banking infrastructure to move money, store funds, and verify bank accounts."},
    { name: "makingRequests", message: "Request and response bodies are JSON encoded. Requests must contain api credentials (email/password provided by nanopay) on the authorization tag. Data contained in the table views below display available properties on the model. Those that are required are added to the examples shown on each service call. " },
    { name: "exampleRequest", 
      message: 
        "curl -X GET \
        -u 'username:password' \
        'http://127.0.0.1:8080/service/dig?dao=corridorDAO&format=json&cmd=select' \
        -H 'accept: application/json' \
        -H 'cache-control: no-cache' \
        -H 'content-type: application/json'"
    },
    {
      name: "examplePutRequest",
      message: 
      "`curl -X POST \
        -u 'admin@nanopay.net:adminAb1' \
        'http://127.0.0.1:8080/service/dig?dao=corridorDAO' \
        -d '{'class':'net.nanopay.fx.interac.model.Corridor','id':4,'sourceCountry':'CA','targetCountry':'IN','currencies':['INR']}' \
        -H 'accept: application/json' \
        -H 'cache-control: no-cache' \
        -H 'content-type: application/json'"
    }
  ],

  methods: [
    function initE(){
      this.SUPER();
      var self = this;

      this.start().addClass(this.myClass())
        .start('h2').add("API Documentation").end()
        .start().addClass('light-roboto-h2').add(this.introMessage).end()
        .start('h2').add("Making Requests").end()
        .start().addClass('light-roboto-h2').add(this.makingRequests).tag('br').tag('br').end()
          .start().addClass('light-roboto-h2 sml').add('Below is an example GET request to the corridorDAO using curl:').end()
        .start().addClass('black-box')
          .start().addClass('small-roboto').add(this.exampleRequest).end()
        .end()
        .start().addClass('light-roboto-h2 sml').tag('br').tag('br').add('Below is an example PUT request to the corridorDAO using curl (PUT requests can create and update objects):').end()
        .start().addClass('black-box')
          .start().addClass('small-roboto').add(this.examplePutRequest).end()
        .end()
        .select(this.nSpecDAO, function(n) {
          var model = self.parseClientModel(n);
          if( ! model ) return;
          var dataProps = self.requiredProperties(model);
          this.start().style({ 'font-size' : '25px', 'margin' : '30px 0px', 'font-weight': '500'}).add(n.name).end()
          .tag(self.SimpleClassView.create({ data: model }))
          .tag(self.GetRequestView.create({ data: n.name }))
          .tag(self.PutRequestView.create({ data: { n : n, model : model, props : dataProps }}))
        })
      .end();
    },

    function parseClientModel(n){
      var cls = JSON.parse(n.client);
      var clsName = cls.of ? cls.of : cls.class;
      return foam.lookup(clsName, true);
    },

    function requiredProperties(m){
      var reqProps = [];
      var dataString;
      for ( var key in m.axiomMap_ ) {
        var a  = m.axiomMap_[key];
        if (a.required) {
          if(a.cls_.name != "Import") {
            reqProps.push(',"', key, '"', ":", '"', a.cls_.name, '"');
          }
        }
      }
      dataString = reqProps.join('');
      return dataString;
    }
  ],

  actions: [
    {
      name: 'printPage',
      label: 'Print',
      code: function(){
        window.print();
      }
    }
  ],

});

foam.CLASS({
  package: 'foam.doc',
  name: 'GetRequestView',
  extends: 'foam.u2.View',

  methods: [
    function initE(){
      this.addClass(this.myClass())
      .start().addClass('light-roboto-h2').add("GET Request: ").end()
        .start().addClass('black-box')
          .start().addClass('small-roboto')
            .add('curl -X GET')
            .br()
            .add("'http://127.0.0.1:8080/service/dig?dao=" + this.data + "'")
            .br()
            .add("-u 'username/password'")
            .br()
            .add("-H 'accept: application/json'")
            .br()
            .add("-H 'cache-control: no-cache'")
            .br()
            .add("-H 'content-type: application/json'")
          .end()
        .end()
      .end()
    }
  ]
});

foam.CLASS({
  package: 'foam.doc',
  name: 'PutRequestView',
  extends: 'foam.u2.View',

  methods: [
    function initE(){
      this.addClass(this.myClass())
      .start().addClass('light-roboto-h2').style({ 'margin-top': '25px'}).add("PUT Request (Create & Update): ").end()
        .start().addClass('black-box')
          .start().addClass('small-roboto')
            .add('curl -X PUT')
            .br()
            .add("'" + 'http://127.0.0.1:8080/service/dig' + "'")
            .br()
            .add("-u 'username/password'")
            .br()
            .add('-d {"dao":"' + this.data.n.name + '", "data":{ "class":"' + this.data.model.id + '"' + this.data.props + "}" )
            .br()
            .add("-H 'accept: application/json'")
            .br()
            .add("-H 'cache-control: no-cache'")
            .br()
            .add("-H 'content-type: application/json'")
          .end()
        .end()
      .end()
    }
  ]
});