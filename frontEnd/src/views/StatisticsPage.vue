<template>
    <div style="width:100%;height:100vw;position: relative;top: 4rem;background-color: rebeccapurple;">
        <p>{{ category.hotDish.total }}</p>
        <p> {{ productsStore.products }}</p>
        <p></p> 
        <div style="display:block;width:900px;height: 500px;">
            <canvas id="pieChart"></canvas>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, toRaw, computed } from "vue";
import Chart from 'chart.js/auto'
import { useOrdersStore } from "@/stores/orders.js"
import { useProductsStore } from "@/stores/products.js"

const ordersStore = useOrdersStore()
const productsStore = useProductsStore()

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

const data = {
    labels: [
        'Hot Dish',
        'Cold Dish',
        'Drink',
        'Dessert'
    ],
    datasets: [{
        label: 'Preço Médio',
        data: [category.value.hotDish.median,60,70,80],
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
    productsStore.loadProducts()
    medianPrice
    /* productsSoldData(); */
    let pieChart = new Chart(
    document.getElementById('pieChart'),
    config
);
})
//Filtração de Dados de Gráficos

let medianPrice = () => {
    productsStore.products.forEach(product => {
        let prodt = toRaw(product)
        console.log(prodt)
        console.log(parseInt(prodt.price))
        if(prodt.type == "hot dish"){
            category.value.hotDish.total += parseInt(prodt.price)
            category.value.hotDish.count += 1
        }
        if(prodt.type == "cold dish"){
            category.value.coldDish.total += parseInt(prodt.price)
            category.value.coldDish.count += 1
        }
        if(prodt.type == "drink"){
            category.value.drink.total += parseInt(prodt.price)
            category.value.drink.count += 1
        }
        if(prodt.type == "dessert"){
            category.value.dessert.total += parseInt(prodt.price)
            category.value.dessert.count += 1
        } 
    })
    category.value.hotDish.median = category.value.hotDish.total / category.value.hotDish.count
    category.value.coldDish.median = category.value.coldDish.total / category.value.coldDish.count
    category.value.drink.median = category.value.drink.total / category.value.drink.count
    category.value.dessert.median = category.value.dessert.total / category.value.dessert.count

    console.log(category.value.hotDish.median)
    console.log(category.value)
    return category.value
}

/*
const productsSoldData = async () =>{
    ordersStore.allOrders.forEach(order => {
        order.order_items.forEach(item => {
            if(item.product.type == "hot dish"){
                productsSold.hotDish += item.quantity
            }
            if(item.product.type == "cold dish"){
                productsSold.coldDish += item.quantity
            }
            if(item.product.type == "drink"){
                productsSold.drink += item.quantity
            }
            if(item.product.type == "dessert"){
                productsSold.dessert += item.quantity
            }
        })
    })
    console.log(ordersStore.allOrders.value)
    console.log(productsSold)
    console.log(productsSold.hotDish)
    console.log(productsSold.coldDish)
    console.log(productsSold.drink)
    console.log(productsSold.dessert)
}
*/
computed(() => medianPrice, () => {
    let pieChart = new Chart(
    document.getElementById('pieChart'),
    config
);
})  

</script>

<style scoped>

</style>