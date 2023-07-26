import { setup } from '@/config/setup'
import React from 'react'

const LineText = ({text} : any) => {
  return (
  <div style={{ position: "relative", height: "1px", backgroundColor: "transparent", width: "100%", margin:"2.5rem 0rem 3rem" }}>
    <span style={{ content: "''", position: "absolute", width: "50%", height: "1px", backgroundImage: "linear-gradient(to right, transparent, black)", backgroundRepeat: "repeat-x", top: "0", left: "0" }}></span>
    <span style={{ content: "''", position: "absolute", width: "50%", height: "1px", backgroundImage: "linear-gradient(to right, transparent, black)", backgroundRepeat: "repeat-x", top: "0", right: "0", transform: "scaleX(-1)" }}></span>
    <span style={{ position: "absolute", top: "-10px", left: "50%", transform: "translateX(-50%)", backgroundColor: "white", padding: "0 10px" }}>{text}</span>
  </div>
  )
}

export default LineText