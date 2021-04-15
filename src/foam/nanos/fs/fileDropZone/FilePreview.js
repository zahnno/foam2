/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */

foam.CLASS({
  package: 'foam.nanos.fs.fileDropZone',
  name: 'FilePreview',
  extends: 'foam.u2.View',

  documentation: 'iframe for file preview',

  properties: [
    {
      name: 'selected'
    }
  ],

  methods: [
    async function initE() {
      this.SUPER();

      await this
        .addClass(this.myClass())
        .start('div')
          .addClass('file-image-div' + this.id)
          .style({
            'height': '300px',
            'width': '500px',
            'display': 'none'
          })
          .start('img')
            .addClass('file-image' + this.id)
            .style({
              'height': '100%',
              'width': '100%',
              'object-fit': 'contain',
              'object-position': 'left'
            })
          .end()
        .end()
        .start('iframe')
          .addClass('file-iframe' + this.id)
          .style({
            'visibility': 'hidden',
            'height': '0px',
            'width': '0px'
          })
        .end()
        .start('div')
          .addClass('file-text' + this.id)
          .style({
            'visibility': 'hidden',
            'height': '0px',
            'width': '0px'
          })
          .end()
        .end();
        this.showData();
      this.data$.sub(() => this.showData());
    },

    async function showData() {
      let iFrame = document.getElementsByClassName('file-iframe' + this.id)[0],
          image = document.getElementsByClassName('file-image' + this.id)[0],
          div = document.getElementsByClassName('file-image-div' + this.id)[0],
          p = document.getElementsByClassName('file-text' + this.id)[0],
          url = '',
          pos;

      iFrame.style.visibility = 'hidden';
      div.style.visibility = 'hidden';
      div.style.display = 'none';
      p.style.visibility = 'hidden';

      if ( this.selected == undefined || this.selected == this.data.length ) {
        pos = this.data.length - 1;
      } else {
        pos = this.selected;
      }

      if ( ! this.data[pos] ) {
        return;
      }

      let d = this.data[pos].data;
      // If file is stored as a dataString, actual file is already on client side. Otherwise, actual file can be retrieved from server from File.address
      if ( ! d ) {
        url = this.data[pos].address;
      } else {
        url = URL.createObjectURL(d.blob);
      }

      if ( this.data[pos].mimeType === 'application/pdf' ) {
        iFrame.src = url;
        iFrame.style.visibility = 'visible';
        iFrame.style.display = 'block';
        iFrame.style.height = '100%';
        iFrame.style.width = '100%';
      } else if ( this.data[pos].mimeType === 'plain/text' ) {
        let t = await this.data[pos].getText();
        let text = document.createTextNode(t);
        p.appendChild(text);
        p.style.visibility = 'visible';
        p.style.display = 'block';
        p.style.height = '100%';
        p.style.width = '100%';
      } else {
        image.src = url;
        div.style.visibility = 'visible';
        div.style.display = 'block';
      }
    }
  ]
});
