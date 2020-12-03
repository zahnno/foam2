/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.i18n',
  name: 'TranslationConsole',
  extends: 'foam.u2.Controller',

  implements: [ 'foam.mlang.Expressions' ],

  static: [
    function OPEN() {
      var w      = global.window.open("", 'Translation Console', "width=800,height=800,scrollbars=no", true);
      var window = foam.core.Window.create({window: w}, ctrl);
      var v      = this.create({}, window);
      v.write(window.document);

      foam.core.I18NString.GETTER__ = function(proto, prop, obj, key) {
        if ( obj.sourceCls_ ) {
          var source = obj.sourceCls_.id + '.' + obj.name + '.' + prop.name;
          var translation = v.translationService.getTranslation(v.locale, source, '');
          v.onTranslation(null, null, foam.locale, source, translation, obj.instance_[key]);
          console.log('**************************** ', source, obj.instance_[key]);
        }
        return obj.instance_[key];
      };

    }
  ],

  css: `
    * {
      font-family: Roboto, sans-serif;
      color: #555;
    }
    body {
      font-family: Roboto;
      background: rgb(238, 238, 238);
      overflow: none;
    }
    button { padding: 6px; }
    .foam-u2-ActionView-medium { height: 34px !important; background: pink; }
    .foam-u2-view-TableView-th-editColumns { display: none; }
    .foam-u2-view-TableView-td[name="contextMenuCell"] { display: none; }
    .foam-u2-view-ScrollTableView { height: auto !important; }

  `,

  classes: [
    {
      name: 'Row',

      imports: [ 'locale', 'localeDAO', 'search', 'translationService' ],

      requires: [ 'foam.i18n.Locale' ],

      tableColumns: [ 'source', 'defaultText', 'text', 'update' ],

      ids: [ 'source' ],

      properties: [
        {
          class: 'String',
          name: 'source',
          tableWidth: 350
        },
        {
          class: 'String',
          name: 'defaultText',
          displayWidth: 200
        },
        {
          class: 'String',
          name: 'text',
          tableCellFormatter: function(val, obj, prop) {
            this.startContext({data: obj}).add(prop).endContext();
          },
          tableWidth: 250
        }
      ],

      methods: [
      ],

      actions: [
        function update() {
          console.log('***** UPDATE', this.source, this.text);
          var l = this.Locale.create({
            locale:  this.locale.substring(0, 2),
            variant: this.locale.substring(3),
            source:  this.source,
            target:  this.text
          });

          this.localeDAO.put(l);

          this.translationService.localeEntries[this.source] = this.text;
        }
      ]
    }
  ],

  imports: [
    'translationService'
  ],

  exports: [ 'locale', 'search' ],

  requires: [
    'foam.dao.MDAO',
    'foam.u2.borders.CardBorder'
  ],

  properties: [
    {
      class: 'String',
      name: 'search',
      view: {
        class: 'foam.u2.TextField',
        type: 'search',
        onKey: true
      }
    },
    {
      name: 'dao',
      factory: function() { return this.MDAO.create({of: this.Row}); }
    },
    {
      name: 'filteredDAO',
      expression: function(search, dao) {
        search = search.trim();
        if ( search == '' ) return dao;

        return dao.where(
          this.OR(
            this.CONTAINS_IC(this.Row.SOURCE,       search),
            this.CONTAINS_IC(this.Row.DEFAULT_TEXT, search),
            this.CONTAINS_IC(this.Row.TEXT,         search)
          ));
      },
      view: 'foam.u2.view.ScrollTableView'
    },
    {
      class: 'String',
      name: 'locale',
      factory: function() { return foam.locale; }
//          view: 'net.nanopay.ui.topNavigation.LanguageChoiceView'
    }
  ],

  methods: [
    function init() {
      this.SUPER();
      this.translationService.translation.sub(this.onTranslation);
    },

    function initE() {
      this.
        addClass(this.myClass()).
        start(this.CardBorder).
          style({height: '32px'}).
          start('span').
            style({'padding-top': '5px', display: 'inline-block', 'font-size': 'larger'}).            add('Translation Console').
          end().
          start('div').
            style({float: 'right'}).
            add('Search: ', this.SEARCH, '  Locale: ', this.LOCALE).
          end().
        end().
        start(this.CardBorder, {}, this.content$).
          style({'overflow-y':'scroll'}).
          style({'margin-top': '10px', height: '90%' }).
          add(this.FILTERED_DAO).
        end();
    }
  ],

  listeners: [
    function onTranslation(_, __, locale, source, txt, defaultText) {
      this.dao.put(this.Row.create({
        locale:      locale,
        source:      source,
        text:        txt,
        defaultText: defaultText
      }));
    }
  ]
});
