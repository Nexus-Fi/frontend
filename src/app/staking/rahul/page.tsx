"use client";
import React, { use, useEffect } from "react";
import { sendstakeNibitx } from "./initTx";
function Page() {
  useEffect(() => {
    sendstakeNibitx();
  }, []);
  return <div>page</div>;
}

export default Page;
