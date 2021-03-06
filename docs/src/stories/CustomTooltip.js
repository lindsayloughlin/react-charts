/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react'
import _ from 'lodash'
import { ResizableBox } from 'react-resizable'
//
import source from '!raw!./CustomTooltip'
import CodeHighlight from './components/codeHighlight'
//
import { Chart, Axis, Series, Tooltip, Area, Bar } from '../../../lib'

class Story extends Component {
  constructor() {
    super()
    this.state = {
      data: makeData()
    }
  }
  render() {
    const { data } = this.state
    return (
      <div>
        <button
          onClick={() =>
            this.setState({
              data: makeData()
            })}
        >
          Randomize Data
        </button>

        <br />
        <br />

        {_.range(1).map((d, i) => (
          <ResizableBox key={i} width={900} height={700}>
            <Chart data={data} getData={d => d.data} interaction="axis">
              <Axis primary type="time" position="bottom" />
              <Axis type="linear" position="left" stacked />
              <Series type={Area} />
              <Tooltip>
                {props => {
                  return (
                    <div
                      style={{
                        color: 'white'
                      }}
                    >
                      <h3
                        style={{
                          display: 'block',
                          textAlign: 'center'
                        }}
                      >
                        {props.primaryAxis.format(props.datums[0].primary)}
                      </h3>
                      <div
                        style={{
                          width: '200px',
                          height: '100px',
                          background: 'white'
                        }}
                      >
                        <Chart
                          data={[
                            props.datums.map(d => ({
                              x: d.seriesLabel,
                              y: d.secondary,
                              color: d.statusStyles.default.fill
                            }))
                          ]}
                        >
                          <Axis primary type="ordinal" position="bottom" />
                          <Axis type="linear" position="left" display={false} />
                          <Series
                            type={Bar}
                            getDataStyles={datum => ({
                              color: datum.datum.color
                            })}
                          />
                        </Chart>
                      </div>
                      <img
                        src="https://media.giphy.com/media/26AHLBZUC1n53ozi8/giphy.gif"
                        alt=""
                        style={{
                          width: '200px',
                          height: 'auto',
                          display: 'block',
                          margin: '0 auto'
                        }}
                      />
                    </div>
                  )
                }}
              </Tooltip>
            </Chart>
          </ResizableBox>
        ))}

        <br />
        <br />
        <CodeHighlight>{() => source}</CodeHighlight>
      </div>
    )
  }
}

export default () => <Story />

function makeData() {
  return _.map(_.range(Math.max(Math.round(Math.random() * 4), 1)), makeSeries)
}

function makeSeries(i) {
  const startDate = new Date()
  startDate.setMilliseconds(0)
  startDate.setSeconds(0)
  // const length = Math.round(Math.random() * 30)
  const length = 30
  const max = 100
  return {
    label: 'Series ' + (i + 1),
    data: _.map(_.range(length), d => ({
      x: startDate.setMinutes(startDate.getMinutes() + 30),
      y: -max + Math.round(Math.random() * max * 2),
      r: Math.round(Math.random() * 10)
    }))
  }
}
