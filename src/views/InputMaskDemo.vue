<template>
  <div class="p-grid">
    <div class="p-col">
      <Card>
        <template #title>
          InputMask
        </template>
        <template #content>
          <div>
            <InputMask
              v-model="text"
              :label="showLabel ? 'Phone number' : ''"
              :error="textError"
              :mask="mask"
              :disabled="disabled"
            ></InputMask>
          </div>
        </template>
      </Card>
    </div>
    <div class="p-col">
      <Card>
        <template #title>
          Options
        </template>
        <template #content>
          <div class="p-field-checkbox">
            <Checkbox id="label" v-model="showLabel" :binary="true" />
            <label for="label">Show label</label>
          </div>
          <div class="p-field-checkbox">
            <Checkbox id="label" v-model="disabled" :binary="true" />
            <label for="label">Disabled</label>
          </div>
          <InputText v-model="mask" label="Mask"></InputText>
          <hr />
          <div class="p-field">
            <Button @click="$v.$touch()">Проверить валидацию</Button>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { required } from "vuelidate/lib/validators";

type ButtonSize = "small" | "normal" | "large";

@Component({
  validations: {
    text: { required }
  }
})
export default class InputTextDemo extends Vue {
  text = "";
  showLabel = true;
  size: ButtonSize = "normal";
  mask = "+7(999) 999-99-99";
  disabled = false;

  get textError() {
    let error = "";
    if (!this.$v.text.$dirty) return error;
    !this.$v.text.required && (error = "Поле обязательно для заполнения");
    return error;
  }
}
</script>

<style lang="scss" scoped></style>
