<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  name: 'TokensView',
  setup() {
    const mangeCoin = ref(25);
    const tether = ref(50);
    const showModal = ref(false);
    const modalMessage = ref('');

    const cryptoPrices = ref<Record<string, number | null>>({
      btc: null,
      eth: null,
      sol: null,
      avax: null,
    });

    const fetchPrices = async () => {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana,avalanche-2&vs_currencies=usd'
        );
        const data = await response.json();
        cryptoPrices.value.btc = data.bitcoin.usd;
        cryptoPrices.value.eth = data.ethereum.usd;
        cryptoPrices.value.sol = data.solana.usd;
        cryptoPrices.value.avax = data['avalanche-2'].usd;
      } catch (error) {
        modalMessage.value = 'Erro ao buscar preços das criptos';
        showModal.value = true;
      }
    };

    const exchangeTokens = () => {
      if (mangeCoin.value >= 1) {
        mangeCoin.value -= 1;
        tether.value += 2.5;
        modalMessage.value = '💱 Você trocou 1 MangeCoin por 2.5 USDT!';
      } else {
        modalMessage.value = '❌ Saldo de MangeCoin insuficiente para trocar.';
      }
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const getIconUrl = (coin: string) => {
      const icons: Record<string, string> = {
        btc: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/btc.png',
        eth: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/eth.png',
        sol: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/sol.png',
        avax: 'https://raw.githubusercontent.com/spothq/cryptocurrency-icons/master/128/color/avax.png',
      };
      return icons[coin];
    };

    onMounted(fetchPrices);

    return {
      mangeCoin,
      tether,
      cryptoPrices,
      exchangeTokens,
      showModal,
      modalMessage,
      closeModal,
      getIconUrl,
    };
  },
});
</script>

<template>
  <div class="tokens-view">
    <h1>💰 Tokens e Conversão</h1>

    <div class="wallet-box">
      <p><strong>MangeCoin:</strong> {{ mangeCoin.toFixed(1) }} MC</p>
      <p><strong>Tether:</strong> {{ tether.toFixed(2) }} USDT</p>
    </div>

    <button class="exchange-button" @click="exchangeTokens">
      🔄 Trocar 1 MangeCoin por 2.5 USDT
    </button>

    <div class="crypto-prices">
      <h2>📈 Preços Atuais das Criptos</h2>
      <ul>
        <li v-for="(price, coin) in cryptoPrices" :key="coin">
          <img :src="getIconUrl(coin)" :alt="coin" />
          {{ coin.toUpperCase() }}: {{ price ? '$' + price.toFixed(2) : 'Carregando...' }}
        </li>
      </ul>
    </div>

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <p>{{ modalMessage }}</p>
        <button @click="closeModal">Fechar</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tokens-view {
  text-align: center;
  margin-top: 40px;
  background: radial-gradient(circle, #1f1f1f, #111);
  padding: 40px;
  border-radius: 20px;
  color: #fff;
  box-shadow: 0 0 20px #ff4500;

  h1 {
    color: gold;
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  .wallet-box {
    font-size: 1.4rem;
    margin-bottom: 20px;
  }

  .exchange-button {
    padding: 12px 25px;
    font-size: 1.2rem;
    background: linear-gradient(to right, #ff4500, #e63946);
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    margin-bottom: 30px;
    box-shadow: 0 0 10px #ff4500;
  }

  .exchange-button:hover {
    transform: scale(1.05);
    box-shadow: 0 0 20px #ff6347;
  }

  .crypto-prices {
    font-size: 1.1rem;

    ul {
      list-style: none;
      padding: 0;
      margin-top: 10px;

      li {
        margin: 10px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;

        img {
          width: 24px;
          height: 24px;
        }
      }
    }
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
