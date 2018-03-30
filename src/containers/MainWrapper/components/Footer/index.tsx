import * as React from 'react'


export default () => {
  return (
    <footer style={{
      height: "40px",
      lineHeight: "40px",
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 10,
      background: "white"
    }}>
      <div style={{ textAlign: "center" }}>
        © 2017 Antiy Labs
      </div>
    </footer>
  )
}