<template>
  <div class="com-container">
      <div class="com-echarts" ref="chart">

      </div>
  </div>
</template>

<script>
import theme1 from '@/assets/theme1'

export default {
  data () {
    return {
      mychart: null,
      allData: null,
      timerId: null

    }
  },
  mounted () {
    this.initChart()
    this.getData()
    window.addEventListener('resize', this.screenAdapter)
    this.screenAdapter()
  },
  destroyed () {
    window.removeEventListener('resize', this.screenAdapter)
    clearInterval(this.timerId)
  },
  methods: {
    async initChart () {
      this.$echarts.registerTheme('theme1', theme1)
      this.mychart = this.$echarts.init(this.$refs.chart, 'theme1')
      const initOption = {
        title: {
          text: '▎散点分布图',
          left: 20,
          top: 20
        },

        legend: {
        }
      }
      this.mychart.setOption(initOption)
      // 绑定鼠标事件 鼠标移动至图标时停止动画
      this.mychart.on('mouseover', () => {
        clearInterval(this.timerId)
      })
      this.mychart.on('mouseout', () => {
        this.startInterval(this.timerId)
      })
    },
    async getData () {
      const { data: res } = await this.$http.get('http://127.0.0.1:3333/map')
      this.allData = res
      this.updateChart()
      this.startInterval()
    },
    updateChart () {
      // const colorArr = [
      //   ['#0BA82C', '#4FF778'],
      //   ['#2E72BF', '#23E5E5'],
      //   ['#5052EE', '#AB6EE5'],
      //   ['#E5DD45', '#E8B11C'],
      //   ['#E8821C', '#E55445']
      // ]
      // const centerArr = [
      //   ['18%', '40%'],
      //   ['50%', '40%'],
      //   ['82%', '40%'],
      //   ['34%', '75%'],
      //   ['66%', '75%']
      // ]
      const legendArr = (this.allData).map(item => {
        return item.name
      })
      // 每一类别一个series 包含了该类下所有散点信息
      // 必须使用地图坐标系统 才能显示散点
      const seriesArr = (this.allData).map(item => {
        return {
          type: '',

          name: item.name,
          data: item.value

        }
      })
      const dataOption = {
        legend: {
          data: legendArr
        },
        series: seriesArr
      }

      this.mychart.setOption(dataOption)
    },
    screenAdapter () {
      const mySize = this.$refs.chart.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: mySize
          }
        },
        legend: {
          itemWidth: mySize / 2,
          itemHeight: mySize / 2,
          itemGap: mySize / 2,
          textStyle: {
            fontSize: mySize / 2
          }
        }
      }
      this.mychart.setOption(adapterOption)
      this.mychart.resize()
    },

    startInterval () {
      if (this.timerId) {
        clearInterval(this.timerId)
      }
      this.timerId = setInterval(() => {
        this.startValue++
        this.endValue++
        if (this.endValue > this.allData.length - 1) {
          this.startValue = 0
          this.endValue = 9
        }
        this.updateChart()
      }, 2000)
    }
  }
}
</script>
