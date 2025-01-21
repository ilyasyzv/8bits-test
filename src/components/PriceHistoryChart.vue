<template>
  <div class="w-48 h-24 relative">
    <canvas ref="chartRef" class="absolute top-0 left-0 w-full h-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

interface Props {
  data: string[]
}

const props = defineProps<Props>()

const chartRef = ref<HTMLCanvasElement | null>(null)

let chartInstance: Chart | null = null

onMounted(() => {
  if (!chartRef.value) return

  const numericData = props.data.map((p) => parseFloat(p))

  chartInstance = new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels: props.data.map((_, idx) => `Entry #${idx + 1}`),
      datasets: [
        {
          label: 'Price',
          data: numericData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  })
})

watch(
  () => props.data,
  (newData) => {
    if (chartInstance) {
      const numericData = newData.map((p) => parseFloat(p))
      chartInstance.data.labels = newData.map((_, idx) => `Entry #${idx + 1}`)
      chartInstance.data.datasets[0].data = numericData
      chartInstance.update()
    }
  }
)
</script>