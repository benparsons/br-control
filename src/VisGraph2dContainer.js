import React, { Component } from "react"
import moment from "moment"
//import VisGraph2d from "react-visjs-graph2d"
import VisGraph2d from "react-visjs-graph2d"

const example_one = {
  options: {
    height: "600px",
  },
  
  customTimes: {
    customTime1: moment().add(-1, "days"),
    customTime2: moment().add(4, "days"),
  },
  items: [],
  groups: [
    {
      id: 1,
      content: "Group0",
      options: {
        drawPoints: {
          style: "circle",
        },
        shaded: {
          orientation: "bottom",
        },
      },
    },
    {
      id: 0,
      content: "Group1",
      options: {
        style: "bar",
      },
    },
  ],
}

class VisGraph2dContainer extends Component {
  log = e => console.log(e)

  componentDidMount() {
    

  }

  render() {
    example_one.items = this.props.weights
    return (
      <>
        <VisGraph2d
          {...example_one}
          onClick={e => this.log(e)}
        />
      </>
    )
  }
}

export default VisGraph2dContainer