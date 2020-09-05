<template>
  <div class="card" style="border: 0px;">
    <div class="card-body">
      <slot></slot>
    </div>
    <div class="card-footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'card'
  }
</script>

<style>
#rectangle {
  width: 295px; 
  height: 155px; 
  background: #F5F5F5; 
  border: 1px solid #E0E0E0; 
  border-radius: 0px;
  border-bottom: none;

}

#footerRectangle { 
  width: 295px; 
  height: 65px; 
  background: #FAFAFA; 
  border: none; 
  border-radius: 0px; 
}

hr{
  border-top: none;
}

.card-stats .card-body{
  padding: 0px 15px;
}
</style>