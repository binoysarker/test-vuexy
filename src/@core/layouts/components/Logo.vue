<template>
  <b-img
    :src="require('@/assets/images/logo/OS-logo-horiz.png')"
    class="rounded mr-2"
    height="40"
    width="164"
    alt="Logo"
  />
</template>

<script>
import { BImg } from 'bootstrap-vue'

export default {
  components: {
    BImg,
  },
}
</script>
