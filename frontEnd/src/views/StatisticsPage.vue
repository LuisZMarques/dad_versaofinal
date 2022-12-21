<template>
    <div style="width:100%;height:100vw;background-color: rebeccapurple;">
        <div style="display:block;width:900px;height:400px">
            <canvas id="pieChart" ref="myChart"></canvas>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref} from "vue";
import Chart from 'chart.js/auto'


const data = {
    labels: [
        'Hot Dish',
        'Cold Dish',
        'Drink',
        'Dessert'
    ],
    datasets: [{
        label: 'Produtos Vendidos',
        data: [300, 50, 100, 50],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 0, 86)'
        ],
        hoverOffset: 4
    }]
};
const config = {
    type: 'pie',
    data: data,
};
onMounted(() => {
    let pieChart = new Chart(
    document.getElementById('pieChart'),
    config
);
})
</script>

<style scoped>

</style>