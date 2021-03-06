/* eslint-disable import/no-webpack-loader-syntax */
import React, { Component } from 'react'
//
import source from '!raw!./InteractionModes'
import CodeHighlight from './components/codeHighlight'
//
import ChartConfig from './components/ChartConfig'
//
import { Chart, Axis, Series, Tooltip } from '../../../lib'

class Story extends Component {
  render() {
    return (
      <div>
        <ChartConfig show={['elementType', 'interaction']}>
          {({ elementType, interaction, data }) => (
            <Chart data={data} getData={d => d.data} interaction={interaction}>
              <Axis primary type="time" position="bottom" />
              <Axis type="linear" position="left" stacked />
              <Series type={elementType} />
              <Tooltip position="top" />
            </Chart>
          )}
        </ChartConfig>

        <br />
        <br />
        <CodeHighlight>{() => source}</CodeHighlight>
      </div>
    )
  }
}

export default () => <Story />
