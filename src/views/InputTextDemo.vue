<template>
  <div class="p-grid">
    <div class="p-col">
      <Card>
        <template #title>
          InputText
        </template>
        <template #content>
          <div>
            <InputText
              v-model="text"
              :label="showLabel ? 'Username' : ''"
              :error="textError"
              :size="size"
              :prepend-icon="iconLocation == 'prepend' ? 'pi pi-user' : ''"
							:append-icon="iconLocation == 'append' ? 'pi pi-spin pi-spinner' : ''"
              :disabled="disabled"
            ></InputText>
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
          <hr>
          <div>
            <h3>Icons</h3>
            <div class="p-field-radiobutton">
              <RadioButton id="icon1" name="icon" value="" v-model="iconLocation" />
              <label for="icon1">None</label>
            </div>
						<div class="p-field-radiobutton">
              <RadioButton id="icon1" name="icon" value="prepend" v-model="iconLocation" />
              <label for="icon1">Prepend icon</label>
            </div>
            <div class="p-field-radiobutton">
              <RadioButton id="icon2" name="icon" value="append" v-model="iconLocation" />
              <label for="icon2">Append icon</label>
            </div>
          </div>
          <hr>
          <div>
            <h3>Size</h3>
            <div class="p-field-radiobutton">
              <RadioButton id="size1" name="size" value="small" v-model="size" />
              <label for="size1">Small</label>
            </div>
            <div class="p-field-radiobutton">
              <RadioButton id="size2" name="size" value="normal" v-model="size" />
              <label for="size2">Normal</label>
            </div>
            <div class="p-field-radiobutton">
              <RadioButton id="size3" name="size" value="large" v-model="size" />
              <label for="size3">Large</label>
            </div>
          </div>
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
type IconLocation = "prepend" | "append" | "" ;

@Component({
  validations: {
    text: { required }
  }
})
export default class InputTextDemo extends Vue {
  text = "";
  showLabel = true;
  size: ButtonSize = "normal";
  iconLocation: IconLocation = "";
  disabled = false;


  get textError() {
    let error = "";
    if (!this.$v.text.$dirty) return error;
    !this.$v.text.required && (error = "Поле обязательно для заполнения");
    return error;
  }
}
</script>
