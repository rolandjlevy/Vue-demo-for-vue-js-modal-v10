// Initiate vue-js-modal
Vue.use(window["vue-js-modal"].default);

// Global event bus
window.eventBus = new Vue({});

// Create v-focus directive
Vue.directive('focus', {
  inserted: (el) => {
    el.focus()
  }
});

// Mixins
const modalMixin = {
  data: () => ({
    dateOptions: { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' }
  }),
  methods: {
    openModal(modalName) {
      this.$modal.show(modalName);
    },
    hideModal(modalName) {
      this.$modal.hide(modalName);
    },
    getMessageLog(msg) {
      const timeStamp = (new Date()).toLocaleDateString('en-UK', this.dateOptions);
      return `&gt; ${msg} [${timeStamp}]<br>`;
    }
  }
}

// Child components
const PromptModal = {
  template: '#prompt-modal-template',
  data: () => ({
    payload: {
      inputvalue: null,
      radiovalue: null,
      groupvalue: []
    },
    widthOptions: {
      prompt: 350,
      modal: 700
    },
    width: 0,
    slotName: 'slotcontent',
    payloadDefault: {}
  }),
  props: {
    name: {
      type: String,
      default: '',
      required: true
    },
    header: {
      type: String,
      default: '',
      required: true
    },
    content: {
      type: String,
      default: '',
      required: true
    },
    buttonleft: {
      type: String,
      default: ''
    },
    buttonright: {
      type: String,
      default: ''
    },
    closebutton: {
      type: Boolean,
      default: true
    },
    clicktoclose: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'prompt'
    }
  },
  methods: {
    confirmPrompt(event) {
      const options = Object.assign(this.$props, {payload: this.payload});
      eventBus.$emit(this.name, options);
      this.payload = { ...this.payloadDefault };
    },
    beforeOpen(event) {
      // console.log('beforeOpen');
    },
    beforeClose(event) {
      // console.log('beforeClose');
    },
    getWidth() {
      this.width = String(this.widthOptions[this.type]);
    }
  },
  computed: {
    payloadValues() {
      return Object.values(this.payload).filter(item => {
        if (Array.isArray(item)) {
          return !!item.filter(n => !!n).length;
        } else {
          return !!item;
        }
      });
    },
    hasSlot() {
      return !!this.$scopedSlots[this.slotName];
    }
  },
  beforeMount() {
    this.getWidth();
  },
  mounted() {
    this.payloadDefault = { ...this.payload };
    this.$parent.$on(`update-${this.name}`, ({key, payload}) => {
      if (Array.isArray(this.payload[key])) {
        this.payload[key] = [...payload];
      } else {
        this.payload[key] = payload[key];
      }
    });
  }
}