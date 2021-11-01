<template>
  <div class="com-container">
    <div class="com-echarts" ref="graph"></div>
  </div>
</template>

<script>
import theme1 from '@/assets/theme1'

var myChart = null
export default {
  data () {
    return {
      // mychart: null,
      allData: null,
      targets: [],
      condition: [],
      table_data: [],
      label: '',
      all_properties: [],
      tmpName: ''
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
  },

  methods: {
    initChart () {
      this.$echarts.registerTheme('myTheme', theme1)
      myChart = this.$echarts.init(this.$refs.graph)
      // const tmpName = null
      const initOption = {
        title: {
          text: 'Graph',
          left: 20,
          top: 20
        },

        tooltip: {
          show: true,
          trigger: 'item'
        },

        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },

        legend: {
          orient: 'vertical',
          left: '3%',
          bottom: '5%'
        },

        series: [
          {
            type: 'graph',
            layout: 'force',
            animation: true,
            roam: true,
            cursor: 'pointer',
            selectedMode: 'multiple',
            label: {
              position: 'inside',
              formatter: '{c}'
            },
            draggable: true,
            force: {
              edgeLength: 5,
              repulsion: 20,
              gravity: 0.2
            }
          }
        ],

        graphic: [
          {
            type: 'group',
            bounding: 'all',
            right: 50,
            top: 50,
            // default invisible: true,
            children: [
              {
                type: 'circle',
                id: 'circle',
                left: 'center',
                top: 'center',
                silent: true,
                invisible: true,
                shape: {
                  r: 50
                },
                style: {
                  fill: 'rgba(0,0,0,0.3)'
                }
              },
              {
                type: 'text',
                id: 'text',
                right: 'center',
                top: 'center',
                silent: true,
                invisible: true,
                style: {
                  fill: '#fff',
                  text: 'test',
                  textAlign: 'middle',
                  font: '13px Microsoft YaHei'
                }
              },
              {
                type: 'sector',
                id: 'right_ring',
                invisible: true,
                shape: {
                  r: 70,
                  r0: 50,
                  startAngle: -Math.PI / 2,
                  endAngle: Math.PI / 2
                },
                left: '100%',
                top: 'center',
                style: {
                  fill: '#F0F8FF'
                },

                /**
                 * 当鼠标over右半圈时将右半圈变色
                 */
                onmouseover: function () {
                  myChart.setOption({
                    graphic: {
                      id: 'right_ring',
                      style: {
                        fill: '#76eec6'
                      }
                    }
                  })
                },
                /**
                 * 当鼠标移出右半圈时将右半圈变色
                 *
                 */
                onmouseout: function () {
                  myChart.setOption({
                    graphic: {
                      id: 'right_ring',
                      style: {
                        fill: '#F0F8FF'
                      }
                    }
                  })
                },
                /**
                 * 鼠标点击右半圈时将选中目标压入vue的targets里，并隐藏选取控件
                 *
                 */
                onclick: function () {
                  // this.targets.push(tmpName)
                  myChart.setOption({
                    graphic: [
                      {
                        id: 'left_ring',
                        invisible: true
                      },
                      {
                        id: 'right_ring',
                        invisible: true
                      },
                      {
                        id: 'text',
                        invisible: true
                      },
                      {
                        id: 'circle',
                        invisible: true
                      }
                    ]
                  })
                }

              },
              {
                type: 'sector',
                id: 'left_ring',
                invisible: true,
                shape: {
                  r: 70,
                  r0: 50,
                  startAngle: Math.PI / 2,
                  endAngle: Math.PI * 1.5
                },
                right: '50%',
                top: 'center',
                style: {
                  fill: '#F0F8FF'
                },
                /**
                 * 当鼠标over左半圈时将左半圈变色
                 *
                 */
                onmouseover: function () {
                  myChart.setOption({
                    graphic: {
                      id: 'left_ring',
                      style: {
                        fill: '#76eec6'
                      }
                    }
                  })
                },
                /**
                 * 当鼠标移出左半圈时将左半圈变色
                 *
                 */
                onmouseout: function () {
                  myChart.setOption({
                    graphic: {
                      id: 'left_ring',
                      style: {
                        fill: '#F0F8FF'
                      }
                    }
                  })
                },
                /**
                 * 鼠标点击左半圈时，将选中节点压入vue的conditions里，并隐藏选取控件
                 *
                 */
                onclick: function () {
                  // this.condition.push(tmpName)
                  myChart.setOption({
                    graphic: [
                      {
                        id: 'left_ring',
                        invisible: true
                      },
                      {
                        id: 'right_ring',
                        invisible: true
                      },
                      {
                        id: 'text',
                        invisible: true
                      },
                      {
                        id: 'circle',
                        invisible: true
                      }
                    ]
                  })
                }
              }]
          }]
      }

      myChart.setOption(initOption)

      // 点击节点，在图表中生成该节点对应类型及properties
      myChart.on('click', function (params) {
        // this.table_data = properties_map.get(params.data.name)
        this.label = params.data.name
      })
      // 双击节点显示选取控件
      myChart.on('dblclick', function (params) {
        this.tmpName = params.data.name
        myChart.setOption({
          graphic: [
            {
              id: 'left_ring',
              invisible: false
            },
            {
              id: 'right_ring',
              invisible: false
            },
            {
              id: 'text',
              invisible: false,
              style: {
                text: params.data.name
              }
            },
            {
              id: 'circle',
              invisible: false
            }
          ]
        })
      })
    },

    async getData () {
      const { data: res } = await this.$http.get('http://127.0.0.1:3333/test')

      this.allData = res
      console.log(this.allData)
      this.updateChart()
    },

    updateChart () {
      const catArr = this.allData.categories
      const nodeArr = this.allData.nodes
      const edgeArr = this.allData.links

      var dataOption = {

        series: [{
          data: nodeArr,

          categories: catArr,

          links: edgeArr
        }]
      }

      myChart.setOption(dataOption)
      // myChart.on('click', function (params) {
      //   if (params.seriesType === 'graph') {
      //     if (params.dataType === 'edge') {
      //       // 点击到了 graph 的 edge（边）上。
      //       alert(`edge name is :${params.name}`)
      //     } else {
      //       // 点击到了 graph 的 node（节点）上。
      //       alert(`node name is :${params.name}`)
      //     }
      //   }
      // })
    },

    screenAdapter () {
      const mySize = this.$refs.graph.offsetWidth / 100 * 3.6
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: mySize
          }
        },
        legend: {
          itemWidth: mySize / 3,
          itemHeight: mySize / 3,
          itemGap: mySize / 3,
          textStyle: {
            fontSize: mySize / 3
          }
        }
      }
      myChart.setOption(adapterOption)
      myChart.resize()
    }
  }

}
</script>
