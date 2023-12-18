<template>
  <div>
    <Avatar :height="100" :width="100"  rounded>
      <!-- You can pass any content as default slot -->
      <img
        src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsX29mZmljZV8zNF9mdWxsX2JvZHlfM2RfYXZhdGFyXzNkX3JlbmRlcl9vZl9hX2J1c2luZXNzd19jOWYzODYxYy1lZTYzLTQxOGYtOThmNC02MWJkNGM3OGE1YTZfMS5wbmc.png"
        alt="Avatar 1 Image"
      />
      <!-- <p class="h-full w-full flex items-center justify-center">AJ</p> -->
    </Avatar>
  </div>
</template>

<script setup lang="ts">
import Avatar from './components/DXHAvatar.vue'

const props = defineProps(['avatar1', 'avatar2', 'avatar3'])
</script>
