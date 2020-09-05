<template>
  <card class="card-stats">
    <div class="row">
      <div v-if="$slots.header" class="col-12">
        <slot name="header"></slot>        
      </div>
    </div>
    <div class="row">
      <div v-if="$slots.footer" slot="footer" class="col-12">
        <slot name="footer"></slot>
      </div>
    </div>
  </card>
</template>

<script>
  import Card from './Card.vue'
  export default {
    data(){
      return {
      
      }
    },
    
    components: {
      Card
    },
  }

</script>

<style>
 

</style>