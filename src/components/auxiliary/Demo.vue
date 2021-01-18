<template>
  <div class="p-grid">
    <div class="p-col-4">
      <Card>
        <template v-if="title" #title> {{ title }} </template>
        <template #content>
          <slot name="component"></slot>
        </template>
        <template #footer>
          <template v-if="value !== undefined">
            <h2>Value</h2>
            <samp>{{ value }}</samp>
            <hr />
          </template>

          <template v-if="testedEvents">
            <h2>Tested events</h2>
            <check-box v-for="(value, key) in testedEvents" :key="key" :label="key" :model-value="value" disabled></check-box>
            <Button @click="resetTestedEvents">Reset events</Button>
          </template>
        </template>
      </Card>
    </div>
    <div class="p-col-8">
      <Card>
        <template #title> Options </template>
        <template #content>
          <slot name="options"></slot>
        </template>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { cloneDeep } from "lodash";
import { Component, Vue, Prop } from "vue-property-decorator";
import Checkbox from "@/components/Checkbox.ts";

@Component({
  components: {
    "check-box": Checkbox
  }
})
export default class Demo extends Vue {
  @Prop() value?: unknown;
  @Prop() title?: string;
  @Prop() testedEvents!: Record<string, boolean> | null;

  resetTestedEvents() {
    const newEvents = cloneDeep(this.testedEvents);

    for (const key in newEvents) {
      newEvents[key] = false;
    }

    return this.$emit("update:testedEvents", newEvents);
  }
}
</script>
