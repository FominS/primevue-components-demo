<script>
export default {
  props: {
    label: { required: false, type: String },
    id: { required: false, type: String },
    error: { required: false, type: String },
    hint: { required: false, type: String },
    idProp: { required: false, default: () => "id", type: String }
  },

  methods: {
    getInnerId() {
      return this.id || `cbr_input_${this._uid}`;
    },
    getInnerInputClass() {
      return { "p-invalid": this.error };
    },
    getBindings() {
      return {
        isInvalid: this.error,
        class: this.getInnerInputClass(),
        [this.idProp]: this.getInnerId()
      };
    },
    getChildren() {
      const children = [];
      this.label && children.push(this.createLabel());

      if (this.$scopedSlots.default) {
        const nodes = this.$scopedSlots.default({
          b: this.getBindings()
        });
        nodes && nodes.forEach(node => children.push(node));
      }

      this.hint && children.push(this.createHint());
      this.error && children.push(this.createErrorMesage());

      return children;
    },
    createLabel() {
      return this.$createElement(
        "label",
        {
          attrs: {
            for: this.getInnerId()
          },
          class: "p-mb-2",
          style: {
            display: "block"
          }
        },
        this.label
      );
    },

    createErrorMesage() {
      return this.$createElement(
        "small",
        {
          class: "p-invalid",
          style: {
            display: "block"
          }
        },
        this.error
      );
    },

    createHint() {
      return this.$createElement(
        "small",
        {
          style: {
            display: "block"
          }
        },
        this.hint
      );
    }
  },
  render() {
    return this.$createElement("div", this.getChildren());
  }
};
</script>