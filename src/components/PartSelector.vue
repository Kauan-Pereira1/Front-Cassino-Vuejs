<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PartSelector',
  props: {
    images: {
      type: Array as () => string[],
      required: true,
    },
  },
  setup(props) {
    const currentImage = ref(props.images[0]);
    const isSpinning = ref(false);

    const spin = () => {
      isSpinning.value = true;
      const randomIndex = Math.floor(Math.random() * props.images.length);
      currentImage.value = props.images[randomIndex];

      // Remove a animação depois de 800ms para sincronizar com a rotação
      setTimeout(() => {
        isSpinning.value = false;
      }, 800);

      return currentImage.value;
    };

    return {
      currentImage,
      spin,
      isSpinning,
    };
  },
});
</script>

<template>
  <div class="part-selector" :class="{ spinning: isSpinning }">
    <img :src="currentImage" alt="Slot Image" />
  </div>
</template>

<style scoped lang="scss">
.part-selector {
  width: 250px;
  height: 250px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease;
    /* Ajustei Aqui o Tempo de animação */
  }

  &.spinning img {
    transform: rotateY(360deg) scale(1.1);
  }
}
</style>
