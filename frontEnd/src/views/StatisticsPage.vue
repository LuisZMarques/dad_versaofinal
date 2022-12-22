<template>
    <div style="width:100%;height:100vh;position: relative;background-color: rebeccapurple;">
        <p style="display:none"> {{ medianPriceByCategory }}</p>
        <p style="display:none"> {{ profitsByMonth }}</p>
        <div class="grid-responsive">
            <div class="card text-center card-charts" >
                <h5 class="card-title justify-content-center">Preço Médio de Produtos Por Categoria</h5>
                <div class="card-body">
                    <div style="width:300px;height: 300px;display:block;margin:0 auto;">
                        <Pie id="pieChart" :options="chartOptions" :data="pieChartData" />
                    </div>
                </div>
                <div class="card-footer">
                    <p>(em €)</p>
                </div>
            </div>
            <div class="card text-center card-charts" >
                <h5 class="card-title">Número de Produtos Por Categoria</h5>
                <div class="card-body">
                    <div style="width:300px;height: 300px;display:block;margin:0 auto;">
                        <Pie id="pieChart2" :options="chartOptions" :data="pieChartData2" />
                    </div>
                </div>
                <div class="card-footer">
                    <p>(em unidades)</p>
                </div>
            </div>
        </div>
        <div class="card text-center" style="width: 50%;margin:0 auto;background-color: #d3d3d3;" >
                <h5 class="card-title">Total Pedidos e Dinheiro recebido</h5>
                <div class="card-body">
                    <div style="width:100%;height: 400px;display:block;margin:0 auto;">
                        <Line id="lineChart" :options="chartOptions" :data="lineChartData" />
                    </div>
                </div>
            </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { Pie, Line } from 'vue-chartjs'
import { useOrdersStore } from "@/stores/orders.js"
import { useProductsStore } from "@/stores/products.js"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, LineElement,LinearScale, CategoryScale,PointElement, Colors } from 'chart.js'
import { useLoadingStore } from "@/stores/loading.js"

ChartJS.register(ArcElement, Tooltip, Legend, LineElement,LinearScale, CategoryScale,PointElement )

const ordersStore = useOrdersStore()
const productsStore = useProductsStore()
const loadingStore = useLoadingStore()


onMounted(async () => {
    await productsStore.loadProducts()
    await ordersStore.loadOrders()
})

// Arrays com estrutura de dados
let category = ref({
    hotDish: {
        total: 0,
        count: 0,
        median: 0
    },
    coldDish: {
        total: 0,
        count: 0,
        median: 0
    },
    drink: {
        total: 0,
        count: 0,
        median: 0
    },
    dessert: {
        total: 0,
        count: 0,
        median: 0
    }
})

let profits = ref({
    January: {
        total: 0,
        count: 0,
    },
    February: {
        total: 0,
        count: 0,
    },
    March: {
        total: 0,
        count: 0,
    },
    April: {
        total: 0,
        count: 0,
    },
    May: {
        total: 0,
        count: 0,
    },
    June: {
        total: 0,
        count: 0,
    },
    July: {
        total: 0,
        count: 0,
    },
    August: {
        total: 0,
        count: 0,
    },
    September: {
        total: 0,
        count: 0,
    },
    October: {
        total: 0,
        count: 0,
    },
    November: {
        total: 0,
        count: 0,
    },
    December: {
        total: 0,
        count: 0,
    }
})

// Charts
const pieChartData = computed(() => ({
    labels: ['Prato Quente', 'Prato Frio', 'Bebida', 'Sobremesa'],
    datasets: [{
        data: [category.value.hotDish.median.toFixed(2), category.value.coldDish.median.toFixed(2), category.value.drink.median.toFixed(2), category.value.dessert.median.toFixed(2)],
        backgroundColor: ['#DD1B16', '#00D8FF', '#E46651', '#41B883']
    },],

}))
const pieChartData2 = computed(() => ({
    labels: ['Prato Quente', 'Prato Frio', 'Bebida', 'Sobremesa'],
    datasets: [{
        data: [category.value.hotDish.count.toFixed(2), category.value.coldDish.count.toFixed(2), category.value.drink.count.toFixed(2), category.value.dessert.count.toFixed(2)],
        backgroundColor: ['#DD1B16', '#00D8FF', '#E46651', '#41B883']
    },],

}))

const lineChartData = computed(() => ({
    labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    datasets: [{
        label: 'Total Ganho (em €)',
        data: [profits.value.January.total.toFixed(2), profits.value.February.total.toFixed(2), profits.value.March.total.toFixed(2), profits.value.April.total.toFixed(2), profits.value.May.total.toFixed(2), profits.value.June.total.toFixed(2), profits.value.July.total.toFixed(2), profits.value.August.total.toFixed(2), profits.value.September.total.toFixed(2), profits.value.October.total.toFixed(2), profits.value.November.total.toFixed(2), profits.value.December.total.toFixed(2)],
        backgroundColor: ['#DD1B16']
    },
    {
        label: 'Total Pedidos',
        data: [profits.value.January.count.toFixed(2), profits.value.February.count.toFixed(2), profits.value.March.count.toFixed(2), profits.value.April.count.toFixed(2), profits.value.May.count.toFixed(2), profits.value.June.count.toFixed(2), profits.value.July.count.toFixed(2), profits.value.August.count.toFixed(2), profits.value.September.count.toFixed(2), profits.value.October.count.toFixed(2), profits.value.November.count.toFixed(2), profits.value.December.count.toFixed(2)],
        backgroundColor: ['#00D8FF']
    },
    ],
}))

const chartOptions = {
    responsive: true
}

//Filtração de Dados de Gráficos

const medianPriceByCategory = computed(() => {
    productsStore.products.forEach(prodt => {
        if (prodt.type == "hot dish") {
            category.value.hotDish.total += parseInt(prodt.price)
            category.value.hotDish.count += 1
        }
        if (prodt.type == "cold dish") {
            category.value.coldDish.total += parseInt(prodt.price)
            category.value.coldDish.count += 1
        }
        if (prodt.type == "drink") {
            category.value.drink.total += parseInt(prodt.price)
            category.value.drink.count += 1
        }
        if (prodt.type == "dessert") {
            category.value.dessert.total += parseInt(prodt.price)
            category.value.dessert.count += 1
        }
    })
    category.value.hotDish.median = category.value.hotDish.total / category.value.hotDish.count
    category.value.coldDish.median = category.value.coldDish.total / category.value.coldDish.count
    category.value.drink.median = category.value.drink.total / category.value.drink.count
    category.value.dessert.median = category.value.dessert.total / category.value.dessert.count

    return category.value
})

const profitsByMonth = computed(() => {
    ordersStore.allOrders.forEach(order => {
        if (order.date.includes("2022-01")) {
            profits.value.January.total += parseInt(order.total_paid)
            profits.value.January.count += 1
        }
        if (order.date.includes("2022-02")) {
            profits.value.February.total += parseInt(order.total_paid)
            profits.value.February.count += 1
        }
        if (order.date.includes("2022-03")) {
            profits.value.March.total += parseInt(order.total_paid)
            profits.value.March.count += 1
        }
        if (order.date.includes("2022-04")) {
            profits.value.April.total += parseInt(order.total_paid)
            profits.value.April.count += 1
        }
        if (order.date.includes("2022-05")) {
            profits.value.May.total += parseInt(order.total_paid)
            profits.value.May.count += 1
        }
        if (order.date.includes("2022-06")) {
            profits.value.June.total += parseInt(order.total_paid)
            profits.value.June.count += 1
        }
        if (order.date.includes("2022-07")) {
            profits.value.July.total += parseInt(order.total_paid)
            profits.value.July.count += 1
        }
        if (order.date.includes("2022-08")) {
            profits.value.August.total += parseInt(order.total_paid)
            profits.value.August.count += 1
        }
        if (order.date.includes("2022-09")) {
            profits.value.September.total += parseInt(order.total_paid)
            profits.value.September.count += 1
        }
        if (order.date.includes("2022-10")) {
            profits.value.October.total += parseInt(order.total_paid)
            profits.value.October.count += 1
        }
        if (order.date.includes("2022-11")) {
            profits.value.November.total += parseInt(order.total_paid)
            profits.value.November.count += 1
        }
        if (order.date.includes("2022-12")) {
            profits.value.December.total += parseInt(order.total_paid)
            profits.value.December.count += 1
        }
       
    })
    return profits.value
})

</script>

<style scoped>
.grid-responsive {
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 400px;
    margin-bottom: 3rem;
}

.card-charts {
    width: 400px;
    height: 400px;
    justify-self: center;
    margin-bottom: 2rem;

}

@media (max-width: 500px) {
    .grid-responsive {
        grid-template-columns: 1fr;
    }
}
</style>