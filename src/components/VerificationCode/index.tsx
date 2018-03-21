import * as React from 'react';

function VerificationCode(canvas, isDark) {

  this.canvas = canvas
  this.width = canvas.width
  this.height = canvas.height
  this.x = this.width / 5
  this.y = this.height / 2
  this.cvs = canvas.getContext("2d")
  this.color = isDark ? "white" : "black"
  this.str = ''
}


VerificationCode.prototype.setCode = function (str) {

  if (typeof str === 'string' || typeof str === 'number') {
    str += ''
    this.str = ''
    this.str = str
    this.x = this.width / (str.length + 1)
    for (let i = 1; i < str.length + 1; i++) {
      this.draw({ text: str[i - 1], x: this.x * i, y: this.y })
    }
  } else {
    console.error("arguments is not string or number")
  }
}

VerificationCode.prototype.disturb = function () {

  for (let i = 0; i < 3; i++) {

    let start = {
      x: Math.ceil(Math.random() * this.width),
      y: Math.ceil(Math.random() * this.height)
    }
    let end = {
      x: parseInt(Math.random() * this.width),
      y: parseInt(Math.random() * this.height)
    }

    this.cvs.beginPath()
    this.cvs.moveTo(start.x, start.y)
    this.cvs.lineTo(end.x, end.y)
    this.cvs.stroke()
    this.cvs.closePath()
  }

}

VerificationCode.prototype.draw = function (obj) {

  this.cvs.beginPath()
  this.cvs.fillStyle = this.color
  this.cvs.textAlign = 'center'
  this.cvs.textBaseline = 'middle'
  this.cvs.font = "18px Arial"
  this.cvs.fillText(obj.text, obj.x, obj.y)
  this.cvs.closePath()

}


export default class extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }
  canvas = null
  componentDidMount() {
    this.renderCode()
  }
  renderCode = () => {
    const { value = "HEIHEI", disturb = false, isDark = false } = this.props;
    const item = new VerificationCode(this.canvas, isDark)
    item.setCode(value);
    item.disturb();
  }
  render() {
    const { isDark } = this.props;
    return <div
      style={{ width: "120px", cursor: "pointer", border: isDark ? "1px solid white" : "1px solid black", height: "38px" }}>
      <canvas onClick={this.props.onClick} ref={target => this.canvas = target} width="120px" height="38px"></canvas>
    </div>

  }
}