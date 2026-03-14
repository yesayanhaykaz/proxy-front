"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProxyBuilderPage() {

const router = useRouter();

const [network,setNetwork] = useState("residential");
const [session,setSession] = useState("sticky");
const [protocol,setProtocol] = useState("http");
const [location,setLocation] = useState("worldwide");
const [sessionName,setSessionName] = useState(`randSession${Math.floor(Math.random()*9000)+1000}`);

const password = "******";

const username =
`user,type_${network},session_${sessionName}`;

const handleBuy = () => {

router.push(`/checkout?network=${network}&session=${session}&protocol=${protocol}&location=${location}&sessionName=${sessionName}`);

};

return (

<main className="bg-white min-h-screen">

<div className="max-w-6xl mx-auto px-4 py-20">

<h1 className="text-4xl font-bold text-slate-900">
Build Your Proxy
</h1>

<p className="mt-4 text-slate-600 max-w-2xl">
Configure your proxy connection exactly how you need it.
Select network, session behavior, protocol and location.
</p>


{/* CONFIG CARD */}

<div className="mt-10 grid md:grid-cols-2 gap-12">

{/* LEFT CONFIG */}

<div className="space-y-8">


{/* NETWORK TYPE */}

<div>

<p className="font-semibold text-slate-800 mb-3">
Network Type
</p>

<div className="flex gap-3 flex-wrap">

{["residential","mobile","datacenter","fast"].map(n => (

<button
key={n}
onClick={()=>setNetwork(n)}
className={`px-5 py-2 rounded-lg border capitalize ${
network===n ? "bg-purple-600 text-white border-purple-600":"bg-white"
}`}>
{n}
</button>

))}

</div>

</div>



{/* SESSION TYPE */}

<div>

<p className="font-semibold text-slate-800 mb-3">
Session Type
</p>

<div className="flex gap-3">

<button
onClick={()=>setSession("sticky")}
className={`px-5 py-2 rounded-lg border ${
session==="sticky" ? "bg-purple-600 text-white":"bg-white"
}`}>
Sticky
</button>

<button
onClick={()=>setSession("rotating")}
className={`px-5 py-2 rounded-lg border ${
session==="rotating" ? "bg-purple-600 text-white":"bg-white"
}`}>
Rotating
</button>

</div>

</div>



{/* SESSION NAME */}

<div>

<p className="font-semibold text-slate-800 mb-3">
Session Name
</p>

<input
value={sessionName}
onChange={(e)=>setSessionName(e.target.value)}
className="border rounded-lg px-4 py-2 w-full"
/>

<p className="text-xs text-slate-500 mt-2">
Keep the same session name to maintain the same IP (max 60 min)
</p>

</div>



{/* PROTOCOL */}

<div>

<p className="font-semibold text-slate-800 mb-3">
Connection Type
</p>

<div className="flex gap-3 flex-wrap">

<button
onClick={()=>setProtocol("http")}
className={`px-5 py-2 rounded-lg border ${
protocol==="http" ? "bg-purple-600 text-white":"bg-white"
}`}>
HTTP Proxy
</button>

<button
onClick={()=>setProtocol("socks5")}
className={`px-5 py-2 rounded-lg border ${
protocol==="socks5" ? "bg-purple-600 text-white":"bg-white"
}`}>
SOCKS5 Proxy
</button>

<button
onClick={()=>setProtocol("ssl")}
className={`px-5 py-2 rounded-lg border ${
protocol==="ssl" ? "bg-purple-600 text-white":"bg-white"
}`}>
SSL Proxy
</button>

</div>

</div>



{/* LOCATION */}

<div>

<p className="font-semibold text-slate-800 mb-3">
Location
</p>

<div className="flex gap-3">

<button
onClick={()=>setLocation("worldwide")}
className={`px-5 py-2 rounded-lg border ${
location==="worldwide" ? "bg-purple-600 text-white":"bg-white"
}`}>
Worldwide
</button>

<button
onClick={()=>setLocation("country")}
className={`px-5 py-2 rounded-lg border ${
location==="country" ? "bg-purple-600 text-white":"bg-white"
}`}>
Country
</button>

</div>

</div>

</div>



{/* RIGHT SIDE PREVIEW */}

<div className="bg-slate-50 border rounded-xl p-6 h-fit">

<h3 className="text-xl font-semibold mb-6">
Proxy Credentials Preview
</h3>

<div className="space-y-4">

<div>
<p className="text-sm text-slate-500">Proxy Server</p>
<p className="font-semibold">portal.proxiesseller.cc</p>
</div>

<div>
<p className="text-sm text-slate-500">Port</p>
<p className="font-semibold">1080</p>
</div>

<div>
<p className="text-sm text-slate-500">Username</p>
<p className="font-mono text-sm break-all">
{username}
</p>
</div>

<div>
<p className="text-sm text-slate-500">Password</p>
<p className="font-mono">{password}</p>
</div>

</div>

<button
onClick={handleBuy}
className="mt-8 w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl text-lg font-semibold">

Buy Proxy Now

</button>

</div>


</div>

</div>

</main>

);
}
