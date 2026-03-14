"use client";
import { useState } from "react";

export default function ProxyBuilderCTA() {

const [network,setNetwork]=useState("residential");
const [session,setSession]=useState("sticky");
const [protocol,setProtocol]=useState("http");
const [location,setLocation]=useState("worldwide");

const buyLink = `/checkout?network=${network}&session=${session}&protocol=${protocol}&location=${location}`;

return (
<section className="bg-gradient-to-b from-white to-slate-50 py-20">

<div className="mx-auto max-w-6xl px-4">

<h2 className="text-4xl font-bold text-slate-900 text-center">
Build Your Proxy
</h2>

<p className="text-center text-slate-600 mt-4 max-w-2xl mx-auto">
Select your proxy configuration and launch your proxy instantly.
No setup required — ready in seconds.
</p>


<div className="mt-12 bg-white rounded-2xl shadow-lg p-8 border">

{/* NETWORK TYPE */}

<div className="mb-8">

<label className="text-sm font-semibold text-slate-700">
Network Type
</label>

<div className="flex gap-3 mt-3 flex-wrap">

<button
onClick={()=>setNetwork("residential")}
className={`px-5 py-2 rounded-lg border ${network==="residential"?"bg-purple-600 text-white":"bg-white"}`}>
Residential
</button>

<button
onClick={()=>setNetwork("mobile")}
className={`px-5 py-2 rounded-lg border ${network==="mobile"?"bg-purple-600 text-white":"bg-white"}`}>
Mobile
</button>

<button
onClick={()=>setNetwork("datacenter")}
className={`px-5 py-2 rounded-lg border ${network==="datacenter"?"bg-purple-600 text-white":"bg-white"}`}>
Datacenter
</button>

<button
onClick={()=>setNetwork("fast")}
className={`px-5 py-2 rounded-lg border ${network==="fast"?"bg-purple-600 text-white":"bg-white"}`}>
Fast
</button>

</div>

</div>


{/* SESSION TYPE */}

<div className="mb-8">

<label className="text-sm font-semibold text-slate-700">
Session Type
</label>

<div className="flex gap-3 mt-3">

<button
onClick={()=>setSession("sticky")}
className={`px-5 py-2 rounded-lg border ${session==="sticky"?"bg-purple-600 text-white":"bg-white"}`}>
Sticky
</button>

<button
onClick={()=>setSession("rotating")}
className={`px-5 py-2 rounded-lg border ${session==="rotating"?"bg-purple-600 text-white":"bg-white"}`}>
Rotating
</button>

</div>

</div>


{/* PROTOCOL */}

<div className="mb-8">

<label className="text-sm font-semibold text-slate-700">
Connection Type
</label>

<div className="flex gap-3 mt-3 flex-wrap">

<button
onClick={()=>setProtocol("http")}
className={`px-5 py-2 rounded-lg border ${protocol==="http"?"bg-purple-600 text-white":"bg-white"}`}>
HTTP Proxy
</button>

<button
onClick={()=>setProtocol("socks5")}
className={`px-5 py-2 rounded-lg border ${protocol==="socks5"?"bg-purple-600 text-white":"bg-white"}`}>
SOCKS5 Proxy
</button>

<button
onClick={()=>setProtocol("ssl")}
className={`px-5 py-2 rounded-lg border ${protocol==="ssl"?"bg-purple-600 text-white":"bg-white"}`}>
SSL Proxy
</button>

</div>

</div>


{/* LOCATION */}

<div className="mb-10">

<label className="text-sm font-semibold text-slate-700">
Location
</label>

<div className="flex gap-3 mt-3">

<button
onClick={()=>setLocation("worldwide")}
className={`px-5 py-2 rounded-lg border ${location==="worldwide"?"bg-purple-600 text-white":"bg-white"}`}>
Worldwide
</button>

<button
onClick={()=>setLocation("country")}
className={`px-5 py-2 rounded-lg border ${location==="country"?"bg-purple-600 text-white":"bg-white"}`}>
Country
</button>

</div>

</div>


{/* CTA */}

<div className="text-center">

<a
href={buyLink}
className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-xl font-semibold text-lg shadow-lg">
Get Proxy Now
</a>

<p className="text-sm text-slate-500 mt-4">
Instant activation • No setup required • Works with all tools
</p>

</div>


</div>
</div>
</section>
);
}
