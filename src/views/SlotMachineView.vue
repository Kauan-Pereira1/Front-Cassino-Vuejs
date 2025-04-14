<script lang="ts">
import { defineComponent, ref } from 'vue';
import PartSelector from '@/components/PartSelector.vue';

export default defineComponent({
  name: 'SlotMachineView',
  components: { PartSelector },
  setup() {
    const mangeCoin = ref(25);
    const images = ref([
      '/homemaranha.jpg',
      '/deadpool.jpeg',
      '/thor.jpeg',
      '/homem de ferro.jpg',
    ]);

    const winSound = new Audio('/sounds/win.mp3');
    const showModal = ref(false);
    const modalMessage = ref('');

    const reel1 = ref<InstanceType<typeof PartSelector> | null>(null);
    const reel2 = ref<InstanceType<typeof PartSelector> | null>(null);
    const reel3 = ref<InstanceType<typeof PartSelector> | null>(null);
    const reel4 = ref<InstanceType<typeof PartSelector> | null>(null);

    const play = () => {
      if (mangeCoin.value >= 0.5) {
        mangeCoin.value -= 0.5;

        const r1 = reel1.value!.spin();
        const r2 = reel2.value!.spin();
        const r3 = reel3.value!.spin();
        const r4 = reel4.value!.spin();

        setTimeout(() => {
          const allEqual =
            reel1.value!.currentImage === reel2.value!.currentImage &&
            reel2.value!.currentImage === reel3.value!.currentImage &&
            reel3.value!.currentImage === reel4.value!.currentImage;

          if (allEqual) {
            mangeCoin.value += 1;
            winSound.play();
            modalMessage.value = '🎉 Você ganhou 1 MangeCoin! 🎉';
            showModal.value = true;
          }
        }, 500);
      } else {
        modalMessage.value = '❌ Você não tem MangeCoins suficientes!';
        showModal.value = true;
      }
    };

    const closeModal = () => {
      showModal.value = false;
    };

    return { mangeCoin, images, reel1, reel2, reel3, reel4, play, showModal, modalMessage, closeModal };
  },
});
</script>

<template>
  <div class="slot-machine">
    <h1>Máquina de Slots MangeVegas</h1>
    <div class="reels">
      <PartSelector ref="reel1" :images="images" />
      <PartSelector ref="reel2" :images="images" />
      <PartSelector ref="reel3" :images="images" />
      <PartSelector ref="reel4" :images="images" />
    </div>
    <button class="play-button" @click="play">🎰 Girar (Custo: 0.5 MangeCoin)</button>
    <p class="balance">💰 Saldo: {{ mangeCoin.toFixed(1) }} MangeCoin</p>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>{{ modalMessage }}</p>
        <button @click="closeModal">Fechar</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slot-machine {
  text-align: center;
  margin-top: 40px;
  background: radial-gradient(circle, #1f1f1f 0%, #111 100%);
  padding: 40px;
  border-radius: 20px;
  color: #fff;
  box-shadow: 0 0 20px #ff4500;

  h1 {
    font-size: 2.8rem;
    margin-bottom: 20px;
    color: gold;
    text-shadow: 2px 2px #000;
  }

  .reels {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 25px;
  }

  .play-button {
    padding: 15px 30px;
    background: linear-gradient(to right, #ff4500, #e63946);
    border: none;
    border-radius: 10px;
    font-size: 1.5rem;
    color: #fff;
    cursor: pointer;
    box-shadow: 0 0 15px #ff4500;
    transition: transform 0.2s, box-shadow 0.3s;
  }

  .play-button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 25px #ff6347;
  }

  .balance {
    font-size: 1.8rem;
    margin-top: 15px;
    color: #00ffcc;
  }

  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 20px;
  }

  .modal-content {
  background: #222;
  padding: 20px 30px;
  border-radius: 12px;
  text-align: center;
  color: white;
  box-shadow: 0 0 15px #ff4500;
  animation: fadeInUp 0.4s ease;

  p {
    font-size: 1.4rem;
    margin-bottom: 15px;
  }

  button {
    padding: 10px 20px;
    background-color: #ff4500;
    color: #fff;
    border: none;
    border-radius: 6px;
    cursor: pointer;
  }

  button:hover {
    background-color: #e63946;
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(30px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
}
</style>
