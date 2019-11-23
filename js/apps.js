const delaysApp = new Vue({
  el: '#delays-app',
  data: () => ({
    log: ''
  }),
  components: {
    PromptModal
  },
  mixins: [modalMixin],
  mounted() {
    eventBus.$on('delay-update-modal', (options) => {
      const { name, header } = options;
      this.log += this.getMessageLog(header);
    });
    eventBus.$on('delay-publish-prompt', (options) => {
      const { name, header, payload } = options;
      const msg = `${header}. User input: '${payload.radiovalue}'`
      this.log += this.getMessageLog(msg);
    });
  }
});

const tasksApp = new Vue({
  el: '#tasks-app',
  data: () => ({
    log: ''
  }),
  components: {
    PromptModal,
    TableFromFetch
  },
  mixins: [modalMixin],
  mounted() {
    eventBus.$on('edit-preset-modal', (options) => {
      const { name, header } = options;
      this.log += this.getMessageLog(header);
    });
    eventBus.$on('measure-save-prompt', (options) => {
      const { name, header, payload } = options;
      const msg = `${header}. User input: '${payload.inputvalue}'`
      this.log += this.getMessageLog(msg);
    });
    eventBus.$on('table-modal', (options) => {
      const { name, header, payload } = options;
      const msg = `${header}. User input: [${payload.groupvalue}]`
      this.log += this.getMessageLog(msg);
    });
  }
});