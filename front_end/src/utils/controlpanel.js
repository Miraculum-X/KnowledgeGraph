export function GenerateFixedGraph (knowledge, _fixed_chart) {
  _fixed_chart.hideLoading()
  option = {
    title: {
      text: 'Auto Knowledge Graph Query System'
    },
    // controll panel for choosing condition or target
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
                     *
                     */
            onmouseover: function () {
              _fixed_chart.setOption({
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
              _fixed_chart.setOption({
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
              vm.$data.targets.push(tmp_name)
              _fixed_chart.setOption({
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
              _fixed_chart.setOption({
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
              _fixed_chart.setOption({
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
              vm.$data.conditions.push(tmp_name)
              _fixed_chart.setOption({
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
      }],
    // Config for force graph
    series: [{
      type: 'graph',
      layout: 'force',
      symbolSize: 30,
      animation: true,
      label: {
        normal: {
          position: 'right',
          formatter: '{b}',
          show: true
        }
      },
      edgeLabel: {
        normal: {
          show: true,
          textStyle: {
            fontSize: 10
          },
          formatter: '{c}'
        }
      },
      edgeSymbol: [null, 'arrow'],
      draggable: true,
      data: knowledge.nodes,
      links: knowledge.links,
      // 力引导布局效果主要靠以下参数调整
      force: {
        edgeLength: 100,
        repulsion: 400,
        gravity: 0.01
      }
    }]
  }
  _fixed_chart.setOption(option)
  // 点击节点，在图表中生成该节点对应类型及properties
  _fixed_chart.on('click', function (params) {
    vm.$data.table_data = properties_map.get(params.data.name)
    vm.$data.label = params.data.name
  })
  // 双击节点显示选取控件
  _fixed_chart.on('dblclick', function (params) {
    tmp_name = params.data.name
    _fixed_chart.setOption({
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
}
