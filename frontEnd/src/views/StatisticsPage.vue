<template>
    <div>
        <div class="row" style="width: 100%;">
            <canvas id="myChart"></canvas>
        </div>
    </div>
</template>

<script setup>
import { onMounted } from "vue";
import Chart from 'chart.js/auto'
const data = {
    labels: [
        'Red',
        'Blue',
        'Yellow'
    ],
    datasets: [{
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
    }]
};
const config = {
    type: 'pie',
    data: data,
};
onMounted(() => {
    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
})
</script>

<style scoped>

</style>