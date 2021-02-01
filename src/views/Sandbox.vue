<template>
  <div>
    <h1>H1 header</h1>
    <Divider></Divider>
    <Divider type="dashed" />
    <h2>H2 header</h2>

    <div class="p-d-flex">
      <div>Content 1</div>
      <Divider layout="vertical" />
      <div>Content 2</div>
      <Divider layout="vertical" />
      <div>Content 3</div>
    </div>

    <div>Content 1</div>

    <Divider align="left">
      <div class="p-d-inline-flex p-ai-center">
        <i class="pi pi-user p-mr-2"></i>
        <b>Icon</b>
      </div>
    </Divider>

    <div>Content 2</div>

    <Divider align="center">
      <span class="p-tag">Badge</span>
    </Divider>

    <div>Content 3</div>

    <Divider align="right">
      <Button label="Button" icon="pi pi-search" class="p-button-outlined"></Button>
    </Divider>

    <div>Content 4</div>r
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
</style>