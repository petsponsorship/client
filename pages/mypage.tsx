import React from "react";
import { parseCookies } from "../helpers"

function Mypage () {
    return(<div>마이페이지</div>)
}

export default Mypage;


Mypage.getServerSideProps = async ({ req, res }) => {
    const data = parseCookies(req)
    
     if (res) {
      if (Object.keys(data).length === 0 && data.constructor === Object) {
        res.writeHead(301, { Location: "/" })
        res.end()
      }
    }
    
    return {
      data: data && data,
    }
  }